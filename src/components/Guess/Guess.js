import React from "react";
import { range } from "../../utils";
import { checkGuess } from "../../game-helpers";

function Cell({ letter, status }) {
  const className = status ? `cell ${status}` : "cell";
  return <span className={className}>{letter}</span>;
}

function Guess({ guess = "", answer }) {
  const cellsCount = 5;
  const checkedGuess = guess ? checkGuess(guess, answer) : [];

  return (
    <p className="guess">
      {range(cellsCount).map((index) => {
        const { letter, status } = checkedGuess[index] || {};
        return <Cell key={index} letter={letter} status={status} />;
      })}
    </p>
  );
}

export default Guess;
