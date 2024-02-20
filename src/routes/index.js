const express = require("express");
const routerMovie = require("./movie.router");
const routerDirector = require("./director.router");
const routerActor = require("./actor.router");
const routerGenre = require("./genre.router");
const router = express.Router();

// colocar las rutas aquí
router.use("/genres", routerGenre);
router.use("/actors", routerActor);
router.use("/directors", routerDirector);
router.use("/movies", routerMovie);

module.exports = router;
