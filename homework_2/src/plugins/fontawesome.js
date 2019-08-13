import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faReply } from '@fortawesome/free-solid-svg-icons'
import { faGrinBeamSweat } from '@fortawesome/free-solid-svg-icons'
import { faHryvnia } from '@fortawesome/free-solid-svg-icons'


library.add(faShoppingCart);
library.add(faChevronLeft);
library.add(faChevronRight);
library.add(faReply);
library.add(faGrinBeamSweat);
library.add(faHryvnia);

Vue.component('font-awesome-icon', FontAwesomeIcon);
