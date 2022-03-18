/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import * as resourceBundle from '@oracle-cx-commerce/resources';

import {buildConfigResources} from '@oracle-cx-commerce/resources/utils';

const configResourceKeys = ['configNotificationTimeoutLabel', 'configNotificationTimeoutHelpText'];

const config = {
  properties: [
    {
      id: 'notificationTimeout',
      type: 'stringType',
      helpTextResourceId: 'configNotificationTimeoutHelpText',
      labelResourceId: 'configNotificationTimeoutLabel',
      defaultValue: '5',
      required: true,
      maxLength: 3
    }
  ],
  locales: buildConfigResources(resourceBundle, configResourceKeys)
};

export default config;
