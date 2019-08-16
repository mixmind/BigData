import React, {
  Component,
  Fragment
} from 'react';
import {
  Bar as BarChart
} from 'react-chartjs-2';

import axios from 'axios';

import '../app.css';

class retailerschart extends Component {
  constructor(props) {
    super(props);
    const optionsretailers = {
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
      retailerData: '',
      showData: false,
      retailersOptions: optionsretailers
    };
  }

  componentDidMount = (e) => {
    axios
      .get('http://localhost:8080/retailers')
      .then((response) => {
        console.log(response.data);
        const lables = [];
        const invoiceCount = [];
        const totalSum = [];

        for (const obj of response.data) {
          lables.push(obj.name);
          invoiceCount.push(obj.orders);
          totalSum.push(obj.sum);
        }

        const data = {
          labels: lables,
          beginAtZero: true,
          datasets: [{
            label: 'סה"כ הכנסה',
            backgroundColor: ['#1220cd',
              '#a20ca1', '#00ba9f',
              '#e86e11', '#66dce4',
              '#e31a26', '#1e7bed',
              '#fef735', '#f985bd'],
            borderColor: '#2F4F4F',
            borderWidth: 0,
            data: totalSum,
            yAxisID: 'y-axis-sum'
          }, {
            label: 'סה"כ חשבוניות',
            backgroundColor: ['#5b667c',
              '#830681', '#007a66',
              '#903f0b', '#47939b',
              '#b00d14', '#154891',
              '#9d9620', '#bf5186'],
            borderColor: '#00CED1',
            borderWidth: 0,
            data: invoiceCount,
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
    const { chartData, retailerData, retailersOptions } = this.state;

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
              width={400}
              height={200}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default retailerschart;
