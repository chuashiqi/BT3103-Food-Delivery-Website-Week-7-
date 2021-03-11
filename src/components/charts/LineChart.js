import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{ 
                label: "west",
                data: [],
                fill: false, 
                borderColor: "red",
            },
            { 
                label: "national",
                data: [],
                fill: false, 
                borderColor: "blue",
            }, 
            { 
                label: "east",
                data: [],
                fill: false, 
                borderColor: "purple",
            }, { 
                label: "central",
                data: [],
                fill: false, 
                borderColor: "pink",
            }, 
            { 
                label: "south",
                data: [],
                fill: false, 
                borderColor: "orange",
            }, 
            { 
                label: "north",
                data: [],
                fill: false, 
                borderColor: "green",
            }
            ]
        },
        options: {
            legend: { display: true },
            title: {
              display: true,
              text: 'PSI Twenty Four Hourly (By Region)'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    
    fetchItems : function(){
        //retrieves data from api
        axios.get('https://api.data.gov.sg/v1/environment/psi?date=2021-02-23').then(response=>{
          this.results=response.data.items
          //console.log(this.results) // pick fields that we want to use
          
          for(let key in this.results){
            //this.chartdata.datasets[0].data.push(this.results[key]) // set values
            //console.log(this.results[key]["readings"]["psi_twenty_four_hourly"]['west'])
            this.datacollection.labels.push(this.results[key]["timestamp"]+'')  //set keys
            this.datacollection.datasets[0].data.push(this.results[key]["readings"]["psi_twenty_four_hourly"]["west"])
            this.datacollection.datasets[1].data.push(this.results[key]["readings"]["psi_twenty_four_hourly"]["national"])
            this.datacollection.datasets[2].data.push(this.results[key]["readings"]["psi_twenty_four_hourly"]["east"])
            this.datacollection.datasets[3].data.push(this.results[key]["readings"]["psi_twenty_four_hourly"]["central"])
            this.datacollection.datasets[4].data.push(this.results[key]["readings"]["psi_twenty_four_hourly"]["south"])
            this.datacollection.datasets[5].data.push(this.results[key]["readings"]["psi_twenty_four_hourly"]["north"])

          }
          //console.log(this.datacollection.labels)
          //console.log(this.datacollection.datasets.data)
        this.renderChart(this.datacollection,this.options)
            
    })
    
    }
  },
  created () {
    this.fetchItems()
  }
}