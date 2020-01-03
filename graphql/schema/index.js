const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt, GraphQLBoolean } = require("graphql");

const { Quiz, getQuizById } = require("./Quiz");
const { Player, createPlayer } = require("./Player");
const { Question, getQuestions } = require("./Question");

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    quiz: {
      type: Quiz,
      args: {
        quizCode: {
          type: GraphQLString
        }
      },
      resolve: (parent, args) => getQuizById(args.quizCode)
    },
    questions: {
      type: new GraphQLList(Question),
      args: {
        quizId: {
          type: GraphQLInt
        }
      },
      resolve: (parent, args) => getQuestions(args.quizId)
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutatuion",
  fields: {
    submitAnswer: {
      type: GraphQLInt,
      args: {
        quizId: {
          type: GraphQLInt
        },
        playerId: {
          type: GraphQLInt
        },
        time: {
          type: GraphQLString
        }
      }
    },
    createPlayer: {
      type: Player,
      args: {
        quizCode: {
          type: GraphQLString
        },
        name: {
          type: GraphQLString
        }
      },
      resolve: (parent, args) => createPlayer(args.quizCode, args.name)
    }
  }
});

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

module.exports = schema;
