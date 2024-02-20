const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

// table pivot: genreMovie
Genre.belongsToMany(Movie, { through: "genreMovie" });
Movie.belongsToMany(Genre, { through: "genreMovie" });

// table pivot: actorMovie
Actor.belongsToMany(Movie, { through: "actorMovie" });
Movie.belongsToMany(Actor, { through: "actorMovie" });

// table pivot: directorMovie
Director.belongsToMany(Movie, {through: "directorMovie"});
Movie.belongsToMany(Director, { through: "directorMovie" });