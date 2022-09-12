# Github Client

## <img src="https://cdn.svgporn.com/logos/figma.svg" height="32" align="top"> Макет

> [**Figma 🔸 Github Client**][figma]

[figma]: https://www.figma.com/file/xS1HZPihGT3NpSigyxSAm8/%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%8B?node-id=0%3A1

## <img src="https://lms.metaclass.kts.studio/static/public/favicon/favicon-32x32.png" height="32" align="top"> Задание

- <details><summary> ДЗ 3 (кликните для открытия спойлера) </summary><br>

  > - [x] **Сетап проекта**. Необходимо создать проект с помощью create-react-app, подключить линтер и алиасы. Подробнее можно прочесть здесь. При реализации необходимо соблюдать структуру проекта, про это мы рассказывали во втором модуле.
  > - [x] **Страницу списка сущностей вашего проекта** (Github client - репозитории, crypto - монеты и тд). Получение данных для отображения сущностей должно осуществляться с помощью запроса к API, который указан в таблице(кроме тех случаев, когда выбрана тема отличная от тем из таблицы).
  > - [x] **Страницу отображения одной сущности**. Получение данных об одном проекте должно также осуществляться с помощью запроса к API(запрещается использование данных из списка для отображения сущности на отдельной странице).
  > - [x] **Роутинг**. В вашем приложении должен быть реализована маршрутизация, при перезагрузке страницы должно отображаться то же состояние, что и до.
  > - [x] **Стили**, написанные на css-modules с использованием scss.
  >
  > Запросы к API должны осуществляться с помощью библиотеки axios.
  >
  > #### Чек-лист требований
  >
  > - [x] Реализован сетап проекта с подключенным линтером, алиасами.
  > - [x] В проекте соблюдена структура, о которой рассказывали во втором модуле.
  > - [x] Реализована страница списка сущностей с получением данных из API
  > - [x] Добавлена страница одной сущности с получением данных из API
  > - [x] Подключен роутинг
  > - [x] Стили переписаны на css-modules с использованием scss, переменные и миксины вынесены в отдельный файл
  > - [x] Дополнительно: реализована пагинация

   </details>

- <details><summary> ДЗ 4 (кликните для открытия спойлера) </summary><br>

  > - [x] **Логику на Mobx**. Необходимо переписать логику загрузки/хранения/использования данных на Mobx.
  > - [x] **Mobx-сторы**. Реализовать разделение логики на Mobx-сторы.
  > - [x] **Поиск**. Добавить нахождение списка сущностей по введенной строке (см. документацию в API).
  > - [x] **Пагинацию**. Реализовать пагинацию сущностей (или бесконечный скрол).
  > - [x] **Query-параметры**. Сохранять введенное значение в поиске и параметры пагинации в query-параметрах. В итоге при перезагрузке страницы списка должны отображаться те же данные, что были до.
  >
  > #### Чек-лист требований
  >
  > - [x] Вся логика работы с данными переписана с помощью Mobx.
  > - [x] Корректно разделены сторы и выбрана "локальность" каждого из них.
  > - [x] Реализован поиск.
  > - [x] Добавлена пагинация.
  > - [x] В query-параметрах сохраняется состояние пагинации и поиска.
  > - [x] Дополнительно - использование сортировок из Github API

   </details>

- <details><summary> ДЗ 5 (кликните для открытия спойлера) </summary><br>

  > - [x] Заменить текущую сборку, которую предоставляет create-react-app, на собственную.
  >
  > #### Чек-лист требований
  >
  > - [x] Все файлы собираются с помощью Webpack
  > - [x] Все `.ts` `.js` `.tsx` `.jsx` файлы транспилируются с помощью Babel
  > - [x] Настройки Webpack, Babel прописаны в конфигах
  > - [x] Настроена сборка стилей: поддерживается sass-синтаксис, css-modules; для dev-сборки используется style-loader, для prod - MiniCssExtractPlugin
  > - [x] Подключен Hot Module Replacement
  > - [x] Реализована работа с файлами (добавлены ассеты)
  > - [x] Подключен TypeScript
  > - [x] На проекте используются alias-ы и babel-плагины для нового синтаксиса

   </details>

