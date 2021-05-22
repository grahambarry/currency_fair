import _isEmpty from 'lodash/isEmpty';
import { AUTH_TOKEN_KEY } from '~configuration/appConstants';
import { mapGetters } from 'vuex';

function authTokenExists() {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  console.log(token + ' token')
  return token !== '' && token !== undefined && token !== null;
}

export default {
  computed: {
    ...mapGetters(['user']),
    signedIn() {
      console.log(!_isEmpty(this.user) + '!_isEmpty(this.user)')
      console.log(this.user.firstName + ' this.user')
      console.log(authTokenExists() + 'authTokenExists()')
      return !_isEmpty(this.user) && authTokenExists();
    },
    userFullName() {
      if(!this.signedIn) return '';
      return `${this.user.firstName} ${this.user.lastName}`;
    },
  },
};
