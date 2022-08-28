# Github Client

## <img src="https://static.figma.com/app/icon/1/favicon.png" width="16" height="16"> Макет проекта:

> [**Figma 🔸 Github Client**][figma]

[figma]: https://www.figma.com/file/xS1HZPihGT3NpSigyxSAm8/%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%8B?node-id=0%3A1

## <img src="https://docs.github.com/assets/cb-803/images/site/favicon.svg" width="16" height="16"> API endpoints:

| `https://api.github.com`              | Documentation                                |
| ------------------------------------- | -------------------------------------------- |
| `/orgs/{org}/repos`                   | [List organization repositories][list]       |
| `/search/repositories`                | [Search repositories][search]                |
| `/repos/{owner}/{repo}`               | [Get a repository][repo]                     |
| `/repos/{owner}/{repo}/branches`      | [List branches][branches]                    |
| `/repos/{owner}/{repo}/commits/{ref}` | [Get a commit][commit]                       |
| `/repos/{owner}/{repo}/contributors`  | [List repository contributors][contributors] |
| `/repos/{owner}/{repo}/languages`     | [List repository languages][languages]       |
| `/repos/{owner}/{repo}/readme`        | [Get a repository README][readme]            |

> :warning: Note: [Правила ограничения количества запросов][rate] <br>

[rate]: https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting
[list]: https://docs.github.com/en/rest/repos/repos#list-organization-repositories
[search]: https://docs.github.com/en/rest/search#search-repositories
[repo]: https://docs.github.com/en/rest/repos/repos#get-a-repository
[branches]: https://docs.github.com/en/rest/branches/branches#list-branches
[commit]: https://docs.github.com/en/rest/commits/commits#get-a-commit
[contributors]: https://docs.github.com/en/rest/repos/repos#list-repository-contributors
[languages]: https://docs.github.com/en/rest/repos/repos#list-repository-languages
[readme]: https://docs.github.com/en/rest/repos/contents#get-a-repository-readme

## Стек технологий:

- [x] <img src="https://reactjs.org/favicon.ico" width="16" height="16"> [React](https://reactjs.org/docs/getting-started.html) - JS library for building user interfaces
- [x] <img src="https://reactrouter.com/favicon-light.png" width="16" height="16"> [React-router](https://reactrouter.com/docs/en/v6) - fully-featured client and server-side routing library
- [x] <img src="https://axios-http.com/assets/favicon.ico" width="16" height="16"> [Axios](https://axios-http.com/docs/intro) - promise based HTTP client for the browser and node.js
- [x] <img src="https://axios-cache-interceptor.js.org/static/favicon-32x32.png" width="16" height="16"> [Axios Cache Interceptor](https://axios-cache-interceptor.js.org) - adds caching capabilities to axios
- [x] <img src="https://avatars.githubusercontent.com/u/872310?s=32&v=4" width="16" height="16"> [ClassNames](https://github.com/JedWatson/classnames) - simple conditionally joining classNames together
- [x] <img src="https://showdownjs.com/favicon-32x32.png" width="16" height="16"> [Showdown](https://showdownjs.com/) - markdown to HTML bidirectional converter
- [ ] <img src="https://mobx.js.org/img/favicon.png" width="16" height="16"> [MobX](https://mobx.js.org/README.html) - simple, scalable state management.

## Инструменты для разработки:

- [x] <img src="https://www.typescriptlang.org/favicon-32x32.png" width="16" height="16"> [Typescript](https://www.typescriptlang.org/docs/) - strongly typed programming language
- [x] <img src="https://nodejs.org/static/images/favicons/favicon-32x32.png" width="16" height="16"> [Nodejs](https://nodejs.org/en/) - JS runtime built on Chrome's V8 JS engine
- [x] <img src="https://yarnpkg.com/favicon-32x32.png" width="16" height="16"> [Yarn](https://yarnpkg.com/getting-started) - package manager
- [x] <img src="https://create-react-app.dev/img/favicon/favicon.ico" width="16" height="16"> [Create React App](https://create-react-app.dev/docs/getting-started) - modern build setup with no configuration
- [x] <img src="https://storybook.js.org/images/logos/icon-storybook.png" width="16" height="16"> [Storybook](https://storybook.js.org/docs/react/get-started/introduction) - tool for UI development
- [x] <img src="https://sass-lang.com/favicon.ico" width="16" height="16"> [SCSS](https://sass-lang.com/documentation/) - stylesheet language that’s compiled to CSS
- [x] <img src="https://raw.githubusercontent.com/css-modules/logos/master/css-modules-logo.png" width="16" height="16"> [CSS Modules](https://github.com/css-modules/css-modules) - CSS files in which all class names and animation names are scoped locally by default
- [x] <img src="https://avatars.githubusercontent.com/u/5247455?s=32&v=4" width="16" height="16"> [Typed-SCSS-Modules](https://github.com/skovy/typed-scss-modules) - Generate type definitions (.d.ts) for CSS Modules using SCSS
- [x] <img src="https://avatars.githubusercontent.com/u/5363448?s=32&v=4" width="16" height="16"> [Concurrently](https://github.com/open-cli-tools/concurrently) - Run commands concurrently. Like `npm run watch-js & npm run watch-less` but better.
