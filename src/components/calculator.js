import React, { useReducer } from "react";
import DigitButton from "./calc";

export const ACTIONS = {
  ADD_DIGIT: "ADD_DIGIT",
  CLEAR: "CLEAR",
  DELETE_DIGIT: "DELETE_DIGIT",
  CHOOSE_OPERATION: "CHOOSE_OPERATION",
  EVAL: "EVAL",
};

export default function Calculator() {
  function evaluate({ currentOpp, prevOpp, Operation }) {
    const prev = parseFloat(prevOpp);
    const current = parseFloat(currentOpp);
    if (isNaN(prev) || isNaN(current)) return "";
    let result = "";
    // eslint-disable-next-line default-case
    switch (Operation) {
      case "+":
        result = current + prev;
        break;
      case "-":
        result = prev - current;
        break;
      case "*":
        result = prev * current;
        break;
      case "/":
        result = prev / current;
        break;
    }
    return result.toString();
  }

  function reducer(state, { type, payload }) {
    switch (type) {
      case ACTIONS.DELETE_DIGIT:
        if (state.currentOpp == null) {
          return state;
        }
        if (state.currentOpp.length === 1) {
          return { ...state, currentOpp: null };
        }
        return { ...state, currentOpp: state.currentOpp.slice(0, -1) };

      case ACTIONS.EVAL:
        if (
          state.Operation == null ||
          state.currentOpp == null ||
          state.prevOpp == null
        ) {
          return state;
        }
        return {
          ...state,
          Operation: null,
          prevOpp: null,
          currentOpp: evaluate(state),
        };

      case ACTIONS.CHOOSE_OPERATION:
        if (state.currentOpp == null && state.prevOpp == null) {
          return state;
        }
        if (state.prevOpp == null) {
          return {
            ...state,
            Operation: payload,
            prevOpp: state.currentOpp,
            currentOpp: "",
          };
        }
        if (state.currentOpp == null) {
          return {
            ...state,
            Operation: payload,
          };
        }
        return {
          ...state,
          prevOpp: evaluate(state),
          currentOpp: null,
          Operation: payload,
        };

      case ACTIONS.CLEAR:
        return {};
     
        case ACTIONS.ADD_DIGIT:
        // eslint-disable-next-line eqeqeq
        if (payload.digit == 0 && state.currentOpp == 0) return state;

        if (payload.digit === "." && state.currentOpp.includes(".")) {
          return state;
        }
        return {
          ...state,
          currentOpp: `${state.currentOpp || ""}${payload.digit}`,
        };
      default:
        return state;
    }
  }
  const [{ currentOpp, prevOpp, Operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="bg-gradient-to-br from-slate-400 to-slate-800 w-full h-screen flex justify-center items-center">
      <div className="flex justify-center items-center flex-col w-1/3  ">
        <div className=" grid grid-rows-2 w-1/2  border-2 border-slate-600 h-24 bg-slate-300 text-right pr-8 pb-6 rounded-lg    ">
          <div className="h-6">
            {prevOpp} {Operation}
          </div>
          <div className="text-2xl ">{currentOpp || ""}</div>
        </div>
        <div className="grid grid-cols-4 w-1/2 rounded-lg">
          <button
            onClick={() => dispatch({ type: ACTIONS.CLEAR })}
            className=" rounded-lg col-span-2  border-2 border-slate-600 h-16 bg-slate-400 hover:bg-slate-500 hover:border-slate-200 transition-colors duration-300 "
          >
            AC
          </button>
          <button
            onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
            className="rounded-lg border-2 border-slate-600 h-16 bg-slate-400 hover:bg-slate-500 hover:border-slate-200 transition-colors duration-300"
          >
            DEL
          </button>
          <button
            onClick={() =>
              dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: "/" })
            }
            className="rounded-lg border-2 border-slate-600 h-16 bg-slate-400 hover:bg-slate-500 hover:border-slate-200 transition-colors duration-300"
          >
            /
          </button>

          <DigitButton digit={1} dispatch={dispatch}></DigitButton>
          <DigitButton digit={2} dispatch={dispatch}></DigitButton>
          <DigitButton digit={3} dispatch={dispatch}></DigitButton>
          <button
            onClick={() =>
              dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: "*" })
            }
            className="rounded-lg border-2 border-slate-600 h-16 bg-slate-400 hover:bg-slate-500 hover:border-slate-200 transition-colors duration-300"
          >
            *
          </button>
          <DigitButton digit={4} dispatch={dispatch}></DigitButton>
          <DigitButton digit={5} dispatch={dispatch}></DigitButton>
          <DigitButton digit={6} dispatch={dispatch}></DigitButton>
          <button
            onClick={() =>
              dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: "+" })
            }
            className="rounded-lg border-2 border-slate-600 h-16 bg-slate-400 hover:bg-slate-500 hover:border-slate-200 transition-colors duration-300"
          >
            +
          </button>
          <DigitButton digit={7} dispatch={dispatch}></DigitButton>
          <DigitButton digit={8} dispatch={dispatch}></DigitButton>
          <DigitButton digit={9} dispatch={dispatch}></DigitButton>
          <button
            onClick={() =>
              dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: "-" })
            }
            className="rounded-lg border-2 border-slate-600 h-16 bg-slate-400 hover:bg-slate-500 hover:border-slate-200 transition-colors duration-300"
          >
            -
          </button>
          <DigitButton digit={"."} dispatch={dispatch}></DigitButton>

          <DigitButton digit={0} dispatch={dispatch}></DigitButton>

          <button
            onClick={() => dispatch({ type: ACTIONS.EVAL })}
            className=" rounded-lg col-span-2  border-2 border-slate-600 h-16 bg-orange-400 hover:bg-orange-800 hover:border-slate-200 transition-colors duration-300"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}
