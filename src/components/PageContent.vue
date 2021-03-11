<template>
    <div>
        <div id = "itemsList">
        <nav>
        <ul>
            <li><router-link to = "/" exact>Home</router-link></li>
            <li><router-link to = "/orders" exact>Orders</router-link></li>
            <li><router-link to = "/dashboard" exact>Dashboard</router-link></li>
        </ul>
        </nav>
        <ul>
            <li v-for = "item in itemsList" v-bind:key = "item.name">
                {{item.name}}<br>
                <img v-bind:src = "item.imageURL"><br><br>
                $ {{item.price}}<br><br>
                <counter v-bind:item = "item" v-on:counter = "onCounter"></counter>
            </li>
        </ul>
        </div>
        <div id = "shoppingBasket">
        <Basket v-bind:itemsSelected = "itemsSelected"></Basket>
        </div>
    </div>
</template>

<script>
import QuantityCounter from './QuantityCounter.vue'
import Basket from './Basket.vue'
import database from "../firebase.js"

export default {
    components: {
        "counter": QuantityCounter,
        Basket
    },
    data() {
        return {
            itemsList: [],
            itemsSelected: []
        }
    }, 
    methods: {
        fetchItems: function() {
            database.collection('menu').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    this.itemsList.push(doc.data());
                })
            })
        },
        onCounter: function (item, count) {
            var added = false;
            if (this.itemsSelected.length === 0 && count > 0) {
                this.itemsSelected.push([item.name, count, item.price]);
                added = true;
            } else {
                for (let i = 0; i < this.itemsSelected.length; i++) {
                    const curr_item = this.itemsSelected[i];
                    const item_name = curr_item[0];
                    if (item_name === item.name && count > 0) {
                        this.itemsSelected.splice(i, 1, [item.name, count, item.price]);
                        added = true;
                        console.log(this.itemsSelected[i]);
                        break;
                    } else if (item_name === item.name && count === 0) {
                        this.itemsSelected.splice(i, 1);
                        added = true;
                        break;
                    } 
                }
                if (added === false && count > 0) {
                    this.itemsSelected.push([item.name, count, item.price]);
                }
            }
        }
    }, 
    created() {
        this.fetchItems();
    }
}
</script>

<style scoped>
#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
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
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}
</style>