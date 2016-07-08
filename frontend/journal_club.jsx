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
const ArticlesIndex = require('./components/articles_index');
const NavBar = require('./components/nav_bar');
const ArticlesShow = require('./components/articles_show');
const UserShow = require('./components/user_show');
const GroupShow = require('./components/group_show');
const SearchStore = require('./stores/search_store');

const SessionActions = window.SessionActions = require('./actions/session_actions');
const SessionStore = window.SessionStore = require('./stores/session_store');
const ArticlesActions = window.ArticlesActions = require('./actions/articles_actions');
const ArticlesStore = window.ArticlesStore = require('./stores/articles_store');
const HighlightsStore = window.HighlightsStore = require('./stores/highlights_store');
const HighlightsActions = window.HighlightsActions = require('./actions/highlights_actions');

const App = React.createClass({
  getInitialState: function() {
    return {currentUser: SessionStore.currentUser()};
  },
  componentDidMount: function() {
    SessionStore.addListener(this._isLoggedIn);
    if (!SessionStore.isUserLoggedIn() && this.props.location.pathname != "/signup") {
      hashHistory.push('/login');
    }
  },
  _isLoggedIn() {
    if (SessionStore.isUserLoggedIn()) {
      this.setState({currentUser: SessionStore.currentUser()});
    }
  },
  _handleLogout(e) {
    e.preventDefault();
    SessionActions.logout();
  },


  render() {
    let navbar = '';
    if (SessionStore.isUserLoggedIn()) {
      navbar = <NavBar />;
    }
    return (
      <div>
        <header>
          {navbar}
        </header>
        {this.props.children}

      </div>
    );
  }
});

const routes = (
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={ArticlesIndex} />
      <Route path='/login' component={LoginForm} />
      <Route path='/signup' component={SignupForm} />
      <Route path='/articles/:articleId' component={ArticlesShow} />
      <Route path='/users/:userId' component={UserShow} onEnter={_resetSearchStore}/>
      <Route path='/groups/:groupId' component={GroupShow} />

    </Route>
  </Router>
);

function _resetSearchStore() {
  SearchStore.reset();
}

document.addEventListener('DOMContentLoaded', function(){
  if (window.currentUser) {
    SessionActions.receiveCurrentUser(window.currentUser);
  }
  ReactDOM.render(routes, document.getElementById('content'));
});
