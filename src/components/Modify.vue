<template>
  <div>
    <!-- {{datapacket}} -->
    <p v-for = "(val, key, index) in datapacket" v-bind:key = "index">
        {{key}}: {{val}} <br><br>
        <input type = "number" min = "0" placeholder = "0" v-bind:id = index /> <br>
    </p>
    <button v-on:click = "updateOrder">Update Order</button> 
  </div>
</template>

<script>
import database from "../firebase.js"

export default {
  data() {
    return {
        datapacket: {}, 
        po: 0
    }
  }, 
  methods: {
      fetchItems: function() {
          //alert("fetch")
          database.collection('orders').get().then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        if (doc.id === this.$route.params.id) {
                            this.datapacket = doc.data();
                        }
                    })
                })
      }, 
      updateOrder: function() {
          let dp = Object.assign({}, this.datapacket);
          dp = Object.entries(dp);
          console.log(dp);

          for (var i = 0; i < 6; i++) {
              // assign the new number from input field into the dp object
              if (document.getElementById(i).value !== "") {
                dp[i][1] = Number(document.getElementById(i).value);
              } else {
                dp[i][1] = 0;
              }
          }
          dp = Object.fromEntries(dp);
          console.log(dp); 

          var cp = dp["Cereal Prawn"];
          var dbhf = dp["Dry Beef Hor Fun"];
          var mt = dp["Mapo Tofu"];
          var pfr = dp["Pork Fried Rice"];
          var po = dp["Prawn omelette"];
          var sk = dp["Sambal KangKung"]

          database.collection("orders").doc(this.$route.params.id).set({
              "Cereal Prawn": cp, 
              "Dry Beef Hor Fun": dbhf,
              "Mapo Tofu": mt,
              "Pork Fried Rice": pfr,
              "Prawn omelette": po,
              "Sambal KangKung": sk
          }).then(() => {
              this.$router.push({path: '/orders'});
          });
          

      }
  }, 
  created() {
      this.fetchItems();
  }
}
</script>

<style scoped>
button {
  width: 120px;
  height: 40px;
  background-color: lightseagreen;
  border-radius: 10px;
  border-width: 1px;
}
</style>