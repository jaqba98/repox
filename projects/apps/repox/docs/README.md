# Repox

Repox is a full integrated TypeScript monorepo system. It provides
full support for multiple typescript projects.

<br>

## Contents

1) Commands
    - [Check version](#check-version)
    - [Create workspace](#create-workspace)
    - [Create project](#create-project)
    - [Build project](#build-project)
    - [Publish npm](#publish-npm)
    - [Lint project](#lint-project)

2) Configurations
    - [repox.json file](#repox-json-file)

3) Other
    - [List of programs](#list-of-programs)
    - [List of commands](#list-of-commands)

<br>

# Commands

<br>

## <span id="check-version">Check version</span>

To check the current version use the command below.

```shell
repox --version
```

You can use alias instead of argument.

```shell
repox -v
```

<br>

## <span id="create-workspace">Create workspace</span>

To create workspace use the command below.

```shell
repox generate workspace --name="example-workspace"
```

Arguments of generate workspace

| Argument | Alias | Description              | Required |
|----------|-------|--------------------------|----------|
| --name   | -n    | Specify a workspace name | True     |

<br>

## <span id="create-project">Create project</span>

To create project use the command below.

```shell
repox generate project --name="example-project" --type="app" --scheme="@app/ts"
```

Arguments of generate project

| Argument | Alias | Description              | Required |
|----------|-------|--------------------------|----------|
| --name   | -n    | Specify a project name   | True     |
| --type   | -t    | Specify a project type   | True     |
| --scheme | -s    | Specify a project scheme | True     |
| --path   | -p    | Specify a project path   | False    |

Project type (--type argument) values

| Type value | Description         |
|------------|---------------------|
| app        | Application project |
| lib        | Library project     |
| tool       | Tool project        |

Project scheme (--scheme argument) values

| Project scheme | Description            |
|----------------|------------------------|
| @blank         | Blank project          |
| @htmlpro       | HTMLPRO project        |
| @app/ts        | TypeScript application |
| @lib/ts        | TypeScript library     |
| @tool/ts       | TypeScript tool        |

<br>

## <span id="build-project">Build project</span>

To build project use the command below.

```shell
repox build project --name="example-project"
```

Arguments of build project

| Argument     | Alias | Description                                    | Required |
|--------------|-------|------------------------------------------------|----------|
| --name       | -n    | Specify a project name                         | True     |
| --watch      | -w    | Build the project as soon as something changes | False    |
| --production | -P    | Turn on production build mode                  | False    |

<br>

## <span id="publish-npm">Publish npm</span>

To publish npm use the command below.

```shell
repox publish npm --name="example-project"
```

Arguments of publish npm

| Argument | Alias | Description            | Required |
|----------|-------|------------------------|----------|
| --name   | -n    | Specify a project name | True     |

<br>

## <span id="lint-project">Lint project</span>

To lint project use the command below.

```shell
repox lint project
```

<br>

# Configurations

### <span id="repox-json-file">repox.json file</span>

```json5
{
  // All projects in the monorepo workspace
  "projects": {
    // Application TypeScript project
    "example-project-app": {
      // Project name
      "name": "example-project-app",
      // Project type
      "type": "app",
      // Project path
      "path": "projects/apps/example-project-app",
       // Project src path
       "src": "projects/apps/example-project-app/src",
      // Project scheme
      "scheme": "@app/ts",
      // Build settings for project
      "build": {
        // The compilation output path
        "output": "dist/example-project-app",
        // The main typescript file
        "main": "projects/apps/example-project-app/src/main.ts",
        // Additional resources that will be copied after compilation
        "assets": [
          {
            // The path to the copied item
            "input": "projects/apps/example-project-app/package.json",
            // The path where the file should be copied
            "output": "dist/example-project-app"
          }
        ]
      }
    },
    // Library TypeScript project
    "example-project-lib": {
      // Project name
      "name": "example-project-lib",
      // Project type
      "type": "lib",
      // Project path
      "path": "projects/libs/example-project-lib",
       // Project src path
      "src": "projects/libs/example-project-lib/src",
      // Project scheme
      "scheme": "@lib/ts"
    },
    // Tool TypeScript project
    "example-project-tool": {
      // Project name
      "name": "example-project-tool",
      // Project type
      "type": "tool",
      // Project path
      "path": "projects/tool/example-project-tool",
      // Project path
      "src": "projects/tool/example-project-tool/src",
      // Project scheme
      "scheme": "@tool/ts"
    }
  }
}
```

<br>

# <span id="list-of-programs">List of programs</span>

| Program  | Program alias |
|----------|---------------|
| generate | g             |
| build    | b             |
| publish  | p             |

<br>

# <span id="list-of-commands">List of commands</span>

| Command   | Command alias |
|-----------|---------------|
| workspace | w             |
| project   | p             |
| npm       | n             |
