## [2.1.3](https://github.com/TrickfireRobotics/docs/compare/trickfire-docs-v2.1.2...trickfire-docs-v2.1.3) (2026-07-31)

### Bug Fixes

- point trickfire-docs init at the renamed scaffold .mdx files ([9a43de4](https://github.com/TrickfireRobotics/docs/commit/9a43de4d8bd4852f5687b026d27c6e01a9b3e9b3))

## [2.1.2](https://github.com/TrickfireRobotics/docs/compare/trickfire-docs-v2.1.1...trickfire-docs-v2.1.2) (2026-07-31)

### Bug Fixes

- stop gitignoring docs/**/meta.json in scaffolded repos ([93fce40](https://github.com/TrickfireRobotics/docs/commit/93fce4006153c8700de57ef6845bf932bc3c4a70))

## [2.1.1](https://github.com/TrickfireRobotics/docs/compare/trickfire-docs-v2.1.0...trickfire-docs-v2.1.1) (2026-07-31)

### Bug Fixes

- wipe and re-clone the cache dir if .git is missing instead of erroring ([da067ca](https://github.com/TrickfireRobotics/docs/commit/da067cabfa4257d29f1520f257482a04867b417e))

# [2.1.0](https://github.com/TrickfireRobotics/docs/compare/trickfire-docs-v2.0.0...trickfire-docs-v2.1.0) (2026-07-31)

### Bug Fixes

- skip postinstall's site-generation step for consumer installs ([4849c02](https://github.com/TrickfireRobotics/docs/commit/4849c0214975663a4fab7eacaf0fae163949992c))
- standardize dev docs ([7aeb3bb](https://github.com/TrickfireRobotics/docs/commit/7aeb3bbb4e2dbe2ca6dd0e96fd85549edfaba0c1))

# [2.0.0](https://github.com/TrickfireRobotics/docs/compare/trickfire-docs-v1.9.0...trickfire-docs-v2.0.0) (2026-07-31)

- feat!: run trickfire-docs dev/build from a shared cache clone instead of a bundled site template ([3ae6c3b](https://github.com/TrickfireRobotics/docs/commit/3ae6c3b03d06ef0e3093df6679d1e409926e8539))

### Bug Fixes

- site not centered ([035ed1a](https://github.com/TrickfireRobotics/docs/commit/035ed1a1e410f379fcf6681eaab9fca1945328a4))

### BREAKING CHANGES

- trickfire-docs dev/build now require pnpm on PATH (used
  to install the cache clone's dependencies, including the fumadocs-ui
  patch plain npm can't apply) and no longer preview only the member's own
  project - local preview now also shows General and the framework's own
  docs, matching what docs.trickfirerobotics.com actually renders.

# [1.9.0](https://github.com/TrickfireRobotics/docs/compare/trickfire-docs-v1.8.0...trickfire-docs-v1.9.0) (2026-07-30)

### Bug Fixes

- fix some shtuff ([c0ac49d](https://github.com/TrickfireRobotics/docs/commit/c0ac49d6546eed7afc000f0b49cecedd716a4985))
- fixed position of dev indicator ([5d47f81](https://github.com/TrickfireRobotics/docs/commit/5d47f81b34628b9eb1058e68338c915561977608))
- link style ([0cb0721](https://github.com/TrickfireRobotics/docs/commit/0cb0721baa8a768c694a3ab808752e07d6b4de45))
- made assets a statically served dir ([27b9cbd](https://github.com/TrickfireRobotics/docs/commit/27b9cbd1f7be7f28533ecb7eb9f59e170c47ddeb))
- types ([faea3e0](https://github.com/TrickfireRobotics/docs/commit/faea3e0fa58d8d62fdd1ee47f5d6715f227e60bc))
- uncommited change ([f35826d](https://github.com/TrickfireRobotics/docs/commit/f35826dc27d02a081ad5dd1c2d6d3ed87cfdc03d))

### Features

- add Next.js app and Fumadocs site scaffolding ([a108fd6](https://github.com/TrickfireRobotics/docs/commit/a108fd624eb29c754b7c6a294b2d2f7dc9367022))

# [1.8.0](https://github.com/TrickfireRobotics/docs/compare/trickfire-docs-v1.7.0...trickfire-docs-v1.8.0) (2026-07-30)

### Bug Fixes

- added index ([3c17918](https://github.com/TrickfireRobotics/docs/commit/3c17918511fcbff356290744446fe7bd97438877))
- renamed folder and added meta ([5eb579d](https://github.com/TrickfireRobotics/docs/commit/5eb579d3720fb46f7e9b3ff51b69a1ac7aa6b704))

### Features

- added general github practices file ([ab4f0dd](https://github.com/TrickfireRobotics/docs/commit/ab4f0ddea6305998589eaea915b5f43c5b832d50))
- general docs ([b5d694c](https://github.com/TrickfireRobotics/docs/commit/b5d694cb3de6679f6f37db47b91b491b3bcc3064))
- general docs ([#19](https://github.com/TrickfireRobotics/docs/issues/19)) ([5a11001](https://github.com/TrickfireRobotics/docs/commit/5a11001eb59a466b7b064e0e4ba4ebd479ddf562))
- implemented sidebar for general ([5f50348](https://github.com/TrickfireRobotics/docs/commit/5f503489498e7693ebe384b54e091e47db3358e1))
- included some information about pull requests ([6972a23](https://github.com/TrickfireRobotics/docs/commit/6972a23bed51499bd3e91e30656d2dabfef2e925))
- made proper folder and renamed file ([546bbb7](https://github.com/TrickfireRobotics/docs/commit/546bbb7a14792e636d36531a278a8dfcbc8f53d7))

# [1.7.0](https://github.com/TrickfireRobotics/docs/compare/trickfire-docs-v1.6.2...trickfire-docs-v1.7.0) (2026-07-29)

### Bug Fixes

- added description to the framework itself ([8e2bc37](https://github.com/TrickfireRobotics/docs/commit/8e2bc37558aad9926525cf32492972ca50a02241))

### Features

- dev-fixtures ([e799f8f](https://github.com/TrickfireRobotics/docs/commit/e799f8f5a2c7896533c17060b4c212a23a2b30e2))
- improved codeblock style ([ec4ac89](https://github.com/TrickfireRobotics/docs/commit/ec4ac89bde9e455b7cbeba46e6b6ab6a4fd48678))
- improved main page theme and styling ([25e20e1](https://github.com/TrickfireRobotics/docs/commit/25e20e16d44fe408ce41d1e2f894f1928b187edc))

## [1.6.2](https://github.com/TrickfireRobotics/docs/compare/trickfire-docs-v1.6.1...trickfire-docs-v1.6.2) (2026-07-19)

### Bug Fixes

- fix single-project relevant bugs in framework dev ([3f45a82](https://github.com/TrickfireRobotics/docs/commit/3f45a821da27ebee4c60bcc4a8a46b98ccff7014))

## [1.6.1](https://github.com/TrickfireRobotics/docs/compare/trickfire-docs-v1.6.0...trickfire-docs-v1.6.1) (2026-07-19)

### Bug Fixes

- exclude assets dir ([1619644](https://github.com/TrickfireRobotics/docs/commit/1619644a528b597b137268d1d63558cc1a482013))

# [1.6.0](https://github.com/TrickfireRobotics/docs/compare/trickfire-docs-v1.5.2...trickfire-docs-v1.6.0) (2026-07-19)

### Features

- improved shared logic, add static assets page ([a193aa3](https://github.com/TrickfireRobotics/docs/commit/a193aa3b17ae4f617f434e89827727994efb2741))

## [1.5.2](https://github.com/TrickfireRobotics/docs/compare/trickfire-docs-v1.5.1...trickfire-docs-v1.5.2) (2026-07-19)

### Bug Fixes

- scaffold docs ci check path ([d8debac](https://github.com/TrickfireRobotics/docs/commit/d8debac62dc09b379c93dfdc011fc6c195765d2e))

## [1.5.1](https://github.com/TrickfireRobotics/docs/compare/trickfire-docs-v1.5.0...trickfire-docs-v1.5.1) (2026-07-18)

### Bug Fixes

- fixed cli dev not working without package.json ([d1ec40c](https://github.com/TrickfireRobotics/docs/commit/d1ec40c0c821f1f3967257896ad80d800f5fef56))

# [1.5.0](https://github.com/TrickfireRobotics/docs/compare/trickfire-docs-v1.4.1...trickfire-docs-v1.5.0) (2026-07-18)

### Bug Fixes

- better main page redirect ([6323887](https://github.com/TrickfireRobotics/docs/commit/63238879706fa2c1c253ed612cbbf2173b190458))
- fixed nginx routing & made build reload nginx ([e4c2bc5](https://github.com/TrickfireRobotics/docs/commit/e4c2bc5b3dcaa433fef836bce295f453ac94c4fa))
- got rid of the redirect and made links point directly to first page ([5d22b78](https://github.com/TrickfireRobotics/docs/commit/5d22b784bb09ee0a4825fa792524441d5d671455))
- hopefully fixed main page redirects ([d3daf1c](https://github.com/TrickfireRobotics/docs/commit/d3daf1c36f502b763b67c74af730820c6689be65))
- improve init command ([47974c9](https://github.com/TrickfireRobotics/docs/commit/47974c9ef1c6d8888321f6e52d61ae02d7d42365))
- redirects are hell ([5e0d61c](https://github.com/TrickfireRobotics/docs/commit/5e0d61cb485de16730c1a189db6286b52f7f056c))
- remove deleted dir from eslint in release ci ([f51099c](https://github.com/TrickfireRobotics/docs/commit/f51099c2e85fd9b23bdc8cc99b3bb6f8321ec3ed))
- used docusaurus native redirect ([88073c5](https://github.com/TrickfireRobotics/docs/commit/88073c51dfd76de4ebba5b64bba6f0f64d5b61df))

### Features

- added dev subpage doc for testing ([1f1f1f1](https://github.com/TrickfireRobotics/docs/commit/1f1f1f108540963af26442bbb9be1e8f10791000))
- improved styling of main page ([899d286](https://github.com/TrickfireRobotics/docs/commit/899d28617e3d5f67828a0bf41d112d92523a2d66))

## [1.4.1](https://github.com/TrickfireRobotics/docs/compare/trickfire-docs-v1.4.0...trickfire-docs-v1.4.1) (2026-07-18)

### Bug Fixes

- fixed path [skip-ci] ([2cd6a86](https://github.com/TrickfireRobotics/docs/commit/2cd6a86e3cc274b28c476072796db044340b2a2e))
- fixed scaffold docs source ci ([b35b2d8](https://github.com/TrickfireRobotics/docs/commit/b35b2d81d49a10d3dc8a36dcfc6b6c55174ffe80))
- serve public/ as static directory and set favicon ([b1f63db](https://github.com/TrickfireRobotics/docs/commit/b1f63db4be74e262acba2d97209e928ea3e3d84c))

# [1.4.0](https://github.com/TrickfireRobotics/docs/compare/trickfire-docs-v1.3.0...trickfire-docs-v1.4.0) (2026-07-18)

### Features

- fixed semantic release config ([6bfba5e](https://github.com/TrickfireRobotics/docs/commit/6bfba5e0e16d7037f9016775b50dd44182b4c2f7))

# [1.3.0](https://github.com/TrickfireRobotics/docs/compare/trickfire-docs-v1.2.0...trickfire-docs-v1.3.0) (2026-07-18)

### Bug Fixes

- **docs:** cloudflared service install always creates cloudflared.service ([bc75068](https://github.com/TrickfireRobotics/docs/commit/bc7506815ad0b00835e0f352e98b7030302fbc6a))
- improve error when docs.config.ts is missing ([4b273b7](https://github.com/TrickfireRobotics/docs/commit/4b273b7eb26b0b5025841983428444254b9d4f5a))
- patch @docusaurus/core SSG renderer for Node.js 22 compatibility ([e381928](https://github.com/TrickfireRobotics/docs/commit/e3819288f44c0ad672f916c1c7139a7c175ed7bf))
- removed astro plugin from prettier ([ad6c233](https://github.com/TrickfireRobotics/docs/commit/ad6c233c9a2813a64cdeb930bae27959e79d9ae6))
- write package.json into .docusaurus/ so webpack uses javascript/auto ([12b7a42](https://github.com/TrickfireRobotics/docs/commit/12b7a4262bc389297d89014412ff4124ffa52163))

### Features

- make trickfire-docs dev work in member repos ([345a64c](https://github.com/TrickfireRobotics/docs/commit/345a64c357f67edca65d60e7d27dac04651d1e2c))

# [1.2.0](https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/compare/trickfire-docs-v1.1.0...trickfire-docs-v1.2.0) (2026-07-17)

### Features

- added ak-series-lib to main docs page ([8585eeb](https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/commit/8585eebdaf228d9daf8a075fa2c3d94d8c2d176d))
- added init script ([6bcf4e5](https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/commit/6bcf4e5ab43de9c1dd340ca09caaa6e1d440f059))

# [1.1.0](https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/compare/trickfire-docs-v1.0.0...trickfire-docs-v1.1.0) (2026-07-02)

### Bug Fixes

- added security bypass to our custom package installation ([a5b6f2e](https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/commit/a5b6f2e1cc3abcb5d8529618f80f1b98439a6005))
- fix asset early remove issue with the migrate script ([ed0796c](https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/commit/ed0796c83743389df31a8a3804e90aa940a22eb0))
- fixed migrate script ([b1ee1db](https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/commit/b1ee1dbbce7b88139dd633336a66a1d07eb8a1db))
- **migrate:** match indented tagline in hero frontmatter block ([8ed2bce](https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/commit/8ed2bce98a7f71993bacee430b7d6249b32db1ee))
- **migrate:** move pnpm settings to pnpm-workspace.yaml ([6093ad4](https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/commit/6093ad4f30451a7739d8eda53cfcc29a541d1cb2))
- **migrate:** prefer tagline over description for docs.config.ts ([f8b0924](https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/commit/f8b092418836f8c5c5ad2dc7f93042bdb9238abc))
- **migrate:** rewrite image paths after content dir flattening ([0632c9e](https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/commit/0632c9e42339152ecb8750df7ef5ec47cd893812))
- **migrate:** use allowBuilds for pnpm 11 build script approval ([6369b12](https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/commit/6369b12435f32cfc630cc263a8af45b377b307cc))

### Features

- added a migrate script ([00762a3](https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/commit/00762a342c79270fcd158c2ee2a6d06115a4d8b0))
- made assets be ignored in page building process ([ff0b68c](https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/commit/ff0b68cf2cc29e3a7b587877b269b855925a2fd7))
- **migrate:** extract description and landing cards from old index.mdx ([fcd7d11](https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/commit/fcd7d11e0cd5b5215a2d47699e7615e6d0a9ca30))

# 1.0.0 (2026-07-01)

### Bug Fixes

- added dist-cli to vscode ignore ([167b5d1](https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/commit/167b5d1df3e35a7031a2ca0b889746691bfa01ce))
- added run to test script ([053cab6](https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/commit/053cab6825a9f4f99747202635cd77acc8ef210c))
- added test repo to gitignore ([46b77f9](https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/commit/46b77f9e4a7b78ece8d7265836fed4733e72ee6a))
- cleaned up init folder structure ([c41424e](https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/commit/c41424ebfe38bc7cebec4e023f28406901657433))
- correct package name glob in test-cli.sh ([32608db](https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/commit/32608db11ea2222ad7928e7916621e86b3f58812))
- fixed links, missing elements etc ([67235d1](https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/commit/67235d143c60520c49ef21565dc7ef11f4e2a04d))
- fixed tsconfig ([a848fa5](https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/commit/a848fa523b723f1a66e2808b9bdb3c49af6a4be4))
- header ([6da675b](https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/commit/6da675bfaf6a9fb1fb18ea82bd8f1f4033a2898b))
- make test-cli.sh location-independent ([a374b70](https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/commit/a374b703a4c564c30ee0b8ae2707b83f3e1c283d))
- remove leftover duplicate configs in framework/ ([f20a956](https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/commit/f20a9563582a68e444c101337aab43933d22ef12))
- stop passing internal/ to ESLint in release workflow ([7cac90a](https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/commit/7cac90afb4ce932bdf5225b72fa01d64670e131f))
- use npx and the correct package name to run the built CLI ([0114abf](https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/commit/0114abf3c3a6410ae6c0c491741e29cafd25f7a5))

### Features

- add docs.config.ts schema, loader, and resolver ([7db722b](https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/commit/7db722b3168e596f6b3de570069a0d4a05eb1157))
- add manual trigger to release workflow ([4436b1d](https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/commit/4436b1d1da9f89dc0eaae73651ab4ffad0f9fa87))
- added license ([5acbaf9](https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/commit/5acbaf9ccb0dd54cf1a6227c62455d98d7044dc9))
- automate releases with semantic-release ([5799afa](https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/commit/5799afa85f245e9fcbe380e07cb0860e76f45d77))
- bundle Starlight framework assets and example docs scaffold ([c3a02d8](https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/commit/c3a02d82f7bf9f593f429a23b38969e208af383f))
- fixed footer ([d8b52cb](https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/commit/d8b52cb9078ee1c26038004d2521354c6be451a5))
- generate and drive Astro projects from a node_modules-resolvable cache ([92fd69a](https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/commit/92fd69a42e6ba2cc6c0148e62a5894670e100e8c))
- implement dev/build/init CLI commands and wire up the entry point ([9511b13](https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/commit/9511b13b736801858920a0735bed3a73c15a065c))
- implemented website ([c7d7468](https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/commit/c7d74684a3dca8a4871ee56972e63dd12829e08d))
