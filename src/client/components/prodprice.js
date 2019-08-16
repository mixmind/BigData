import React, { Component, Fragment } from 'react'
import {Polar as RadChart} from 'react-chartjs-2';
import axios from 'axios';
import DatePicker from "react-datepicker";
import Select from 'react-select';

import "react-datepicker/dist/react-datepicker.css";

import '../app.css'

const options = [
  { value: 'milk 1%', label: 'חלב 1%' },
  { value: 'milk 3%', label: 'חלב 3%' },
  { value: 'white bread', label: 'לחם לבן' },
  { value: 'brown bread', label: 'לחם שחור' },
  { value: 'butter', label: 'חמאה' },
  { value: 'white cheese', label: 'גבינה לבנה' },
  { value: 'eggs XL', label: 'ביצים XL' },
  { value: 'eggs L', label: 'ביצים L' },
  { value: 'eggs M', label: 'ביצים M' },
  { value: 'kotej', label: 'קוטג' },
  { value: 'onion 1kg', label: 'בצל 1 ק"ג' },
  { value: 'tester choise', label: 'טסטר צ\'ויס' },
  { value: 'banana 1kg', label: 'בננה 1 ק"ג' },
  { value: 'milki', label: 'מילקי' },
  { value: 'sugar', label: 'סוכר' },
  { value: 'tuna', label: 'טונה' },
  { value: 'pasta', label: 'פסטה' },
  { value: 'ketchup', label: 'קטשופ' },
  { value: 'sweet corn', label: 'טירס מטוק' },
  { value: 'Coca Cola Zero', label: 'קולה זירו' },
  { value: 'humus', label: 'חומוס' },
  { value: 'chiken 1kg', label: 'אוף 1 ק"ג' },
  { value: 'Water 6pc', label: 'מים 6' },
  { value: 'potato', label: 'תפוח אדמה' },
  { value: 'salmon 1kg', label: 'סלומון 1 ק"ג' },
];

class prodprice extends Component {
  constructor(props) {
      super(props);

      const options = {
        scaleShowGridLines: true,
        scaleGridLineColor: 'rgba(0,0,0,.05)',
        scaleGridLineWidth: 1,
        scaleShowHorizontalLines: true,
        scaleShowVerticalLines: true,
        bezierCurve: true,
        bezierCurveTension: 0.4,
        pointDot: true,
        pointDotRadius: 4,
        pointDotStrokeWidth: 1,
        pointHitDetectionRadius: 20,
        datasetStroke: true,
        datasetStrokeWidth: 2,
        datasetFill: true,
        legendTemplate: '<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
      }

      const styles = {
        graphContainer: {
          border: '1px solid black',
          padding: '15px'
        }
      }

      this.state = {
        startDate: new Date(),
        endDate: new Date(),
        selectedOption: "",
        showGraph: false,
        chartData: "",
        chartOptions: options
      };
      this.handleChangeStart = this.handleChangeStart.bind(this);
      this.handleChangeEnd = this.handleChangeEnd.bind(this);
    }


      onSubmitHandler = (e) => {
        if (this.state.selectedOption['value'] == null) {
          alert("צריך לבחור מוצר")
          exit();
        }

        console.log(this.state.selectedOption['value']);
        let body = {
          productName: this.state.selectedOption['value'],
          start: this.state.startDate,
          end: this.state.endDate
        }

        console.log(body);
        e.preventDefault();
        axios
        .post("http://35.208.177.111:8080/product-price", body)
        .then(response => {
          this.setState({showGraph: true})
          console.log(response.data);
          let lables = [];
          let prices = [];

          for (const obj of response.data) {
            lables.push(obj['retailer']);
            prices.push(obj['prices']);
          }

          let data = {
          labels: lables,
          datasets: [{
            label: this.state.selectedOption['label'] + " price range",
            backgroundColor: ['#1220cd',
              '#a20ca1','#00ba9f',
              '#e86e11','#66dce4',
              '#e31a26','#1e7bed',
              '#fef735','#f985bd'],
            meta: { color: ['blue' ,'green']},
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            data: prices,
          }]
          };

          this.setState({chartData: data})
        })
        .catch(error => {
          console.log(error);
        });
      }


  handleChangeStart(date) {
     this.setState({
       startDate: date
     });
   }

   handleChangeEnd(date) {
      this.setState({
        endDate: date
      });
    }

    handleChange = selectedOption => {
      this.setState({ selectedOption });
      console.log(`Option selected:`, selectedOption);
    };

render() {
  const { chartData, chartOptions } = this.state;
   return (
     <Fragment>
     <div className={this.state.showGraph ? "container" : ""}>
     <h2 className="chart-title">בחר מוצר להשוות מחיר</h2>
       <div className="data-to-pick">
         <Select
           value={this.state.selectedOption}
           onChange={this.handleChange}
           options={options}
           className= "select-dropdown"
         />
         <p><DatePicker selected={this.state.endDate} onChange={this.handleChangeEnd} className="date" dateFormat="dd/MM/yyyy"/>:ל </p>
         <p><DatePicker selected={this.state.startDate} onChange={this.handleChangeStart} className="date" dateFormat="dd/MM/yyyy"/>:מ </p>
         <button className="btn-volume" onClick={this.onSubmitHandler}>בדוק</button>
       </div>

     {this.state.showGraph ?
     <div className="chart-main col-centered">
       <RadChart data={chartData} options={chartOptions} width="600" height="250" />
       </div>
       : <div></div>
     }
     </div>
     </Fragment>
   );
 }
}

export default prodprice;
