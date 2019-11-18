import React from "react";
import { Link } from "react-router-dom";

import { ROUTES } from "global/routes";

import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.container}>
      <Link to={ROUTES.FEED}>Главная</Link>
      <Link to={ROUTES.FEED}>Словарь</Link>
      <Link to={ROUTES.FEED}>Поиск</Link>
      <Link to={ROUTES.FEED}>Обратная связь</Link>
      <Link to={ROUTES.FEED}>Регистрация</Link>
      <Link to={ROUTES.FEED}>Вход</Link>
    </header>
  );
};

export default Header;
