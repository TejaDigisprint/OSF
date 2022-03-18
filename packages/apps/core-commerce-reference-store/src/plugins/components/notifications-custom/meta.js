/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import * as resourceBundle from '@oracle-cx-commerce/resources';

import {buildResources} from '@oracle-cx-commerce/resources/utils';
import config from '@oracle-cx-commerce/react-widgets/common/notifications/config';
import {mergeDefaultConfig} from '@oracle-cx-commerce/react-widgets/config';

const widgetResourceKeys = ['actionClose', 'labelError', 'labelSuccess', 'labelInfo', 'labelWarn'];

export const customNotifications = {
  packageId: '@oracle-cx-commerce/react-widgets',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  config: mergeDefaultConfig(config)
};
