# Some Person

## Installation

1. Install Dependencies
   1. Python deps, from root: `poetry install`
   2. JS deps, from `someperson/theme`: `npm i -D`

## Usage

Generally always use the scripts available in `package.json`. Use `poetry` and `npm` as expected.

### Development and Local Server

`npm run start` will start up Webpack in watch mode and a local server will be available at `127.0.0.1:8000`. Content changes (articles, pages) and both Python and JS source changes will be watched and the live server will be automatically updated when those items change, generally. Some source changes will not be accounted for until the script is stopped and restarted. Those would include things like Webpack config changes,  registering new Pelican plugin signals, among others.

### Lint & Syntax

#### All/Everything At Once

`npm run allcheck` and `npm run allformat` will check and auto-fix syntax/lint issues in all available file types, respectively.

#### CSS

All linting and formatting is done via `stylelint`. The `stylelint` config can be found in `.stylelintrc.json`.

`npm run csscheck` and `npm run cssformat` will check and auto-fix syntax/lint issues, respectively.

#### HTML

All linting and formatting is done via `djlint`. The `djlint` config can be found in `pyproject.toml`.

`npm run htmlcheck` and `npm run htmlformat` will check and auto-fix syntax/lint issues, respectively.

#### JS

All linting and formatting is done via `eslint`. The `eslint` config can be found in `.eslintrc.yml`.

`npm run jscheck` and `npm run jsformat` will check and auto-fix syntax/lint issues, respectively.

#### Markdown

All linting is done via `pymarkdown`. The `pymarkdown` config can be found in `.pymarkdown`.

`npm run mdcheck` to check lint issues.

**There is no auto-formatting available for Markdown files.**

#### Python

All linting and formatting is done via `ruff`. The `ruff` config can be found in `pyproject.toml`.

`npm run pycheck` and `npm run pyformat` will check and auto-fix syntax/lint issues, respectively.

### Publishing

Publishing is a three step process, all done locally.

1. Use `npm run build` to build the static site. This will be placed in `dist/` at the root of the project.
2. Use `npm run commitpage` to commit the static site to the `gh-pages` branch.
   1. Some Person is a static site hosted on GitHub Pages. `gh-page` is the branch I've configured to host.
   2. This command will take the current contents of `dist/` and commit them with an auto-generated commit message.
3. Use `npm run publish` to push the updated `gh-pages` branch to GitHub.
4. [Automated] GitHub will publish to <https://someperson.me>.
