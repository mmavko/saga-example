const {Fragment} = React;

import {appSelected, appClosed} from "./actions.js";
import {connect} from "./store.js";
import ApplicationA from "./applicationA.js";

const applications = {
  "Application A": ApplicationA,
  "Application B": null,
  "Application C": null,
};

const App = ({currentApplication, dispatch}) => {
  const CurrentApp = applications[currentApplication];

  const statusBar = (
    <div
      style={{padding: 20, marginBottom: 20, borderBottom: "2px solid grey"}}
    >
      {CurrentApp ? (
        <Fragment>
          Running application "{currentApplication}"{" "}
          <button onClick={() => dispatch(appClosed())}>Close</button>
        </Fragment>
      ) : (
        "Please choose the application"
      )}
    </div>
  );

  const dashboard = Object.keys(applications).map(name => (
    <div
      key={name}
      onClick={() => dispatch(appSelected(name))}
      style={{
        cursor: "pointer",
        border: "2px solid orange",
        padding: 10,
        width: 100,
        height: 100,
        float: "left",
        marginLeft: 20,
        backgroundColor: "khaki",
      }}
    >
      {name}
    </div>
  ));

  return (
    <Fragment>
      {statusBar}
      {CurrentApp ? <CurrentApp /> : dashboard}
    </Fragment>
  );
};

export default connect(App);
