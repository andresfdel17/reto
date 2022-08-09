import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { savePointsF } from '../../utils/savePoints';
import Opcion from './Opcion';
import Result from './Result';

const Piedra = () => {
    const [electP, setElectP] = useState({});
    const [name, setName] = useState("Player");
    const [electC, setElectC] = useState({});
    const [pPoints, setPPoints] = useState(0);
    useEffect(() => {
        document.title = "Piedra papel o tijera";
        validatePlayer();
    }, []);
    const opc = [
        {
            elect: "piedra",
            defeat: "tijera"
        },
        {
            elect: "papel",
            defeat: "piedra"
        },
        {
            elect: "tijera",
            defeat: "papel"
        }
    ];
    const validatePlayer = () => {
        if (localStorage.getItem("name") !== null && localStorage.getItem("name") !== "") {
            setName(localStorage.getItem("name"));
        } else {
            let name = prompt("Ingrese su nombre");
            localStorage.setItem("name", name);
            setName(name);
        }
    }
    const selectOpc = ev => {
        let player = opc.find(e => e.elect === ev.target.textContent);
        setElectP(player);
        selectC();
    }
    const selectC = () => {
        let elect = opc[Math.floor(Math.random() * opc.length)];
        setElectC(elect);
    }
    const savePoints = (point) => {
        //setPPoints(prev => prev + point);
        savePointsF(name, point);
    }
    return (
        <Container fluid>
            <div>
                <Result savePoints={savePoints} player={electP} machine={electC} />
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