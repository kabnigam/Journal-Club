const React = require('react');
const SessionActions = require('../actions/session_actions');
const ErrorsActions = require('../actions/errors_actions');
const SessionStore = require('../stores/session_store');
const ErrorsStore = require('../stores/errors_store');
const hashHistory = require('react-router').hashHistory;

const SignupForm = React.createClass({
  getInitialState: function(){
    return {username: '', password: '', email: '', errors: []};
  },
  componentWillMount: function() {
    this._handleChange();
  },
  componentDidMount: function() {
    SessionStore.addListener(this._handleChange);
    ErrorsStore.addListener(this._handleErrors);
  },
  _handleChange: function() {
    if (SessionStore.isUserLoggedIn()){
      hashHistory.push('/');
    }
  },
  _handleErrors: function() {
    this.setState({errors: ErrorsStore.formErrors("signup_form")});
  },
  _handleUsername: function(e) {
    this.setState({username: e.target.value});
  },
  _handleEmail: function(e) {
    this.setState({email: e.target.value});
  },
  _handlePassword: function(e) {
    this.setState({password: e.target.value});
  },
  _handleSubmit: function(e) {
    e.preventDefault();
    ErrorsActions.clearErrors();
    SessionActions.signup({username: this.state.username, password: this.state.password, email: this.state.email});
  },
  _handleLogInRedirect: function(e) {
    e.preventDefault();
    hashHistory.push('/login');
  },

  _handleGuestLogIn: function() {
    SessionActions.login({username: 'Guest', password: 'password'});
  },
  render: function() {

      return (
        <div className='splash'>
          <div className='login-form' >
            <h1>JOURNAL CLUB</h1>
            <div className='errors'>
              {this.state.errors.map(error => {
                return <li>{error}</li>;})}
            </div>
                <div className='login-input'>
                  <form onSubmit={this._handleSubmit}>
                    <label>EMAIL:&nbsp;
                      <input type='text' value={this.state.email} onChange={this._handleEmail} />
                    </label>
                    <label>USERNAME:&nbsp;
                      <input type='text' value={this.state.username} onChange={this._handleUsername} />
                    </label>
                    <br/>
                    <label>PASSWORD:&nbsp;
                      <input type='password' value={this.state.password} onChange={this._handlePassword} />
                    </label>
                    <br/>
                    <input type='submit' value='SIGN UP' />

                  </form>
                  <div id='login-signup-guest'>Already a member? <br/><button onClick={this._handleLogInRedirect}>Log in</button> or <button onClick={this._handleGuestLogIn}>log in as guest!</button></div>
                </div>

          </div>
        </div>
      );

    }
});

module.exports = SignupForm;
