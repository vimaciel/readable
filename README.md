# Readable
[![Build Status](https://travis-ci.org/vimaciel/my-reads.svg?branch=master)](https://travis-ci.org/vimaciel/readable)
[![Coverage Status](https://coveralls.io/repos/github/vimaciel/readable/badge.svg?branch=master)](https://coveralls.io/github/vimaciel/readable?branch=master)

by [Vinicius Furusho Maciel](https://www.linkedin.com/in/vimaciel)

Do you have any question about technology?  So you can use *The Readable* to solve your questions. To be more precise on this first version you can ask questions about 3 categories: React, Redux and Udacity. And the greatest thing is you don't need to identify yourself, only set your nickname. In other words, you are anonymous.

Readable is a required project to complete the course [React Nanodegree](https://br.udacity.com/course/react-nanodegree--nd019) by Udacity

### How to use
*You need node installed to use Redable*

The first thing to do is clone the server side provided by Udacity and after that run it 
```sh
$ git clone https://github.com/udacity/reactnd-project-readable-starter.git
$ cd reactnd-project-readable-starter
$ cd api-server
$ node server
```
...and them the client side
```sh
$ git clone https://github.com/vimaciel/readable.git
$ cd readable
$ npm run
```


To see more information about [reactnd-project-readable-starter](https://github.com/udacity/reactnd-project-readable-starter.git) visit the original repository

### Directory Structure

To keep the *The Readable* project organized folders were created inside the src, as you can see below:

```bash
└── src
    ├── actions # Redux actions are here
    ├── components # Now all components' app lives here
    ├── helpers # javascript files to support the app with helper purpose
    ├── images # Image files used on the app
    ├── middleware # Middleware used by Redux
    ├── reducers # Redux reducers are here
    ├── test # test files must be here
```