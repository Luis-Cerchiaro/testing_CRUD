require("../models");

const request = require("supertest");
const app = require("../app");
const Genre = require("../models/Genre");
const Actor = require("../models/Actor");
const Director = require("../models/Director");

const URL_MOVIES = "/movies";

const movie = {
  name: "Arrival",
  image:
    "https://m.media-amazon.com/images/M/MV5BMTExMzU0ODcxNDheQTJeQWpwZ15BbWU4MDE1OTI4MzAy._V1_.jpg",
  synopsis:
    "A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.",
  releaseYear: 2015,
};

let movieId;

test("POST -> URL_MOVIES should return statuscode 201, res.body to be defined and res.body.name", async () => {
  // Generate the response
  const res = await request(app).post(URL_MOVIES).send(movie);

  // Define the id
  movieId = res.body.id;

  // Tests expected to pass
  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(movie.name);
});

test("GET -> URL_MOVIES should return status code 200, res.body to be defined and res.body.length = 1", async () => {
  // Generate the response
  const res = await request(app).get(URL_MOVIES);

  // Tests expected to pass
  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

test("PUT -> 'URL_MOVIES:id', should return statusCodew 200, res.body to be defined and res.body.image to be 'https://upload.wikimedia.org/wikipedia/it/3/33/Arrival_film.jpg' and res.body.releaseYear to be 2016", async () => {
  // Generate the response
  const res = await request(app).put(`${URL_MOVIES}/${movieId}`).send({
    image: "https://upload.wikimedia.org/wikipedia/it/3/33/Arrival_film.jpg",
    releaseYear: 2016,
  });

  // Tests expected to pass
  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.image).toBe(
    "https://upload.wikimedia.org/wikipedia/it/3/33/Arrival_film.jpg"
  );
  expect(res.body.releaseYear).toBe(2016);
});

test("POST -> 'URL_MOVIES/:id/genres', should return status code 200, res.body to be defined", async () => {
  
  const genre = await Genre.create({
    name: "Drama",
  });

  //console.log(genre);

  const res = await request(app)
    .post(`${URL_MOVIES}/${movieId}/genres`)
    .send([genre.id]);

  //console.log(res.body);

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].id).toBe(genre.id)

  await genre.destroy();
});

test("POST -> 'URL_MOVIES/:id/actors', should return status code 200, res.body to be defined", async () => {
  
  const actor = await Actor.create({
    firstName: "Amy",
    lastName: "Adams",
    nationality: "American",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/12/Amy_Adams_UK_Nocturnal_Animals_Premiere_%28cropped%29.jpg",
    birthday: "08/20/1974",
  });

  //console.log(actor);

  const res = await request(app)
    .post(`${URL_MOVIES}/${movieId}/actors`)
    .send([actor.id]);

  //console.log(res.body);

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].id).toBe(actor.id)

  await actor.destroy();
});

test("POST -> 'URL_MOVIES/:id/directors', should return status code 200, res.body to be defined", async () => {
  
  const director = await Director.create({
    firstName: "Federico",
    lastName: "Fellini",
    nationality: "Italian",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/97/Federico_Fellini_NYWTS_2.jpg",
    birthday: "01/20/1920",
  });

  //console.log(director);

  const res = await request(app)
    .post(`${URL_MOVIES}/${movieId}/directors`)
    .send([director.id]);

  //console.log(res.body);

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].id).toBe(director.id)

  await director.destroy();
});

//! IMPORTANT: Always mantain DELETE as the last test to erase the created movie and mantain the env controlled
test("DELETE -> 'URL_MOVIES:id', should return status code 204", async () => {
 
  // Generate the response
  const res = await request(app)
    .delete(`${URL_MOVIES}/${movieId}`);

  // Tests expected to pass
  expect(res.status).toBe(204);
});
