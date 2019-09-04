export const state = () => ({
    user: null,
    isSignedIn: false,
    sResult: {
        searchText: "",
        books: [],
        totalCount: 0,
        startIndex: 0,
        pageSize: 6
    },
    shopCart: {
        products: [],
        totalCost: 0
    },
    submittedCartStatus: {
        isActive: false,
        totalCost: 0
    },
    placeholderPicUrl: "https://via.placeholder.com/150x200.png?text=No+preview"
});


export const mutations = {
    setUser(state, user) {
        state.user = { ...user };
        state.isSignedIn = !!user;
    },
    setSearchResult(state, result) {
        if (result.data) {
            state.sResult.books = result.data.items;
            state.sResult.totalCount = result.data.totalItems;
        }
        state.sResult.searchText = result.searchText;
        state.sResult.startIndex = 0;
    },
    updateSearchPage(state, result) {
        state.sResult.books = result.data.items;
        state.sResult.startIndex = result.index;
    },
    updateCart(state, book) {
        let saleInfo = book.saleInfo;
        let cost = 100; // hardcode for NOT_FOR_SALE

        if (saleInfo.listPrice) {
            cost = saleInfo.listPrice.amount;
        }

        state.shopCart.totalCost += cost;

        let thumbUrl = state.placeholderPicUrl;
        let imgLinks = book.volumeInfo.imageLinks;
        if (imgLinks) {
            thumbUrl = imgLinks.smallThumbnail;
        }

        state.shopCart.products.push({
            amount: cost,
            description: book.volumeInfo.description,
            thumbUrl
        });
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
    },
    resetCart(state) {
        state.shopCart = {
            products: [],
            totalCost: 0
        }
    }
};

export const actions = {
    updateUser({commit}, user) {
        commit("setUser", user);
    },
    async searchBooks({state, commit}, searchText) {
        if (!searchText) {
            return;
        }
        const {data} = await this.$axios.get("/volumes", {
            params: {
                q: searchText,
                startIndex: state.sResult.startIndex,
                maxResults: state.sResult.pageSize
            }
        });
        commit("setSearchResult", {
            data: data,
            searchText
        })

    },
    nextPage({state, commit}) {
        const index = state.sResult.startIndex
            + state.sResult.pageSize;

        this.$axios.get("/volumes", {
            params: {
                q: state.sResult.searchText,
                startIndex: index,
                maxResults: state.sResult.pageSize
            }
        }).then(response => {
            commit("updateSearchPage", {
                data: response.data,
                index
            })
        });
    },
    prevPage({state, commit}) {
        const index = state.sResult.startIndex
            - state.sResult.pageSize;

        this.$axios.get("/volumes", {
            params: {
                q: state.sResult.searchText,
                startIndex: index,
                maxResults: state.sResult.pageSize
            }
        }).then(response => {
            commit("updateSearchPage", {
                data: response.data,
                index
            })
        });
    },
    updateCart({commit}, book) {
        commit("updateCart", book);
    },
    submitShoppingCart({commit}) {
        commit("submitShoppingCart");
    },
    resetSubmittedCartStatus({commit}) {
        commit("resetSubmittedCartStatus");
    },
    resetCart({commit}) {
        commit("resetCart");
    }
};

export const getters = {};

export const strict = false;
