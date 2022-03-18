/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useContext, useEffect} from 'react';
import CheckIcon from '@oracle-cx-commerce/react-components/icons/check';
import CloseIcon from '@oracle-cx-commerce/react-components/icons/close';
import InfoIcon from '@oracle-cx-commerce/react-components/icons/info';
import WarningIcon from '@oracle-cx-commerce/react-components/icons/warning';
import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';

const clearAllNotifications = (notifications, action) => {
  notifications.forEach(notification => {
    action('notifyClear', {id: notification.id});
  });
};

const Notification = props => {
  const {action} = useContext(StoreContext);
  const {notifications, actionClose, label} = props;
  let icon = null;
  switch (props.type) {
    case 'info':
      icon = <InfoIcon className="Notification__InfoIcon" aria-label={label} />;
      break;
    case 'warn':
      icon = <WarningIcon className="Notification__WarnIcon" aria-label={label} />;
      break;
    case 'error':
      icon = <WarningIcon className="Notification__ErrorIcon" aria-label={label} />;
      break;
    case 'success':
      icon = <CheckIcon className="Notification__SuccessIcon" aria-label={label} />;
      break;
    default:
      return null;
  }
  useEffect(()=>{
    const timer =  setInterval(()=>{clearAllNotifications(notifications,action)},5000)
    return ()=>{
      clearInterval(timer)
    }
   },[clearAllNotifications])

  return (
    <Styled id="Notification" css={css}>
      <div className={`Notification Notification__${props.type}`} role="alert">
        <div className="Notification__IconWrapper">{icon}</div>
        <div className="Notification__Messages">
          {notifications.map(notification => {
            return (
              <div key={notification.id}>
                <span className="Notification__Message">{notification.message}</span>
              </div>
            );
          })}
        </div>

        <button
          aria-label={actionClose}
          className={`Notification__CloseButton Notification__CloseButton--${props.type}`}
          type="button"
          onClick={() => clearAllNotifications(notifications, action)}
        >
          <CloseIcon className="Notification__CloseIcon" />
        </button>
      </div>
    </Styled>
  );
};

export default Notification;
