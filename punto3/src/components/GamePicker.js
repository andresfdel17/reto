import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import Alogo from "../assets/img/ahorcado.jpg";
import Plogo from "../assets/img/piedra.jpg";
import Nlogo from "../assets/img/naval.jpg";
import { Link } from 'react-router-dom';
const GamePicker = () => {
  const [name, setName] = useState("Player");
  const [points, setPoints] = useState([]);
  useEffect(() => {
    document.title = "Seleccione juego";
    setTimeout(() => {
      validatePlayer();
    }, 1000);
    pointList();
    // eslint-disable-next-line
  }, []);
  const games = [
    {
      route: "/ahorcated",
      name: "Ahorcado",
      img: Alogo,
      desc: "Diviertete con tus amigos adivinando la palabra"
    },
    {
      route: "/naval",
      name: "Astucia naval",
      img: Nlogo,
      desc: "Hunde la flota enemiga"
    },
    {
      route: "/piedra",
      name: "Piedra papel o tijera",
      img: Plogo,
      desc: "Vence a tus amigos"
    },
  ];
  const validatePlayer = () => {
    if (localStorage.getItem("actualPlayer") !== null && localStorage.getItem("actualPlayer") !== "") {
      setName(localStorage.getItem("actualPlayer"));
    } else {
      let name = prompt("Ingrese su nombre");
      localStorage.setItem("name", name);
      localStorage.setItem("actualPlayer", name);
      setName(localStorage.getItem("actualPlayer"))
    }
  }
  const pointList = () => {
    if (localStorage.getItem("List") !== null && localStorage.getItem("List") !== "") {
      setPoints(JSON.parse(localStorage.getItem("List")));
    }
  }
  return (
    <Container fluid className="mt-4">
      <Row>
        <Col sm="auto">
          <h3>
            Hola {name}
          </h3>
        </Col>
      </Row>
      <Row>
        {
          games.map((val, ke) => (
            <Col key={ke}>
              <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" src={val.img} />
                <Card.Body>
                  <Card.Title>{val.name}</Card.Title>
                  <Card.Text>
                    {val.desc}
                  </Card.Text>
                </Card.Body>
                <Card.Body>
                  <Link to={val.route}>
                    <Button size="sm" >
                      Jugar
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        }
      </Row>
      <div className="table-responsive">
        <table className="table-table-hover" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>No</th>
              <th>Nombre</th>
              <th>Puntos</th>
            </tr>
          </thead>
        </table>
      </div>
    </Container>
  )
}

export default GamePicker