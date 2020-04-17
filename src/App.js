import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import { Header, PostList, PostDetail, PostUpdate } from './components'

import { PostProvider } from './context/PostContext'

function App() {
  const baseUrl = 
    (process.env.NODE_ENV === 'production') 
    ? 'react-blog' 
    : '/'

  return (
    <div className="App">
      <Router basename={baseUrl}>
        <Header />
        <Switch>
          <PostProvider>
            <Route exact path='/' component={PostList} />
            <Route exact path='/post/:id' component={PostDetail} />
            <Route exact path='/post/edit/:id' component={PostUpdate} />
          </PostProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
