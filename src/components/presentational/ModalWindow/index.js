import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Overlay } from 'components/presentational';

import styles from './ModalWindow.module.scss';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  modalContainerClassName: PropTypes.string,
  onClose: PropTypes.func,
  isDisplay: PropTypes.bool
};

const ModalWindow = ({
  children,
  modalContainerClassName,
  onClose,
  isDisplay
}) => {
  if (!isDisplay) return null;
  const onCloseHandler = () => onClose && onClose();
  const modalContainerClass = modalContainerClassName
    ? modalContainerClassName
    : styles.modalContainer;
  return (
    <Fragment>
      <Overlay onHandleClick={onCloseHandler} />
      <div className={modalContainerClass}>{children}</div>
    </Fragment>
  );
};

ModalWindow.propTypes = propTypes;

export default ModalWindow;
