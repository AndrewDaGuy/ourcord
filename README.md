# ✨ ourcord ✨
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![npm](https://img.shields.io/npm/v/ourcord?color=red&style=for-the-badge)](https://npmjs.com/package/ourcord)
[![npm](https://img.shields.io/bundlephobia/min/ourcord?color=red&style=for-the-badge)](https://npmjs.com/package/ourcord)
[![npm](https://img.shields.io/npm/dm/ourcord?color=red&style=for-the-badge)](https://npmjs.com/package/ourcord)
[![npm](https://img.shields.io/github/contributors/ourcord/ourcord?color=red&style=for-the-badge)](https://npmjs.com/package/ourcord)

## Table of Contents

- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
- [Links](#links)

## About  

Ourcord is a new and alternative discord library for js that focuses on speed and simplicity while retaining low level functions of the discord API  

## Installation  

```cmd
npm i ourcord
```

That's it for installation 🎈

## Usage  

```js
const { Client } = require("ourcord");
const client = new Client("your bot token here");
client.connect();

client.on("ready", () => {
    console.log("Client connected!");
});
```  

---  

## Client Config  <a href="src/websocket.ts#L33"></></a>

| Option | Type | Default | Description | Optional? |
| --- | --- | --- | --- | --- |
| browser | `string` | ourcord | Specify the browser you want to connect via (can be anything) | `yes`
| device | `string` | ourcord | The device you want to connect with (can be anything) | `yes`
| prefix | `string` | `Null` | Specify the prefix for the bot | `yes`
| activity | `object` | No activity | The activity you want to appear on your client on connect | `yes`
| status | `string` | dnd | The status you want your client to connect with | `yes`

## Links

[__Discord server__](https://discord.gg/3yDQKDXXdk)  
[__Examples__](https://github.com/ourcord/examples)  

---

## Collaborators

> [**Dice**](https://github.com/alebot-dev)  
> [**Mattthew**](https://github.com/matthewthechickenman)  
> [**Misly**](https://github.com/Misly16)  
> [**Starman**](https://github.com/Starman3787)
> [**Voltrex Master**](https://github.com/VoltrexMaster)
> [**null**](https://github.com/vierofernando)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://animalbot.xyz "><img src="https://avatars2.githubusercontent.com/u/65732060?v=4" width="100px;" alt=""/><br /><sub><b>matthewthechickenman</b></sub></a><br /><a href="#ideas-matthewthechickenman" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/VoltrexMaster"><img src="https://avatars1.githubusercontent.com/u/62040526?v=4" width="100px;" alt=""/><br /><sub><b>VoltrexMaster</b></sub></a><br /><a href="https://github.com/ourcord/ourcord/commits?author=VoltrexMaster" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
