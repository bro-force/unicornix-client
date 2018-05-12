const endpoint = "http://localhost:5000/unicornix-54c1b/us-central1"
const quiz = `${endpoint}/randomQuestion`

export const getQuiz = () => {
  return fetch(quiz)
    .then(response => response.json())
}

export default {
  getQuiz
}
