import _map from 'lodash/map';
import _extend from 'lodash/extend';

import SignUp from 'pages/sign_up/new.vue';
import SignIn from 'pages/sign_in/new.vue';
import Showcase from 'pages/home/showcase.vue';
import About from 'pages/home/about.vue';
import Contact from 'pages/home/contact.vue';

let routes = [
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/showcase',
    name: 'Showcase',
    component: Showcase,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '',
    name: 'sign_in',
    component: SignIn,
  },
  {
    path: '/sign_up',
    name: 'sign_up',
    component: SignUp,
  },
  {
    path: '/sign_out',
    name: 'sign_out',
    component: SignIn,
  },
];

routes = _map(routes, (route) => {
  return _extend({}, route, { props: true });
});
export default routes;

