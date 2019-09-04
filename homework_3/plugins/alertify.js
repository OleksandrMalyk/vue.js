import Vue from 'vue';
import VueAlertify from 'vue-alertify';

Vue.use(VueAlertify, {
    notifier: {
        delay: 15,
        position: 'top-right'
    }
});

