const {PureComponent, Fragment} = React;

import {setLoggedIn} from "./actions.js";
import {connect} from "./store.js";

class LoggedInScreen_ extends PureComponent {
  render() {
    const {userData, analyticsStatus, dispatch} = this.props;
    return (
      <Fragment>
        Cool! You're in.{" "}
        <div>
          Your data: <code>{userData ? userData : "loading..."}</code>
        </div>
        <div>
          Analytics: <code>{analyticsStatus}</code>
        </div>
        <div>
          <button onClick={() => dispatch(setLoggedIn(false))}>Log out</button>
        </div>
      </Fragment>
    );
  }
}

const LoggedInScreen = connect(LoggedInScreen_);

class ApplicationA extends PureComponent {
  render() {
    const {isLoggedIn, userData, analyticsStatus, dispatch} = this.props;

    const loggedOutScreen = (
      <Fragment>
        Hello. You are logged out.{" "}
        <button onClick={() => dispatch(setLoggedIn(true))}>Log in</button>
      </Fragment>
    );

    return (
      <div style={{paddingLeft: 20}}>
        {isLoggedIn ? <LoggedInScreen /> : loggedOutScreen}
      </div>
    );
  }
}

export default connect(ApplicationA);
