<template>
    <div class="my-5">
        <div class="row justify-content-center mx-0">
            <div class="col-sm-12 col-md-8 col-lg-7">
                <div class="form-inline justify-content-center">
                    <input type="text" class="form-control"
                           placeholder="search query"
                           v-model="searchText"
                           v-on:keyup.enter="searchBooks(searchText)"/>
                    <input type="button" class="btn btn-primary"
                           value="Search"
                           @click="searchBooks(searchText)"/>
                    <button class="btn btn-light ml-2" @click="$router.push('cart')">
                        <font-awesome-icon icon="shopping-cart"></font-awesome-icon>
                        <span v-if="!isEmptyCart" class="ml-3">
                            Added products: {{cartCount}}, total cost: {{cartCost | formatCost}}
                        </span>
                    </button>
                </div>
            </div>
        </div>
        <Books class="mb-5"/>
    </div>
</template>

<script>
    import {mapActions} from "vuex";
    import Books from "../components/Books";

    export default {
        name: 'home',
        components: {
            Books
        },
        mounted() {
            this.searchText = this.$store.state.sResult.searchText;
            this.checkSubmittedCart();
        },
        data() {
            return {
                searchText: "",
                searchResults: {}
            }
        },
        methods: {
            ...mapActions([
                'searchBooks',
                'resetSubmittedCartStatus'
            ]),
            checkSubmittedCart() {
                if (this.$store.state.submittedCartStatus.isActive) {
                    const totalCost = this.$store.state.submittedCartStatus.totalCost;
                    this.$alertify.success(
                        `Your order for ${totalCost.toFixed(2)}&#8372; completed successfully`);
                }
                setTimeout(this.resetSubmittedCartStatus, 3000);
            },
        },
        computed: {
            cartCount() {
                return this.$store.state.shopCart.products.length;
            },
            cartCost() {
                return this.$store.state.shopCart.totalCost;
            },
            isEmptyCart() {
                return this.$store.state.shopCart.totalCost === 0;
            }
        },
        filters: {
            formatCost(cost) {
                return cost.toFixed(2);
            }
        }
    }
</script>
