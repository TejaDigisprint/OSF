/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildResources} from '@oracle-cx-commerce/resources/utils';
import defaultConfig from '@oracle-cx-commerce/react-widgets/config';

const widgetResourceKeys = [
  'actionCancel',
  'buttonSaveAndContinue',
  'closeLinkAltText',
  'headingAddBillingAddress',
  'headingBillingAddress',
  'headingEditBillingAddress',
  'labelAddANewAddress',
  'labelAddressBook',
  'labelCancel',
  'labelCardCVV',
  'labelCardNumber',
  'labelCompanyName',
  'labelCountry',
  'labelCreditCard',
  'labelDefaultAddress',
  'labelDefaultBillingAddress',
  'labelDefaultShippingAddress',
  'labelEditAddress',
  'labelExpiryDate',
  'labelExpiryMonth',
  'labelExpiryYear',
  'labelFirstName',
  'labelLastName',
  'labelNameOnCard',
  'labelNickName',
  'labelNoAccountAddressesAvailable',
  'labelNoDefaultAddressesAvailable',
  'labelNoInheritedAddressesAvailable',
  'labelNoProfileAddressesAvailable',
  'labelOpenAddressBook',
  'labelPhoneNumberOptional',
  'labelSaveAsANewAccountAddress',
  'labelSaveAsANewProfileAddress',
  'textAccountAddressBook',
  'textAddressesForThisAccount',
  'textAllFieldsRequired',
  'textDefaultAddresses',
  'textEnterABillingAddress',
  'textInheritedAddresses',
  'textLoading',
  'textLoadMoreAccountAddress',
  'textLoadMoreInheritedAddress',
  'textLoadMoreProfileAddress',
  'textOpenAddressBookAndChooseBillingAddress',
  'textProfileAddresses',
  'textRequiredField',
  'textInvalidField',
  'textUseThisAddress',
  'labelSavedCard',
  'labelSaveCardToProfile',
  'labelState',
  'labelStreetAddress',
  'labelTownCity',
  'labelUseAnotherCard',
  'labelZipCode',
  'textFieldInvalid',
  'textExpiryDate'
];

export const CheckoutCreditCardCustom = {
  packageId: '@oracle-cx-commerce/react-widgets',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  availableToAllPages: false,
  pageTypes: ['checkout-payment', 'pending-payment'],
  config: defaultConfig,
  requiresContext: ['payment_context'],
  actions: ['listProfileSavedCardsForCurrentSite', 'getOrganizationDefaultAddresses', 'notify'],
  fetchers: ['fetchCardTypes', 'fetchBillingCountries']
};
