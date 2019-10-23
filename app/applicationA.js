const {PureComponent, Fragment} = React;

import {setLoggedIn, setUserData, setAnalyticsStatus} from "./actions.js";
import {connect} from "./store.js";
import api from "./api.js";

const login = () => dispatch => {
  dispatch(setLoggedIn(true));
};

const logout = () => dispatch => {
  dispatch(setLoggedIn(false));
  dispatch(setUserData(null));
  dispatch(setAnalyticsStatus("none"));
};

class LoggedInScreen_ extends PureComponent {
  async componentDidMount() {
    const {dispatch} = this.props;
    const userData = await api.getUserData();
    dispatch(setUserData(userData));
    // dispatch(setAnalyticsStatus("sending..."));
    // const analyticsResult = await api.sendAnalytics();
    // dispatch(setAnalyticsStatus(analyticsResult));
  }

  async componentDidUpdate(prevProps) {
    const {userData, dispatch} = this.props;
    if (!prevProps.userData && !!userData) {
      dispatch(setAnalyticsStatus("sending..."));
      const analyticsResult = await api.sendAnalytics()
      dispatch(setAnalyticsStatus(analyticsResult));
    }
  }

  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch(logout());
  }

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
          <button onClick={() => dispatch(logout())}>Log out</button>
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
        <button onClick={() => dispatch(login())}>Log in</button>
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
