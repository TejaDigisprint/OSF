/*
 ** Copyright (c) 2019 Oracle and/or its affiliates.
 */

import * as resourceBundle from '@oracle-cx-commerce/resources';

import {buildResources} from '@oracle-cx-commerce/resources/utils';
import config from '@oracle-cx-commerce/react-widgets/session/user-profile-links/config';

const widgetResourceKeys = [
  'textAddressBook',
  'textAccountAddressBook',
  'textCreateAnAccount',
  'textEmailPreferences',
  'textLogIn',
  'textLogout',
  'textMyAccount',
  'textOrderHistory',
  'textSavedCreditCards',
  'textUpdatePassword',
  'textWishLists',
  'textScheduledOrders',
  'textExtraLinks1',
  'textExtraLinks2',
  'textExtraLinks3',
  'textExtraLinks4',
  'textExtraLinks5',
  'textExtraLinks6',
  'textExtraLinks7',
  'textExtraLinks8',
  'textExtraLinks9',
  'textExtraLinks10',
  'textAccountContacts',
  'textOrderApprovalSettings',
  'textOrdersPendingApproval',
  'textRegistrationReuests',
  'textPurchaseLists',
  'labelLoyaltyDetails'
];

// export const UserProfileLinksMobile = {
//   packageId: '@oracle-cx-commerce/react-widgets',
//   config,
//   resources: buildResources(resourceBundle, widgetResourceKeys)
// };

export const customUserProfileLinksDesktop = {
  packageId: '@oracle-cx-commerce/react-widgets',
  config,
  resources: buildResources(resourceBundle, widgetResourceKeys)
};
