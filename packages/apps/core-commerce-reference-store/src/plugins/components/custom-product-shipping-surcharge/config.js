/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildConfigResources} from '@oracle-cx-commerce/resources/utils';

const configResourceKeys = ['configShippingSurchargeMessageLabel', 'configShippingSurchargeMessageHelpText'];

const config = {
  properties: [
    {
      id: 'shippingSurchargeMessage',
      type: 'stringType',
      name: 'shippingSurchargeMessage',
      helpTextResourceId: 'configShippingSurchargeMessageHelpText',
      labelResourceId: 'configShippingSurchargeMessageLabel',
      defaultValue: 'Extra Handling costs while shipping the product.'
    }
  ],
  locales: buildConfigResources(resourceBundle, configResourceKeys)
};

export default config;
