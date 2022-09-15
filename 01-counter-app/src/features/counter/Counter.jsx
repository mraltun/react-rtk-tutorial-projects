import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// Action creators from Slice
import { increment, decrement, reset, incrementByAmount } from "./counterSlice";

const Counter = () => {
  // Read the data from store
  const count = useSelector((state) => state.counter.count);
  // Dispatch actions to store
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState(0);

  // Make sure it's number or make it zero to avoid return NaN
  const addValue = Number(incrementAmount) || 0;

  // Reset both states to zero
  const resetAll = () => {
    setIncrementAmount(0);
    dispatch(reset());
  };

  return (
    <section>
      <p>{count}</p>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>

        <button onClick={() => dispatch(decrement())}>-</button>
      </div>
      <input
        type='text'
        value={incrementAmount}
        onChange={(e) => setIncrementAmount(e.target.value)}
      />

      <div>
        <button onClick={() => dispatch(incrementByAmount(addValue))}>
          Add Amount
        </button>
        <button onClick={resetAll}>Reset</button>
      </div>
    </section>
  );
};

export default Counter;
