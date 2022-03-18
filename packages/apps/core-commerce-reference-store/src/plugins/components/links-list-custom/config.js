/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildConfigResources} from '@oracle-cx-commerce/resources/utils';
import {mergeDefaultConfig} from '@oracle-cx-commerce/react-widgets/config';

const configResourceKeys = [
  'configDisplayAndURLLabel',
  'configLinkBehaviorLabel',
  'configLinkBehaviorSelfLabel',
  'configLinkTargetBlankLabel',
  'configLinkBehaviorHelpText',
  'configPlaceHoldersText',
  'configAddMoreRowsText',
  'configDisplayAndURLHelpText1',
  'configDisplayAndURLHelpText2',
  'configNavigationOrientationLabel',
  'configHorizontalOrientationLabel',
  'configVerticalOrientationLabel',
  'configNavigationOrientationHelpText'
];

const config = mergeDefaultConfig({
  properties: [
    {
      id: 'linkBehavior',
      type: 'optionType',
      labelResourceId: 'configLinkBehaviorLabel',
      helpTextResourceId: 'configLinkBehaviorHelpText',
      defaultValue: '_self',
      required: true,
      options: [
        {
          id: 'linkTargetSelf',
          value: '_self',
          labelResourceId: 'configLinkBehaviorSelfLabel'
        },
        {
          id: 'linkTargetBlank',
          value: '_blank',
          labelResourceId: 'configLinkTargetBlankLabel'
        }
      ]
    },
    {
      id: 'navigationOrientation',
      type: 'optionType',
      labelResourceId: 'configNavigationOrientationLabel',
      helpTextResourceId: 'configNavigationOrientationHelpText',
      defaultValue: 'vertical',
      required: true,
      options: [
        {
          id: 'horizontalOrientation',
          value: 'horizontal',
          labelResourceId: 'configHorizontalOrientationLabel'
        },
        {
          id: 'verticalOrientation',
          value: 'vertical',
          labelResourceId: 'configVerticalOrientationLabel'
        }
      ]
    },
    {
      id: 'helpTextLinksListTitle1',
      type: 'sectionTitleType',
      labelResourceId: 'configDisplayAndURLLabel',
      helpTextResourceId: 'configDisplayAndURLHelpText1'
    },
    {
      id: 'helpTextLinksListTitle2',
      type: 'sectionTitleType',
      labelResourceId: 'configHelpTextLabelLinksList',
      helpTextResourceId: 'configDisplayAndURLHelpText2'
    },
    {
      id: 'displayAndURL',
      type: 'multiKeyValuePairsType',
      name: 'displayAndURL',
      labelResourceId: 'configDisplayAndURLLabel',
      placeHolders: 'configPlaceHoldersText',
      maxLengths: '1000,2000',
      noOfColumns: 2,
      addMoreRowsResourceId: 'configAddMoreRowsText',
      required: true
    }
  ],
  defaults: {
    displayAndURL: "[{'0':'','1':''}]"
  },
  locales: buildConfigResources(resourceBundle, configResourceKeys)
});
export default config;
