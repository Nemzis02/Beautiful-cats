import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useApolloClient } from '@apollo/react-hooks';
import { clone, pathOr } from 'ramda';

import { ROUTES } from 'global/routes';
import { NewPost } from 'components/presentational';
import { ModalWindow } from 'components/presentational';
import { POSTS, IS_USER_LOGGED_IN, USER } from 'apollo/queries';
import { ADD_POST } from 'apollo/mutations';

import styles from './Header.module.scss';

const setDefaultFormData = (data, setFormData) => {
  return setFormData({
    author: data.userName
  });
};

const Header = () => {
  const {
    data: { isUserLoggedIn }
  } = useQuery(IS_USER_LOGGED_IN);
  const { data: userData } = useQuery(USER, {
    onCompleted: () => setDefaultFormData(user, setFormData)
  });
  const user = pathOr({}, ['user'], userData);
  const client = useApolloClient();
  const [isModalDisplay, setModalView] = useState(false);
  const [formData, setFormData] = useState({});
  const [addPost, { loading }] = useMutation(ADD_POST, {
    onCompleted: () => {
      onModalDisplayToggle();
      setDefaultFormData(user, setFormData);
    },
    update: (store, { data: addPost }) => {
      let data = store.readQuery({ query: POSTS });
      data = clone(data);
      data.posts = [addPost.addPost, ...data.posts];
      store.writeQuery({ query: POSTS, data });
    }
  });
  function onModalDisplayToggle() {
    setModalView(prevValue => !prevValue);
  }

  const onFormChange = event => {
    const fieldName = event.target.name;
    let fieldValue = event.target.value;
    let localImage = formData.localImage;

    if (fieldName === 'image') {
      fieldValue = event.target.files;
      if (Array.isArray(Array.from(fieldValue)) && fieldValue.length > 10) {
        return alert('Нельзя прикрепить больше, чем 10 файлов');
      }
      localImage = URL.createObjectURL(event.target.files[0]);
    }
    setFormData(prevFormValues => ({
      ...prevFormValues,
      [fieldName]: fieldValue,
      localImage
    }));
  };

  const onSendData = async () => {
    addPost({
      variables: {
        title: formData.title,
        article: formData.article,
        images: formData.image,
        author: formData.author
      }
    });
  };

  const logOut = () => {
    localStorage.removeItem('token');
    client.writeData({
      data: {
        isUserLoggedIn: false
      }
    });
  };

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <Fragment>
      <ModalWindow isDisplay={isModalDisplay} onClose={onModalDisplayToggle}>
        <NewPost
          onChange={onFormChange}
          onSubmit={onSendData}
          formData={formData}
        />
      </ModalWindow>
      <header className={styles.container}>
        <Link to={ROUTES.FEED}>Главная</Link>
        <Link to={ROUTES.FEED}>Словарь</Link>
        <Link to={ROUTES.FEED}>Поиск</Link>
        <Link to={ROUTES.FEED}>Обратная связь</Link>
        {!isUserLoggedIn && <Link to={ROUTES.SIGN_UP}>Регистрация</Link>}
        {!isUserLoggedIn && <Link to={ROUTES.SIGN_IN}>Вход</Link>}
        {isUserLoggedIn && (
          <button className={styles.logOutButton} onClick={logOut}>
            Выход
          </button>
        )}
        <button type='button' onClick={onModalDisplayToggle}>
          Новый пост
        </button>
      </header>
    </Fragment>
  );
};

export default Header;
