<template>
    <div class="col-lg-6 col-md-10 col-sm-12 mt-3">
        <div class="card">
            <div class="card-horizontal">
                <div class="">
                    <img class="small-thumbnail"
                         :src="thumbnailLink"
                         alt="small thumbnail">
                </div>
                <div class="card-body text-left">
                    <h5 class="card-title">{{book.volumeInfo.title}}</h5>
                    <p>
                        <span class="font-weight-bold">Authors:&nbsp;</span>
                        <span class="card-text text-left">{{book.volumeInfo.authors | formatAuthors}}</span>
                    </p>
                    <p>
                        <span class="font-weight-bold">Published Date:&nbsp;</span>
                        <span class="card-text text-left">
                            {{ book.volumeInfo.publishedDate | formatDate }}
                        </span>
                    </p>
                </div>
            </div>
            <div class="card-footer text-right">
                <b-button v-b-modal.modal-prevent-closing
                          @click="showOrderModal(book)"
                          class="btn btn-success">
                    Order
                </b-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex";
    import moment from "moment";

    export default {
        name: "Book",
        data() {
            return {}
        },
        props: ['book'],
        methods: {
            ...mapActions([
                "showOrderModal"
            ])
        },
        computed: {
            thumbnailLink() {
                const placeholder = this.$store.state.placeholderPicUrl;
                const imageLinks = this.book.volumeInfo.imageLinks;

                if (!imageLinks) {
                    return placeholder;
                }
                return this.book.volumeInfo.imageLinks.smallThumbnail;
            }
        },
        filters: {
            formatAuthors(authors) {
                if(!authors || authors.length === 0) {
                    return "";
                }
                return authors.join(", ");
            },
            formatDate(dateStr) {
                if(!dateStr) {
                    return "";
                }
                if(dateStr.length === 4) {
                    return dateStr;
                }

                return moment(dateStr, "YYYY-MM-DD").format("DD.MM.YYYY");
            }
        }
    }
</script>

<style scoped>
    .card-horizontal {
        display: flex;
        flex: 1 1 auto;
    }

    .small-thumbnail  {
        max-width: 150px;
        max-height: 200px;
    }
</style>