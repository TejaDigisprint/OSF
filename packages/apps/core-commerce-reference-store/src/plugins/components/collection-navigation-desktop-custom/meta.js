/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import config from './config';
import {mergeDefaultConfig} from '@oracle-cx-commerce/react-widgets/config';

export const customCollectionNavigationDesktop = {
  packageId: '@oracle-cx-commerce/react-widgets',
  config: mergeDefaultConfig(config)
};
