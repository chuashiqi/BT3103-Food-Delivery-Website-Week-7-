<template>
    <div>
        <button v-on:click = "increment()">+</button>
        {{counter}}
        <button v-on:click = "decrement()">-</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            counter: 0
        }
    },
    methods: {
        increment:function() {
            if (this.counter == 10) {
                alert("You cannot buy more than 10 items.");
            } else {
                this.counter += 1;
            }
            this.$emit('counter', this.item, this.counter);
        },
        decrement:function() {
            if (this.counter > 0) {
                this.counter -= 1;
            }
            this.$emit('counter', this.item, this.counter);
        }
    },
    props: {
        item: {
            type: Object
        }
    }
}
</script>

<style scoped>
button {
    background-color: lightseagreen;
}
</style>