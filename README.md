# Pass the drawing
![Test and deploy workflow](https://github.com/tzachbon/pass-the-drawing/workflows/Test%20and%20deploy/badge.svg)

## UI Design

The design is provided in [Figma](https://www.figma.com/file/1cSSHb5pTF014ktUnbPxqa/Pass-The-Draw), if you think something should be / look different or something is wrong in our design system, open an issue and let's discuses it there.

## Development

We would love your contribution, here's a quick recap of our setup , how to start the environment and some helper scripts

### Setup

* Application code is written with - [React](https://reactjs.org/), [Typescript](https://www.typescriptlang.org/), [Stylable](https://stylable.io/).

* In the backend we use [Firebase](https://firebase.google.com/).

* For testing we use - [Jest](https://jestjs.io/), [Puppeteer](https://github.com/puppeteer/puppeteer)

### Running environment

How to start the project: 

```shell
nvm use
```

```shell
yarn
```

```shell
yarn start
```

### Creating new component

Since our structure is very unique and consist you will need to create your component via the command: (`MyComponent` is the example component name)

```shell
yarn create:component MyComponent
```

You will get this structure by default under `src/component`

```
MyComponent
|─── index.tsx
|─── MyComponent.tsx
|─── MyComponent.driver.tsx
|─── MyComponent.test.tsx
└─── MyComponent.st.tsx
```

If you need to change the output directory just specify it before the component name: (For example if you need it under `pages` and not under `components`)

```shell
yarn create:component pages/MyComponent
```