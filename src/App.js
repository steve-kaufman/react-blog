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
  PostUpdate 
} from './components'

import { AuthProvider, PostProvider, UIProvider } from './context'

function App() {
  const baseUrl = 
    (process.env.NODE_ENV === 'production') 
    ? 'react-blog' 
    : '/'

  return (
    <div className="App">
      <Router basename={baseUrl}>
        <AuthProvider>
          <UIProvider>
          <Header />
            <Switch>
              <Route exact path='/'>
                <PostProvider>
                  <PostList />
                </PostProvider>
              </Route>
              <Route exact path='/post/:id'>
                <PostProvider>
                  <PostDetail />
                </PostProvider>
              </Route>
              <Route exact path='/post/edit/:id'>
                <PostProvider>
                  <PostUpdate />
                </PostProvider>
              </Route>
              <Route exact path='/login'>
                <Login />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </UIProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
