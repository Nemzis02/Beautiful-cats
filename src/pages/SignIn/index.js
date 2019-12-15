import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { clone } from 'ramda';

import { SIGN_IN } from 'apollo/mutations';
import { IS_USER_LOGGED_IN } from 'apollo/queries';
import { SignInForm } from 'components/presentational';

const propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func
  })
};

const SignIn = ({ history }) => {
  const [signIn] = useMutation(SIGN_IN, {
    onCompleted: ({ signIn }) => {
      window.localStorage.setItem('token', signIn.token);
      history.goBack();
    },
    update: (store, { data: response }) => {
      let data = store.readQuery({ query: IS_USER_LOGGED_IN });
      data = clone(data);
      data.isUserLoggedIn = Boolean(response.signIn.token);
      store.writeQuery({ query: IS_USER_LOGGED_IN, data });
    }
  });
  
  const onHandleSubmit = credentials => {
    signIn({ variables: { ...credentials } });
  };

  return <SignInForm onSubmit={onHandleSubmit} />;
};

SignIn.propTypes = propTypes;

export default withRouter(SignIn);
