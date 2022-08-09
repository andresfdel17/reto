import React, { useEffect, useState } from "react";
import { Navbar, Container, Row, Col, Button } from "react-bootstrap";
import Swal from "sweetalert2";
function App() {
  const [data, setData] = useState([]);
  const [days, setDays] = useState([]);
  const [maxDays, setMaxD] = useState({});
  const [maxCows, setMaxC] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    document.title = "Home";
  }, []);
  useEffect(() => {
    calculateHato();
    calculateMaxMinDay();
    //eslint-disable-next-line
  }, [data]);
  const getCows = async () => {
    let ans = await Swal.fire({
      title: "Solicitud de datos",
      input: "number",
      text: "Ingrese el número de vacas"
    });
    const { value } = ans;
    if (value !== "" && parseInt(value) >= 3 && parseInt(value) <= 50) {
      for (let i = 0; i < value; i++) {
        let save = [];
        for (let j = 0; j < 7; j++) {
          let ans1 = 0;
          do {
            ans1 = await Swal.fire({
              title: "Solicitud de datos",
              input: "number",
              text: `Ingrese la cantidad de litros de leche de ésta vaca el día ${j + 1}`
            });
            if (parseFloat(ans1.value) === 0 || parseFloat(ans1.value) > 11.9 || ans1.value === "") {
              Swal.fire({
                icon: "warning",
                title: "Advertencia",
                text: "Por favor ingrese un valor válido",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true
              });
            }
          } while (parseFloat(ans1.value) === 0 || parseFloat(ans1.value) > 11.9 || ans1.value === "");
          save[j] = ans1.value;
        }
        setData(prev => [...prev, save]);
        setLoaded(true);
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: "El minimo de vacas es 3 y el máximo es 50",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
      });
    }
  }
  const calculateHato = () => {
    let tmp = [0, 0, 0, 0, 0, 0, 0];
    for (let k = 0; k < data.length; k++) {
      for (let l = 0; l < 7; l++) {
        tmp[l] += parseFloat(data[k][l]);
      }
    }
    setDays(tmp);
  }
  const calculateMaxMinDay = () => {
    let tmp = [0, 0, 0, 0, 0, 0, 0];
    let tmpC = [];
    for (let l = 0; l < 7; l++) {
      let tmpDay = [];
      for (let k = 0; k < data.length; k++) {
        tmp[l] += parseFloat(data[k][l]);
        tmpDay.push(parseFloat(data[k][l]));
      }
      tmpC.push(tmpDay);
    }
    let cows = [];
    tmpC.forEach((el, index) => {
      let max = Math.max.apply(null, el);
      let maxKey = el.reduce((r, v, i) => r.concat(v === max ? i : []), []);
      cows.push({
        day: index,
        cows: maxKey
      })
    })
    let max = Math.max.apply(null, tmp);
    let min = Math.min.apply(null, tmp);
    let dat = {
      minKey: tmp.reduce((r, v, i) => r.concat(v === min ? i : []), []),
      min: min,
      maxKey: tmp.reduce((r, v, i) => r.concat(v === max ? i : []), []),
      max: max
    }
    setMaxC(cows);
    setMaxD(dat);
    setDays(tmp);
  }
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            7 vacas flacas
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container fluid className="mt-4">
        <Row>
          <Col sm="auto">
            <Button size="sm" onClick={getCows}>
              Añadir Datos semana
            </Button>
          </Col>
        </Row>
        <div className="table-responsive">
          <table className="table table-hover" style={{ width: "50%" }}>
            <tbody>
              {
                loaded && [0, 1, 2, 3, 4, 5, 6].map((value, index) => (
                  <tr key={index}>
                    <td>
                      Día {value + 1}
                    </td>
                    {
                      data.map((value1, index1) => (
                        <td key={index1}>
                          {
                            index === 0 && (
                              <>Vaca {index1 + 1} <br /> </>
                            )
                          }
                          {value1[index]}
                        </td>
                      ))
                    }
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <Container fluid>
          {
            loaded && (
              <h5>
                Producción total del hato en cada uno de los 7 días
              </h5>
            )
          }
          {
            loaded && days.map((value, index) => (
              <div key={index}>
                Día {index + 1}:  {value} Litros <br />
              </div >
            ))
          }
        </Container>
        <Container fluid>
          {
            loaded && (
              <h5>
                Días de mayor producción y menor producción
              </h5>
            )
          }
          {
            loaded && (
              <h5>
                Mayor producción:
              </h5>
            )
          }
          {loaded && maxDays.maxKey?.map((value, index) => (
            <div key={index}>
              Día {value + 1} <br />
            </div>
          ))}
          {
            loaded && (
              <h5>
                Menor producción:
              </h5>
            )
          }
          {loaded && maxDays.minKey?.map((value, index) => (
            <div key={index}>
              Día {value + 1} <br />
            </div>
          ))}
        </Container>
        <Container fluid>
          {
            loaded && (
              <h5>
                EL numero de vaca que dió más leche cada día
              </h5>
            )
          }

          {
            loaded && maxCows.map((value, index) => (
              <div key={index}>
                Día {index + 1}:  {value.cows.map((val, ke) => (
                  <span key={ke}>
                    Vaca {val + 1} &nbsp;
                  </span>
                ))} <br />
              </div >
            ))
          }
        </Container>
      </Container>
    </div>
  );
}

export default App;
