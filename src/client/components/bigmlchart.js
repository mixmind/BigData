import React, {
  Component,
  Fragment
} from 'react';
import {
  Bar as BarChart
} from 'react-chartjs-2';

import axios from 'axios';

import '../app.css';

class bigmlchart extends Component {
  constructor(props) {
    super(props);
    const optionsprobabilitys = {
      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          stacked: true,
          ticks: {
            min: 0,
            callback(value) { if (value % 1 === 0) { return value; } },
            fontSize: 16,
            fontColor: 'black'
          }
        }]
      }
    };

    this.state = {
      chartData: '',
      probabilityData: '',
      showData: false,
      probabilitysOptions: optionsprobabilitys
    };
  }

  componentDidMount = (e) => {
    axios
      .get('http://35.208.177.111:8080/results')
      .then((response) => {
        console.log('resp',response);
        const net = response.data;
        const lables = [];
        const probPercent = [];

        for (let i = 0; i < 25; i++) {
          console.log(net[i]);
          lables.push(net[i][0]);
          probPercent.push(net[i][1]);
        }

        const data = {
          labels: lables,
          beginAtZero: true,
          datasets: [{
            label: 'היסתברות לקניה ביחד',
	    backgroundColor: ['#1220cd',
		                  '#a20ca1', '#00ba9f',
		                  '#e86e11', '#66dce4',
		                  '#e31a26', '#1e7bed',
		                  '#fef735', '#f985bd',
		                  '#a20ca1', '#00ba9f',
		                  '#e86e11', '#66dce4',
		                  '#e31a26', '#1e7bed',
		                  '#fef735', '#f985bd',
		                  '#a20ca1', '#00ba9f',
		                  '#e86e11', '#66dce4',
		                  '#e31a26', '#1e7bed',
		                  '#fef735', '#f985bd',],
            borderColor: '#00CED1',
            borderWidth: 0,
            data: probPercent,
            yAxisID: 'y-axis-orders'
          }]
        };

        this.setState({
          chartData: data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { chartData, probabilityData, probabilitysOptions } = this.state;

    const options = {
      scales: {
        xAxes: [{
          barPercentage: 1,
          categoryPercentage: 0.7
        }],
        yAxes: [{
          id: 'y-axis-orders',
          ticks: {
            beginAtZero: true,
            callback(value) {
              if (value % 1 === 0) {
                return value;
              }
            },
            fontSize: 16,
            fontColor: 'black'
          }
        }, {
          id: 'y-axis-sum',
          ticks: {
            beginAtZero: true,
            callback(value) {
              if (value % 1 === 0) {
                return value;
              }
            },
            fontSize: 16,
            fontColor: 'black'
          }
        }]
      }
    };

    return (
      <Fragment>
        <div className="chart-main col-centered">
          <div className="chart-container">
            <BarChart
              data={chartData}
              options={options}
              width={800}
              height={400}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default bigmlchart;
