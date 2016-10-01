# Events (Fagaktiviteter)
https://sky.bekk.no/events/#/

https://app.staging.bekk.no/events/

Overview of events in BEKK. Events linked to a practice group will show in the Practice group app.

## Get started

Needs:
* Node installed
* Gulp installed globally

Uses:
* Event service
* Employee service

Do:

OS X:
* ```npm install```
* copy file ```dev.sh_``` to ```dev.sh```
* make file ```dev.sh```executable ```chmod +x dev.sh```
* build frontend ```gulp``` (need gulp installed globally ```npm install gulp -g```)
* start app ```./dev.sh```

Windows:
* ```npm install```
* Copy file ```dev.sh_``` to ```dev.sh```
* Install Linux-like environment and CLI. For instance Cygwin.
* Make file ```dev.sh```executable ```chmod +x dev.sh```
* Install nodemon (npm install -g nodemon)
* build frontend ```gulp``` (need gulp installed globally ```npm install gulp -g```)
* start app ```./dev.sh```

Use ```gulp watch``` to watch for changes in scripts and styles.

Runs on localhost:8000


## Deploy

The app is automatically deployed through Cloud Docker on push to the master branch. 
See developer.bekk.no for more info on what Cloud Docker is.

Staging builds here, and can be found under "Stacks" and selecting the correct environment.
If the build fails, Cloud Docker and it's logs, is a good place to start error searching.

To investigate even more, and shorten the search loop you can install Docker on your local machine (OSX recommended).

## Docker

Prereq: Docker toolbox installed

To install Docker follow the instructions on this site: 
https://docs.docker.com/mac/step_one/

When getting to the step that says create your docker. Use the command 
`docker-machine create -d virtualbox NAVN`
You will now see that a virtual machine has been created in ie Virtual box.

The Docker container is added for easy deploy and testing of the app. To be able to run
bekk-events inside Docker you first need to build the repository

```sh
docker build -t bekk-events .
```

using the environment variables we can run bekk-events using

```sh
docker run -p 8000:8000 bekk-events
```



## TODO

 1. Add Select element for contact person.
 2. Merge EditEvent and NewEvent to one component
 3. Better validation for form. Check if Groups or Users exists. Check if Tag with different casing exists. 
 4. Better logging in node backend.
 5. Add a way to go back to event list from inside the form
