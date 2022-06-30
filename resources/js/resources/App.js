import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "../state/store";
import { AuthRoute } from "./navigation";

function App() {
    return (
        <Provider store={store}>
            <AuthRoute />
        </Provider>
    );
}

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
