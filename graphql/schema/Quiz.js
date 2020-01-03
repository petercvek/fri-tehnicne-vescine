const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLList, GraphQLBoolean } = require("graphql");

const Quiz = new GraphQLObjectType({
  name: "Quiz",
  fields: {
    id: {
      type: GraphQLID
    },
    code: {
      type: GraphQLString
    },
    start: {
      type: GraphQLString
    }
  }
});

const getQuizById = async quizCode => {
  const result = await global.pg.query(
    `
    SELECT *
    FROM quiz
    WHERE code = $1
  `,
    [quizCode]
  );
  return result.rows[0];
};

module.exports = { Quiz, getQuizById };
