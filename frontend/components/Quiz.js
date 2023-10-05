import React from 'react';
import { connect } from 'react-redux';
import { selectAnswer, postAnswer } from '../state/action-creators';

function Quiz(props) {
  const {
    quiz,
    selectedAnswer,
    selectAnswer,
    postAnswer,
    infoMessage,
  } = props;

  const handleAnswerClick = (answerId) => {
    selectAnswer(answerId);
  };

  const handleSubmitAnswerClick = () => {
    // Check if a valid answer is selected
    if (selectedAnswer !== null) {
      postAnswer(quiz.id, selectedAnswer);
    } else {
      // Handle the case where no answer is selected (show a message)
    }
  };

  return (
    <div id="wrapper">
      {quiz ? (
        <>
          <h2>{quiz.question_text}</h2>

          <div id="quizAnswers">
            {quiz.answers.map((answer) => (
              <div
                key={answer.id}
                className={`answer ${selectedAnswer === answer.id ? 'selected' : ''}`}
              >
                {answer.text}
                <button
                  onClick={() => handleAnswerClick(answer.id)}
                  disabled={selectedAnswer !== null}
                >
                  {selectedAnswer === answer.id ? 'SELECTED' : 'Select'}
                </button>
              </div>
            ))}
          </div>

          <button id="submitAnswerBtn" onClick={handleSubmitAnswerClick}>
            Submit answer
          </button>
        </>
      ) : (
        'Loading next quiz...'
      )}

      {infoMessage && <div id="message">{infoMessage}</div>}
    </div>
  );
}

const mapStateToProps = (state) => ({
  quiz: state.quiz,
  selectedAnswer: state.selectedAnswer,
  infoMessage: state.infoMessage,
});

const mapDispatchToProps = {
  selectAnswer,
  postAnswer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
