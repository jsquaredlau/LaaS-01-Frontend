# LaaS Frontend

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.28.3.

## Development Server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Deployment Servers
To run a local server that communicates with a locally deployed LaaS Backend server, run one of the following:
* npm run serve-dev
* npm run serve-dev-2
* npm run serve-dev-3

To run a server that communicates with a production LaaS Backend server, run one of the following commands:
* npm run serve-prod
* npm run serve-prod-2
* npm run serve-prod-3

To change the endpoint for api calls that this LaaS Frontend server makes, refer to the files in /src/environments/ The environment files correspond in this way:
* environment.dev.ts -> npm run serve-dev
* environment.prod2.ts -> npm run serve-prod-2


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
