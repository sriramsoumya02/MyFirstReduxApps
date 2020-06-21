import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  addBugs,
  getUnresolvedBugs,
  getBugsByUser,
  assignBug,
  resolveBug,
  loadBugs,
} from '../store/bugs';
import configureStore from '../store/configureStore';
describe('bugSlice', () => {
  let store;
  let fakeMockAdapter;
  beforeEach(() => {
    store = configureStore();
    fakeMockAdapter = new MockAdapter(axios);
  });
  const bugSlice = () => store.getState().entities.bugs;
  const apiSlice = () => store.getState().api;
  const createState = () => ({ entities: { bugs: { list: [] } } });
  it('add bug to store-sucess case', async () => {
    const bug = { description: 'z' };
    const savedbug = { ...bug, id: 10001 };
    fakeMockAdapter.onPost('/bugs').reply(200, savedbug);

    await store.dispatch(addBugs(bug));

    //expect(store.getState().entities.bugs.list).toHaveLength(1);
    expect(bugSlice().list).toContainEqual(savedbug);
  });
  it('add bug to store-failureCase', async () => {
    const bug = { description: 'z' };
    fakeMockAdapter.onPost('/bugs').reply(500);

    await store.dispatch(addBugs(bug));

    expect(bugSlice().list).toHaveLength(0);
  });
  it('assignBug-sucess', async () => {
    const bug = { id: 10001 };
    const updatedBug = { ...bug, userId: 1 };
    fakeMockAdapter.onPatch('/bugs/' + bug.id).reply(200, updatedBug);
    fakeMockAdapter.onPost('/bugs').reply(200, { id: 10001 });

    await store.dispatch(addBugs({}));
    await store.dispatch(assignBug(updatedBug.userId, bug.id));

    expect(bugSlice().list[0].userId).toBe(1);
  });
  it('assignBug-fail', async () => {
    const bug = { id: 10001, description: 'z', userId: 3 };
    const updatedBug = { ...bug, userId: 1 };
    fakeMockAdapter.onPost('/bugs').reply(200, bug);
    fakeMockAdapter.onPatch('/bugs/' + bug.id).reply(500);

    await store.dispatch(addBugs({ description: 'z', userId: 3 }));
    await store.dispatch(assignBug(updatedBug.userId, bug.id));
    expect(bugSlice().list[0].userId).not.toBe(1);
  });
  it('resolveBug-sucess', async () => {
    const bug = { id: 10001 };
    const updatedBug = { ...bug, resolved: true };
    fakeMockAdapter.onPatch('/bugs/' + bug.id).reply(200, updatedBug);
    fakeMockAdapter.onPost('/bugs').reply(200, { id: 10001 });

    await store.dispatch(addBugs({}));
    await store.dispatch(resolveBug(bug.id));

    expect(bugSlice().list[0].resolved).toBe(true);
  });
  it('resolveBug-failure', async () => {
    const bug = { id: 10001 };
    fakeMockAdapter.onPatch('/bugs/' + bug.id).reply(500);
    fakeMockAdapter.onPost('/bugs').reply(200, { id: 10001 });

    await store.dispatch(addBugs({}));
    await store.dispatch(resolveBug(bug.id));

    expect(bugSlice().list[0].resolved).not.toBe(true);
  });
  describe('loadingBugs', () => {
    describe('if the bug exist in the cache', () => {
      it('they should come from cache', async () => {
        fakeMockAdapter.onGet('/bugs').reply(200, [{ id: 2 }]);
        await store.dispatch(loadBugs());
        await store.dispatch(loadBugs());
        expect(fakeMockAdapter.history.get.length).toBe(1);
      });
    });
    describe('if the bug dont exist in the cache', () => {
      it('they should come from server', async () => {
        fakeMockAdapter.onGet('/bugs').reply(200, [{ id: 2 }]);
        await store.dispatch(loadBugs());
        expect(bugSlice().list).toHaveLength(1);
      });
      describe('loading indicator', () => {
        it('should be true while fetching the bugs', () => {
          fakeMockAdapter.onGet('/bugs').reply(() => {
            expect(apiSlice().loading).toBe(true);
            return [200, [{ id: 1 }]];
          });
          store.dispatch(loadBugs());
        });
        it('should be false after fetching the bugs', async () => {
          fakeMockAdapter.onGet('/bugs').reply(200, [{ id: 1 }]);
          await store.dispatch(loadBugs());
          expect(apiSlice().loading).toBe(false);
        });
        it('should be false if server returns error', async () => {
          fakeMockAdapter.onGet('/bugs').reply(500);
          await store.dispatch(loadBugs());
          expect(apiSlice().loading).toBe(false);
        });
      });
    });
  });
  describe('selectors', () => {
    it('unresolvedBugs', () => {
      const state = createState();
      state.entities.bugs.list = [
        { id: 1, resolved: true },
        { id: 2 },
        { id: 3 },
      ];

      const unresolvedbugs = getUnresolvedBugs(state);
      expect(unresolvedbugs).toHaveLength(2);
    });
    it('bugsByUserId', () => {
      const state = createState();
      state.entities.bugs.list = [
        { id: 1, userId: 1 },
        { id: 2, userId: 2 },
        { id: 3, userId: 1 },
      ];
      const bugsByUserId = getBugsByUser(1)(state);
      expect(bugsByUserId).toHaveLength(2);
    });
  });
});
