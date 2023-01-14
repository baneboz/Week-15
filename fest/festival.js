"use strict";
const Genre = function (name) {
  this.name = name;
};

const action = new Genre("Action");
const drama = new Genre("Drama");
const comedy = new Genre("Comedy");
const anime = new Genre("anime");

const Movie = function (title, genre, length) {
  this.title = title;
  this.genre = genre;
  this.length = length;
};
const Program = function (date) {
  this.date = date;
  this.listOfMovies = [];
  // this.numOfMovies = 0;
};
const Festival = function (name) {
  this.name = name;
  this.listOfPrograms = [];
};

Genre.prototype.getData = function () {
  const data = `${this.name.at(0).toUpperCase()}${this.name
    .at(-1)
    .toUpperCase()}`;
  return data;
};

Movie.prototype.getData = function () {
  const data = `${this.title}, ${this.length}, ${this.getData()}`;
  return data;
};

Program.prototype.addMovie = function (movie) {
  this.listOfMovies.push(movie);
};
Program.prototype.getData = function () {
  let programDuration = 0;
  let movies = "";
  this.listOfMovies.forEach(movie => {
    programDuration += +movie.length.slice(0, -3);
    movies += `\t\t${movie.title}, ${movie.length}, ${movie.genre.getData()}\n`;
  });
  const data = `${this.date}, program duration ${programDuration}min\n${movies}`;
  return data;
};

Festival.prototype.addProgram = function (program) {
  this.listOfPrograms.push(program);
};
Festival.prototype.getData = function () {
  let programs = "";

  this.listOfPrograms.forEach(program => {
    programs += `\t${program.getData()}`;
  });
  const data = `${this.name} has ${this.listOfPrograms[0].listOfMovies.length} movie titles
${programs}`;
  return data;
};
////
(function () {
  console.log("Hi");

  const createMovie = function (title, length, genre) {
    const movie = new Movie(title, genre, length);
    return movie;
  };
  const createProgram = function (date) {
    const program = new Program(date);
    return program;
  };

  const nisFest = new Festival("Filmski susreti u Nisu");

  const program1 = new Program("28.10.2023");
  const program2 = new Program("29.10.2023");

  const spiderMan = createMovie("Spider-Man: Homecoming", "133min", action);
  const deadpool = createMovie("Deadpool", "108min", comedy);
  const darkTower = createMovie("The Dark Tower", "95min", anime);
  const dunkirk = createMovie("Dunkirk", "106min", drama);

  // helper function to populate programs
  const addMovies = function (program, ...movies) {
    for (let i = 0; i < movies.length; i++) {
      program.addMovie(movies[i]);
    }
  };

  addMovies(program1, spiderMan, deadpool, darkTower, dunkirk);
  addMovies(program2, spiderMan, deadpool, darkTower, dunkirk);

  nisFest.addProgram(program1);
  nisFest.addProgram(program2);

  console.log(nisFest.getData());
})();
