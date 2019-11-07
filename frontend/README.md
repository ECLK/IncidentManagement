## Incident management frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
for more information: [running tests](https://facebook.github.io/create-react-app/docs/running-tests) .

### `npm run build`

Builds the app for production to the `build` folder.<br>
for more information: [deployment](https://facebook.github.io/create-react-app/docs/deployment) 


## Style Guide

### Basic Rules

Follow Airbnb React/JSX Style Guide.
Always use functional components.

### Hooks

Follow the guidlines from the official docs.
https://reactjs.org/docs/hooks-rules.html

### Ordering

Ordering of methods and variables inside a component should be as follows. 
This is bit different from Airbnb guide since we use hooks in our project.

1. Access redux state  - via useSelector React-redux hook.
2. Local state variables - via useState React hook.
3. useEffect React hook - if Required (Think of useEffect Hook as componentDidMount, componentDidUpdate, and componentWillUnmount combined).
4. ClickHandlers or eventHandlers.
5. Getter methods for render.
6. Optional render methods.
7. render.


