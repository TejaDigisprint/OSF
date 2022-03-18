/*
 ** Copyright (c) 2019 Oracle and/or its affiliates.
 */

import * as resourceBundle from '@oracle-cx-commerce/resources';

import {buildResources} from '@oracle-cx-commerce/resources/utils';
import defaultConfig from '@oracle-cx-commerce/react-widgets/config';

const widgetResourceKeys = [
  'headingEmailMarketingPreferences',
  'actionEdit',
  'textCurrentPreferences',
  'textDoNotReceiveEmailUpdates',
  'textDoNotShowRelevantSiteContent',
  'textReceiveEmailUpdates',
  'textShowRelevantSiteContent'
];

export const CustomProfileEmailMarketingPreferencesSummary = {
  packageId: '@oracle-cx-commerce/react-widgets',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  availableToAllPages: false,
  pageTypes: ['profile'],
  config: defaultConfig
};
