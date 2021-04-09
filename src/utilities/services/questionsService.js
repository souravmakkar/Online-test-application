const json = require('../questions.json');

function countOfAttemptedQuestions(questionsList) {
  let quesAttempt = 0;
  questionsList.forEach((question) => {
    if (isQuestionAnswered(question.options)) quesAttempt++;
  });

  return quesAttempt;
}

function isQuestionAnswered(options) {
  let quesCount = false;

  options.forEach((option) => {
    if (option.selected) {
      quesCount = true;
    }
  });

  return quesCount;
}

function getQuestionsByLevel(level) {
  var ques = json['questions'].filter((question) =>
    question.level.find((l) => l === parseInt(level))
  );
  return ques;
}

function getCountOfCorrectAnswers(question) {
  let status = 'Incorrect';
  let correctAnswers = [];
  let userAnswers = [];
  let correctAnswerCount = 0;
  let score = 0;
  const answers = question.answer;

  question.options.forEach((option, index) => {
    if (answers.includes(index)) {
      correctAnswers.push(option['value']);
      if (option.selected) {
        correctAnswerCount++;
      }
    }
    if (option.selected) {
      userAnswers.push(option.value);
    }
  });

  if (correctAnswerCount === answers.length) {
    status = 'Correct';
  } else if (correctAnswerCount > 0 && correctAnswerCount < answers.length) {
    status = 'Partial-Correct';
  } else {
    status = 'Incorrect';
  }

  score = correctAnswerCount / answers.length;

  return {
    score,
    correctAnswerCount,
    status,
    correctAnswers,
    userAnswers,
  };
}

export {
  getQuestionsByLevel,
  countOfAttemptedQuestions,
  getCountOfCorrectAnswers,
};
