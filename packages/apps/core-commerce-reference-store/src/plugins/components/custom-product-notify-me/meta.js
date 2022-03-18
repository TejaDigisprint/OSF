/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import * as resourceBundle from '@oracle-cx-commerce/resources';
import defaultConfig from '@oracle-cx-commerce/react-widgets/config';
import {buildResources} from '@oracle-cx-commerce/resources/utils';

const widgetResourceKeys = ['textProductNotifyMe', 'labelNotifyMe', 'labelEmail', 'alertProductNotifyMeSuccess'];

export const CustomProductNotifyMe = {
  packageId: '@oracle-cx-commerce/react-widgets',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  pageTypes: ['product'],
  config: defaultConfig
};
