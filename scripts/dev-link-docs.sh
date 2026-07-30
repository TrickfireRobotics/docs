#!/bin/bash

set -e

PROJECT_ROOT=$(realpath "$(dirname "${BASH_SOURCE[0]}")/..")
PROJECT_DIR=$1
LINK_PATH=$PROJECT_ROOT/content/$(basename $PROJECT_DIR)

if [ -z $PROJECT_DIR ]; then
    echo "Usage: dev-link-docs <project_path>"
fi

if [ ! -d "$PROJECT_DIR" ]; then
    echo "Path is not an existing directory"
    exit 1
fi

if [ ! -d "$PROJECT_DIR/docs" ]; then
    echo "Project does not contain a docs/ directory"
    exit 1
fi

if [ ! -f "$PROJECT_DIR/docs.config.json" ]; then
    echo "Project does not contain docs.config.json"
    exit 1
fi

mkdir -p $LINK_PATH
ln -s $PROJECT_DIR/docs.config.json $LINK_PATH/docs.config.json
ln -s $PROJECT_DIR/docs $LINK_PATH/docs

echo "Symlink to docs created for project $(basename $PROJECT_DIR)"
