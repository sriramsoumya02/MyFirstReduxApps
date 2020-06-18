import configureStore from './store/configureStore';
import {
  bugAdded,
  bugResolved,
  bugAssigned,
  getUnresolvedBugs,
  getBugsByUser,
  loadBugs,
  addBugs,
  resolveBug,
  assignBug,
} from './store/bugs';
import { userAdded } from './store/users';
import * as projectActions from './store/project';
import createCustomStore from './store/customStore';
const store = configureStore();
const unsubscribe = store.subscribe(() => {
  console.log('store status changed', store.getState());
});

//store.dispatch(loadBugs());
//store.dispatch(addBugs({ description: 'a' }));
store.dispatch(resolveBug(1592510316389));
store.dispatch(assignBug(1, 1592510316389));

//setTimeout(() => store.dispatch(loadBugs()), 10000);

/*
store.dispatch((dispatch, getState) => {
  //callingapi
  //resolvig success promise => dispatch()
  dispatch({ type: 'bugsRecieved', bugs: [1, 2, 3] });
  console.log('getState', getState);
  //rejecting error promise => dispatch()
  dispatch({
    type: 'error',
    payload: { message: 'An error occured' },
  });
});
store.dispatch(projectActions.projectAdded({ name: 'Project1' }));
store.dispatch(userAdded({ name: 'User 1' }));
store.dispatch(bugAdded({ description: 'Bug1' }));
store.dispatch(bugAdded({ description: 'Bug2' }));
store.dispatch(bugAdded({ description: 'Bug3' }));
store.dispatch(bugAssigned({ id: 1, userId: 1 }));
unsubscribe();
store.dispatch(bugResolved({ id: 1 }));
console.log(store.getState());
const unresolved = getUnresolvedBugs(store.getState());
console.log('unresolved', unresolved);
const bugsByUser = getBugsByUser(1)(store.getState());
console.log('bugsByUser', bugsByUser);*/
//-------------
/*createCustomStore.subscribe(() => {
  console.log('custom store status changed', createCustomStore.getState());
});
createCustomStore.state = 1;
createCustomStore.dispatch(actions.bugAdded('bug2'));

console.log('custom store', createCustomStore.getState());*/
