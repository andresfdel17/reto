import React from 'react'
import "./Answer.css";

const Answer = (props) => {
    const { movie, answer } = props;
    
    const getWords = () => {
        return (
            movie?.split(" ")?.map((word, i) => (
                <ul key={i} className="answer">
                    {getWordLetters(word, i)}
                    <li className="spaceInAnswer" disabled></li>
                </ul>
            ))
        )
    }
    const getWordLetters = (word, i) => {
        let letters = word.split("");
        return (
            letters.map((letter, j) => {
                return answer[i][j] === "-" ? <li key={[i] + [j]} className="characterInAnswer" disabled></li> : <li key={[i] + [j]} className="characterInAnswer" disabled>{letter}</li>
            })
        )
    }
    return (
        <div>
            {getWords()}
        </div>
    )
}

export default Answer