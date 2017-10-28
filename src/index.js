import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import reducers from './reducers'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ReduxPromise from 'redux-promise'

import PostsIndex from './components/posts_index'
import PostNew from './components/post_new'
import PostsShow from './components/posts_show'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
        <div>
            <Switch>
                <Route path="/posts/new" component={PostNew} />
                <Route path="/posts/:id" component={PostsShow} />
                <Route path="/" component={PostsIndex} />                
            </Switch>
        </div>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);
registerServiceWorker();
