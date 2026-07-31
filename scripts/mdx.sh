#!/bin/bash
# Converts a project's docs/ from plain Markdown to MDX: renames *.md to
# *.mdx, inlines Docusaurus-style ::: callouts as <Callout> components, and
# repoints any relative links that referenced the old .md filenames.

set -e

PROJECT_DIR=$1

if [ -z "$PROJECT_DIR" ]; then
    echo "Usage: mdx.sh <project_path>"
    exit 1
fi

if [ ! -d "$PROJECT_DIR" ]; then
    echo "Path is not an existing directory"
    exit 1
fi

if [ ! -f "$PROJECT_DIR/docs.config.json" ]; then
    echo "Project does not contain docs.config.json"
    exit 1
fi

# Same convention as scripts/generate-sources.ts: docs live under a nested
# docs/ subdir (e.g. this repo's own root) unless the project's markdown
# sits directly alongside docs.config.json (e.g. content/<repo>).
if [ -d "$PROJECT_DIR/docs" ]; then
    DOCS_DIR=$(realpath "$PROJECT_DIR/docs")
else
    DOCS_DIR=$(realpath "$PROJECT_DIR")
fi

CONVERTER=$(mktemp)
trap 'rm -f "$CONVERTER"' EXIT

cat >"$CONVERTER" <<'PERL'
use strict;
use warnings;
no warnings "uninitialized";

my $file = shift @ARGV or die "usage: mdx-convert.pl <file>\n";

open my $fh, "<", $file or die "$file: $!";
local $/;
my $content = <$fh>;
close $fh;

# Docusaurus-style ::: labels, mapped to a Fumadocs <Callout> "type" and its
# default title (a bracketed label, `:::tip[Custom Title]`, overrides it).
my %types = (
    note      => ["info", "Note"],
    tip       => ["idea", "Tip"],
    info      => ["info", "Info"],
    important => ["info", "Important"],
    warning   => ["warning", "Warning"],
    caution   => ["warning", "Caution"],
    danger    => ["error", "Danger"],
);

sub convert_prose {
    my ($text) = @_;

    $text =~ s{
        :::(\w+)(?:\[([^\]]+)\])?\r?\n
        (.*?)
        \r?\n:::[ \t]*\r?\n?
    }{
        my ($kind, $custom, $body) = ($1, $2, $3);
        my $ref = $types{lc $kind} // [$kind, ucfirst $kind];
        my ($type, $default_title) = @$ref;
        my $title = defined $custom ? $custom : $default_title;
        $body =~ s/\s+\z//;
        my $indented = join("\n", map { length($_) ? "    $_" : "" } split(/\n/, $body, -1));
        qq{<Callout type="$type" title="$title">\n$indented\n</Callout>\n};
    }gsex;

    # Sibling docs are conventionally linked with their .md extension (see
    # docs/writing-content.md) - repoint those at the renamed file.
    $text =~ s/(\]\([^)\s]*?)\.md(#[^)]*)?\)/$1.mdx$2)/g;

    return $text;
}

# Walk the file line by line (index/substr, not a backtracking regex, so a
# large file can't trigger catastrophic backtracking) and only run
# convert_prose() on lines outside of fenced code blocks - a ::: shown inside
# a ``` example is documentation demonstrating the literal syntax, not a real
# admonition to convert.
my @out;
my $prose = "";
my $code = "";
my $in_code = 0;
my ($fence_char, $fence_len);

my $pos = 0;
my $len = length $content;
while ($pos < $len) {
    my $nl = index($content, "\n", $pos);
    my $line;
    if ($nl == -1) {
        $line = substr($content, $pos);
        $pos = $len;
    } else {
        $line = substr($content, $pos, $nl - $pos + 1);
        $pos = $nl + 1;
    }

    if (!$in_code) {
        if ($line =~ /^[ \t]*(`{3,}|~{3,})/) {
            if (length $prose) {
                push @out, convert_prose($prose);
                $prose = "";
            }
            $fence_char = substr($1, 0, 1);
            $fence_len  = length($1);
            $code = $line;
            $in_code = 1;
        } else {
            $prose .= $line;
        }
    } else {
        $code .= $line;
        if ($line =~ /^[ \t]*\Q$fence_char\E{$fence_len,}[ \t]*\r?\n?$/) {
            push @out, $code;
            $code = "";
            $in_code = 0;
        }
    }
}
push @out, convert_prose($prose) if length $prose;
push @out, $code if length $code; # unterminated fence - leave untouched

open my $out_fh, ">", $file or die "$file: $!";
print $out_fh @out;
close $out_fh;
PERL

echo "==> Converting ::: callout style to <Callout> components..."
while IFS= read -r -d '' file; do
    perl "$CONVERTER" "$file"
done < <(find "$DOCS_DIR" -type f -name "*.md" -print0)

echo "==> Renaming *.md to *.mdx..."
while IFS= read -r -d '' file; do
    mv "$file" "${file%.md}.mdx"
done < <(find "$DOCS_DIR" -type f -name "*.md" -print0)

echo "Done. Converted docs in $DOCS_DIR to MDX."
