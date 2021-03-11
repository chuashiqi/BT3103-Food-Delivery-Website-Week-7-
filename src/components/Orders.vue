<template>
    <div>
        <nav>
        <ul>
            <li><router-link to = "/" exact>Home</router-link></li>
            <li><router-link to = "/orders" exact>Orders</router-link></li>
            <li><router-link to = "/dashboard" exact>Dashboard</router-link></li>
        </ul>
        </nav>
        <ul>
            <li v-for = "order in orders" v-bind:key = "order.index">
                Cereal Prawn: {{order[1]["Cereal Prawn"]}} <br>
                Prawn omelette: {{order[1]["Prawn omelette"]}} <br>
                Pork Fried Rice: {{order[1]["Pork Fried Rice"]}} <br>
                Sambal KangKung: {{order[1]["Sambal KangKung"]}} <br>
                Dry Beef Hor Fun: {{order[1]["Dry Beef Hor Fun"]}} <br>
                Mapo Tofu: {{order[1]["Mapo Tofu"]}} <br>
                <button v-bind:id = "order[0]" v-on:click = "deleteItem($event)">Delete</button>
                <button v-bind:id = "order[0]" v-on:click = "route($event)">Modify</button>
            </li>
        </ul>
    </div>
</template>

<script>
import database from "../firebase.js"

export default {
    data() {
        return {
            orders: []
        }
    }, 
    methods: {
        fetchItems: function() {
            database.collection('orders').get().then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        this.orders.push([doc.id, doc.data()]);
                    })
                })
        }, 
        deleteItem: function(event) {
            let doc_id = event.target.getAttribute("id");
            database.collection("orders").doc(doc_id).delete().then(() => {
                this.orders = this.orders.filter(o => o[0] !== doc_id);
                location.reload();
            });
        }, 
        route: function(event) {
            let doc_id = event.target.getAttribute("id"); 
            this.$router.push({name: 'modify', params: {id: doc_id}});
        }
    }, 
    created() {
        this.fetchItems();
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
