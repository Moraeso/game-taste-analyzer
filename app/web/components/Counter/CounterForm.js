import React from 'react';
import PropTypes from 'prop-types';

const Counter = ({ number, onIncrement, onDecrement }) => {
  const unit = 5;
  return (
    <div>
      <h1>{number}</h1>
      <button type="button" onClick={() => onIncrement(unit)}>+</button>
      <button type="button" onClick={() => onDecrement(unit)}>_</button>
    </div>
  );
};
Counter.propTypes = {
  number: PropTypes.number,
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func,
};

export default Counter;
