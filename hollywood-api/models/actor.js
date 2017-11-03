module.exports = db => {
  const type = db.type;

  const Actor = db.createModel("Actor", {
    image: type.string().required(),
    name: type.string().required(),
    age: type.number().required(),
    born: type.string().required(),
    bio: type.string().required(),
    knownFor: type.string().required(),
    awards: type.string().required(),

    gender: type
      .string()
      .enum(["male", "female"])
      .required()
  });

  return Actor;
};

// creating an Actor "model"
