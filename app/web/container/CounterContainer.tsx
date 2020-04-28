import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Counter from 'web/components/Counter';
import { increment, decrement } from 'web/store/modules/counter';

const CounterContainer = ({ number, onIncrement, onDecrement }) => {
  return (
    <Counter
      number={number}
      onIncrement={onIncrement}
      onDecrement={onDecrement}
    />
  );
};

const mapStateToProps = (store) => ({
  number: store.counter.number,
});

const mapDispatchToProps = (dispatch) => ({
  onIncrement: () => dispatch(increment()),
  onDecrement: () => dispatch(decrement()),
});

CounterContainer.propTypes = {
  number: PropTypes.number,
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CounterContainer);
