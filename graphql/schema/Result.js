const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLList, GraphQLBoolean } = require("graphql");

const Result = new GraphQLObjectType({
  name: "Result",
  fields: {
    id: {
      type: GraphQLID
    },
    all_points: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    }
  }
});

const getResults = async quizId => {
  const result = await global.pg.query(
    `
    SELECT player, sum(points) as all_points, name
    FROM player_answered inner join player on player_answered.player = player.id
    WHERE player_answered.quiz = $1
    GROUP BY player, name
    ORDER BY all_points DESC
    `,
    [quizId]
  );

  return result.rows.map(row => ({
    id: row.player,
    all_points: row.all_points,
    name: row.name
  }));
};

module.exports = { Result, getResults };
