import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import { Page404, Feed, PostPage, SignUp, SignIn } from 'pages';
import { Header } from 'components/containers';
import { ROUTES } from 'global/routes';
import { useUserLogin } from 'hooks';

const App = () => {
  const { isUserLoggedIn } = useUserLogin();
  return (
    <Fragment>
      <Router>
        <Header />
        <Switch>
          <Route path={ROUTES.FEED}>
            <Feed />
          </Route>
          <Route path={`${ROUTES.SIGN_UP}`}>
            { isUserLoggedIn ? <Redirect to={ROUTES.FEED}/> : <SignUp /> }
          </Route>
          <Route path={`${ROUTES.SIGN_IN}`}>
          { isUserLoggedIn ? <Redirect to={ROUTES.FEED}/> : <SignIn /> }
          </Route>
          <Route path={`${ROUTES.POST}/:postId`}>
            <PostPage />
          </Route>
          <Route exact path='/'>
            <Redirect to={ROUTES.FEED} />
          </Route>
          <Route path='*'>
            <Page404 />
          </Route>
        </Switch>
      </Router>
    </Fragment>
  );
};

export default App;
