<template>
    <div>
        <OrderModal />
        <div v-if="isPaged" class="my-3">
            <button class="btn btn-primary"
                    :disabled="!isBackEnabled"
                    @click="prevPage">
                <font-awesome-icon icon="chevron-left"></font-awesome-icon>
            </button>
            <span class="mx-2">{{ pagingTitle }}</span>
            <button class="btn btn-primary"
                    :disabled="!isForwardEnabled"
                    @click="nextPage">
                <font-awesome-icon icon="chevron-right"></font-awesome-icon>
            </button>
        </div>
        <div class="container-fluid mx-0">
            <div class="row">
                <Book v-for="(book, index) in $store.state.sResult.books"
                      :book="book"
                      :key="index"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Book from "./BookCard";
    import OrderModal from "./OrderModal";

    import {mapActions} from "vuex";

    export default {
        name: "Books",
        components: {
            Book,
            OrderModal
        },
        computed: {
            sResult() {
                return this.$store.state.sResult;
            },
            isPaged() {
                return this.sResult.totalCount > this.sResult.pageSize;
            },
            isBackEnabled() {
                return this.sResult.startIndex > 0;
            },
            isForwardEnabled() {
                let currentLast = this.sResult.pageSize + this.sResult.startIndex;
                return currentLast < this.sResult.totalCount
            },
            pagingTitle() {
                const currentFirst = this.sResult.startIndex + 1;
                let currentLast = this.sResult.pageSize + currentFirst - 1;

                if (currentLast > this.sResult.totalCount) {
                    currentLast = this.sResult.totalCount;
                }
                if (currentLast === currentFirst) {
                    return `${currentLast} / ${currentLast}`
                }

                return `${currentFirst} - ${currentLast} / ${this.sResult.totalCount}`
            }
        },
        methods: {
            ...mapActions([
                'nextPage',
                "prevPage",
                "showOrderModal"
            ])
        }
    }
</script>
