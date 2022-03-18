/*
 ** Copyright (c) 2019 Oracle and/or its affiliates.
 */

import {ADMIN, APPROVER} from '@oracle-cx-commerce/commerce-utils/constants/roles';
import {getCurrentProfile, getProfile, getRoles, isAuthenticated} from '@oracle-cx-commerce/commerce-utils/selector';

export const getAuthenticatedStatus = state => {
  const {id, parentOrganization} = getProfile(state);
  const isB2BUser = id && parentOrganization !== null ? true : false;
  const currentProfile = getCurrentProfile(state);
  const roles = getRoles(state);

  const isDelegatedAdmin =
    currentProfile.roles &&
    currentProfile.roles.find(roleId => {
      return roles[roleId].function === ADMIN;
    }) !== undefined
      ? true
      : false;
  const isApprover =
    currentProfile.roles !== undefined &&
    currentProfile.roles !== null &&
    currentProfile.roles.find(roleId => {
      return roles[roleId].function === APPROVER;
    }) !== undefined
      ? true
      : false;

  return {
    authenticated: isAuthenticated(state) ? true : false,
    isB2BUser,
    isDelegatedAdmin,
    isApprover,
    currentProfile
  };
};
