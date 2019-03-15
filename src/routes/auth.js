import store from '../store/store';

export default uType => (to, from, next) => {
  if (
    uType === 'auth'
      ? store.getters['users/getUser']._id
      : !store.getters['users/getUser']._id
  ) {
    next();
  } else {
    next('/login');
  }
};
