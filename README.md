[![StepSecurity Maintained Action](https://raw.githubusercontent.com/step-security/maintained-actions-assets/main/assets/maintained-action-banner.png)](https://docs.stepsecurity.io/actions/stepsecurity-maintained-actions)

# Commit Message Linter

A GitHub Action that enforces the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification on every commit in a pull request or push event. If any commit message does not match the expected format, the workflow step fails with a clear report.

## Why use this?

Pre-commit hooks can be bypassed locally. Running this check in CI ensures that every commit reaching your repository—regardless of how it was created—follows your agreed-upon commit conventions.

## Inputs

| Input | Required | Default | Description |
|---|---|---|---|
| `GITHUB_TOKEN` | No | — | GitHub token for authenticating API requests. Needed for private repositories or when the default token has restricted permissions. |
| `allowed-commit-types` | No | `feat,fix,docs,style,refactor,test,build,perf,ci,chore,revert,merge,wip` | Comma-separated list of accepted commit type prefixes. Customize to restrict or extend what your project allows. |

## Outputs

This action produces no outputs. It fails the step if any commit message is invalid and passes silently when all messages are compliant.

## Supported commit formats

The following patterns are accepted:

```
<type>: <description>
<type>(<scope>): <description>
<type>!: <description>
<type>(<scope>)!: <description>
<emoji> <type>: <description>
<emoji> <type>(<scope>): <description>
```

Auto-generated git messages (`Merge ...`, `Revert ...`, `Reapply ...`, `Initial plan`) are always allowed.

## Usage

### Validate commits on pull requests

```yaml
name: Commit Message Linter

on:
  pull_request:
    branches:
      - main

jobs:
  lint-commits:
    name: Validate Commit Messages
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7

      - uses: step-security/action-conventional-commits@v1
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Restrict to a smaller set of commit types

```yaml
- uses: step-security/action-conventional-commits@v1
  with:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    allowed-commit-types: "feat,fix,chore,ci"
```

### Validate commits on push as well

```yaml
on:
  pull_request:
    branches:
      - main
  push:
    branches:
      - main

jobs:
  lint-commits:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7

      - uses: step-security/action-conventional-commits@v1
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
