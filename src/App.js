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
import logo from "./logo.svg";
import "./App.css";
import {
  Container as Body,
  Header,
  ChartContainer,
  LogList,
  Footer,
  LogContainer,
} from "./assets/styled";
import { Card, CardBody, CardHeader, Col, Row, Button } from "reactstrap";
import { Tab, Tabs } from "react-bootstrap";

import UFT from "./assets/img/UFT.png";
import labtec from "./assets/img/labtec.png";
import receita from "./assets/img/receita.png";
import EPIC from "./assets/img/logo-epicOFI.png";

function App() {
  const [array] = useState([1, 2, 3, 4, 5]);
  const [displayArray, setDisplayArray] = useState([]);
  const [displayEl, setDisplayEl] = useState();
  const [chartData, setChartData] = useState([]);
  const [key, setKey] = useState("logs");

  const delay = (ms) =>
    new Promise((res) => {
      setTimeout(() => {
        res();
      }, ms);
    });

  useEffect(() => {
    (async function () {
      for (let el of chartData) {
        await delay(1500);
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
  }, []);

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
          color: "#708090",
          display: true,
          text: "Tempo (s)",
          font: {
            size: 20,
          },
        },
        grid: {
          color: "grey",
          borderColor: "#708090",
          tickColor: "#708090",
        },
        ticks: {
          color: "#708090",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      y: {
        title: {
          color: "#708090",
          display: true,
          text: "Porcentagem",
          font: {
            size: 20,
          },
        },
        grid: {
          color: "grey",
          borderColor: "#708090",
          tickColor: "#708090",
        },
        ticks: {
          color: "#708090",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
    },
  };

  const labels = chartData.map((item, index) => {
    return `${index}`;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Umidade do solo",
        data: chartData.map((item) => {
          return Number(item.soil_humity);
        }),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Temperatura",
        data: chartData.map((item) => {
          return Number(item.temperature);
        }),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Umidade do Ar",
        data: chartData.map((item) => {
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
        <Col style={{ padding: 5, backgroundColor: "white", width: "13%", heigth: "10vh", position: "absolute", right: 0 }}>
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
            width: "70%",
            height: "100vh",
            backgroundColor: "transparent",
            borderRadius: "5px 5px 5px 5px",
          }}
        >
          <CardHeader
            style={{
              width: "95%",
              height: "40px",
              backgroundColor: "#708090",
              borderRadius: "5px 5px 0px 0px",
              color: "white",
              display: "flex",
              justifyContent: "center",
              fontSize: "22px",
              fontWeight: "bold",
            }}
          >
            <div style={{ marginTop: "10px" }}>Medição Geral</div>
          </CardHeader>
          <CardBody>
            <ChartContainer>
              <Line options={options} data={data} />
            </ChartContainer>
          </CardBody>
        </Card>
        <Col>
          <Row style={{borderRadius: 5}}>
            <Card
              style={{
                width: "110%",
                height: "37vh",
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
                  backgroundColor: "#708090",
                  borderRadius: "5px 5px 0px 0px",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              ></CardHeader>
              <CardBody>
                <LogList>
                  <LogContainer>
                    {displayArray.map((elem, key) => (
                      <Row key={key}>
                        {`💦: ${elem.soil_humity}% 🌡️:${elem.temperature}°C 🍃${elem.air_humity}`}
                      </Row>
                    ))}
                  </LogContainer>
                </LogList>
              </CardBody>
            </Card>
          </Row>
          <Row>
            <Card style={{width: "110%", height: "23vh", borderRadius: "5px 5px 5px 5px",backgroundColor: "white"}}>
              <CardHeader
                style={{
                  width: "100%",
                  height: "40px",
                  margintop: "10px",
                  backgroundColor: "#708090",
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
              <CardBody style={{textAlign: "left", fontSize: 13}}>
                  <Row style={{marginTop: 5}}>Dr. Ricardo Wagner M.Gomes / Receita Federal Tocantins / Delegado</Row>
                  <Row style={{marginTop: 5}}>Prof. Dr. Edeilson Milhomem da Silva / C. Computação-UFT / Coordenador</Row>
                  <Row style={{marginTop: 5}}>Prof. Dr. Warley Gramacho da Silva/ C. Computação-UFT / Coordenador</Row>
                  <Row style={{marginTop: 5}}>Prof. Dr. Eliel Poggi dos Santos / UFT / Pesquisador</Row>
                  <Row style={{marginTop: 5}}>Marcos Gilmário Ferreira Moreira / Graduando C. Computação-UFT</Row>
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
