# Repox

## Contents

1) Repox monorepo commands

   [Check version](#check-version)
   
   [Create workspace](#create-workspace)
   
   [Create project](#create-project)
   
   [Build project](#build-project)

   [Link project](#link-project)

   [Unlink project](#unlink-project)

2) Configurations

   [Repox configuration](#repox-configuration)

3) Repox style framework

   [Repox style framework](#repox-style-framework)

<br>

## <span id="check-version">Check version</span>


```shell
repox --version
```

#### You can use alias instead of argument.

```shell
repox -v
```

<br>

## <span id="create-workspace">Create workspace</span>


```shell
repox generate workspace --name="example-workspace"
```

#### A list of all the arguments for the generation workspace program.

| Argument | Alias | Description              |
|----------|-------|--------------------------|
| --name   | -n    | Specify a workspace name |

<br>

## <span id="create-project">Create project</span>


```shell
repox generate project --name="example-project" --type="app"
```

#### A list of all the arguments for the generation project program.

| Argument | Alias | Description            |
|----------|-------|------------------------|
| --name   | -n    | Specify a project name |
| --type   | -t    | Specify a project type |
| --path   | -p    | Specify a project path |

#### Possible project type values:

| Type value | Description         |
|------------|---------------------|
| app        | Application project |
| lib        | Library project     |
| tool       | Tool project        |

<br>

## <span id="build-project">Build project</span>


```shell
repox build project --name="example-project"
```

#### A list of all the arguments for the build project program.

| Argument | Alias | Description            |
|----------|-------|------------------------|
| --name   | -n    | Specify a project name |

<br>

## <span id="link-project">Link project</span>


```shell
repox link project --name="example-project"
```

#### A list of all the arguments for the link project program.

| Argument | Alias | Description            |
|----------|-------|------------------------|
| --name   | -n    | Specify a project name |

<br>

## <span id="unlink-project">Unlink project</span>


```shell
repox unlink project --name="example-project"
```

#### A list of all the arguments for the unlink project program.

| Argument | Alias | Description            |
|----------|-------|------------------------|
| --name   | -n    | Specify a project name |

<br>

## <span id="repox-configuration">Repox configuration</span>

```json5
{
   // List of all projects in monorepo
   "projects": {
      // An example project in monorepo
      "example-project": {
         // The name of the project
         "name": "example-project",
         // The type of the project
         "type": "app",
         // The path localization of the project
         "path": "projects/apps/example-project",
         // Additional assets to the project
         "assets": [
            {
               // The path to the location where asset exist
               "inputDir": "projects/apps/example-project",
               // File name of asset
               "fileName": "package.json",
               // The path to the target location
               "outputDir": "dist/example-project"
            }
         ]
      }
   }
}
```
