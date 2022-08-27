# Github Client

## Макет проекта:

[**Figma 🔸 Github Client**](https://www.figma.com/file/xS1HZPihGT3NpSigyxSAm8/%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%8B?node-id=0%3A1)

## API endpoints:

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

[list]: https://docs.github.com/en/rest/repos/repos#list-organization-repositories
[search]: https://docs.github.com/en/rest/search#search-repositories
[repo]: https://docs.github.com/en/rest/repos/repos#get-a-repository
[branches]: https://docs.github.com/en/rest/branches/branches#list-branches
[commit]: https://docs.github.com/en/rest/commits/commits#get-a-commit
[contributors]: https://docs.github.com/en/rest/repos/repos#list-repository-contributors
[languages]: https://docs.github.com/en/rest/repos/repos#list-repository-languages
[readme]: https://docs.github.com/en/rest/repos/contents#get-a-repository-readme

## Стек технологий:

- [React](https://reactjs.org/docs/getting-started.html)
- [React-router](https://reactrouter.com/docs/en/v6)
- [Axios](https://axios-http.com/docs/intro)
- [MobX](https://mobx.js.org/README.html)
- [ClassNames](https://github.com/JedWatson/classnames)

## Инструменты для разработки:

- [Typescript](https://www.typescriptlang.org/docs/)
- [Nodejs](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/getting-started)
- [Create React App](https://create-react-app.dev/docs/getting-started)
- [Storybook](https://storybook.js.org/docs/react/get-started/introduction)
- [SCSS](https://sass-lang.com/documentation/)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [Typed-SCSS-Modules](https://github.com/skovy/typed-scss-modules)
- [Concurrently](https://github.com/open-cli-tools/concurrently)
