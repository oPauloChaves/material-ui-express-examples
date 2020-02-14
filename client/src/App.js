import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Upload from './pages/Upload';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" children={<Home />} />
        <Route path="/upload" children={<Upload />} />
        <Route children={<NotFound />} />
      </Switch>
    </Router>
  );
}
