/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildConfigResources} from '@oracle-cx-commerce/resources/utils';
import {mergeDefaultConfig} from '@oracle-cx-commerce/react-widgets/config';

const configResourceKeys = ['configWebContentLabel'];

const config = mergeDefaultConfig({
  properties: [
    {
      id: 'webContent',
      type: 'webContentType',
      labelResourceId: 'configWebContentLabel',
      required: true,
      defaultValue: '<p>Some Web Content Text</p>'
    }
  ],
  locales: buildConfigResources(resourceBundle, configResourceKeys)
});
export default config;
