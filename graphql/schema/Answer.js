const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLList, GraphQLBoolean } = require("graphql");

const Answer = new GraphQLObjectType({
  name: "Answer",
  fields: {
    id: {
      type: GraphQLID
    },
    player: {
      type: GraphQLInt
    },
    quiz: {
      type: GraphQLInt
    },
    question: {
      type: GraphQLInt
    },
    points: {
      type: GraphQLInt
    }
  }
});

const submitAnswer = async (quizId, playerId, question, points) => {
  const result = await global.pg.query(
    `
      INSERT INTO player_answered (player, quiz, question, points)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
    [quizId, playerId, question, points]
  );

  return result.rows[0];
};

module.exports = { Answer, submitAnswer };
