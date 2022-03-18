/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import * as resourceBundle from '@oracle-cx-commerce/resources';

import {buildConfigResources} from '@oracle-cx-commerce/resources/utils';
import {mergeDefaultConfig} from '@oracle-cx-commerce/react-widgets/config';

const configResourceKeys = [
  'configHideSiteSelectorHelpText',
  'configHideSiteSelectorLabel',
  'configHideLanguageSelectorHelpText',
  'configHideLanguageSelectorLabel',
  'configHideCurrencySelectorHelpText',
  'configHideCurrencySelectorLabel',
  'configIconToDisplayInSiteSelectorHelpText',
  'configIconToDisplayInSiteSelector',
  'configDoNotDisplayLabel',
  'configDisplayFlagLabel',
  'configDisplayFavIconLabel'
];

const countryStoreLanguageCurrencyConfig = mergeDefaultConfig({
  properties: [
    {
      id: 'hideSiteSelector',
      type: 'booleanType',
      name: 'hideSiteSelector',
      helpTextResourceId: 'configHideSiteSelectorHelpText',
      labelResourceId: 'configHideSiteSelectorLabel',
      defaultValue: false
    },
    {
      id: 'hideLanguageSelector',
      type: 'booleanType',
      name: 'hideLanguageSelector',
      helpTextResourceId: 'configHideLanguageSelectorHelpText',
      labelResourceId: 'configHideLanguageSelectorLabel',
      defaultValue: false
    },
    {
      id: 'hideCurrencySelector',
      type: 'booleanType',
      name: 'hideCurrencySelector',
      helpTextResourceId: 'configHideCurrencySelectorHelpText',
      labelResourceId: 'configHideCurrencySelectorLabel',
      defaultValue: false
    },
    {
      id: 'iconToDisplayInSiteSelector',
      type: 'optionType',
      name: 'iconToDisplayInSiteSelector',
      helpTextResourceId: 'configIconToDisplayInSiteSelectorHelpText',
      labelResourceId: 'configIconToDisplayInSiteSelector',
      defaultValue: 'doNotDisplayIcon',
      required: true,
      options: [
        {
          id: 'iconToDisplayInSiteSelectorOption',
          value: 'doNotDisplayIcon',
          labelResourceId: 'configDoNotDisplayLabel'
        },
        {
          id: 'iconToDisplayInSiteSelectorOption',
          value: 'displayFlag',
          labelResourceId: 'configDisplayFlagLabel'
        },
        {
          id: 'iconToDisplayInSiteSelectorOption',
          value: 'displayFavIcon',
          labelResourceId: 'configDisplayFavIconLabel'
        }
      ]
    }
  ],
  locales: buildConfigResources(resourceBundle, configResourceKeys)
});

export default countryStoreLanguageCurrencyConfig;
