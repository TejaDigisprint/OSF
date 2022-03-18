/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildResources} from '@oracle-cx-commerce/resources/utils';
import {mergeDefaultConfig} from '@oracle-cx-commerce/react-widgets/config';
import config from '@oracle-cx-commerce/react-widgets/profile/profile-address-book-summary/config';

const widgetResourceKeys = [
  'actionAddAnAddress',
  'textAddressBook',
  'textAddressBookHelper1',
  'textAddressBookHelper2',
  'labelDefaultAddress',
  'labelManage',
  'actionManage'
];
export const CustomProfileAddressBookSummary = {
  packageId: '@oracle-cx-commerce/react-widgets',
  availableToAllPages: false,
  pageTypes: ['profile'],
  config: mergeDefaultConfig(config),
  resources: buildResources(resourceBundle, widgetResourceKeys)
};
