import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { increment, decrement } from 'web/store/modules/counter';

const Counter = ({ number, onIncrement, onDecrement }) => {
  return (
    <div>
      <h1>{number}</h1>
      <button type="button" onClick={onIncrement}>+</button>
      <button type="button" onClick={onDecrement}>_</button>
    </div>
  );
};

const mapStateToProps = ({ store }) => ({
  number: store.counter.number,
});

const mapDispatchToProps = (dispatch) => ({
  onIncrement: () => (dispatch(increment())),
  onDecrement: () => (dispatch(decrement())),
});

Counter.propTypes = {
  number: PropTypes.number,
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
