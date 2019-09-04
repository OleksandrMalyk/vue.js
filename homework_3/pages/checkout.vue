<template>
    <div>
        <div id="nav" class="text-center my-4">
            <button class="btn btn-secondary"
                    @click="$router.go(-1)">
                <font-awesome-icon icon="reply"></font-awesome-icon>
                Back
            </button>
        </div>
        <b-container fluid>
            <b-row class="align-items-center justify-content-center">
                <b-col cols="12" sm-="10" md="10" lg="10" xl="4">
                    <h4>Checkout</h4>
                    <div ref="form" @submit.stop.prevent="handleSubmit"
                          class="order-form">
                        <b-form-group
                            :state="validity.nameState"
                            label="Name"
                            label-for="name-input"
                            invalid-feedback="Name is required and must be at least 2 symbols">
                            <b-form-input
                                id="name-input"
                                v-model="name"
                                :state="validity.nameState"
                                required>
                            </b-form-input>
                        </b-form-group>
                        <b-form-group
                            :state="validity.phoneState"
                            label="Telephone number"
                            label-for="phone-input"
                            invalid-feedback="Required valid UA telephone number">
                            <b-form-input
                                id="phone-input"
                                v-model="phone"
                                :state="validity.phoneState"
                                required>
                            </b-form-input>
                        </b-form-group>
                        <b-form-group
                            :state="validity.emailState"
                            label="Email"
                            label-for="email-input"
                            invalid-feedback="Required valid email address">
                            <b-form-input
                                id="email-input"
                                v-model="email"
                                :state="validity.emailState"
                                required>
                            </b-form-input>
                        </b-form-group>
                        <button class="btn btn-primary" @click="submit">
                            <font-awesome-icon icon="hryvnia"></font-awesome-icon>
                            <span>&nbspSubmit order</span>
                        </button>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        layout: "cart",
        middleware ({ store, redirect }) {
            // If the user is not authenticated
            if (!store.state.shopCart.totalCost) {
                return redirect('/cart');
            }
        },
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
                showModal: false
            }
        },
        methods: {
            ...mapActions([
                "submitShoppingCart"
            ]),
            checkFormValidity() {
                this.validateEmail();
                this.validateName();
                this.validatePhone();

                return this.validity.email
                    && this.validity.name
                    && this.validity.phone;
            },
            submit() {
                if (!this.checkFormValidity()) {
                    return;
                }
                this.submitShoppingCart();
                if (this.searchText) {
                    this.$router.replace(`/search/${encodeURIComponent(this.searchText)}`);
                } else {
                    this.$router.replace("/search/javascript");
                }
            },
            validateEmail() {
                let re = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;
                let email = this.email || '';

                this.validity.email = re.test(String(email).toLowerCase());
                this.validity.emailState = this.validity.email ? "valid" : "invalid";
            },
            validateName() {
                let name = this.name || '';
                let re = /^[A-Za-z0-9]{2,}/;

                this.validity.name = re.test(name);
                this.validity.nameState = this.validity.name ? "valid" : "invalid";
            },
            validatePhone() {
                let re = /^\+380\d{9}$/;
                let phone = this.phone || '';

                this.validity.phone = re.test(phone);
                this.validity.phoneState = this.validity.phone ? "valid" : "invalid";
            }
        },
        computed: {
            isEmptyFields() {
                return !(this.name.trim()
                    && this.email.trim()
                    && this.phone.trim());
            },
            searchText() {
                return this.$store.state.sResult.searchText;
            }
        }
    }
</script>

<style scoped>

</style>
