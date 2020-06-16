import store from './store';
import * as actionsCreators from './actions';
import createCustomStore from './customStore';
const unsubscribe = store.subscribe(() => {
  console.log('store status changed', store.getState());
});
store.dispatch(actionsCreators.bugAdded('Bug1'));
store.dispatch(actionsCreators.bugAdded('Bug2'));
store.dispatch(actionsCreators.bugAdded('Bug3'));
unsubscribe();
store.dispatch(actionsCreators.bugResolved(1));
console.log(store.getState());
//-------------
createCustomStore.subscribe(() => {
  console.log('custom store status changed', store.getState());
});
createCustomStore.state = 1;
createCustomStore.dispatch(actionsCreators.bugAdded('bug2'));

console.log('custom store', createCustomStore.getState());
