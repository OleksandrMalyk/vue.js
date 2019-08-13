<template>
    <div>
        <b-modal
                id="modal-prevent-closing"
                ref="modal"
                :title="title"
                @show="resetModal"
                @hidden="resetModal"
                @ok="handleOk"
                ok-title="Submit"
                @cancel="handleCancel"
                v-model="showModal"
                size="xl"
                :ok-disabled="isEmptyFields">

            <b-container fluid>
                <b-row>
                    <b-col cols="4" md="4" lg="3" xl="2" class="mb-2">
                        <img class="small-thumbnail "
                             :src="thumbnailLink"
                             alt="small thumbnail">
                    </b-col>
                    <b-col cols="10" md="8" lg="9" xl="6">
                        <p class="font-small ml-2">{{ description }}</p>
                    </b-col>
                    <b-col cols="12" sm-="10" md="10" lg="10" xl="4">
                        <form ref="form" @submit.stop.prevent="handleSubmit"
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
                        </form>
                    </b-col>
                </b-row>
            </b-container>

        </b-modal>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
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
                "hideOrderModal",
                "addToCart"
            ]),
            checkFormValidity() {
                this.validateEmail();
                this.validateName();
                this.validatePhone();

                return this.validity.email
                    && this.validity.name
                    && this.validity.phone;
            },
            resetModal() {
                this.name = this.lastPersonalData.name;
                this.email = this.lastPersonalData.email;
                this.phone = this.lastPersonalData.phone;
                this.validity = {
                    name: false,
                    phone: false,
                    email: false,
                    nameState: null,
                    emailState: null,
                    phoneState: null
                }
            },
            handleOk(bvModalEvt) {
                bvModalEvt.preventDefault();
                this.handleSubmit()
            },
            handleCancel(bvModalEvt) {
                bvModalEvt.preventDefault();
                this.hideOrderModal();
            },
            handleSubmit() {
                if (!this.checkFormValidity()) {
                    return
                }
                this.addToCart({
                    email: this.email,
                    phone: this.phone,
                    name: this.name
                })
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
            showOrderModal() {
                return this.$store.state.showOrderModal;
            },
            lastPersonalData() {
                return this.$store.state.lastPersonalData;
            },
            thumbnailLink() {
                const placeholder = this.$store.state.placeholderPicUrl;
                let book = this.$store.state.bookForOrder;
                if (!book) {
                    return placeholder;
                }
                let imageLinks = book.volumeInfo.imageLinks;

                if (!imageLinks) {
                    return placeholder;
                }
                return book.volumeInfo.imageLinks.smallThumbnail;
            },
            description() {
                let book = this.$store.state.bookForOrder;

                if (!book) {
                    return "";
                }

                return book.volumeInfo.description;
            },
            title() {
                let book = this.$store.state.bookForOrder;

                if (!book) {
                    return "";
                }

                return book.volumeInfo.title;
            },
            isEmptyFields() {
                return !(this.name.trim()
                        && this.email.trim()
                        && this.phone.trim());
            }
        },
        watch: {
            showOrderModal: function(newVal, oldVal){
                this.showModal = newVal;
            }
        }
    }
</script>

<style scoped>
    .small-thumbnail {
        max-width: 100% px;
        max-height: 200px;
    }

    .font-small {
        font-size: 80%;
    }

    .order-form {
        width: 50%;
        min-width: 350px;
    }
</style>