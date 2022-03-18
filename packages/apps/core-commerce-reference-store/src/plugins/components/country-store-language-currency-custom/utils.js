/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import {isEmptyObject} from '@oracle-cx-commerce/utils/generic';

export const DO_NOT_DISPLAY_ICON = 'doNotDisplayIcon';
export const DISPLAY_FLAG = 'displayFlag';
export const DISPLAY_FAVICON = 'displayFavIcon';
export const FLAG_ICON_PATH = '/file/general/flg-';
export const FLAG_ICON_EXT = '.svg';
export const PRICE_GROUP_PARAM = 'storePriceListGroupId';

/**
 * returns the Site Config Settings
 */
export const getSiteConfigSettings = props => {
  /** Site Initial settings from props */
  const {allSites = {}, additionalLanguages = [], currentSite, locale, priceListGroup, priceListGroupList = []} = props;

  /** Configuration Settings*/
  const {
    hideSiteSelector = false,
    hideLanguageSelector = false,
    hideCurrencySelector = false,
    iconToDisplayInSiteSelector = DO_NOT_DISPLAY_ICON
  } = props;

  /** Site Configuration Settings */
  let siteConfigSettings = {};

  if (!isEmptyObject(allSites)) {
    let selectedLanguage = null;
    if (additionalLanguages.length > 0 && locale) {
      selectedLanguage = additionalLanguages.find(
        language => language.name.replace('_', '-').toLowerCase() === locale.replace('_', '-').toLowerCase()
      );
    }

    let selectedPLG = null;
    if (priceListGroup && priceListGroupList.length > 0) {
      selectedPLG = priceListGroupList.find(plg => plg.id === priceListGroup);
    }

    const displaySiteLink = !hideSiteSelector && Object.keys(allSites).length > 1;
    const displayLocaleLink = !hideLanguageSelector && additionalLanguages.length > 1;
    const displayCurrencyLink = !hideCurrencySelector && priceListGroupList.length > 1;

    const displayLocaleLinks = displaySiteLink || displayCurrencyLink || displayLocaleLink;

    /**
     * Site icon URL
     */
    let iconUrl = null;
    const defaultShippingCountryId = allSites[currentSite.id].defaultShippingCountryId
      ? allSites[currentSite.id].defaultShippingCountryId
      : '';
    if (iconToDisplayInSiteSelector === DISPLAY_FLAG && defaultShippingCountryId) {
      // constructs flag icon url.
      iconUrl = `${FLAG_ICON_PATH}${defaultShippingCountryId.toLowerCase()}${FLAG_ICON_EXT}`;
    } else if (iconToDisplayInSiteSelector === DISPLAY_FAVICON) {
      iconUrl = allSites[currentSite.id].favicon;
    }

    siteConfigSettings = {
      displaySiteLink,
      displayLocaleLink,
      displayCurrencyLink,
      displayLocaleLinks,
      selectedLanguage,
      selectedPLG,
      iconUrl
    };
  }

  return siteConfigSettings;
};
