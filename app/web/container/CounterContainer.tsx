import { connect } from 'react-redux';
import Counter from 'web/components/Counter';
import { increment, decrement } from 'web/store/modules/counter';

const mapStateToProps = (store) => ({
  number: store.counter.number,
});

const mapDispatchToProps = (dispatch) => ({
  onIncrement: (unit) => dispatch(increment(unit)),
  onDecrement: (unit) => dispatch(decrement(unit)),
});

const CounterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Counter);

export default CounterContainer;
