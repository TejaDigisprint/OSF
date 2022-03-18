/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import * as resourceBundle from '@oracle-cx-commerce/resources';

import {buildConfigResources} from '@oracle-cx-commerce/resources/utils';
import {mergeDefaultConfig} from '@oracle-cx-commerce/react-widgets/config';

const configResourceKeys = ['configSearchServicePathHelpText', 'configSearchServicePathLabel'];

const config = mergeDefaultConfig({
  properties: [
    {
      id: 'searchServicePath',
      type: 'stringType',
      name: 'searchServicePath',
      helpTextResourceId: 'configSearchServicePathHelpText',
      labelResourceId: 'configSearchServicePathLabel',
      defaultValue: null
    }
  ],
  locales: buildConfigResources(resourceBundle, configResourceKeys)
});

export default config;
