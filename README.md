# Repox Monorepo System - by Jakub Olejarczyk

## Getting Started

---

### Checking the version

```
repox --version
```

### Generating the Repox workspace

```
repox generate workspace --name="workspace-example"
```

### Generating the project

```
repox generate project --name="project-example" --type="app"
```

 All possible project types
- ```app``` - application
- ```lib``` - library
- ```tool``` - tool

### Building the project

```
repox build project --name="project-example"
```

### Publishing the project

```
repox publish project --name="project-example"
```