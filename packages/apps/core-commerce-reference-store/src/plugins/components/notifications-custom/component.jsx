/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useCallback, useContext, useEffect, useRef} from 'react';

import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import css from './styles.css';
import {getComponentData} from './selectors';
import Notification from './components/notification';

export const customNotifications = props => {
  const {action} = useContext(StoreContext);
  const {notificationTimeout = 5, actionClose, labelError, labelSuccess, labelInfo, labelWarn} = props;
  const {successNotifications = [], errorNotifications = [], warningNotifications = [], infoNotifications = []} = props;
  const timeoutRefSet = useRef(new Set());

  const timeoutNotifications = useCallback(
    id => {
      if (!timeoutRefSet.current.has(id)) {
        setTimeout(() => {
          action('notifyClear', {id});
          timeoutRefSet.current.delete(id);
        }, notificationTimeout * 1000);
        timeoutRefSet.current.add(id);
      }
    },
    [action, notificationTimeout]
  );

  useEffect(() => {
    successNotifications.forEach(({id = ''}) => {
      timeoutNotifications(id);
    });

    infoNotifications.forEach(({id = ''}) => {
      timeoutNotifications(id);
    });
  }, [action, timeoutNotifications, infoNotifications, notificationTimeout, successNotifications]);

  return (
    <Styled id="Notifications" css={css}>
      <div className="Notifications">
        {infoNotifications.length > 0 && (
          <Notification notifications={infoNotifications} type="info" actionClose={actionClose} label={labelInfo} />
        )}
        {successNotifications.length > 0 && (
          <Notification
            notifications={successNotifications}
            type="success"
            actionClose={actionClose}
            label={labelSuccess}
          />
        )}
        {errorNotifications.length > 0 && (
          <Notification notifications={errorNotifications} type="error" actionClose={actionClose} label={labelError} />
        )}
        {warningNotifications.length > 0 && (
          <Notification notifications={warningNotifications} type="warn" actionClose={actionClose} label={labelWarn} />
        )}
      </div>
    </Styled>
  );
};
export default connect(getComponentData)(customNotifications);
