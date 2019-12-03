import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import { SignUpForm } from 'components/presentational';
import { CREATE_USER } from 'apollo/mutations';

const propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

const SignUp = props => {
  const [createUser, { data }] = useMutation(CREATE_USER, {
    onCompleted: data => {
      if (data.createUser) {
        props.history.push('/');
      }
    }
  });
  const onSubmit = async values => {
    createUser({
      variables: {
        userName: values.nickName,
        email: values.email,
        password: values.password
      }
    });
  };

  if (data && !data.createUser) {
    return <h1>Something went wrong</h1>;
  }

  return <SignUpForm onSubmit={onSubmit} />;
};

SignUp.propTypes = propTypes;

export default withRouter(SignUp);
