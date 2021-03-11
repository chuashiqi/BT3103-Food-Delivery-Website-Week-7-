import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: ["Pork Fried Rice", "Mapo Tofu", "Sambal KangKung", "Cereal Prawn", "Dry Beef Hor Fun", "Prawn Omelette"],
            datasets: [{
                label: "Number ordered",
                backgroundColor: ["blue", "purple", "pink", "green", "red", "grey"],
                data: [],
                count: 0
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total Number of each dish'
            },
            responsive: true,
            maintainAspectRatio: false,
            scales:{
              yAxes:[{
                  ticks:{
                      min: 0, 
                      stepSize: 1
                  }
               }],   
          }
        }, 
    }
  },
  methods: {
    fetchItems: function () {
      database.collection('orders').get().then(querySnapShot => {
        var cp = 0;
        var dbhf = 0;
        var mt = 0;
        var pfr = 0;
        var po = 0;
        var sk = 0;

        querySnapShot.forEach(doc => { 

          cp += doc.data()["Cereal Prawn"];
          dbhf += doc.data()["Dry Beef Hor Fun"];
          mt += doc.data()["Mapo Tofu"];
          pfr += doc.data()["Pork Fried Rice"];
          po += doc.data()["Prawn omelette"];
          sk += doc.data()["Sambal KangKung"];
          
        })

        this.datacollection.datasets[0].data.push(pfr);
        this.datacollection.datasets[0].data.push(mt);
        this.datacollection.datasets[0].data.push(sk);
        this.datacollection.datasets[0].data.push(cp);
        this.datacollection.datasets[0].data.push(dbhf);
        this.datacollection.datasets[0].data.push(po);
        this.renderChart(this.datacollection, this.options)
      })
    }
  },
  created () {
    this.fetchItems()
  }
}