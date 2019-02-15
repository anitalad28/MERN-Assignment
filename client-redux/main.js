//1. Import React OM
import React from 'react';

// 2.Import React-dom to rendering react component in DOM
import ReactDom from 'react-dom';

// 3. Import createStore from redux packages 
// This will be userd to create store at applicatio lever
import { createStore, applyMiddleware } from 'redux';

// import provider this will be user to maintain application state
import { Provider } from 'react-redux';

import thunk from 'redux-thunk';

//import reducer from reducer.js
// the reducer will be default instance of combine reducers
import reducer from './reducers/reducer.js';

// Importing bootstrap or anyother CSS/styles/UI kits
import "!style!css!bootstrap/dist/css/bootstrap.min.css";

//Import all necessary component
import MainReduxComponent from "./maincomponent.jsx";

// create a store using redux store and pass reducer to it
//const store = createStore(reducer);
const store = createStore(reducer, applyMiddleware(thunk));

// 5. Render the Component
// a. provider contains store.
// b. stored is provided to MainReduxComponent
// c. MainReduxComponent should use the store for update/notification
ReactDom.render(
    <Provider store={store}>
        <MainReduxComponent />
    </Provider>,
    document.getElementById("app")
);