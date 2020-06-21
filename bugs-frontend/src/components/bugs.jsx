import React, { Component } from 'react';
import StoreContext from '../context/storeContext';
import { loadBugs, resolveBug, getUnresolvedBugs } from '../store/bugs';
import { connect } from 'react-redux';
/*class Bugs extends Component {
  state = { bugs: [] };
  static contextType = StoreContext;
  componentDidMount() {
    const store = this.context;
    const unsubscribe = store.subscribe(() => {
      const bugsInStore = store.getState().entities.bugs.list;
      if (bugsInStore !== this.state.bugs) this.setState({ bugs: bugsInStore });
    });
    store.dispatch(loadBugs());
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    return (
      <ul>
        {this.state.bugs.map((bug) => (
          <li key={bug.id}>{bug.description}</li>
        ))}
      </ul>
    );
  }
}

export default Bugs; */
class Bugs extends Component {
  componentDidMount() {
    this.props.loadBugs();
  }
  render() {
    return (
      <ul>
        {this.props.unresolvedbugs.map((bug) => (
          <li key={bug.id}>
            {bug.description}{' '}
            <button onClick={() => this.props.resolveBug(bug.id)}>
              {' '}
              Resolve
            </button>
          </li>
        ))}
      </ul>
    );
  }
}
const mapStateToProps = (state) => ({
  bugs: state.entities.bugs.list,
  unresolvedbugs: getUnresolvedBugs(state),
});
const mapDispatchtoProps = (dispatch) => ({
  loadBugs: () => dispatch(loadBugs()),
  resolveBug: (id) => dispatch(resolveBug(id)),
});
//container component
export default connect(mapStateToProps, mapDispatchtoProps)(Bugs);
