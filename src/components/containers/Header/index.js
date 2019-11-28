import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { clone } from 'ramda';

import { ROUTES } from 'global/routes';
import { NewPost } from 'components/presentational';
import { ModalWindow } from 'components/presentational';
import { POSTS } from 'apollo/queries';
import { ADD_POST } from 'apollo/mutations';

import styles from './Header.module.scss';

const Header = () => {
  const [isModalDisplay, setModalView] = useState(false);
  const [formData, setFormData] = useState({});
  const [addPost, { loading }] = useMutation(ADD_POST, {
    onCompleted: () => {
      onModalDisplayToggle();
      setFormData({});
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
        <Link to={ROUTES.SIGNUP}>Регистрация</Link>
        <Link to={ROUTES.FEED}>Вход</Link>
        <button type='button' onClick={onModalDisplayToggle}>
          Новый пост
        </button>
      </header>
    </Fragment>
  );
};

export default Header;
