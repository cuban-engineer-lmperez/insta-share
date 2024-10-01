# InstaShare

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.5.

The **frontend** (either a web or a mobile app) should be implemented with the latest stable version of the frontend technology specified by your job application. The frontend should be based on modern UI/UX principles and methodologies.

>The **backend** should be implemented as an independent JSON-based Web service powered by a database or a distributed file system (DFS).

Users of the website should be able to create an account and login with a previously created account.

Once logged in, the user should be able to upload a file that will be processed asynchronously by the backend. Once the file has been uploaded, the user can proceed with uploading more files, review the name, status and size of previously uploaded files, or change the name of a previously uploaded file.
Uploaded files are stored in a database or a distributed file system and a service job should pick up the file from the database / DFS, compress it with ZIP and reinsert it into the database / DFS. 

>Once the file has been zipped, the user of the community site can download the file. 

### Final remarks

- You can add whatever technology or best practice you know . This means you should, on top of the best solution, use: Docker, linters, microservices, etc.
- Minimum code coverage must be 85%.
- There must be Unit, Integration and E2E tests.
- The system should be designed with caching and scalability in mind.
- Use git commits and good practices which you can think of. 
- You have 10 days to complete the exercise, but feel free to submit earlier if you finish it before.
- Write the program using TDD or BDD techniques.
- Upload the code to a public GitHub repository and share the link with us.
- **VIP BONUS TIP**: Get [more] the attention of our experts and deliver a deployed  version of the solution. Eg: You can use Vercel for frontend, Heroku for backend, or other solutions you prefer.

## Development server

Run `npm start:dev` or `npm start:docker`for a dev server. Navigate to `http://localhost:4200/` or `http://localhost:${APP_PORT:-4300}/` inside Docker. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `public/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Jest](https://jestjs.io/).
