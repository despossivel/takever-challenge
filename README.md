### How to use
The project of this repository was created as a challenge for Takever,
with the proposal to consume https://www.episodate.com storing data in
a NoSQL(MongoDB) through a job.

The data of an API can be REST consumption services, through
which your documentation to get started can be found at the url below or [here](https://takever-charllege.herokuapp.com/docs-api), after the REST server.

```bash
http://localhost:5005/docs-api
```

this project is covered by unit tests and other tests.
to test the integrity of the test run the command below.

##### All commands can be executed using npm if desired

```bash
yarn test
```

to populate the database run

```bash
yarn cron 
```
or 
```bash
node ./.cron/populate.js
```

to start the REST server
```bash
yarn dev
```

to start the server in a container
```bash
docker-compose up -d --build
```



- [@despossivel](https://www.linkedin.com/in/despossivel/)