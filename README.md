# Vrubel museum exhibitions

![Vercel Deploy](https://deploy-badge.vercel.app/vercel/vrubel-museum-exhibitions)

## Description

This project is a website of [Omsk regional M. A. Vrubel museum of fine arts](https://vrubel.ru/) exhibitions.\
In fact, this project is just a part of group diploma work at [OmSTU](https://omgtu.ru/english/).\
Currently, it is available in Russian language only.\
You can see the deployed website version [here](https://vrubel-museum-exhibitions.vercel.app/).

## ⚠️ Build note

When building this project on **Node.js 12+**, you may encounter the following error:

```
error:0308010C:digital envelope routines::unsupported
ERR_OSSL_EVP_UNSUPPORTED
```

This happens because the project is very old and relies on older versions of `react-scripts` / `webpack`
that are not fully compatible with **OpenSSL 3**, which is used in modern Node.js versions.

### How to fix

Before running the build, set the following environment variable:

```
NODE_OPTIONS=--openssl-legacy-provider
```

This enables legacy OpenSSL algorithms required by webpack and allows the build to succeed on newer Node.js versions.

## Co-authors

* Website design – [Kristina Kalnitskaya](mailto:Kristormy@gmail.com)
* Videos – [Anastasia Khasanshina](mailto:sergienkoanastasiia@gmail.com)

## Tech stack

* React (TypeScript)

## Future roadmap

- [ ] add a button for skipping the intro video for devices which haven't always available **Space** key
- [ ] add a note about the possibility to skip the intro video by pressing **Space** key
- [ ] add **Show password** button
- [ ] remove [the global outline disabling](https://github.com/hu553in/vrubel-museum-exhibitions/blob/main/src/style.scss#L4)
- [ ] add an optional error state to `TextField` component
- [ ] make custom `Checkbox` component accessible
