import { combineReducers } from 'redux';

const initialWheelState = 0;
function wheel(state = initialWheelState, action) {
  switch (action.type) {
    case 'MOVE_CLOCKWISE':
      // Handle the MOVE_CLOCKWISE action here
      // You can update the state as needed
      return (state + 1) % 8; // For example, increment by 1 when moving clockwise
    case 'MOVE_COUNTER_CLOCKWISE':
      // Handle the MOVE_COUNTER_CLOCKWISE action here
      // You can update the state as needed
      return (state - 1 + 8) % 8; // For example, decrement by 1 when moving counter-clockwise
    default:
      return state;
  }
}

const initialQuizState = null;
function quiz(state = initialQuizState, action) {
  switch (action.type) {
    case 'SET_QUIZ':
      // Handle the SET_QUIZ action here
      // You can update the state as needed
      return action.payload; // Set the quiz data from the payload
    default:
      return state;
  }
}

const initialSelectedAnswerState = null;
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch (action.type) {
    case 'SELECT_ANSWER':
      // Handle the SELECT_ANSWER action here
      // You can update the state as needed
      return action.payload; // Set the selected answer from the payload
    default:
      return state;
  }
}

const initialMessageState = '';
function infoMessage(state = initialMessageState, action) {
  switch (action.type) {
    case 'SET_MESSAGE':
      // Handle the SET_MESSAGE action here
      // You can update the state as needed
      return action.payload; // Set the message from the payload
    default:
      return state;
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
};
function form(state = initialFormState, action) {
  switch (action.type) {
    case 'INPUT_CHANGE':
      // Handle the INPUT_CHANGE action here
      // You can update the state as needed
      const { field, value } = action.payload;
      return { ...state, [field]: value }; // Update the specified field with the new value
    case 'RESET_FORM':
      // Handle the RESET_FORM action here
      // You can reset the form state to its initial state
      return initialFormState;
    default:
      return state;
  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form });
