import React, { useState } from 'react';
import { connect } from 'react-redux';
import { inputChange, resetForm, postQuiz } from '../state/action-creators';

export function Form(props) {
  const { form, inputChange, resetForm, postQuiz } = props;
  const { newQuestion, newTrueAnswer, newFalseAnswer } = form;

  const onChange = (evt) => {
    const { id, value } = evt.target;
    inputChange(id, value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();

    // Check if all fields have values
    if (newQuestion.trim() && newTrueAnswer.trim() && newFalseAnswer.trim()) {
      postQuiz({
        question_text: newQuestion,
        true_answer_text: newTrueAnswer,
        false_answer_text: newFalseAnswer,
      });

      // Reset the form fields
      resetForm();
    } else {
      // Handle the case where not all fields have values (show a message)
    }
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        onChange={onChange}
        id="newQuestion"
        placeholder="Enter question"
        value={newQuestion}
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newTrueAnswer"
        placeholder="Enter true answer"
        value={newTrueAnswer}
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newFalseAnswer"
        placeholder="Enter false answer"
        value={newFalseAnswer}
      />
      <button id="submitNewQuizBtn" type="submit">
        Submit new quiz
      </button>
    </form>
  );
}

const mapStateToProps = (state) => ({
  form: state.form,
});

const mapDispatchToProps = {
  inputChange,
  resetForm,
  postQuiz,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
