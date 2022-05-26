import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./App.css";
import {
  Container as Body,
  Header,
  LogList,
  LogContainer,
} from "./assets/styled";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";

import UFT from "./assets/img/UFT.png";
import labtec from "./assets/img/labtec.png";
import receita from "./assets/img/receita.png";
import EPIC from "./assets/img/logo-epicOFI.png";

import ricardo from "./assets/img/drRicardo.jpeg";
import edeilson from "./assets/img/profEdeilson.jpeg";
import warley from "./assets/img/warley.jpeg";
import eliel from "./assets/img/profEliel.jpeg";
import marcos from "./assets/img/MarcosGilmario.jpg";

function App() {
  const [displayArray, setDisplayArray] = useState([]);
  const [displayEl, setDisplayEl] = useState();
  const [chartData, setChartData] = useState([]);
  const [key, setKey] = useState("logs");
  const [reload, setReload] = useState(false);

  const delay = (ms) =>
    new Promise((res) => {
      setTimeout(() => {
        res();
      }, ms);
    });

  useEffect(() => {
    (async function () {
      for (let el of chartData) {
        await delay(12000);
        setDisplayEl(el);
      }
      setDisplayEl(undefined);
    })();
  }, [chartData]);

  useEffect(() => {
    displayEl && setDisplayArray((prev) => [...prev, displayEl]);
  }, [displayEl]);

  useEffect(() => {
    var myHeaders = new Headers();

    var myInit = {
      method: "GET",
      headers: myHeaders,
      mode: "cors",
      cache: "default",
    };

    fetch("http://localhost:3000/data")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          setChartData(data.data);
        }
      })
      .catch((err) => console.error(err));
  }, [displayArray]);

  useEffect(() => {
    (async function () {
      await delay(900000);
      if (reload === false) {
        setReload(true);
      } else {
        setReload(false);
      }
    })();
  }, [reload]);

  useEffect(() => {
    if (reload === true) {
      window.location.reload();
    }
  }, [reload]);

  useEffect(() => {
    (async function () {
      await delay(10000);
      if (key === "logs") {
        setKey("team");
      } else {
        setKey("logs");
      }
    })();
  }, [key]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      labels: { color: "white" },
    },
    scales: {
      x: {
        title: {
          color: "#738DCF",
          display: true,
          text: "Tempo (s)",
          font: {
            size: 20,
          },
        },
        grid: {
          color: "grey",
          borderColor: "#738DCF",
          tickColor: "#738DCF",
        },
        ticks: {
          color: "#738DCF",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      y: {
        title: {
          color: "#738DCF",
          display: true,
          text: "Porcentagem",
          font: {
            size: 20,
          },
        },
        grid: {
          color: "grey",
          borderColor: "#738DCF",
          tickColor: "#738DCF",
        },
        ticks: {
          color: "#738DCF",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
    },
  };

  const labels = displayArray.map((item, index) => {
    return `${index}`;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Umidade do solo",
        data: displayArray.map((item) => {
          return Number(item.soil_humity);
        }),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Temperatura",
        data: displayArray.map((item) => {
          return Number(item.temperature);
        }),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Umidade do Ar",
        data: displayArray.map((item) => {
          return Number(item.air_humity);
        }),
        borderColor: "rgb(123, 133, 235)",
        backgroundColor: "rgba(123, 133, 235, 0.5)",
      },
    ],
  };
  return (
    <div className="App">
      <Header>
        <Col style={{ padding: 5, backgroundColor: "white", width: "13%" }}>
          <Row>
            <img
              style={{
                width: 90,
              }}
              src={receita}
              alt="Receita Federal"
            />
          </Row>
          <Row>
            <img
              style={{
                width: 90,
                marginTop: 10,
              }}
              src={UFT}
              alt="UFT"
            />
          </Row>
        </Col>
        <Col
          style={{
            color: "white",
            justifyItems: "center",
            textAlign: "center",
            flexDirection: "row wrap",
            alignContent: "center",
            width: "60%",
          }}
        >
          <Row
            style={{
              fontSize: 24,
              fontWeight: "bold",
              padding: 20,
              marginLeft: "3.5%",
            }}
          >
            Metarreciclagem no Apoio ao Pequeno Agricultor:
          </Row>
          <Row
            style={{
              fontSize: 18,
              marginLeft: "2.5%",
            }}
          >
            Uma parceria entre Universidade e Receita Federal{" "}
          </Row>
        </Col>
        <Col
          style={{
            padding: 5,
            backgroundColor: "white",
            width: "13%",
            heigth: "10vh",
            position: "absolute",
            right: 0,
          }}
        >
          <Row>
            <img
              style={{
                width: 90,
              }}
              src={labtec}
              alt="LABTEC"
            />
          </Row>
          <Row>
            <img
              style={{
                width: 110,
                marginTop: 10,
              }}
              src={EPIC}
              alt="EPIC"
            />
          </Row>
        </Col>
      </Header>
      <Body>
        <Card
          style={{
            width: "60%",
            height: "190vh",
            backgroundColor: "transparent",
            borderRadius: "5px 5px 5px 5px",
          }}
        >
          <CardHeader
            style={{
              width: "100%",
              height: "40px",
              backgroundColor: "#738DCF",
              borderRadius: "5px 5px 0px 0px",
              color: "white",
              display: "flex",
              justifyContent: "center",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            <div style={{ marginTop: "10px" }}>Medição Geral</div>
          </CardHeader>
          <CardBody
            style={{
              backgroundColor: "#EFF4FF",
              padding: 10,
              borderRadius: "0px 0px 5px 5px",
            }}
          >
            <Line options={options} data={data} />
          </CardBody>
        </Card>
        <Col style={{ marginLeft: "2.5%" }}>
          <Row style={{ borderRadius: 5 }}>
            <Card
              style={{
                width: "100%",
                height: "auto",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "white",
                borderRadius: "5px 5px 5px 5px",
                marginBottom: "20px",
              }}
            >
              <CardHeader
                style={{
                  width: "100%",
                  height: "40px",
                  backgroundColor: "#738DCF",
                  borderRadius: "5px 5px 0px 0px",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                <Row
                  key={key}
                  style={{
                    width: "100%",
                    height: "40px",
                    margintop: "10px",
                    backgroundColor: "#738DCF",
                    color: "white",
                    display: "flex",
                    borderRadius: "5px 5px 0px 0px",
                    justifyContent: "space-evenly",
                    fontSize: "14px",
                    fontWeight: "bold",
                    flexDirection: "row",
                    alignItems: "center",
                    //alignContent: "center",
                  }}
                >
                  {key === "logs" ? (
                    <>
                      <div>Umidade do solo</div>
                      <div style={{ border: "1px 0px 1px 0px" }}>
                        Temperatura
                      </div>
                      <div>Umidade do ar</div>
                    </>
                  ) : (
                    <div>Equipe</div>
                  )}
                </Row>
              </CardHeader>
              <CardBody>
                {key === "logs" ? (
                  <LogList>
                    <LogContainer>
                      {displayArray.map((elem, key) => (
                        <Row
                          key={key}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            alignContent: "center",
                            width: "100%",
                            justifyContent: "space-around",
                            color: "#738DCF",
                            fontWeight: 600,
                            fontSize: "12px",
                            lineHeight: "14px",
                          }}
                        >
                          <div>{`💦: ${elem.soil_humity}%`}</div>
                          <div
                          /*style={{
                              borderLeft: "1px solid",
                              borderRight: "1px solid",
                            }}*/
                          >{`🌡️: ${elem.temperature}°C`}</div>
                          <div>{`🍃: ${elem.air_humity}%`}</div>
                        </Row>
                      ))}
                    </LogContainer>
                  </LogList>
                ) : (
                  <div>
                    <img
                      style={{
                        height: "28vh",
                        objectFit: "cover",
                      }}
                      src={ricardo}
                      alt="Ricardo"
                    />
                    <img
                      style={{ height: "28vh", objectFit: "cover" }}
                      src={edeilson}
                      alt="edeilson"
                    />
                    <img
                      style={{ width: 150, height: "28vh", objectFit: "cover" }}
                      src={warley}
                      alt="warley"
                    />
                    <img
                      style={{ height: "28vh", objectFit: "cover" }}
                      src={eliel}
                      alt="eliel"
                    />
                    <img
                      style={{ height: "28vh", objectFit: "cover" }}
                      src={marcos}
                      alt="marcos"
                    />
                  </div>
                )}
              </CardBody>
            </Card>
          </Row>
          <Row>
            <Card
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "5px 5px 5px 5px",
                backgroundColor: "#EFF4FF",
                color: "#738DCF",
                fontWeight: 600,
                fontSize: "12px",
                lineHeight: "14px",
                alignItems: "center",
              }}
            >
              <CardHeader
                style={{
                  width: "100%",
                  height: "40px",
                  margintop: "10px",
                  backgroundColor: "#738DCF",
                  color: "white",
                  display: "flex",
                  borderRadius: "5px 5px 0px 0px",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                <div style={{ marginTop: "10px" }}>Equipe</div>
              </CardHeader>
              <CardBody
                style={{ textAlign: "left", fontSize: 13, padding: 10 }}
              >
                <Row style={{ marginTop: 5 }}>
                  Dr. Ricardo Wagner M.Gomes / Receita Federal Tocantins /
                  Delegado
                </Row>
                <Row style={{ marginTop: 5 }}>
                  Prof. Dr. Edeilson Milhomem da Silva / C. Computação-UFT /
                  Coordenador
                </Row>
                <Row style={{ marginTop: 5 }}>
                  Prof. Dr. Warley Gramacho da Silva/ C. Computação-UFT /
                  Coordenador
                </Row>
                <Row style={{ marginTop: 5 }}>
                  Prof. Dr. Eliel Poggi dos Santos / UFT / Pesquisador
                </Row>
                <Row style={{ marginTop: 5 }}>
                  Marcos Gilmário Ferreira Moreira / Graduando C. Computação-UFT
                </Row>
              </CardBody>
            </Card>
          </Row>
        </Col>
      </Body>
      {/* <Footer>
        <Row
          style={{
            width: "60%",
            justifyContent: "center",
            alignItems: "space-eveny",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Col>
            <img
              style={{
                width: 90,
                marginTop: 10,
              }}
              src={labtec}
              alt="LABTEC"
            />
          </Col>
          <Col>
            <img
              style={{
                width: 90,
                marginTop: 10,
              }}
              src={EPIC}
              alt="EPIC"
            />
          </Col>
        </Row>
            </Footer>*/}
    </div>
  );
}

export default App;
