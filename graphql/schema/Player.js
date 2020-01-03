const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLList, GraphQLBoolean } = require("graphql");

const Player = new GraphQLObjectType({
  name: "Player",
  fields: {
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    quiz: {
      type: GraphQLInt
    },
    start: {
      type: GraphQLString
    }
  }
});

const createPlayer = async (quizCode, name) => {
  const result = await global.pg.query(
    `
    SELECT id, start
    FROM quiz
    WHERE code = $1
  `,
    [quizCode]
  );
  console.log(result.rows[0]);
  if (result.rows[0]) {
    const result2 = await global.pg.query(
      `
        INSERT INTO player (name, quiz)
        VALUES ($1, $2)
        RETURNING *
        
      `,
      [name, result.rows[0].id]
    );
    console.log(result2.rows[0]);

    return {
      id: result2.rows[0].id,
      name: result2.rows[0].name,
      quiz: result2.rows[0].quiz,
      start: result.rows[0].start
    };
  } else {
    return null;
  }
};

module.exports = { Player, createPlayer };
