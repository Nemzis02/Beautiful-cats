import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './Overlay.module.scss';

const propTypes = {
  onHandleClick: PropTypes.func
};

const Overlay = ({ onHandleClick }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  });
  const onClick = () => onHandleClick && onHandleClick();
  return <div onClick={onClick} className={styles.overlay} />;
};

Overlay.propTypes = propTypes;

export default Overlay;
