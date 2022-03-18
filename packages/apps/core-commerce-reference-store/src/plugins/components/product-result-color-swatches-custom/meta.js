/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import * as resourceBundle from '@oracle-cx-commerce/resources';

import {buildResources, buildConfigResources} from '@oracle-cx-commerce/resources/utils';

import {mergeDefaultConfig} from '@oracle-cx-commerce/react-widgets/config';

const widgetResourceKeys = ['textNumberOfColors', 'textShowMoreColors'];

const configResourceKeys = [
  'configColorIndicatorHelpText',
  'configColorIndicatorLabel',
  'configTextNumberOfColors',
  'configTextFirstFew',
  'configTextAllColors',
  'configNumberOfSwatchesDisplayedHelpText',
  'configNumberOfSwatchesDisplayedLabel',
  'configColorSwatchShapeHelpText',
  'configColorSwatchShapeLabel',
  'configTextCircular',
  'configTextRectangular',
  'configColorSwatchImageWidthHelpText',
  'configColorSwatchImageWidthLabel',
  'configColorSwatchImageHeightHelpText',
  'configColorSwatchImageHeightLabel',
  'configColorSwatchUrlPlaceholderHelpText',
  'configColorSwatchUrlPlaceholderLabel',
  'configSwatchMappingPropertyHelpText',
  'configSwatchMappingPropertyLabel',
  'configSwatchVariantOptionHelpText',
  'configSwatchVariantOptionLabel'
];

export const customProductResultColorSwatches = {
  packageId: '@oracle-cx-commerce/react-widgets',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  config: mergeDefaultConfig({
    properties: [
      {
        id: 'colorIndicator',
        type: 'optionType',
        name: 'colorIndicator',
        helpTextResourceId: 'configColorIndicatorHelpText',
        labelResourceId: 'configColorIndicatorLabel',
        defaultValue: 'firstFew',
        required: true,
        options: [
          {
            id: 'numberOfColors',
            value: 'numberOfColors',
            labelResourceId: 'configTextNumberOfColors'
          },
          {
            id: 'firstFew',
            value: 'firstFew',
            labelResourceId: 'configTextFirstFew'
          },
          {
            id: 'allColors',
            value: 'allColors',
            labelResourceId: 'configTextAllColors'
          }
        ]
      },
      {
        id: 'numberOfSwatchesDisplayed',
        type: 'stringType',
        name: 'numberOfSwatchesDisplayed',
        helpTextResourceId: 'configNumberOfSwatchesDisplayedHelpText',
        labelResourceId: 'configNumberOfSwatchesDisplayedLabel',
        defaultValue: '5',
        required: true,
        maxLength: 3
      },
      {
        id: 'colorSwatchShape',
        type: 'optionType',
        name: 'colorSwatchShape',
        helpTextResourceId: 'configColorSwatchShapeHelpText',
        labelResourceId: 'configColorSwatchShapeLabel',
        defaultValue: 'circular',
        required: true,
        options: [
          {
            id: 'circular',
            value: 'circular',
            labelResourceId: 'configTextCircular'
          },
          {
            id: 'rectangular',
            value: 'rectangular',
            labelResourceId: 'configTextRectangular'
          }
        ]
      },
      {
        id: 'colorSwatchImageWidth',
        type: 'stringType',
        name: 'colorSwatchImageWidth',
        helpTextResourceId: 'configColorSwatchImageWidthHelpText',
        labelResourceId: 'configColorSwatchImageWidthLabel',
        defaultValue: '24',
        required: true,
        maxLength: 3
      },
      {
        id: 'colorSwatchImageHeight',
        type: 'stringType',
        name: 'colorSwatchImageHeight',
        helpTextResourceId: 'configColorSwatchImageHeightHelpText',
        labelResourceId: 'configColorSwatchImageHeightLabel',
        defaultValue: '24',
        required: true,
        maxLength: 3
      },
      {
        id: 'swatchVariantOption',
        type: 'stringType',
        name: 'swatchVariantOption',
        helpTextResourceId: 'configSwatchVariantOptionHelpText',
        labelResourceId: 'configSwatchVariantOptionLabel',
        defaultValue: 'color'
      },
      {
        id: 'swatchMappingProperty',
        type: 'stringType',
        name: 'swatchMappingProperty',
        helpTextResourceId: 'configSwatchMappingPropertyHelpText',
        labelResourceId: 'configSwatchMappingPropertyLabel',
        defaultValue: 'x_swatchMapping'
      },
      {
        id: 'colorSwatchUrlPlaceholder',
        type: 'stringType',
        name: 'colorSwatchUrlPlaceholder',
        helpTextResourceId: 'configColorSwatchUrlPlaceholderHelpText',
        labelResourceId: 'configColorSwatchUrlPlaceholderLabel',
        defaultValue:
          '/ccstore/v1/images/?source=/file/products/__productId__.__swatchKey__.png&outputFormat=JPEG&quality=0.8&height=__height__&width=__width__'
      }
    ],
    locales: buildConfigResources(resourceBundle, configResourceKeys)
  }),
  pageTypes: ['search', 'category']
};
