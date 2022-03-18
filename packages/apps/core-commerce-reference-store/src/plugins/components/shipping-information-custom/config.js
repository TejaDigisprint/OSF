/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import {mergeDefaultConfig} from '@oracle-cx-commerce/react-widgets/config';
import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildConfigResources} from '@oracle-cx-commerce/resources/utils';

const configResourceKeys = [
  'configShowItemPriceLabel',
  'configProductSelectionLabel',
  'configProductSelectionHelpText'
];
const config = mergeDefaultConfig({
  properties: [
    {
      id: 'showItemPrice',
      type: 'booleanType',
      labelResourceId: 'configShowItemPriceLabel',
      defaultValue: false
    },
    {
      id: 'enableProductSelection',
      type: 'booleanType',
      defaultValue: false,
      labelResourceId: 'configProductSelectionLabel',
      helpTextResourceId: 'configProductSelectionHelpText'
    }
  ],
  locales: buildConfigResources(resourceBundle, configResourceKeys)
});

export default config;
