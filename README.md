# <img src="https://cdn.simpleicons.org/nestjs" title="NestJS Practice Repo" alt="NestJS Practice Repo" width="30"> NestJS Practice
Repository created to record my practice learning NestJS with exercises based on the [Udemy Course](https://www.udemy.com/course/nestjs-the-complete-developers-guide/) of [Stephen Grider](https://www.udemy.com/user/sgslo/).

## Table of contents
- [Status](#status)
- [Requirements](#requirements)
- [Setup](#setup)
- [How to run it](#how-to-run-it)
- [Repo structure & what i learned in each exercise](#repo-structure--what-i-learned-in-each-exercise)
- [Other practice repos](#other-practice-repos)

## Status
- Current repo's version is ![NestJS practice version](https://img.shields.io/github/package-json/v/nicolasomar/nest-practice?color=success&label=%20&style=flat-square)
<!-- - **This course has been completed on 16/09/2025 - [Certificate](https://www.udemy.com/certificate/UC-375acfd7-464d-4024-8714-d3e76ea1b4df/)** -->

### What does that version number mean?
| Number | Meaning |
| ------ | ------ |
| `X.0.0` | Course hasn't been completed |
| `0.X.0` | How many assignments/examples I have completed |
| `0.0.X` | How many times I have updated the next assignment/example |

## Requirements
 - [Node](https://nodejs.org/en/download/) `v20` or above.

## Setup
After cloning the repo, go to the created folder and install the node packages.
```sh
git clone https://github.com/NicolasOmar/nest-practice.git
cd nest-practice
npm run setup-all
```
`setup-all` is the command to install all the projects, but if you want to do it one by one, you can change that last line for one of the following:
| App Setup | Command |
| ------ | ------ |
| All | `npm run setup-all` |
| From Scratch | `npm run setup-scratch` |
| Project with CLI | `npm run setup-with-cli` |
| Persistance and Authentication | `npm run setup-persistance-and-auth` |

## How to run it
To run any specific exercise, execute the following command in the project´s folder:
```sh
npm start
```

## Repo structure & what i learned in each exercise
- From Scratch (`1-scratch` folder)
  - Installing minimal libraries to create a NestJS server.
  - Basic understanding of concepts such as `Controller` and `Module`.
  - Understanding of naming conventions for files.
- Project with CLI (`2-project-with-cli` folder)
  - How to create a new NestJS project using its [CLI](https://docs.nestjs.com/).
  - Understanding of creation commands such as `generate module` and `generate controller`.
  - How to use other decorators such as `Body` and `Param`.
  - How to use a `DTO` (Data Transfer Object).
  - How to implement Inversion of control principle using `Injectable` decorator.
- Persistance and Authentication (`3-persistance-and-auth` folder)
  - How to integrate a SQL database using [TypeORM](https://www.npmjs.com/package/typeorm) and [SQLite](https://www.npmjs.com/package/sqlite3).
  - How to execute `CRUD` action on the entity layer with `TypeORM`.
  - Understand the usage of `remove` and `save` methods to help logging in the database layer.
  - How to implement an `interceptor` to handle data at several levels.
  - How to create and implement a custom `decorator`.
  - Use node functions like `randomBytes`, `scrypt` and, `promisify` for password hashing.
  - How to handle session data through a `session cookie` in different ways (including `ParamDecorators` and `Interceptors`).
  - How to handle access for any handler through a `Guard`.

## Other practice repos
| Node | React | Angular | GraphQL | HTML & CSS | Styling | Typescript | NextJS | Python
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://cdn.simpleicons.org/node.js" title="Node Practice Repo" alt="Node Practice Repo" width="48px">](https://github.com/NicolasOmar/node-practice) | [<img src="https://cdn.simpleicons.org/react" title="React Practice Repo" alt="React Practice Repo" width="48px">](https://github.com/NicolasOmar/react-practice) | [<img src="https://cdn.simpleicons.org/angular" title="Angular Practice Repo" alt="Angular Practice Repo" width="48px">](https://github.com/NicolasOmar/angular-practice) | [<img src="https://cdn.simpleicons.org/graphql" title="GraphQL Practice Repo" alt="GraphQL Practice Repo" width="48px">](https://github.com/NicolasOmar/graphql-practice) | [<img src="https://cdn.simpleicons.org/html5" title="HTML and CSS Practice Repo" alt="HTML and CSS Practice Repo" width="48px">](https://github.com/NicolasOmar/html-css-practice) | [<img src="https://cdn.simpleicons.org/sass" title="Styling Practice Repo" alt="Styling Practice Repo" width="48px">](https://github.com/NicolasOmar/styling-practice) | [<img src="https://cdn.simpleicons.org/typescript" title="Typescript Practice Repo" alt="Typescript Practice Repo" width="48px">](https://github.com/NicolasOmar/typescript-practice) | [<img src="https://cdn.simpleicons.org/nextdotjs" title="NextJS Practice Repo" alt="NextJS Practice Repo" width="48px">](https://github.com/NicolasOmar/next-practice) | [<img src="https://cdn.simpleicons.org/python" title="Python Practice Repo" alt="Python Practice Repo" width="48px">](https://github.com/NicolasOmar/python-practice) |