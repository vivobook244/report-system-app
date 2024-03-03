
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    BarElement,
  } from 'chart.js';
import {Bar} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
);

  export default function barChart(props){
    
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text:  props.judul,
          },
        },
      };
    const labels = props.legenda;
    const dataset = props.data;
    const data = {
        labels,
        datasets: [
          {
               data: labels.map(
                (value,index)=> dataset.at(index).jumlah
            ),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
    
    return <Bar options={options} data={data} />
  }