import React from 'react';
import { connect } from 'react-redux';
import { moveClockwise, moveCounterClockwise } from '../state/action-creators';

function Wheel(props) {
  const { activeCog, moveClockwise, moveCounterClockwise } = props;

  const cogs = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  const handleClickClockwise = () => {
    moveClockwise();
  };

  const handleClickCounterClockwise = () => {
    moveCounterClockwise();
  };

  return (
    <div id="wrapper">
      <div id="wheel">
        {cogs.map((cog, index) => (
          <div
            key={index}
            className={`cog ${activeCog === index ? 'active' : ''}`}
            style={{ '--i': index }}
          >
            {cog}
          </div>
        ))}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={handleClickCounterClockwise}>
          Counter clockwise
        </button>
        <button id="clockwiseBtn" onClick={handleClickClockwise}>
          Clockwise
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  activeCog: state.wheel, // Get the active cog index from the Redux store
});

const mapDispatchToProps = {
  moveClockwise,
  moveCounterClockwise,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wheel);
