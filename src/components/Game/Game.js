import React, { useState } from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import GuessInput from "../GuessInput";
import GuessResults from "../GuessResults";
import Banner from "../Banner";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

function Game() {
  const [guessResults, setGuessResults] = useState([]);
  const [gameStatus, setGameStatus] = useState("playing");
  const [answer, setAnswer] = useState(sample(WORDS));

  // To make debugging easier, we'll log the solution in the console.
  console.info({ answer });

  return (
    <>
      <GuessResults guessResults={guessResults} answer={answer} />
      {gameStatus !== "playing" && (
        <button className="play-again-btn" onClick={resetGame}>
          Play Again
        </button>
      )}
      <GuessInput addGuess={addGuess} isEnabled={gameStatus === "playing"} />
      {gameStatus === "won" && <WonBanner guessCount={guessResults.length} resetGame={resetGame} />}
      {gameStatus === "lost" && <LostBanner answer={answer} resetGame={resetGame} />}
    </>
  );

  function addGuess(word) {
    if (!word || guessResults.find(({ word: guessWord }) => guessWord === word)) {
      return;
    }

    setGuessResults([...guessResults, { id: crypto.randomUUID(), word }]);

    const guessCount = guessResults.length + 1;

    if (answer === word) {
      setGameStatus("won");
    } else if (guessCount === NUM_OF_GUESSES_ALLOWED) {
      setGameStatus("lost");
    }
  }

  function resetGame() {
    setAnswer(sample(WORDS));
    setGameStatus("playing");
    setGuessResults([]);
  }
}

function WonBanner({ guessCount, resetGame }) {
  return (
    <Banner status="happy">
      <p>
        <strong>Congratulations!</strong> Got it in <strong>{guessCount} guesses</strong>.
      </p>
    </Banner>
  );
}

function LostBanner({ answer, resetGame }) {
  return (
    <Banner status="sad">
      <p>
        Sorry, the correct answer is <strong>{answer}</strong>.
      </p>
    </Banner>
  );
}

export default Game;
