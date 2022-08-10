import React, { useEffect, useState } from 'react'
import { Col, Container, Navbar, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { savePointsF } from '../../utils/savePoints';
import Opcion from './Opcion';
import Result from './Result';

const Piedra = () => {
    const [electP, setElectP] = useState({});
    const [name, setName] = useState("Player");
    const [electC, setElectC] = useState({});
    const [pPoints, setPPoints] = useState(0);
    const [winning, setWinning] = useState("");
    useEffect(() => {
        document.title = "Piedra papel o tijera";
        validatePlayer();
    }, []);
    const opc = [
        {
            elect: "piedra",
            defeat: "papel"
        },
        {
            elect: "papel",
            defeat: "tijera"
        },
        {
            elect: "tijera",
            defeat: "piedra"
        }
    ];
    const validatePlayer = () => {
        if (localStorage.getItem("actualPlayer") !== null && localStorage.getItem("actualPlayer") !== "") {
            setName(localStorage.getItem("actualPlayer"));
        } else {
            let name = prompt("Ingrese su nombre");
            localStorage.setItem("name", name);
            localStorage.setItem("actualPlayer", name);
            setName(name);
        }
    }
    const selectOpc = ev => {
        let player = opc.find(e => e.elect === ev.target.textContent);
        setElectP(player);
        let elect = opc[Math.floor(Math.random() * opc.length)];
        setElectC(elect);
        validateWin(player, elect);
    }
    const validateWin = (player, elect) => {
        if (player.defeat === elect.elect) {
            //setPPoints(prev => prev + 10);
            //savePoints(10);
            setWinning("Gana la maquina");
        } else if (elect.defeat === player.elect) {
            setPPoints(prev => prev + 10);
            savePoints(pPoints);
            setWinning("Gana el jugador");
        } else if (elect.elect === player.elect) {
            setPPoints(prev => prev + 5);
            savePoints(pPoints);
            setWinning(
                "Empate"
            )
        }
    }
    const savePoints = (point) => {
        //setPPoints(prev => prev + point);
        savePointsF(name, point, "Piedra papel o tijera");
    }
    return (
        <Container fluid>
            <Navbar bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/">
                        Arcade Colombia
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <div>
                <Result winning={winning} />
                <Row className="justify-content-around">
                    <Col sm="auto">
                        <div className="jugador">{name}</div>
                        <div className="puntos">Puntos: {pPoints}</div>
                        <div className="eleccion">Elección: {electP.elect}</div>
                    </Col>
                    <Col sm="auto">
                        <div className="maquina">Máquina</div>
                        <div className="eleccion">Elección: {electC.elect}</div>
                    </Col>
                </Row>

                <div className="opciones">
                    {
                        opc.map((val, index) => (
                            <Opcion key={index} electO={selectOpc} {...val} />
                        ))
                    }
                </div>
            </div>
        </Container>
    )
}

export default Piedra