/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import {getCurrentProfile, getSite, isAuthenticated} from '@oracle-cx-commerce/commerce-utils/selector';
import {isEmptyObject} from '@oracle-cx-commerce/utils/generic';

export const getProfileData = state => {
  const currentProfile = getCurrentProfile(state);
  const {GDPRProfileP13nConsentGranted, receiveEmail} = currentProfile;
  const {requireGDPRP13nConsent} = getSite(state);

  return {
    GDPRProfileP13nConsentGranted,
    receiveEmail,
    requireGDPRP13nConsent,
    isUserLoggedIn: isAuthenticated(state) && !isEmptyObject(currentProfile)
  };
};
