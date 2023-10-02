import React, { useState } from "react";

function GuessInput({ addGuess, isEnabled }) {
  const [guess, setGuess] = useState("");
  return (
    <form
      className="guess-input-wrapper"
      onSubmit={(e) => {
        e.preventDefault();

        if (!guess || guess.length !== 5) {
          window.alert("Please enter exactly 5 characters word.")
        }

        addGuess(guess);
        console.log(guess);
        setGuess("");
      }}
    >
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        disabled={!isEnabled}
        required
        minLength={5}
        maxLength={5}
        pattern="[a-zA-Z]{5}"
        title="5 letter word"
        id="guess-input"
        type="text"
        value={guess}
        onChange={({ target }) => setGuess(target.value.toUpperCase())}
      />
    </form>
  );
}

export default GuessInput;
