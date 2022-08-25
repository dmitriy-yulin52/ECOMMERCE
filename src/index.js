import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from "react-router-dom";
import {GlobalStyle} from "./styles/globalStyles";
import {Provider} from "react-redux";
import {store} from "./store/store";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <GlobalStyle/>
                <App/>
            </Router>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
