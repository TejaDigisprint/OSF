/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildConfigResources} from '@oracle-cx-commerce/resources/utils';
import {mergeDefaultConfig} from '@oracle-cx-commerce/react-widgets/config';

const configResourceKeys = [
  'configDisplayBillToNameLabel',
  'configShowEditLinkLabel',
  'configShowEditPaymentLinkHelpText'
];

const config = mergeDefaultConfig({
  properties: [
    {
      id: 'displayBillToName',
      type: 'booleanType',
      labelResourceId: 'configDisplayBillToNameLabel',
      defaultValue: false
    }
  ],
  locales: buildConfigResources(resourceBundle, configResourceKeys)
});

export default config;
