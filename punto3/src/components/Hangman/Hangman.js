import React, { useEffect, useState } from 'react'
import { getPlayerName, savePointsF } from '../../utils/savePoints';
import moviesJSON from "../../assets/movies.json";
import "../../css/hangman.css";
import Image from './Image';
import Answer from './Answer';
import { Button, Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Selected from './Selected';

const movies = moviesJSON.movies;

const Hangman = () => {
    const [name, setName] = useState("player");
    const [gameStatus, setGameStatus] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getInitialState();
        // eslint-disable-next-line
    }, []);
    const getInitialState = () => {
        let name = getPlayerName();
        let { ...rest } = generateData();
        setName(name);
        setGameStatus({
            user: name,
            attempts: 20,
            image: "",
            title: "Iniciar juego",
            ...rest
        });
        setLoading(false);
    }
    const generateData = () => {
        var movie = movies[Math.floor(Math.random() * movies.length)];
        var words = movie.split(" ");
        var answer = words.map((word) => {
            return word.split("").map(() => {
                return "-";
            });
        });
        return {
            movie: movie,
            words: words,
            answer: answer,
            charactersSelected: []
        };
    }
    const resetBoard = () => {
        getInitialState();
    }
    const checkAnswer = (char, words) => {
        var success = false;
        console.log(char, words);
        var answer = words.map((word, i) => {
            return word.split("").map((c, j) => {
                if (c === char) {
                    success = true;
                    return c
                } else {
                    return gameStatus.answer[i][j];
                }
            });
        });
        return {
            success: success,
            answer: answer
        };
    }
    const showAnswer = (result, words) => {
        var answer = words.map((word, i) => {
            return word.split("").map((c, j) => {
                return c;
            });
        });
        return {
            answer: answer
        };
    }
    const setImage = (words) => {
        var totalAttempts = 0;
        for (let word of words) {
            totalAttempts += word.length;
        }
        totalAttempts = Math.floor(0.8 * 20);

        var groups = Math.ceil(totalAttempts / 6);
        var imageID = 6 - Math.floor(gameStatus.attempts / groups);
        return "hangman" + Math.max(1, imageID) + ".png";
    }
    const selectCharacter = (char) => {
        let title = "";
        let image = "";
        let finishData;
        let attempts = gameStatus.attempts;
        let selected = gameStatus.charactersSelected;
        selected.push(char);
        let { success, answer } = checkAnswer(char, gameStatus.words);
        if (!success) attempts--;
        if (isGameFinished(answer) === true) {
            title = "Has ganado";
            image = "game_won.png";
            let { answer: answerF } = showAnswer(0, gameStatus.words);
            answer = answerF;
            attempts = 0;
            savePointsF(name, 10, "Ahorcado");
        } else if (attempts > 0) {
            title = `Te quedan ${attempts} intentos`;
            image = setImage(gameStatus.words);
        } else {
            title = "Has perdido";
            image = "game_lost.png";
            finishData = showAnswer(1, gameStatus.words);
            answer = finishData.answer;
            attempts = 0;
        }
       
        setGameStatus({
            ...gameStatus,
            title,
            attempts,
            answer,
            image,
            charactersSelected: selected,
        })
    }
    const isGameFinished = (answer) => {
        var gameFinished = true;
        for (let word of answer) {
            for (let character of word) {
                if (character === '-') { gameFinished = false }
            }
        }
        return gameFinished;
    }
    return (
        loading ? (
            "Cargando..."
        ) : (
            <div className='App'>
                <Navbar bg="dark" variant="dark">
                    <Container fluid>
                        <Navbar.Brand as={Link} to="/">
                            Arcade Colombia
                        </Navbar.Brand>
                    </Container>
                </Navbar>
                <header>
                    <h1>Ahorcado</h1>
                    <h4 id="title" className="text-white">{gameStatus.title}</h4>
                </header>
                <section>
                    {gameStatus?.image !== "" && <Image imagePath={gameStatus.image} />}
                    {gameStatus?.answer?.length > 0 && <Answer movie={gameStatus.movie} answer={gameStatus.answer} />}
                    {gameStatus?.attempts > 0 && <Selected selectCharacter={selectCharacter} charactersSelected={gameStatus.charactersSelected} />}
                </section>
                <footer className="mb-4">
                    {name !== "player" && name !== "" && (
                        <Button size="sm" onClick={resetBoard}>
                            Reiniciar
                        </Button>
                    )}
                </footer>
            </div>
        )
    )
}

export default Hangman