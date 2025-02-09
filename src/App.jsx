import { useState, useEffect } from 'react';
import background from './assets/images/background.jpg';

const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];

export default function ColorGame() {
  const [targetColor, setTargetColor] = useState(() => randomColor());
  const [status, setStatus] = useState('');
  const [score, setScore] = useState(0);
  const [fade, setFade] = useState(false);
  let timeout;

  function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  //  function for handling next round after correct guess
  function nextRound() {
    setTargetColor(randomColor());
    setStatus('');
    setFade(false);
    clearTimeout(timeout);
  }

  //  function for handle the guess
  function handleGuess(event) {
    const selectedColor = event.target.innerText.toLowerCase();
    if (selectedColor === targetColor) {
      setStatus('Correct! 🎉');
      setScore((prevScore) => prevScore + 1);
      setFade(true);
      timeout = setTimeout(nextRound, 1000);
    } else {
      setStatus('Wrong! Try again. ❌');
    }
  }

  function resetGame() {
    setTargetColor(randomColor());
    setStatus('');
    setFade(false);
    clearTimeout(timeout);
    setScore(0); 
  }

  useEffect(() => {
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-no-repeat bg-center m-0 "
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="flex justify-center items-center p-4 sm:p-6 md:p-10">
        <p className="font-tetiary text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white text-center ">
          COLOUR GUESSING GAME
        </p>
      </div>
      <p className="text-white text-xl sm:text-2xl md:text-3xl text-center">
        Guess the correct colour
      </p>
      <div className="flex justify-center items-center my-4 sm:my-6 md:my-8 lg:m-10">
        <div
          className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-lg shadow-lg mb-4 transition-opacity ${
            fade ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ backgroundColor: targetColor }}
          data-testid="colorBox"
        ></div>
      </div>
      <div className=" grid grid-cols-2 place-items-center  gap-10 sm:gap-12">
        {colors.map((color) => (
          <button
            key={color}
            className="w-16 p-2 sm:w-20 h-8 sm:h-10 rounded-2xl text-white font-bold shadow-lg hover:scale-105 transition text-xs sm:text-base"
            style={{ backgroundColor: color }}
            onClick={handleGuess}
            data-testid="colorOption"
            aria-label={`Guess color ${color}`}
          >
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </button>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-6 sm:mt-8 ">
        <p
          className="text-white font-semibold text-xl sm:text-2xl md:text-3xl"
          data-testid="score"
        >
          Score: {score}
        </p>
        <button
          onClick={resetGame}
          className="hover:scale-105 bg-orange-400 font-bold text-xl sm:text-2xl text-white w-36 sm:w-44 h-12 sm:h-16 rounded-2xl hover:bg-orange-300"
          data-testid="newGameButton"
        >
          Restart Game
        </button>
      </div>
      <p
        className=" pb-10 text-white text-xl sm:text-2xl font-semibold text-center mt-4 sm:mt-6 "
        data-testid="gameStatus"
      >
        {status}
      </p>
    </div>
  );
}
