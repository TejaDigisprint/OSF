/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildResources} from '@oracle-cx-commerce/resources/utils';
import defaultConfig from '@oracle-cx-commerce/react-widgets/config';

export const widgetResourceKeys = [
  'labelFirstName',
  'labelLastName',
  'labelEmail',
  'textLogIn',
  'labelCancel',
  'labelCountry',
  'labelZipCode',
  'labelSave',
  'labelState',
  'labelStreetAddress',
  'labelCityTown',
  'labelEmailUpdates',
  'pageHeaderRequestAccount',
  'textRequestAccountInfo',
  'labelsRequestAccountRadioGroupText',
  'labelsContactRegistration',
  'labelAccountRegistration',
  'labelCompanyName',
  'labelAccountID',
  'labelRequesterComments',
  'existingAccount',
  'labelForGdpr',
  'textSuccessfulRegistration',
  'labelRequestAnAccount',
  'textSuccessfulRegistrationPart2',
  'textCompanyAddressOptional',
  'labelStreetAddress1',
  'labelStreetAddress2',
  'labelPhoneNumber'
];

export const CustomAccountsAndContactsRegistration = {
  packageId: '@oracle-cx-commerce/react-widgets',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  config: defaultConfig
};
