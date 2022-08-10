import React, { useEffect, useState } from 'react'
import "./Selected.css";

const Selected = (props) => {
  const { charactersSelected, selectCharacter: selectProp } = props;
  // eslint-disable-next-line
  const [letters, setLetters] = useState([
    { value: "a", disabled: false },
    { value: "b", disabled: false },
    { value: "c", disabled: false },
    { value: "d", disabled: false },
    { value: "e", disabled: false },
    { value: "f", disabled: false },
    { value: "g", disabled: false },
    { value: "h", disabled: false },
    { value: "i", disabled: false },
    { value: "j", disabled: false },
    { value: "k", disabled: false },
    { value: "l", disabled: false },
    { value: "m", disabled: false },
    { value: "n", disabled: false },
    { value: "ñ", disabled: false },
    { value: "o", disabled: false },
    { value: "p", disabled: false },
    { value: "q", disabled: false },
    { value: "r", disabled: false },
    { value: "s", disabled: false },
    { value: "t", disabled: false },
    { value: "u", disabled: false },
    { value: "v", disabled: false },
    { value: "w", disabled: false },
    { value: "x", disabled: false },
    { value: "y", disabled: false },
    { value: "z", disabled: false }
  ]);
  // eslint-disable-next-line
  const [numbers, setNumbers] = useState([
    { value: "&", disabled: false },
    { value: "0", disabled: false },
    { value: "1", disabled: false },
    { value: "2", disabled: false },
    { value: "3", disabled: false },
    { value: "4", disabled: false },
    { value: "5", disabled: false },
    { value: "6", disabled: false },
    { value: "7", disabled: false },
    { value: "8", disabled: false },
    { value: "9", disabled: false }
  ]);
  useEffect(() => {
    setCharactersSelected(charactersSelected);
    // eslint-disable-next-line
  },[letters, numbers]);
  const setCharactersSelected = (charactersSelected) => {
    for (let letter of letters) {
      if (charactersSelected.includes(letter.value)) {
        letter.disabled = true;
      } else {
        letter.disabled = false;
      }
    }
    for (let number of numbers) {
      if (charactersSelected.includes(number.value) || (number.value === "&" && charactersSelected.includes("&amp;"))) {
        number.disabled = true;
      } else {
        number.disabled = false;
      }
    }
  }
  const getLetters = () => {
    return letters.map((letter, index) => (
      <li key={index} className="characterSelectable" disabled={letter.disabled} onClick={selectCharacter}>{letter.value}</li>
    ))
  }
  const getNumbers = () => {
    return numbers.map((number, index) => (
      <li key={index} className="characterSelectable" disabled={number.disabled} onClick={selectCharacter}>{number.value}</li>
    ))
  }
  const selectCharacter = (event) => {
    const target = event.target;
    var lettersF = letters.map((letter => {
        if (letter.value === target.innerHTML) {
            letter.disabled = true;
        }
        return letter;
    }));
    var numbersF = numbers.map((number => {
        if (number.value === target.innerHTML || (number.value === "&" && target.innerHTML === "&amp;")) {
            number.disabled = true;
        }
        return number;
    }));
    setLetters(lettersF);
    setNumbers(numbersF);
    selectProp(target.innerHTML);
}
  return (
    <div>
      <ul>
        {getLetters()}
      </ul>
      <ul>
        {getNumbers()}
      </ul>
    </div>
  )
}

export default Selected