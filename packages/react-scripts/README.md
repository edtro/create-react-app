# react-scripts

PLEASE BE AWARE THIS IS STILL AN UNSTABLE PACKAGE

This package includes scripts and configuration used by [Create React App](https://github.com/facebook/create-react-app).<br>
Please refer to its documentation:

- [Getting Started](https://facebook.github.io/create-react-app/docs/getting-started) – How to create a new app.
- [User Guide](https://facebook.github.io/create-react-app/) – How to develop apps bootstrapped with Create React App.

This package is a template based on the standard 'Create React App' to create extensions based on the [vss-web-extension-sdk](https://github.com/Microsoft/vss-web-extension-sdk) for Azure DevOps Services (and the Marketplace).

## Getting started

Make sure to review the following resources first:

- [create-react-app GitHub](https://github.com/facebook/create-react-app)
- [vss-web-extension-sdk GitHub](https://github.com/Microsoft/vss-web-extension-sdk)

These steps should be done:

1. Select solution, right click and open the commandline... and create the app.

```js
npx create-react-app my-app --typescript --scripts-version edtro-vss-react-scripts
```

2. Create the following folders

- ./build
- ./build/lib
- ./public/lib

(when you are using source control and an automated build, make sure these are also committed)

3. When using Visual Studio and you want to create a project for the app, just create a new project of type "From Existing Node.js Code", select the 'my-app' folder and select TypeScript

4. Make sure to test the npm scripts:

```cmd
npm start
npm run build
npm run test
```
