/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import * as resourceBundle from '@oracle-cx-commerce/resources';

import {buildResources} from '@oracle-cx-commerce/resources/utils';
import config from './config';

const widgetResourceKeys = [
  'actionShowMoreProducts',
  'labelPageOfPages',
  'labelPageOfPagesDropdown',
  'labelPaginationDropDown',
  'labelPreviousPage',
  'labelNextPage',
  'labelFirstPage',
  'labelLastPage',
  'textRetrievingProducts'
];

export const ShowMoreProductsButtoncustom = {
  packageId: '@oracle-cx-commerce/react-widgets',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  config,
  actions: ['search'],
  pageTypes: ['search', 'category'],
  requiresContext: ['pagination_context']
};
