const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt, GraphQLBoolean } = require("graphql");

const { Quiz, getQuizById } = require("./Quiz");
const { Player, createPlayer } = require("./Player");
const { Question, getQuestions } = require("./Question");
const { Answer, submitAnswer } = require("./Answer");
const { Result, getResults } = require("./Result");

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
    },
    results: {
      type: new GraphQLList(Result),
      args: {
        quizId: {
          type: GraphQLInt
        }
      },
      resolve: (parent, args) => getResults(args.quizId)
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutatuion",
  fields: {
    submitAnswer: {
      type: Answer,
      args: {
        quizId: {
          type: GraphQLInt
        },
        playerId: {
          type: GraphQLInt
        },
        question: {
          type: GraphQLInt
        },
        points: {
          type: GraphQLInt
        }
      },
      resolve: (parent, args) => submitAnswer(args.quizId, args.playerId, args.question, args.points)
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
