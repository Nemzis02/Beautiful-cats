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
  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: () => {
      props.history.push('/');
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
  return <SignUpForm onSubmit={onSubmit} />;
};

SignUp.propTypes = propTypes;

export default withRouter(SignUp);
