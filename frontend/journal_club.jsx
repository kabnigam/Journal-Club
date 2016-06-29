const React = require('react');
const ReactDOM = require('react-dom');
//Router
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;
//Components
const LoginForm = require('./components/login_form');
const SignupForm = require('./components/signup_form');

const SessionActions = window.SessionActions = require('./actions/session_actions');
const SessionStore = window.SessionStore = require('./stores/session_store');

const App = React.createClass({
  getInitialState: function() {
    return {logout: ''};
  },
  componentDidMount: function() {
    SessionStore.addListener(this._isLoggedIn);
    if (!SessionStore.isUserLoggedIn()) {
      hashHistory.push('/login');
    }
  },
  _isLoggedIn() {
    if (SessionStore.isUserLoggedIn()) {
      this.setState({logout: <button onClick={this._handleLogout}>Logout</button>});
    } else {

      this.setState({logout: ''});
    }
  },
  _handleLogout(e) {
    e.preventDefault();
    SessionActions.logout();
  },
  render() {
    return (
      <div>
        <header>
          {SessionStore.currentUser().username}
          {this.state.logout}
        </header>
        {this.props.children}
      </div>
    );
  }
});

const routes = (
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <Route path='/login' component={LoginForm} />
      <Route path='/signup' component={SignupForm} />

    </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', function(){
  ReactDOM.render(routes, document.getElementById('content'));
});
