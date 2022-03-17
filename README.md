# 🏎 F1Champions 

Simple single-page app fueled by Ergast Formula 1 API

## 🚀 Getting it started locally 

Run `ng serve` or `npm start` for a dev server and navigate to `http://localhost:4200/`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## 🏛 Architecture insight

Every page is stored as a separate lazy-loaded module. Each has it's own components.

There's only one component that is used in both pages (`driver.component`). It was placed on top with it's own module, to keep reusability.

### ⚙️ Data flow

Components don't directly manipulate data. Instead, they're just calling methods in `data.store`, and just consume data stored in it through public observables.

_ah yes, almost NgRX (more like Akita)_

Every page component is sort of container component, that triggers data fetch and takes the data from store dependency. After that, it just passes all the needed data to nested 'dumb' components.
