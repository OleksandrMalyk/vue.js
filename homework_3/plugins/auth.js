import {firebaseAuth} from '~/plugins/firebase';
import store from '@/store';

export default ({store}) => {
    firebaseAuth.onAuthStateChanged(user => {
       store.dispatch('updateUser', user);
    })
}
