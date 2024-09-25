# InstaShare

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.5.

The frontend (either a web or a mobile app) should be implemented with the latest stable version of the frontend technology specified by your job application. The frontend should be based on modern UI/UX principles and methodologies.

Users of the website should be able to create an account and login with a previously created account.

Once logged in, the user should be able to upload a file that will be processed asynchronously by the backend. Once the file has been uploaded, the user can proceed with uploading more files, review the name, status and size of previously uploaded files, or change the name of a previously uploaded file.
Uploaded files are stored in a database or a distributed file system and a service job should pick up the file from the database / DFS, compress it with ZIP and reinsert it into the database / DFS. 

Once the file has been zipped, the user of the community site can download the file. 

## Development server

Run `npm:start` for a dev server. Navigate to `http://localhost:4200/` or `http://localhost:${APP_PORT:-4300}/` inside Docker. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
