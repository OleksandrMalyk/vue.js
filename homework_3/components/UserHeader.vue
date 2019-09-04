<template>
    <div>
        <div v-if="isSignedIn"
             id="nav"
             class="text-center my-3">
            <span>{{email}}</span>
            <button class="btn btn-warning"
                    @click="signOut">
                Sign Out
            </button>

        </div>
        <div v-if="!isSignedIn" class="text-center my-3">
            <nuxt-link to="/signin" class="button--green">
                Sign In
            </nuxt-link>
        </div>
    </div>
</template>

<script>
    import { firebaseAuth } from '~/plugins/firebase';
    import { mapActions } from "vuex";

    export default {
        name: "UserHeader",
        methods: {
            ...mapActions([
                "resetCart"
            ]),
            signOut() {
                this.resetCart();
                firebaseAuth.signOut();
            }
        },
        computed: {
            isSignedIn() {
                return this.$store.state.isSignedIn;
            },
            email() {
                const user = this.$store.state.user;
                return user
                    ? user.email
                    : "";
            }
        }
    }
</script>

<style scoped>

</style>
