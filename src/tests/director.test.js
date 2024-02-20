const request = require("supertest");
const app = require("../app");

const URL_DIRECTORS = "/directors";

const director = {
  firstName: "Federico",
  lastName: "Felini",
  nationality: "Italian",
  image:
    "https://upload.wikimedia.org/wikipedia/commons/9/97/Federico_Fellini_NYWTS_2.jpg",
  birthday: "01/20/1920",
};

let directorId;

test("POST -> URL_DIRECTORS should return statuscode 201, res.body to be defined and res.body.name", async () => {
  // Generate the response
  const res = await request(app)
    .post(URL_DIRECTORS)
    .send(director);

  // Define the id
  directorId = res.body.id;

  // Tests expected to pass
  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(director.name);
});

test("GET -> URL_DIRECTORS should return status code 200, res.body to be defined and res.body.length = 1", async () => {
  // Generate the response
  const res = await request(app)
    .get(URL_DIRECTORS);

  // Tests expected to pass
  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

test("PUT -> 'URL_DIRECTORS:id', should return statusCodew 200, res.body to be defined and res.body.lastName to be 'Fellini' and res.body.nationality to be 'Italiano'", async () => {
  // Generate the response
  const res = await request(app)
    .put(`${URL_DIRECTORS}/${directorId}`)
    .send({ lastName: "Fellini", nationality: "Italiano" });

  // Tests expected to pass
  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.lastName).toBe("Fellini");
  expect(res.body.nationality).toBe("Italiano");
});

test("Delete -> 'URL_DIRECTORS:id', should return status code 204", async () => {
  // Generate the response
  const res = await request(app)
    .delete(`${URL_DIRECTORS}/${directorId}`);

  // Tests expected to pass
  expect(res.status).toBe(204);
});
