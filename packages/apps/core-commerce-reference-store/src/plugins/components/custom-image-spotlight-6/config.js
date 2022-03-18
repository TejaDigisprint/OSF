/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import * as resourceBundle from '@oracle-cx-commerce/resources';

import {buildConfigResources} from '@oracle-cx-commerce/resources/utils';
import {mergeDefaultConfig} from '@oracle-cx-commerce/react-widgets/config';

const configResourceKeys = [
  'configMediaLabel',
  'configMediaLinkBehaviorLabel',
  'configMediaTargetSelfLabel',
  'configMediaTargetBlankLabel',
  'configMediaLinkURLHelpText',
  'configMediaLinkURLLabel',
  'configMediaScreenTextLabel',
  'configMediaScreenTextPositiontLabel',
  'configAbovePositionTextLabel',
  'configBelowPositionTextLabel',
  'configLeftPositionTextLabel',
  'configRightPositionTextLabel',
  'configMediaTitleTextLabel',
  'configMediaAltTextLabel',
  'configMediaTitleHelpText',
  'configMediaAltHelpText'
];

const config = mergeDefaultConfig({
  properties: [
    {
      id: 'mediaTitle',
      type: 'sectionTitleType',
      labelResourceId: 'configMediaLabel'
    },
    
    {
      id: 'mediaAlt',
      type: 'stringType',
      labelResourceId: 'configMediaAltTextLabel',
      defaultValue: '',
      helpTextResourceId: 'configMediaAltHelpText',
      required: true,
      maxLength: 125
    },
    {
      id: 'mediaTitle',
      type: 'stringType',
      labelResourceId: 'configMediaTitleTextLabel',
      defaultValue: '',
      helpTextResourceId: 'configMediaTitleHelpText',
      required: false,
      maxLength: 500
    },
   
    {
      id: 'mediaLinkBehavior',
      type: 'optionType',
      labelResourceId: 'configMediaLinkBehaviorLabel',
      defaultValue: '_self',
      options: [
        {
          id: 'mediaTargetSelf',
          value: '_self',
          labelResourceId: 'configMediaTargetSelfLabel'
        },
        {
          id: 'mediaTargetBlank',
          value: '_blank',
          labelResourceId: 'configMediaTargetBlankLabel'
        }
      ],
      required: true
    },
    {
      id: 'mediaScreenText',
      type: 'stringType',
      maxLength: 5000,
      labelResourceId: 'configMediaScreenTextLabel',
      defaultValue: '',
      required: false
    },
    {
      id: 'mediaScreenTextPosition',
      type: 'optionType',
      labelResourceId: 'configMediaScreenTextPositiontLabel',
      defaultValue: 'below',
      options: [
        {
          id: 'abovePositionText',
          value: 'above',
          labelResourceId: 'configAbovePositionTextLabel'
        },
        {
          id: 'belowPositionText',
          value: 'below',
          labelResourceId: 'configBelowPositionTextLabel'
        },
        {
          id: 'leftPositionText',
          value: 'left',
          labelResourceId: 'configLeftPositionTextLabel'
        },
        {
          id: 'rightPositionText',
          value: 'right',
          labelResourceId: 'configRightPositionTextLabel'
        }
      ],
      required: true
    }
  ],
  locales: buildConfigResources(resourceBundle, configResourceKeys),
  defaults: {
    mediaTitle: ''
  }
});

export default config;
