const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLList, GraphQLBoolean } = require("graphql");

const Question = new GraphQLObjectType({
  name: "Question",
  fields: {
    id: {
      type: GraphQLID
    },
    question: {
      type: GraphQLString
    },
    correct_answer: {
      type: GraphQLString
    },
    incorrect_answers: {
      type: new GraphQLList(GraphQLString)
    }
  }
});

const getQuestions = async quizId => {
  const result = await global.pg.query(
    `
    select *
    from question
    `
  );

  let seed = quizId;
  function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  izbrane_vrstice = [];
  ze_izbrane = [];

  for (let i = 0; i < 5; i++) {
    let randomNumber = Math.floor(random() * result.rows.length);
    if (ze_izbrane.includes(randomNumber)) {
      i--;
    } else {
      izbrane_vrstice.push(result.rows[randomNumber]);
    }
  }
  return izbrane_vrstice.map(row => ({
    id: row.id,
    question: row.question,
    correct_answer: row.correct_answer,
    incorrect_answers: [row.incorrect_answers0, row.incorrect_answers1, row.incorrect_answers2]
  }));
};

module.exports = { Question, getQuestions };
