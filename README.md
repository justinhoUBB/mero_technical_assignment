# Mero Technical assignment
Use `git clone https://github.com/justinhoUBB/mero_technical_assignment.git` to clone the repository to your local machine.

## How to build & run the BE app:

- After you've cloned the respository, run the following commands inside a terminal:
```
cd mero_technical_assignment/backend
npm i
npm run build
npm run start
```

- To run the unit tests use:
`npm run test`

## How to build & run the FE app:

- Create a .env file inside the `frontend` folder using the .env.template file.
- Replace the `<replace-me>` value with either your machine's ip if using Android or just `localhost` if using IOS.
- While inside a terminal, run
```
cd mero_technical_assignment/frontend
npm i
npm run start
```

## Notes

 - BE work is complete
 - The backend folder includes a postman folder which contains a postman collection for testing the BE api.
 - BE app uses `vitest` for unit testing

 - FE work doesn't have thank you pop-up & update review functionality
 - View all reviews buttons don't do anything
 - Doesn't have web app support
 
 - The app was tested on Android
 - App was built and tested using node v18

