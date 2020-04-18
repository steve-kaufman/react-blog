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

import { PostProvider } from './context/PostContext'
import { AuthProvider } from './context/AuthContext'
import { UIProvider } from './context/UIContext'

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
            <PostProvider>
              <Switch>
                  <Route exact path='/' component={PostList} />
                  <Route exact path='/post/:id' component={PostDetail} />
                  <Route exact path='/post/edit/:id' component={PostUpdate} />
                  <Route exact path='/login' component={Login} />
                  <Route>
                    <NotFound />
                  </Route>
              </Switch>
            </PostProvider>
          </UIProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
