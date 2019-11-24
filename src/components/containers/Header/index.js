import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import { ROUTES } from 'global/routes';
import { HOST } from 'global/constants';
import { NewPost } from 'components/presentational';
import { ModalWindow } from 'components/presentational';
import { POSTS } from 'apollo/queries';
import { ADD_POST } from 'apollo/mutations';

import styles from './Header.module.scss';

const Header = () => {
  const [isModalDisplay, setModalView] = useState(false);
  const [isDataLoading, setDataLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [addPost, { loading }] = useMutation(ADD_POST, {
    onCompleted: onModalDisplayToggle,
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: POSTS
      }
    ]
  });

  function onModalDisplayToggle() {
    setModalView(prevValue => !prevValue);
  }

  const onFormChange = event => {
    const fieldName = event.target.name;
    let fieldValue = event.target.value;
    let localImage = formData.localImage;

    if (fieldName === 'image') {
      fieldValue = event.target.files[0];
      localImage = URL.createObjectURL(event.target.files[0]);
    }
    setFormData(prevFormValues => ({
      ...prevFormValues,
      [fieldName]: fieldValue,
      localImage
    }));
  };

  const onSendData = async () => {
    const formObject = new FormData();

    formObject.append('image', formData.image);

    setDataLoading(true);

    try {
      const dispatchImageResponse = await fetch(`${HOST}/send-images`, {
        method: 'PUT',
        body: formObject
      }).then(res => res.json());

      addPost({
        variables: {
          title: formData.title,
          article: formData.article,
          images: [dispatchImageResponse.data.imagePath],
          author: formData.author
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setDataLoading(false);
    }
  };

  if (isDataLoading || loading) {
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
        <Link to={ROUTES.FEED}>Регистрация</Link>
        <Link to={ROUTES.FEED}>Вход</Link>
        <button type='button' onClick={onModalDisplayToggle}>
          Новый пост
        </button>
      </header>
    </Fragment>
  );
};

export default Header;
