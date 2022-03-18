/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildResources} from '@oracle-cx-commerce/resources/utils';
import defaultConfig from '@oracle-cx-commerce/react-widgets/config';

const widgetResourceKeys = [
  'actionAddACreditCard',
  'actionManage',
  'headingSavedCreditCards',
  'labelManageCardLink',
  'labelSavedCard',
  'textDefaultCard',
  'textExpiryDate',
  'textProfileCardHelper1',
  'textProfileCardHelper2'
];

export const CustomProfileSavedCardSummary = {
  packageId: '@oracle-cx-commerce/react-widgets',
  availableToAllPages: false,
  pageTypes: ['profile'],
  config: defaultConfig,
  resources: buildResources(resourceBundle, widgetResourceKeys),
  actions: ['listProfileSavedCards', 'notify'],
  fetchers: ['fetchCardTypes']
};
