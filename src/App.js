import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import logo from './logo.svg';
import './App.css';
import { Container as Body, Header, ChartContainer } from './assets/styled';
import { Card, CardBody } from 'reactstrap';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    labels:{color: white},
    title: {
      display: true,
      text: 'Medição Geral',
      color: 'white',
      font: {
        size: 20,
      }
    },
  },
    scales: {
      x: {
        title: {
          color: 'red',
          display: true,
          text: 'Tempo',
          font: {
            size: 24
          }
        },
        grid: {
          color: 'grey',
          borderColor: 'red',
          tickColor: 'red'
        },
        ticks: {
          color: 'white',
          font: {
            size: 14,
            weight: 'bold',
          }
        }
      },
      y: {
        title: {
          color: 'red',
          display: true,
          text: 'Porcentagem',
          font: {
            size: 24,
          }
        },
        grid: {
          color: 'gray',
          borderColor: 'red',
          tickColor: 'red'
        },
        ticks: {
          color: 'white',
          font: {
            size: 14,
            weight: 'bold',
          }
        }
      }
    }
};

const labels = ['1m', '2m', '3m', '4m', '5m', '6m', '7m'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Umidade do solo',
      data: [1,2,3,4,3,2,2,5],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Temperatura',
      data: [1,5,3,1,3,4,1,5],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Umidade do Ar',
      data: [3,2,5,1,6,4,0,3],
      borderColor: 'rgb(123, 133, 235)',
      backgroundColor: 'rgba(123, 133, 235, 0.5)',
    },
  ],
};

function App() {
  return (
    <div className="App">
      <Header>
        teste
      </Header>
      <Body>
        <Card
          style={{ width: '70%',backgroundColor: 'transparent' }}>
          <CardBody>
            <ChartContainer >
              <Line options={options} data={data} />
            </ChartContainer>
          </CardBody>
        </Card>
        <Card
          style={{ width: '30%', height: '350px', borderRadius: '20px', padding: 20, boxShadow: '5px 5px 5px 5px white', backgroundColor: 'white' }}>
          <CardBody>
    
          </CardBody>
        </Card>
      </Body>
      
    </div>
  );
}

export default App;
