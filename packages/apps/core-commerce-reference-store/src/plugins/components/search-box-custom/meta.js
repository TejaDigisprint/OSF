/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import * as resourceBundle from '@oracle-cx-commerce/resources';

import {buildResources} from '@oracle-cx-commerce/resources/utils';
import config from '@oracle-cx-commerce/react-widgets/product-listing/search-box/config';

const widgetResourceKeys = ['closeLinkAltText', 'actionClear', 'textEnterSearch', 'searchIconAltText'];
const customSearchBox = {
  packageId: '@oracle-cx-commerce/react-widgets',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  config
};

// export const SearchBoxMobile = SearchBox;
export const customSearchBoxDesktop = customSearchBox;
