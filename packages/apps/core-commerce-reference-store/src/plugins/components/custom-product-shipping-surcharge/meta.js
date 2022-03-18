/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import * as resourceBundle from '@oracle-cx-commerce/resources';
import config from '@oracle-cx-commerce/react-widgets/product/product-shipping-surcharge/config';
import {mergeDefaultConfig} from '@oracle-cx-commerce/react-widgets/config';
import {buildResources} from '@oracle-cx-commerce/resources/utils';

const widgetResourceKeys = ['shippingSurchargeText', 'labelDetails'];

export const CustomProductShippingSurcharge = {
  packageId: '@oracle-cx-commerce/react-widgets',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  config: mergeDefaultConfig(config),
  requiresContext: ['product_context']
};
