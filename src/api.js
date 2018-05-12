const endpoint = process.env.REACT_APP_API_ENDPOINT
const quiz = `${endpoint}/quiz`

export const getQuiz = () => {
  return fetch(quiz)
    .then(response => response.json())
}

export default {
  getQuiz
}
