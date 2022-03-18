/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildConfigResources} from '@oracle-cx-commerce/resources/utils';
import {mergeDefaultConfig} from '@oracle-cx-commerce/react-widgets/config';

const configResourceKeys = [
  'collectionIdLabel',
  'collectionCarouselHeadingLabel',
  'displayCollectionNameLabel',
  'displayTextSnippetLabel',
  'noOfSlideItemsCountLabel',
  'itemsToSlideCountLabel',
  'itemsToSlideHelpText'
];

const config = mergeDefaultConfig({
  properties: [
    {
      id: 'categoryId',
      type: 'stringType',
      labelResourceId: 'collectionIdLabel',
      required: true
    },
    {
      id: 'displayCollectionName',
      type: 'optionType',
      labelResourceId: 'collectionCarouselHeadingLabel',
      defaultValue: 'true',
      options: [
        {
          id: 'mediaTargetSelf',
          value: 'true',
          labelResourceId: 'displayCollectionNameLabel'
        },
        {
          id: 'mediaTargetBlank',
          value: 'false',
          labelResourceId: 'displayTextSnippetLabel'
        }
      ],
      required: false
    },
    {
      id: 'itemsPerSlideDesktop',
      type: 'stringType',
      labelResourceId: 'noOfSlideItemsCountLabel',
      defaultValue: '4',
      pattern: '^[1-9]\\d*$',
      required: true
    },
    {
      id: 'noOfItemsToSlide',
      type: 'stringType',
      labelResourceId: 'itemsToSlideCountLabel',
      defaultValue: '1',
      pattern: '^[1-9]\\d*$',
      helpTextResourceId: `itemsToSlideHelpText`
    }
  ],
  locales: buildConfigResources(resourceBundle, configResourceKeys)
});

export default config;
