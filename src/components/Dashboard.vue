<template>
    <div>
        <nav>
        <ul>
            <li><router-link to = "/" exact>Home</router-link></li>
            <li><router-link to = "/orders" exact>Orders</router-link></li>
            <li><router-link to = "/dashboard" exact>Dashboard</router-link></li>
        </ul>
        </nav>
        <div id="barchart">
            <bar-chart></bar-chart>
        </div>
        <div id="linechart">
            <line-chart></line-chart>
        </div>
    </div>
</template>

<script>
//import database from "../firebase.js"
import barchart from '../components/charts/BarChart.vue'
import linechart from '../components/charts/LineChart.vue'

export default {
    data() {
        return {
        }
    }, 
    methods: {
    }, 
    components:{
        'bar-chart':barchart,
        'line-chart': linechart
    }
}
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

button {
  width: 65px;
  height: 30px;
  background-color: lightseagreen;
  border-radius: 10px;
  border-width: 1px;
}
</style>