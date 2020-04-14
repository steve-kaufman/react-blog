import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import { Header, PostList } from './components'

function App() {
  return (
    <div className="App">
      <Header />
      <PostList />
    </div>
  );
}

export default App;
