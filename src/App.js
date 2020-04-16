import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import { Header, PostList } from './components'
import { PostDetail } from './components/postDetail/PostDetail'

import { PostProvider } from './context/PostContext'

function App() {
  const baseUrl = 
    (process.env.NODE_ENV === 'production') 
    ? 'react-blog' 
    : '/'

  return (
    <div className="App">
      <Header />
      <Router basename={baseUrl}>
        <Switch>
          <PostProvider>
            <Route exact path='/' component={PostList} />
            <Route path='/post/:id' component={PostDetail} />
          </PostProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
