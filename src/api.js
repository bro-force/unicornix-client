const axios = require('axios')

const endpoint = process.env.REACT_APP_API_ENDPOINT

const endpoints = {
  quiz: `${endpoint}/quiz`,
  saveAnswer: `${endpoint}/saveAnswer`,
  saveResult: `${endpoint}/saveResult`,
  ranking: `${endpoint}/ranking`,
}

export const getQuiz = (params = {}) => {
  return axios.get(endpoints.quiz, {
    params,
    crossDomain: true
  })
    .then(response => response.data)
}

export const saveAnswer = ({
  quizId,
  questionIndex,
  selectedAnswer
}) => {
  return axios.post(endpoints.saveAnswer, {
      quizId,
      questionIndex,
      selectedAnswer
  })
}

export const saveResult = (data) => {
  return axios.post(endpoints.saveResult, data)
}

export const getRanking = () => {
  return axios.get(endpoints.ranking)
    .then(response => response.data)
}

export default {
  getQuiz,
  saveAnswer,
  saveResult
}
