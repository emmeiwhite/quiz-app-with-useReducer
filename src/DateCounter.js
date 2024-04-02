import { useReducer } from "react";

const initialState = {
  count: 0,
  step: 1,
};

const reducer = (state, action) => {
  if (action.type === "reset") {
    return {
      ...state,
      count: 0,
      step: 1,
    };
  }

  if (action.type === "define-step") {
    return {
      ...state,
      step: action.payload,
    };
  }

  if (action.type === "define-count") {
    return {
      ...state,
      count: action.payload,
    };
  }

  if (action.type === "decrease") {
    return {
      ...state,
      count: state.count - state.step,
    };
  }

  if (action.type === "increase") {
    return {
      ...state,
      count: state.count + state.step,
    };
  }

  return state;
};

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + state.count);

  const dec = function () {
    dispatch({
      type: "decrease",
    });
  };

  const inc = function () {
    dispatch({
      type: "increase",
    });
  };

  const defineCount = function (e) {
    const value = Number(e.target.value);
    dispatch({
      type: "define-count",
      payload: value,
    });
  };

  const defineStep = function (e) {
    const value = Number(e.target.value);
    dispatch({
      type: "define-step",
      payload: value,
    });
  };

  const reset = function () {
    dispatch({
      type: "reset",
    });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={state.step}
          onChange={defineStep}
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input
          value={state.count || ""}
          onChange={defineCount}
        />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
