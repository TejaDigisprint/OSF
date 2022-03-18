/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import * as resourceBundle from '@oracle-cx-commerce/resources';

import {buildResources} from '@oracle-cx-commerce/resources/utils';
import countryStoreLanguageCurrencyConfig from '@oracle-cx-commerce/react-widgets/site/country-store-language-currency/config';

const widgetResourceKeys = [
  'actionApply',
  'textClose',
  'labelCountryStoreOrSite',
  'textCurrency',
  'textLanguage',
  'textPipeSymbol',
  'labelSelectCountry',
  'labelSelectCurrency',
  'labelSelectCountryAndCurrency',
  'labelSelectCountryAndLanguage',
  'labelSelectCountryLanguageAndCurrency',
  'labelSelectLanguage',
  'labelSelectLanguageAndCurrency',
  'textSite',
  'headingSiteSettings'
];

export const customCountryStoreLanguageCurrency = {
  packageId: '@oracle-cx-commerce/react-widgets',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  config: countryStoreLanguageCurrencyConfig
};

// export const CountryStoreLanguageCurrencyMobile = CountryStoreLanguageCurrency;
export const customCountryStoreLanguageCurrencyDesktop = customCountryStoreLanguageCurrency;
