import React, { useState, useEffect, useCallback } from 'react'
import './style.scss'
import axios from 'axios'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import env from '../../static/env'

ChartJS.register(ArcElement, Tooltip, Legend);

const today = new Date();
const formattedDate = today.toISOString().split('T')[0];

export default function PollutionChart() {
  const [pollutionData, setPollutionData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(formattedDate);
  const [aqiDescription, setAqiDescription] = useState("");

  const gasesName = Object.keys(pollutionData);
  const gasesValue = Object.values(pollutionData);
  const lat = "28.5640491059084358";
  const lon = "77.117794348938"

  const data = {
    labels: gasesName,
    datasets: [
      {
        data: gasesValue.map(entry => entry),
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(85, 190, 113, 1)',
          'rgba(179, 179, 179, 1)',
          'rgba(255, 60, 20, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const date = Math.floor(new Date(selectedDate).getTime() / 1000);

  const getAqiDescription = (aqi) => {
    let aqiDescription;
    switch (aqi) {
      case 1:
        setAqiDescription('Good');
        break;
      case 2:
        setAqiDescription('Fair');
        break;
      case 3:
        setAqiDescription('Moderate');
        break;
      case 4:
        setAqiDescription('Poor');
        break;
      case 5:
        setAqiDescription('Very Poor');
        break;
      default:
        setAqiDescription('Unknown');
        break;
    }
    return aqiDescription;
  }

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/air_pollution/history?lat=${lat}&lon=${lon}5&start=${date}&end=${date}&appid=${env.API_KEY}`
      );
      setPollutionData(response?.data?.list[0]?.components);
      getAqiDescription(response?.data?.list[0]?.main?.aqi);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [lat, lon, date]);

  useEffect(() => {
    fetchData();
  }, [selectedDate, fetchData]);

  return (
    <div className='chart-outer'>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="chart-inner">
              <h2>Air Quality {aqiDescription}</h2>
              <input
                type="date"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
              />
              <Doughnut data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
