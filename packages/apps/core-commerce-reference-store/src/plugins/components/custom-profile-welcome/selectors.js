/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import {isAuthenticated, getCurrentProfile} from '@oracle-cx-commerce/commerce-utils/selector';
import {isEmptyObject} from '@oracle-cx-commerce/utils/generic';

export const getProfileData = state => {
  const currentProfile = getCurrentProfile(state);
  const {firstName} = currentProfile;

  return {
    firstName,
    isUserLoggedIn: isAuthenticated(state) && !isEmptyObject(currentProfile)
  };
};
