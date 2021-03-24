# todoroll

A todo extension made to focus on daily goals and improve your productivity.

## Demo

https://todoroll.netlify.app/

## Tech Stack

- Frontend: React
- Tools: Node.js, web-ext, firefox browser
- API: Unsplash for background image.

## Features
- Display Clock
- Greeting user according to the day time.
- It's a CRUD app allow user to creat,update and delete tasks.
- User restriced to maximum 5 task creation.  
- Auto background image update in every 10 minutes.

## Requirement

- Node v12.x.x

  > Recommend to use [NVM](https://github.com/nvm-sh/nvm)

- Firefox Browser: To test the build extension using build script or you can manually install extension in chrome browser too by importing `dist` folder.

- web-ext: A firefox npm package require to build and run firefox extension. You should install it globally.

  > npm i -g web-ext

  For more information check this [link](https://github.com/mozilla/web-ext/).

## Quick Start

```bash
# Install packages
npm install

# Run server at port 8080
npm start

# Create build
npm run build:firefox

# Test/Install browser extension in firefox
npm run launch
```