## <img src="https://cdn.svgporn.com/logos/netlify.svg" height="32" align="top"> Деплой [![Netlify Status][deploy-status]][deploys]

> [**qpundb-github-client.netlify.app**][deploy]

[deploy]: https://qpundb-github-client.netlify.app
[deploys]: https://app.netlify.com/sites/qpundb-github-client/deploys
[deploy-status]: https://api.netlify.com/api/v1/badges/11bc2bb0-1566-4f67-9f4b-39ad1240e236/deploy-status

## <img src="https://cdn.svgporn.com/logos/git-icon.svg" height="32" align="top"> Подготовка к работе с проектом:

- ```shell
  git clone https://github.com/qpounodb/github-client.git
  ```

- ```shell
  cd ./github-client
  ```

- ```shell
  git checkout <some branch>
  ```

- ```shell
  yarn install
  ```

## <img src="https://cdn.svgporn.com/logos/yarn.svg" height="32" align="top"> Управление проектом:

[app]: .

- `yarn start` - запускает [App][app], [Storybook][storybook] и [Typed-SCSS-Modules][tsm] одновременно
- `yarn start:app` - запускает [App][app] в режиме разработки
- `yarn build:app` - производит сборку [App][app] для продакшена
- `yarn start:sb` - запускает [Storybook][storybook] в режиме разработки
- `yarn build:sb` - производит сборку [Storybook][storybook] для продакшена
- `yarn start:tsm` - запускает [Typed-SCSS-Modules][tsm] для автогенерации типов для файлов [CSS-Modules][cssm]
- `yarn test` - запускает [Jest](https://jestjs.io) тесты
- `yarn ts:check` - запускает проверки [Typescript][ts]
- `yarn lint` - запускает проверки [ESLint][eslint]
- `yarn lint:fix` - производит автоисправление с помощью [ESLint][eslint]
- `yarn format` - производит форматирование с помощью [Prettier][prettier]

## <img src="https://docs.github.com/assets/cb-803/images/site/favicon.svg" height="32" align="top"> API endpoints:

| `https://api.github.com`              | Documentation                                |
| ------------------------------------- | -------------------------------------------- |
| `/orgs/{org}/repos`                   | [List organization repositories][list]       |
| `/search/users`                       | [Search users][search-u]                     |
| `/search/repositories`                | [Search repositories][search-r]              |
| `/repos/{owner}/{repo}`               | [Get a repository][repo]                     |
| `/repos/{owner}/{repo}/branches`      | [List branches][branches]                    |
| `/repos/{owner}/{repo}/commits/{ref}` | [Get a commit][commit]                       |
| `/repos/{owner}/{repo}/contributors`  | [List repository contributors][contributors] |
| `/repos/{owner}/{repo}/languages`     | [List repository languages][languages]       |
| `/repos/{owner}/{repo}/readme`        | [Get a repository README][readme]            |

[list]: https://docs.github.com/en/rest/repos/repos#list-organization-repositories
[search-u]: https://docs.github.com/en/rest/search#search-users
[search-r]: https://docs.github.com/en/rest/search#search-repositories
[repo]: https://docs.github.com/en/rest/repos/repos#get-a-repository
[branches]: https://docs.github.com/en/rest/branches/branches#list-branches
[commit]: https://docs.github.com/en/rest/commits/commits#get-a-commit
[contributors]: https://docs.github.com/en/rest/repos/repos#list-repository-contributors
[languages]: https://docs.github.com/en/rest/repos/repos#list-repository-languages
[readme]: https://docs.github.com/en/rest/repos/contents#get-a-repository-readme

### :warning: Note

[Правила ограничения количества запросов][rate] <br>
По умолчанию гитхаб ограничивает число запросов к АПИ до **60** в час на один **IP адрес**. <br>
Для увеличения лимитов по запросам (**5000** в час на один **аккаунт**) - можно добавить [персональный гитхаб токен][token] в переменную окружения `GITHUB_API_ACCESS_TOKEN`. <br>
Для удобства можно создать в корне проекта файл `.env.local` с содержимым:

```
GITHUB_API_ACCESS_TOKEN=<токен созданный в гитхаб>
```

[rate]: https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting
[token]: https://github.com/settings/tokens

## 🧱 Стек технологий:

[react]: https://reactjs.org
[router]: https://reactrouter.com
[axios]: https://axios-http.com
[mobx]: https://mobx.js.org

- <img src="https://cdn.svgporn.com/logos/react.svg" height="32" align="top"> [React][react] - JavaScript library for building user interfaces

- <img src="https://cdn.svgporn.com/logos/react-router.svg" height="32" align="top"> [React-router][router] - fully-featured client and server-side routing library

- <img src="https://axios-http.com/assets/favicon.ico" height="32" align="top"> [Axios][axios] - promise based HTTP client for the browser and node.js

- <img src="https://cdn.svgporn.com/logos/mobx.svg" height="32" align="top"> [MobX][mobx] - simple, scalable state management.

## 🛠️ Инструменты для разработки:

[git]: https://git-scm.com/
[yarn]: https://yarnpkg.com
[node]: https://nodejs.org
[ts-node]: https://typestrong.org/ts-node
[babel]: https://babeljs.io
[ts]: https://www.typescriptlang.org
[sass]: https://sass-lang.com
[webpack]: https://webpack.js.org
[storybook]: https://storybook.js.org
[jest]: https://jestjs.io
[test-lib]: https://testing-library.com
[eslint]: https://eslint.org
[prettier]: https://prettier.io
[tsm]: https://github.com/skovy/typed-scss-modules
[cssm]: https://github.com/css-modules/css-modules

- <img src="https://cdn.svgporn.com/logos/git-icon.svg" height="32" align="top"> [Git][git] - distributed version control system

- <img src="https://cdn.svgporn.com/logos/yarn.svg" height="32" align="top"> [Yarn][yarn] - package manager

- <img src="https://nodejs.org/static/images/favicons/favicon-32x32.png" height="32" align="top"> [Node.js][node] - JavaScript runtime built on Chrome's V8 JavaScript engine

- <img src="https://typestrong.org/ts-node/img/favicon/favicon-32x32.png" height="32" align="top"> [TS-node][ts-node] - TypeScript execution and REPL for node.js

- <img src="https://babeljs.io/img/favicon.png" height="32" align="top"> [Babel][babel] - JavaScript compiler.

- <img src="https://www.typescriptlang.org/favicon-32x32.png" height="32" align="top"> [TypeScript][ts] - strongly typed programming language

- <img src="https://cdn.svgporn.com/logos/sass.svg" height="32" align="top"> [SASS/SCSS][sass] - stylesheet language that’s compiled to CSS

- <img src="https://cdn.svgporn.com/logos/webpack.svg" height="32" align="top"> [Webpack][webpack] - static module bundler for modern JavaScript applications.

- <img src="https://cdn.svgporn.com/logos/storybook-icon.svg" height="32" align="top"> [Storybook][storybook] - tool for UI development

- <img src="https://cdn.svgporn.com/logos/jest.svg" height="32" align="top"> [Jest][jest] - delightful JavaScript Testing Framework with a focus on simplicity

- <img src="https://testing-library.com/img/octopus-32x32.png" height="32" align="top"> [React Testing Library][test-lib] - builds on top of `DOM Testing Library` by adding APIs for working with React components.

- <img src="https://eslint.org/icon.svg" height="32" align="top"> [ESLint][eslint] - statically analyzes your code to quickly find problems.

- <img src="https://prettier.io/icon.png" height="32" align="top"> [Prettier][prettier] - opinionated code formatter.
