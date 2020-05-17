import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import { 
  Header, 
  Login, 
  NotFound,
  PostList, 
  PostDetail, 
  PostUpdate,
  Signup
} from './components'

import { AuthProvider, UIProvider } from './context'
import { PostCreate } from './components/pages/postCreate/PostCreate';

function App() {
  const baseUrl = 
    (process.env.NODE_ENV === 'production') 
    ? 'react-blog' 
    : '/'

  return (
    <div className="App">
      <AuthProvider>
        <Router basename={baseUrl}>
          <UIProvider>
            <Header />
            <Switch>
              <Route exact path='/'>
                <PostList />
              </Route>
              <Route exact path='/post/:id'>
                <PostDetail />
              </Route>
              <Route exact path='/post/edit/:id'>
                <PostUpdate />
              </Route>
              <Route exact path='/create'>
                <PostCreate />
              </Route>
              <Route exact path='/login'>
                <Login />
              </Route>
              <Route exact path='/signup'>
                <Signup />
              </Route>
              <Route exact path='/u/:email'>
                <PostList />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </UIProvider>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
