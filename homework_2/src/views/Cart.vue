<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">
                <font-awesome-icon icon="reply"></font-awesome-icon>
                Back
            </router-link>
        </div>
        <div class="container mb-5" v-if="!isEmptyCart">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th scope="col">Thumbnail</th>
                    <th scope="col">Description</th>
                    <th scope="col">Cost</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in shopCart.products"
                    :key="index">
                    <td>
                        <img class="small-thumbnail"
                             :src="item.thumbUrl"
                             alt="small thumbnail">
                    </td>
                    <td class="va-mid">
                        <p class="font-small">
                            {{ item.description }}
                        </p>
                    </td>
                    <td class="va-mid">{{ item.amount | formatCost}}</td>
                </tr>
                </tbody>
            </table>
            <button class="btn btn-primary" @click="submitCart">
                <font-awesome-icon icon="hryvnia"></font-awesome-icon>
                <span>&nbsp;Submit order</span>
            </button>
        </div>
        <div v-else>
            <h4>
                <span>Your cart is empty. Nothing to show&nbsp;</span>
                <font-awesome-icon icon="grin-beam-sweat"></font-awesome-icon>
            </h4>
        </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: 'cart',
        methods: {
            ...mapActions([
                "submitShoppingCart"
            ]),
            submitCart() {
                this.submitShoppingCart();
                this.$router.push("/");
            }
        },
        computed: {
            shopCart() {
                return this.$store.state.shopCart;
            },
            isEmptyCart() {
                return this.shopCart.products.length === 0
            }
        },
        filters: {
            formatCost(cost) {
                return cost.toFixed(2);
            }
        }
    }
</script>

<style scoped>
    .font-small {
        font-size: 80%;
        text-align: left;
    }
    .va-mid {
        vertical-align: middle;
    }
</style>