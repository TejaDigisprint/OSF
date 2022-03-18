/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import {getNotifications} from '@oracle-cx-commerce/commerce-utils/selector';

export const getComponentData = state => {
  const successNotifications = [];
  const errorNotifications = [];
  const warningNotifications = [];
  const infoNotifications = [];
  const notifications = getNotifications(state);
  Object.entries(notifications).forEach(([id, {level, message}]) => {
    if (level === 'success') {
      successNotifications.push({id, level, message});
    } else if (level === 'error') {
      errorNotifications.push({id, level, message});
    } else if (level === 'warn') {
      warningNotifications.push({id, level, message});
    } else if (level === 'info') {
      infoNotifications.push({id, level, message});
    }
  });

  return {successNotifications, errorNotifications, warningNotifications, infoNotifications};
};
