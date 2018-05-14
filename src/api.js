const endpoint = process.env.REACT_APP_API_ENDPOINT

const endpoints = {
  quiz: `${endpoint}/quiz`,
  saveAnswer: `${endpoint}/saveAnswer`
}

export const getQuiz = () => {
  return fetch(endpoints.quiz)
    .then(response => response.json())
}

export const saveAnswer = ({
  quizId,
  questionIndex,
  selectedAnswer
}) => {
  return fetch(endpoints.saveAnswer, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      quizId,
      questionIndex,
      selectedAnswer
    })
  })
}

export default {
  getQuiz,
  saveAnswer
}
