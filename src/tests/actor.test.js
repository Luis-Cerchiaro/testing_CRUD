const request = require("supertest");
const app = require("../app");

const URL_ACTORS = "/actors";

const actor = {
  firstName: "Amy",
  lastName: "Adams",
  nationality: "American",
  image:
    "https://upload.wikimedia.org/wikipedia/commons/1/12/Amy_Adams_UK_Nocturnal_Animals_Premiere_%28cropped%29.jpg",
  birthday: "08/20/1974",
};

let actorId;

test("POST -> URL_ACTORS should return statuscode 201, res.body to be defined and res.body.name", async () => {
  // Generate the response
  const res = await request(app)
    .post(URL_ACTORS)
    .send(actor);

  // Define the id
  actorId = res.body.id;

  // Tests expected to pass
  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(actor.name);
});

test("GET -> URL_ACTORS should return status code 200, res.body to be defined and res.body.length = 1", async () => {
  // Generate the response
  const res = await request(app)
    .get(URL_ACTORS);

  // Tests expected to pass
  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

test("PUT -> 'URL_ACTORS:id', should return statusCodew 200, res.body to be defined and res.body.firstName to be 'Amy Lou' and res.body.nationality to be 'American, Italian'", async () => {
  // Generate the response
  const res = await request(app)
    .put(`${URL_ACTORS}/${actorId}`)
    .send({ firstName: "Amy Lou", nationality: "American, Italian" });

  // Tests expected to pass
  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe("Amy Lou");
  expect(res.body.nationality).toBe("American, Italian");
});

test("Delete -> 'URL_ACTORS:id', should return status code 204", async () => {
  // Generate the response
  const res = await request(app)
    .delete(`${URL_ACTORS}/${actorId}`);

  // Tests expected to pass
  expect(res.status).toBe(204);
});
