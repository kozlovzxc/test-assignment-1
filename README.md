[![Checks](https://github.com/kozlovzxc/test-assignment-1/actions/workflows/checks.yml/badge.svg)](https://github.com/kozlovzxc/test-assignment-1/actions/workflows/checks.yml)

# Test assignment 1

Spent time ~ 7 hours

Design and requiremnets -> https://devchallenges.io/challenge/country-quizz

Deployed version -> https://main--mellow-baklava-4f6eed.netlify.app/

## Development

1. Install dependencies with `yarn`
2. Run `yarn dev`
3. Open `http://localhost:1234` in your browser

## Tech stack

- [Parcel](https://parceljs.org/) is used for bundling and development server, but we don't really using any of its specific features, so it can be easily replaced with any other bundler as Webpack or Vite.
- [React](https://reactjs.org/) is used for building the UI and interactivity.
- [Tailwind CSS](https://tailwindcss.com/) is used for styling.
- There is a [devcontainer](https://code.visualstudio.com/docs/devcontainers/containers) used in this project to isolate and unify development environment.
- [Netlify](https://www.netlify.com/) is used for deployment, but we don't really using any of its specific features, so it can be easily replaced with any other service as Vercel or GitHub Pages.

## Things which are not implemented

- There is no SSR since this quiz doesn't really benefit from it. There would be a slight improvement in rendering speed, but it would complicate the current setup.
- There are no unit tests due to time constraints. If I were to add them, I would use Jest.
- There are no e2e tests, also due to time constraints. If I were to add them, I would use Playwright or Cypress.
- There is no router and code splitting because this app is small, but they are totally required in bigger apps.
- It would also be great to add Dependabot.
- No mobile layout support, just didn't have time to implement it.
