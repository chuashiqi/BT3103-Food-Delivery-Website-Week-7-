<template>
    <div>
        <!-- {{itemsSelected}} -->
        Menu:
        <ul>
            <li v-for = "item in itemsSelected" v-bind:key = "item.name">
                {{item[0]}} x {{item[1]}}
            </li>
        </ul>
        <button v-on:click = "findTotal(); sendOrder();">Send Order</button>
        <p v-if = "clicked === true">Subtotal: ${{sub}}</p>
        <p v-if = "clicked === true">Grand Total: ${{grand}}</p>
    </div>
</template>

<script>
import database from "../firebase.js"

export default {
    props: {
        itemsSelected: {
            type: Array
        }
    },
    data() {
        return {
            sub: 0,
            grand: 0, 
            clicked: false
        }
    },
    methods: {
        findTotal: function() {
            this.clicked = true;
            for (var item of this.itemsSelected) {
                console.log(typeof item);
                console.log(item);
                this.sub += (item[2] * item[1]);
            }
        }, 
        sendOrder: function() {
            var cp = 0;
            var po = 0;
            var pfr = 0;
            var sk = 0;
            var dbhf = 0;
            var mt = 0;
            for (var item of this.itemsSelected) {
                if (item[0] === "Cereal Prawn") {
                    cp = item[1];
                } else if (item[0] === "Prawn omelette") {
                    po = item[1];
                } else if (item[0] === "Pork Fried Rice") {
                    pfr = item[1];
                } else if (item[0] === "Sambal KangKung") {
                    sk = item[1];
                } else if (item[0] === "Dry Beef Hor Fun") {
                    dbhf = item[1];
                } else if (item[0] === "Mapo Tofu") {
                    mt = item[1];
                }
            }
            database.collection("orders").add({
                "Cereal Prawn": cp, 
                "Prawn omelette": po, 
                "Pork Fried Rice": pfr, 
                "Sambal KangKung": sk, 
                "Dry Beef Hor Fun": dbhf, 
                "Mapo Tofu": mt
            }).then(() => {
                location.reload()
            });
            
        
           /*
           const order = this.itemsSelected.map((obj) => {
               return Object.assign({}, obj)
           });
           database.collection("orders").add(order).then(() => location.reload());
           */
        }
    },
    watch: {
        sub: function() {
            this.grand = this.sub * 1.07;
            this.grand = this.grand.toFixed(2);
        }
    }
}
</script>

<style scoped>
button {
    background-color: lightseagreen;
}
</style>