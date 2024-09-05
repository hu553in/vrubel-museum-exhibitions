# Vrubel museum exhibitions

[![Netlify Status](https://api.netlify.com/api/v1/badges/9edad654-0f84-4273-949c-820db7393a73/deploy-status)](https://app.netlify.com/sites/vrubel-museum-exhibitions/deploys)

## Description

This project is a website of [Omsk regional M. A. Vrubel museum of fine arts](https://vrubel.ru/) exhibitions.\
In fact, this project is just a part of group diploma work at [OmSTU](https://omgtu.ru/english/).\
Currently, it is available in Russian language only.\
You can see the deployed website version [here](https://vrubel-museum-exhibitions.netlify.app/).

## Co-authors

* Website design – [Kristina Kalnitskaya](mailto:Kristormy@gmail.com)
* Videos – [Anastasia Khasanshina](mailto:sergienkoanastasiia@gmail.com)

## Tech stack

* React (TypeScript)

## Roadmap

- [ ] add the button for skipping the intro video for devices which haven't always available **Space** key
- [ ] add the note about the possibility to skip the intro video by pressing **Space** key
- [ ] add **Show password** button
- [ ] remove [the global outline
      disabling](https://github.com/hu553in/vrubel-museum-exhibitions/blob/main/src/style.scss#L4) from the project
- [ ] add an optional error state to `TextField` component
- [ ] make `Checkbox` component accessible
      ([1](https://www.w3schools.com/howto/howto_css_custom_checkbox.asp),
      [2](https://moderncss.dev/pure-css-custom-checkbox-style))

## How to run

1. Install Node.js (≥ 12.16.1)
2. Install `yarn` npm package globally
3. Run `yarn` to install dependencies
4. Run `yarn start` to run the app in development mode

## How to make a production build

1. Do steps 1-3 from the previous section
2. Run `yarn build` to create the production build
3. See `./build` directory contents
