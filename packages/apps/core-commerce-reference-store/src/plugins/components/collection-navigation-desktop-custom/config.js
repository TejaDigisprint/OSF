/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildConfigResources} from '@oracle-cx-commerce/resources/utils';

const configResourceKeys = [
  'configCategoryMediaPropertyLabel',
  'configCategoryMediaPropertyHelpText',
  'configHideCategoryIfOutOfStockLabel',
  'configHideCategoryIfOutOfStockHelpText'
];

const config = {
  properties: [
    {
      id: 'categoryMediaProperty',
      type: 'stringType',
      name: 'categoryMediaProperty',
      labelResourceId: 'configCategoryMediaPropertyLabel',
      helpTextResourceId: 'configCategoryMediaPropertyHelpText'
    },
    {
      id: 'hideCategoryIfOutOfStock',
      type: 'booleanType',
      defaultValue: false,
      labelResourceId: 'configHideCategoryIfOutOfStockLabel',
      helpTextResourceId: 'configHideCategoryIfOutOfStockHelpText'
    }
  ],
  locales: buildConfigResources(resourceBundle, configResourceKeys)
};

export default config;
