import { ACTIONS } from "./calculator";
export default function DigitButton({ dispatch, digit }) {
  return (
    <button
      className="rounded-lg border-2 border-slate-600 h-16 bg-slate-300 hover:bg-slate-500 hover:border-slate-200 transition-colors duration-300"
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
}
