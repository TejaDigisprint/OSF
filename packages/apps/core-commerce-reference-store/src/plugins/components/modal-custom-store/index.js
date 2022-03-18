/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import React, { useEffect, useRef } from 'react';

import Portal from '@oracle-cx-commerce/react-components/portal';
import Styled from '@oracle-cx-commerce/react-components/styled';
import TimesIcon from '@oracle-cx-commerce/react-components/icons/times';
import css from './styles.css';
import { noop } from '@oracle-cx-commerce/utils/generic';
import PropTypes from 'prop-types';

/**
 * Displays the modal component
 */
const Modal = ({
  onClose = noop,
  show = false,
  children = '',
  title = '',
  className = '',
  cssOverride = '',
  closeArialLabel = '',
  closeIconTitle = '',
  setCloseRef
}) => {
  const closeRef = useRef(null);
  useEffect(() => {
    if (closeRef.current) {
      if (show) {
        closeRef.current.focus();
      }
      // invoke call back method to set closeRef reference in caller
      if (setCloseRef) {
        setCloseRef(closeRef);
      }
    }
  }, [closeRef, setCloseRef, show, children]);

  return (
    <Portal>
      <div className={cssOverride}>
        <Styled id="Modal" css={css}>
          {show && (
            <div className={`Modal Modal__Open ${className}`}>
              <div
                className="Modal__Backdrop"
                data-testid="modalBackdrop"
                onClick={onClose}
                onKeyDown={event => {
                  if (event.key === 'Enter' || event.key === 'Esc' || event.key === 'Escape') {
                    onClose();
                  }
                }}
                role="button"
                tabIndex="-1"
                aria-label={closeArialLabel}
              ></div>
              <div className="Modal_Wrapper ">
                <div className="Modal__Header">
                  <span className="Modal__HeaderText">{title}</span>
                  {/* <span
                    role="button"
                    tabIndex="0"
                    onClick={onClose}
                    onKeyDown={event => {
                      if (event.key === 'Enter' || event.key === 'Esc' || event.key === 'Escape') {
                        event.preventDefault();
                        onClose();
                      }
                    }}
                    className="Modal__Close"
                    ref={closeRef}
                   
                  >
                    <TimesIcon title={closeIconTitle}  onClick={onClose} onKeyDown={event => {
                      if (event.key === 'Enter' || event.key === 'Esc' || event.key === 'Escape') {
                        event.preventDefault();
                        onClose();
                      }
                    }} />
                   
                  </span> */}
                  <TimesIcon title={closeIconTitle} onClick={onClose} onKeyDown={event => {
                    if (event.key === 'Enter' || event.key === 'Esc' || event.key === 'Escape') {
                      event.preventDefault();
                      onClose();
                    }
                  }} className="Modal__Close"/>
                </div>
                <div className="Modal__Body">{children}</div>
              </div>
            </div>
          )}
        </Styled>
      </div>
    </Portal>
  );
};

Modal.propTypes = {
  /**
   * Function to be triggered on close
   */
  onClose: PropTypes.func,

  /**
   * Whether to show modal or not
   */
  show: PropTypes.bool,

  /**
   * Child nodes to by displayed
   */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),

  /**
   * Modal title
   */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  /**
   * Class name to be applied to the HTML element.
   */
  className: PropTypes.string,

  /**
   * Overrides(if any) to the modal style
   */
  cssOverride: PropTypes.string,

  /**
   * Title of the cross component
   */
  closeIconTitle: PropTypes.string
};

Modal.defaultProps = {
  onClose: noop,
  show: false,
  children: '',
  title: '',
  className: '',
  cssOverride: '',
  closeIconTitle: ''
};

export default React.memo(Modal);
