// Action Creators for Synchronous Actions

import axios from "axios";

export function moveClockwise(nextBCogIndex) {
  return { type: 'MOVE_CLOCKWISE', payload: nextBCogIndex };
}

export function moveCounterClockwise(previousBCogIndex) {
  return { type: 'MOVE_COUNTER_CLOCKWISE', payload: previousBCogIndex };
}

export function selectAnswer(answerId) {
  return { type: 'SELECT_ANSWER', payload: answerId };
}

export function setMessage(message) {
  return { type: 'SET_MESSAGE', payload: message };
}

export function setQuiz(quizData) {
  return { type: 'SET_QUIZ', payload: quizData };
}

export function inputChange(field, value) {
  return { type: 'INPUT_CHANGE', payload: { field, value } };
}

export function resetForm() {
  return { type: 'RESET_FORM' };
}

// Async Action Creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state
    dispatch({ type: 'RESET_QUIZ' });
    axios
      .get('http://localhost:9000/api/quiz/next')
      .then(response => {
        dispatch(setQuiz(response.data));
      })
      .catch(error => {
        console.log(error);
        dispatch({ type: 'ERROR', payload: error.message });
        // Handle promise rejections by logging errors or dispatching an error action
      });
  };
}

export function postAnswer(quizId, answerId) {
  return function (dispatch) {
    // Make an HTTP request to post the selected answer
    axios
      .post('http://localhost:9000/api/quiz/answer', { quiz_id: quizId, answer_id: answerId })
      .then(response => {
        // On successful POST:
        // - Dispatch an action to reset the selected answer state
        // - Dispatch an action to set the server message to state
        // - Dispatch the fetching of the next quiz
        dispatch(selectAnswer(null)); // Reset selected answer
        dispatch(setMessage(response.data.message)); // Set server message
        dispatch(fetchQuiz()); // Fetch the next quiz
      })
      .catch(error => {
        console.log(error);
        dispatch({ type: 'ERROR', payload: error.message });
        // Handle promise rejections by logging errors or dispatching an error action
      });
  };
}

export function postQuiz(formData) {
  return function (dispatch) {
    // Make an HTTP request to post a new quiz question
    axios
      .post('http://localhost:9000/api/quiz/new', formData)
      .then(response => {
        // On successful POST:
        // - Dispatch an action to set a success message to state
        // - Dispatch the resetting of the form
        dispatch(setMessage('Quiz question created successfully!'));
        dispatch(resetForm());
      })
      .catch(error => {
        console.log(error);
        dispatch({ type: 'ERROR', payload: error.message });
        // Handle promise rejections by logging errors or dispatching an error action
      });
  };
}
