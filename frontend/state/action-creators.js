import axios from "axios";
import { INPUT_CHANGE, MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, RESET_FORM, SET_INFO_MESSAGE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER } from "./action-types"



export function moveClockwise() {
  return ({ type: MOVE_CLOCKWISE });
}

export function moveCounterClockwise() {

  return ({ type: MOVE_COUNTERCLOCKWISE });
}

export function selectAnswer(answerId) {
  return ({ type: SET_SELECTED_ANSWER, payload: answerId });
}

export function setMessage(message) {
  return ({ type: SET_INFO_MESSAGE, payload: message })
}

export function setQuiz(quiz) {
  return function (dispatch) {
    axios
      .post('http://localhost:9000/api/quiz/new', { question_text: quiz.newQuestion, true_answer_text: quiz.newTrueAnswer, false_answer_text: quiz.newFalseAnswer })
      .then(res => {
        dispatch({ type: SET_INFO_MESSAGE, payload: `Congrats: "${quiz.newQuestion}" is a great question!` }) /**Reviewed with Chris. Added the message from test*/
        dispatch(resetForm())
      })
  }


}

export function inputChange(id, value) {
  return ({ type: INPUT_CHANGE, payload: { id, value } })
}

export function resetForm() {
  return ({ type: RESET_FORM })
}


export function fetchQuiz() {

  return function (dispatch) {
    dispatch({ type: SET_QUIZ_INTO_STATE, payload: null });
    axios
      .get('http://localhost:9000/api/quiz/next')
      .then(res => dispatch({ type: SET_QUIZ_INTO_STATE, payload: res.data }))

  }
}
export function postAnswer(quiz_id, answer_id) {
  return function (dispatch) {
    axios
      .post('http://localhost:9000/api/quiz/answer', { quiz_id, answer_id })
      .then(res => {
        dispatch({ type: SET_SELECTED_ANSWER, payload: null })
        dispatch({ type: SET_INFO_MESSAGE, payload: res.data.message })
        fetchQuiz()(dispatch)
      })

  }
}
