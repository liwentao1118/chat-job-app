import React from 'react'
import ReactDom from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import reducers from './reducer'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom'
import './config'
import Login from "./container/login/login";
import Register from "./container/register/register";
import BossInfo from './container/bossinfo/bossinfo'
import AuthRoute from './component/authroute/authroute'

import './index.css'


const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
))

function Boss() {
    return <h1>boos页面</h1>
}

ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path="/bossinfo" component={BossInfo}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/register" component={Register}></Route>
                </Switch>
            </div>
        </BrowserRouter>

    </Provider>)
    , document.getElementById('root')
)