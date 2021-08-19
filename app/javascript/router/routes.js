import _map from 'lodash/map';
import _extend from 'lodash/extend';
import SignIn from 'pages/sign_in/new.vue';
import SignUp from 'pages/sign_up/new.vue';
import NewTransaction from 'pages/new_transaction/index.vue';

let routes = [
  {
    path: '/new_transaction/step_1',
    name: 'Transaction info',
    component: NewTransaction,
  },
  {
    path: '/new_transaction/step_2',
    name: 'Recipient info',
    component: NewTransaction,
  },
  {
    path: '/new_transaction/step_3',
    name: 'Make payment',
    component: NewTransaction,
  },
  {
    path: '',
    name: 'sign_in',
    component: SignIn,
  },
  {
    path: '/sign_out',
    name: 'sign_out',
    component: SignIn,
  },
  {
    path: '/sign_up',
    name: 'sign_up',
    component: SignUp,
  },
];

routes = _map(routes, (route) => {
  return _extend({}, route, { props: true });
});
export default routes;

