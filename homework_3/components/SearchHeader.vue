<template>
    <div class="my-4">
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
                    <button class="btn btn-light ml-2" @click="$router.push('/cart')">
                        <font-awesome-icon icon="shopping-cart"></font-awesome-icon>
                        <span v-if="!isEmptyCart" class="ml-3">
                            Added products: {{cartCount}}, total cost: {{cartCost | formatCost}}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: 'SearchHeader',
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
                'resetSubmittedCartStatus'
            ]),
            searchBooks() {
                if (this.searchText) {
                    this.$router.push(`/search/${encodeURIComponent(this.searchText)}`);
                }
            },
            checkSubmittedCart() {
                if (this.$store.state.submittedCartStatus.isActive) {
                    const totalCost = this.$store.state.submittedCartStatus.totalCost;
                    this.$alertify.success(
                        `Your order for ${totalCost.toFixed(2)}&#8372; completed successfully`);

                    setTimeout(this.resetSubmittedCartStatus, 3000);
                }
            },
        },
        computed: {
            searchQuery() {
                return this.$store.state.sResult.searchText;
            },
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
        },
        watch: {
            searchQuery: function (newVal, oldVal) {
                this.searchText = newVal;
            }
        }
    }
</script>
