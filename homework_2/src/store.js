import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        sResult: {
            searchText: "",
            books: [],
            totalCount: 0,
            startIndex: 0,
            pageSize: 6
        },
        lastPersonalData: {
            name: "",
            email: "",
            phone: ""
        },
        shopCart: {
            products: [],
            totalCost: 0
        },
        submittedCartStatus: {
            isActive: false,
            totalCost: 0
        },
        bookForOrder: null,
        showOrderModal: false,
        url: "https://www.googleapis.com/books/v1/volumes",
        placeholderPicUrl: "https://via.placeholder.com/150x200.png?text=No+preview"
    },
    mutations: {
        setSearchResult(state, result) {
            state.sResult.books = result.data.items;
            state.sResult.totalCount = result.data.totalItems;
            state.sResult.searchText = result.searchText;
            state.sResult.startIndex = 0;
        },
        updateSearchPage(state, result) {
            state.sResult.books = result.data.items;
            state.sResult.startIndex = result.index;
        },
        showOrderModal(state, book) {
            state.bookForOrder = book;
            state.showOrderModal = true;
        },
        hideOrderModal(state) {
            state.bookForOrder = null;
            state.showOrderModal = false;
        },
        updateCart(state, personalData) {
            let saleInfo = state.bookForOrder.saleInfo;
            let cost = 100;                 // hardcode for NOT_FOR_SALE

            if (saleInfo.listPrice) {
                cost = saleInfo.listPrice.amount;
            }

            state.shopCart.totalCost += cost;

            let thumbUrl = state.placeholderPicUrl;
            let imgLinks = state.bookForOrder.volumeInfo.imageLinks;
            if (imgLinks) {
                thumbUrl = imgLinks.smallThumbnail;
            }

            state.shopCart.products.push({
                personalData,
                amount: cost,
                description: state.bookForOrder.volumeInfo.description,
                thumbUrl
            });
            state.lastPersonalData = {...personalData};
            state.bookForOrder = null;
            state.showOrderModal = false;
        },
        submitShoppingCart(state) {
            state.submittedCartStatus = {
                isActive: true,
                totalCost: state.shopCart.totalCost
            };
            state.shopCart = {
                products: [],
                totalCost: 0
            }
        },
        resetSubmittedCartStatus(state) {
            state.submittedCartStatus = {
                isActive: false,
                totalCost: 0
            }
        }
    },
    actions: {
        searchBooks(context, searchText) {
            if (!searchText) {
                return;
            }
            axios.get(context.state.url, {
                params: {
                    q: searchText,
                    startIndex: context.state.sResult.startIndex,
                    maxResults: context.state.sResult.pageSize
                }
            }).then(response => {
                context.commit("setSearchResult", {
                    data: response.data,
                    searchText
                })
            });
        },
        nextPage(context) {
            const index = context.state.sResult.startIndex
                + context.state.sResult.pageSize;

            axios.get(context.state.url, {
                params: {
                    q: context.state.sResult.searchText,
                    startIndex: index,
                    maxResults: context.state.sResult.pageSize
                }
            }).then(response => {
                context.commit("updateSearchPage", {
                    data: response.data,
                    index
                })
            });
        },
        prevPage(context) {
            const index = context.state.sResult.startIndex
                - context.state.sResult.pageSize;

            axios.get(context.state.url, {
                params: {
                    q: context.state.sResult.searchText,
                    startIndex: index,
                    maxResults: context.state.sResult.pageSize
                }
            }).then(response => {
                context.commit("updateSearchPage", {
                    data: response.data,
                    index
                })
            });
        },
        showOrderModal({commit}, book) {
            commit("showOrderModal", book);
        },
        hideOrderModal({commit}) {
            commit("hideOrderModal");
        },
        addToCart({commit}, personalData) {
            commit("updateCart", personalData);
        },
        submitShoppingCart({commit}) {
            commit("submitShoppingCart");
        },
        resetSubmittedCartStatus({commit}) {
            commit("resetSubmittedCartStatus");
        }
    }
})
