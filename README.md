# dthiemermann.org

Personal homepage for [dthiemermann.org](https://www.dthiemermann.org) written in [React](https://github.com/facebook/react).

## About the project

The main purpose of this project is to try out some cool Javascript stuff which also makes an interesting landing page for my domain.

There are a lot of packages used to build this project, [React](https://reactjs.org/), [Redux](https://redux.js.org/), [Semantic UI React](https://react.semantic-ui.com/introduction) and [React-Leaflet](https://react-leaflet.js.org/) just to name a few.

Also real world applications are a great way to learn about something new or lookup on how the packages are used. Anything you find here [is free to use](#license).

## Setup

For this project to work properly, you are also going to need the [www.dthiemermann.org-backend](https://github.com/dominik-th/www.dthiemermann.org-backend).
Please set up the backend first.

```shell
$ git clone git@github.com:dominik-th/www.dthiemermann.org.git
$ cd www.dthiemermann.org
```

Fill the `config.js` according to your needs.
```shell
$ cd src/env
$ cp config.sample.js config.js
$ nano config.js
```

Install required dependencies:
```shell
$ npm i
```

Build the application:
```shell
$ npm run build
```

Setup nginx:
```nginx
server {
    listen 443 ssl http2;
    server_name YOUR_DOMAIN.TLD;

    ssl_certificate /etc/letsencrypt/live/YOUR_DOMAIN.TLD/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/YOUR_DOMAIN.TLD/privkey.pem;

    root /PATH/TO/CLONED/REPO/build-latest;

    location / {
        try_files $uri /index.html;
        add_header Cache-Control public;
        expires 1d;
    }
}
```

## Upgrade

To upgrade run:
```shell
$ git pull
$ npm i
$ npm run build
```
Before building you should check if there were made any changes to the `config.sample.js` and fill the added keys.
You might also want to delete any previous builds afterwards.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

If you find anything interesting, feel free to copy it.
