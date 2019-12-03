import React from 'react';

import { SignInForm } from 'components/presentational';

const SignIn = () => {
  const onHandleSubmit = values => console.log(values);
  return <SignInForm onSubmit={onHandleSubmit} />;
};

export default SignIn;
