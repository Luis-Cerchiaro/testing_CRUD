const catchError = require("../utils/catchError");
const Movie = require("../models/Movie");
const Genre = require("../models/Genre");
const Actor = require("../models/Actor");
const Director = require("../models/Director");

const getAll = catchError(async (req, res) => {
  const results = await Movie.findAll({ include: [Genre, Actor, Director] });
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const result = await Movie.create(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Movie.findByPk(id, { include: [Genre, Actor, Director] });
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Movie.destroy({ where: { id } });
  if (!result) return res.sendStatus(404);
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Movie.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

// Table Pivot Controller: genreMovie
const setGenres = catchError(async (req, res) => {
  // Searching for the movie
  const { id } = req.params;
  const movie = await Movie.findByPk(id);

  // Validation: in case of not finding the movie
  if (!movie) return res.sendStatus(404);

  // Setting the genres to the movie
  await movie.setGenres(req.body);

  // Reading the setted genres and returned it
  const genres = await movie.getGenres();
  return res.json(genres);
});

// Table Pivot Controller: actorMovie
const setActors = catchError(async (req, res) => {
    // Searching for the movie
    const { id } = req.params;
    const movie = await Movie.findByPk(id);
  
    // Validation: in case of not finding the movie
    if (!movie) return res.sendStatus(404);
  
    // Setting the genres to the movie
    await movie.setActors(req.body);
  
    // Reading the setted genres and returned it
    const actors = await movie.getActors();
    return res.json(actors);
  });

  // Table Pivot Controller: directorMovie
const setDirectors = catchError(async (req, res) => {
    // Searching for the movie
    const { id } = req.params;
    const movie = await Movie.findByPk(id);
  
    // Validation: in case of not finding the movie
    if (!movie) return res.sendStatus(404);
  
    // Setting the genres to the movie
    await movie.setDirectors(req.body);
  
    // Reading the setted genres and returned it
    const directors = await movie.getDirectors();
    return res.json(directors);
  });

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  setGenres,
  setActors,
  setDirectors
};
