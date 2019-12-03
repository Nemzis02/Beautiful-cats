import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import styles from './SignInForm.module.scss';

const propTypes = {
  onSubmit: PropTypes.func
};

const validation = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Поле обязательно к заполнению';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Невалидный почтовый адрес';
  }

  if (!values.password) {
    errors.password = 'Поле обязательно к заполнению';
  } else if (values.password.length < 6) {
    errors.password = 'Минимум 6 символов';
  }
  return errors;
};

const initialValues = {
  email: '',
  password: '',
};

const SignInForm = ({ onSubmit }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Вход</h1>
      <Formik
        initialValues={initialValues}
        validate={validation}
        onSubmit={onSubmit}
      >
        <Form className={styles.form}>
          <label htmlFor='email'>Почта</label>
          <Field type='email' name='email' id='email' />
          <div className={styles.error}>
            <ErrorMessage name='email' className={styles.error} />
          </div>
          <label htmlFor='password'>Пароль</label>
          <Field type='password' name='password' id='password' />
          <div className={styles.error}>
            <ErrorMessage name='password' />
          </div>
          <button type='submit'>Войти</button>
        </Form>
      </Formik>
    </div>
  );
};

SignInForm.propTypes = propTypes;

export default SignInForm;
