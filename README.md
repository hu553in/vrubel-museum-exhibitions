# Omsk regional M. A. Vrubel museum of fine arts exhibitions

[![Vercel Deploy](https://deploy-badge.vercel.app/vercel/vrubel-museum-exhibitions)](https://vrubel-museum-exhibitions.vercel.app/)

A website showcasing exhibitions of [the Omsk regional M. A. Vrubel museum of fine arts](https://vrubel.ru/).

This project was developed as part of a group diploma work at [Omsk State Technical University](https://omgtu.ru/english/).<br>
At the moment, the website is available in **Russian only**.

The deployed version is available on Vercel: [vrubel-museum-exhibitions.vercel.app](https://vrubel-museum-exhibitions.vercel.app/).

---

## ⚠️ Build note

When building this project with **Node.js 17 or newer**, you may encounter the following error:

```
error:0308010C:digital envelope routines::unsupported
ERR_OSSL_EVP_UNSUPPORTED
```

This happens because the project relies on older versions of `react-scripts` / `webpack` that are not fully compatible
with **OpenSSL 3**, which is used in modern Node.js releases.

### How to fix

Before running the build, set the following environment variable:

```
NODE_OPTIONS=--openssl-legacy-provider
```

This enables legacy OpenSSL algorithms required by webpack and allows the build to succeed on newer Node.js versions.

---

## Co-authors

- Website design – Kristina Kalnitskaya ([Kristormy@gmail.com](mailto:Kristormy@gmail.com))
- Videos – Anastasia Khasanshina ([sergienkoanastasiia@gmail.com](mailto:sergienkoanastasiia@gmail.com))

---

## Tech stack

- React (TypeScript)

---

## Future roadmap

- [ ] Add a button to skip the intro video on devices where the **Space** key is not always available
- [ ] Add a note explaining that the intro video can be skipped by pressing the **Space** key
- [ ] Add a **Show password** button
- [ ] Remove global outline disabling: [src/style.scss#L4](./src/style.scss#L4)
- [ ] Add an optional error state to the `TextField` component
- [ ] Make the custom `Checkbox` component accessible
