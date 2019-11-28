import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import styles from './SignUpForm.module.scss';

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

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'Поле обязательно к заполнению';
  } else if (values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = 'Поле должно совпадать с паролем';
  }

  if (!values.nickName) {
    errors.nickName = 'Поле обязательно к заполнению';
  } else if (values.nickName.length < 2) {
    errors.nickName = 'Минимум 2 символов';
  }

  return errors;
};

const initialValues = {
  email: '',
  password: '',
  passwordConfirmation: '',
  nickName: ''
};

const SignUpForm = ({ onSubmit }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Регистрация</h1>
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
          <label htmlFor='email'>Псевдоним</label>
          <Field type='text' name='nickName' id='nickName' />
          <div className={styles.error}>
            <ErrorMessage name='nickName' className={styles.error} />
          </div>
          <label htmlFor='password'>Пароль</label>
          <Field type='password' name='password' id='password' />
          <div className={styles.error}>
            <ErrorMessage name='password' />
          </div>
          <label htmlFor='passwordConfirmation'>Повторите пароль</label>
          <Field
            type='password'
            name='passwordConfirmation'
            id='passwordConfirmation'
          />
          <div className={styles.error}>
            <ErrorMessage name='passwordConfirmation' />
          </div>
          <button type='submit'>Регистрация</button>
        </Form>
      </Formik>
    </div>
  );
};

SignUpForm.propTypes = propTypes;

export default SignUpForm;
