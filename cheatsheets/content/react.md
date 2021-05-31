# React Cheat Sheet

- React is a JavaScript library for building user interfaces.
- React is used to build single page applications.
- React allows us to create reusable UI components.

___

## Initialization

- install react js boilerplate:
  - replace `_your_app_name_` with the name of your app.

```shell
npx create-react-app _your_app_name_
```

___

- Creating your react app can be done in an existing cloned repo.

- If you didn't have an initialized repo you can do the following:

```shell
cd _your_app_name_
git checkout -b main
git init
git branch -M main
git remote add origin
git push -u origin main
```

___

## React Used Packages in this course

- [React Bootstrap](https://react-bootstrap.netlify.app/getting-started/introduction) "A React package that add the bootstrap css Library as component"

```shell
npm install react-bootstrap bootstrap
```

- [Axios](https://www.npmjs.com/package/axios) "Used to send url requests to our backend or and APIs"

```shell
npm install axios
```

___

## React Terminologies

### Components

- Components are independent and reusable bits of code. They serve the same purpose as JavaScript functions, but work in isolation and return HTML via a render() function.

- Components come in two types, Class components and Function components, in this tutorial we will concentrate on Class components.

### Props

- Props are arguments passed into React components.
- Props are passed to components via HTML attributes.

### States

- React components has a built-in state object.

- The state object is where you store property values that belongs to the component.

- When the state object changes, the component re-renders.

___
