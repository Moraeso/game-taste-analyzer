// define action type
const INCREMENT = 'counter/INCREMENT';
const DECREMENT = 'counter/DECREMENT';

// action function
export const increment = (unit) => ({ type: INCREMENT, unit });
export const decrement = (unit) => ({ type: DECREMENT, unit });

// default state
const initialState = {
  number: 0,
};

// reducer
const counter = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        number: state.number + action.unit,
      };
    case DECREMENT:
      return {
        ...state,
        number: state.number - action.unit,
      };
    default:
      return state;
  }
};

export default counter;
