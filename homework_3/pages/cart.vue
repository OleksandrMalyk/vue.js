<template>
    <div id="app">
        <div id="nav" class="text-center my-4">
            <button class="btn btn-secondary"
                    @click="$router.go(-1)">
                <font-awesome-icon icon="reply"></font-awesome-icon>
                Back
            </button>
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
                            {{ item.description | formatDescription}}
                        </p>
                    </td>
                    <td class="va-mid">{{ item.amount | formatCost}}</td>
                </tr>
                </tbody>
            </table>
            <ul class="list-group list-group-horizontal-sm font-weight-bold my-3">
                <li class="list-group-item">Total cost</li>
                <li class="list-group-item">{{shopCart.totalCost | formatCost}}</li>
            </ul>
            <button class="btn btn-success" @click="$router.push('/checkout')">
                <span>Checkout</span>
            </button>
        </div>
        <div v-else class="text-center my-4">
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
        layout: 'cart',
        data() {
            return {
                email: "",
                phone: "",
                name: "",
                validity: {
                    name: false,
                    phone: false,
                    email: false,
                    nameState: null,
                    emailState: null,
                    phoneState: null
                },
            }
        },
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
            },
            formatDescription(descr) {
                return descr ? descr : "no description";
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
