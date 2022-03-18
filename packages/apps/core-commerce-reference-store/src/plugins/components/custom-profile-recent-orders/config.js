/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import * as resourceBundle from '@oracle-cx-commerce/resources';

import {buildConfigResources} from '@oracle-cx-commerce/resources/utils';

const configResourceKeys = [
  'configDisplayStatusBarLabel',
  'configDisplayStatusBarHelpText',
  'configDisplayThumbnailsLabel',
  'configDisplayThumbnailsHelpText'
];

const config = {
  properties: [
    {
      id: 'displayStatusBar',
      type: 'booleanType',
      labelResourceId: 'configDisplayStatusBarLabel',
      helpTextResourceId: 'configDisplayStatusBarHelpText',
      defaultValue: true
    },
    {
      id: 'displayThumbnails',
      type: 'booleanType',
      labelResourceId: 'configDisplayThumbnailsLabel',
      helpTextResourceId: 'configDisplayThumbnailsHelpText',
      defaultValue: true
    }
  ],
  locales: buildConfigResources(resourceBundle, configResourceKeys)
};

export default config;
