# Chromatic GitHub Action Monorepo Examples

This repository exists to highlight the configuration options for using the [Chromatic GitHub Action](https://github.com/chromaui/action) in a monorepo.

Essentially, this comes down to two key steps.

1. Use the `workingDir` input on the chromatic step
2. Use `working-directory` on other steps so they run in the correct place as well

# working-directory Options

There are three options for setting `working-directory` on your jobs.  Be aware that this refers only to `run` steps, other steps will have their own specific inputs, much like Chromatic has `workingDir`.  Please refer to their documentation directly for details.

## Directly On Step

The first option is to place it directly into the `run` steps, like this.

```yaml
    steps:
      - uses: actions/checkout@v1
      - name: Install dependencies
        run: yarn
        working-directory: marketing
```

The file `.github/workflows/marketing.yaml` is an example of this method.

## Job Level Default

If you have multiple `run` steps in your job, a job level default would reduce repetition.


```yaml
jobs:
  chromatic-frontend:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: frontend
    steps:
      - uses: actions/checkout@v1
      - name: Install dependencies
        run: yarn
      - name: Prebuild storybook
        run: yarn build-storybook
```

The file `.github/workflows/frontend.yaml` is an example of this method.

## Workflow Level Default

Lastly, you can set it as a workflow level default.  This would be useful if you have several jobs in the workflow that all need to run in the subdirectory.

```yaml
name: 'Admin'

on: push

defaults:
  run:
    working-directory: admin

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - name: Install dependencies
        run: yarn
      - name: Run tests
        run: yarn test
  chromatic:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - name: Install dependencies
        run: yarn
      - name: Publish to Chromatic
        uses: chromaui/action@v1
        with:
          workingDir: admin
          token: ${{ secrets.GITHUB_TOKEN }}
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN_ADMIN }}
```

# Why doesn't the Chromatic action use working-directory?

The `working-directory` keyword is specific to the `run` step, and is not exposed to the Chromatic action.
