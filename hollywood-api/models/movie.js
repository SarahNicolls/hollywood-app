module.exports = db => {
  const type = db.type;

  const Movie = db.createModel("Movie", {
    title: type.string().required(),
    poster: type.string().required(),
    summary: type.string().required(),
    rating: type
      .string()
      .enum(["G", "PG", "PG-13", "R", "NR"])
      .required(),
    rottenTomatoes: type
      .number()
      .min(0)
      .max(100)
      .required(),
    country: type.string().required(),
    language: type.string().required(),
    releaseDate: type.string().required(),
    budget: type.string().required(),
    openingWknd: type.string().required(),
    genre: type.string().required()
  });

  return Movie;
};

// creating a movie model
