/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import * as resourceBundle from '@oracle-cx-commerce/resources';

import {buildResources} from '@oracle-cx-commerce/resources/utils';
import defaultConfig from '@oracle-cx-commerce/react-widgets/config';
import mobileConfig from './config';

const widgetResourceKeys = [
  'deleteFilterAltText',
  'textBelowPrice',
  'textDone',
  'textFilter',
  'headingFilterResults',
  'textFilters',
  'textItemCount',
  'textPriceAndAbove',
  'actionReset',
  'textSelectAValue',
  'actionShowMore'
];

export const FacetedNavigationMobile = {
  packageId: '@oracle-cx-commerce/react-widgets',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  config: mobileConfig,
  pageTypes: ['search', 'category']
};

export const customFacetedNavigationDesktop = {
  packageId: '@oracle-cx-commerce/react-widgets',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  config: defaultConfig,
  pageTypes: ['search', 'category']
};
