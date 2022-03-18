/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import {
  DISPLAY_FAVICON,
  DISPLAY_FLAG,
  DO_NOT_DISPLAY_ICON,
  FLAG_ICON_EXT,
  FLAG_ICON_PATH,
  PRICE_GROUP_PARAM
} from '@oracle-cx-commerce/react-widgets/site/country-store-language-currency/utils';
import React, {Suspense, useCallback, useContext, useEffect, useState} from 'react';

import DropDownArrowIcon from '@oracle-cx-commerce/react-components/icons/drop-down-arrow';
import Form from '@oracle-cx-commerce/react-components/form';
import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import css from '@oracle-cx-commerce/react-widgets/site/country-store-language-currency/components/country-store-language-currency-picker/styles.css';
import {getOrderData} from '@oracle-cx-commerce/react-widgets/site/country-store-language-currency/components/country-store-language-currency-picker/selectors';

const Modal = React.lazy(() => import('@oracle-cx-commerce/react-components/modal'));
const Popover = React.lazy(() => import('@oracle-cx-commerce/react-components/popover'));
/**
 * Keyboard key constants
 */
const TAB_KEY = 'Tab';

/**
 * Displays country store/language/currency selectors.
 * @param {*} props - includes labels for site settings and CountryStore/Language/Currency selectors.
 */
const CountryStoreLanguageCurrencyPicker = props => {
  /** Site Initial settings from props */
  const {
    additionalLanguages = [],
    allSites = {},
    priceListGroup,
    page = '',
    currentSite,
    locale,
    priceListGroupList = [],
    isB2BUser,
    currencyCode,
    symbol
  } = props;

  /** shared parent component's state constant that controls modal display*/
  const {displayLocalePickerModal, setDisplayLocalePickerModal, isMobile = false} = props;

  /** Labels */
  const {
    actionApply,
    textClose,
    textCurrency,
    labelCountryStoreOrSite,
    textLanguage,
    labelSelectCountry,
    labelSelectCurrency,
    labelSelectCountryAndCurrency,
    labelSelectCountryAndLanguage,
    labelSelectCountryLanguageAndCurrency,
    labelSelectLanguage,
    labelSelectLanguageAndCurrency
  } = props;

  /** Configuration Settings */
  const {
    hideSiteSelector = false,
    hideLanguageSelector = false,
    hideCurrencySelector = false,
    iconToDisplayInSiteSelector = DO_NOT_DISPLAY_ICON,
    cssOverride = ''
  } = props;

  /** Order Data */
  const {currentOrder, currentPriceListGroup} = props;
  const {action} = useContext(StoreContext);

  /**
   * site settings plain object
   */
  const siteData = {};
  siteData.selectedSiteId = currentSite.id;
  siteData.selectedLocale = locale;
  siteData.selectedAdditionalLanguages = additionalLanguages;
  siteData.selectedPriceListGroupList = priceListGroupList;
  siteData.selectedPriceListGroupId = priceListGroup;
  siteData.defaultLanguage = additionalLanguages.find(language => language.localeId === currentSite.defaultLocaleId);

  /**
   * component's state constants
   */
  const [siteSettings, setSiteSettings] = useState(siteData);

  /**
   * URL and locale variables
   */
  let iconUrl = null;
  if (iconToDisplayInSiteSelector === DISPLAY_FLAG && allSites[siteSettings.selectedSiteId].defaultShippingCountryId) {
    // constructs flag icon url.
    iconUrl = `${FLAG_ICON_PATH}${allSites[
      siteSettings.selectedSiteId
    ].defaultShippingCountryId.toLowerCase()}${FLAG_ICON_EXT}`;
  } else if (iconToDisplayInSiteSelector === DISPLAY_FAVICON) {
    iconUrl = allSites[siteSettings.selectedSiteId].favicon;
  }

  let oldPriceListGroupId = priceListGroup;

  /**
   * Selectors display control constants
   */
  const displaySiteSelector = (!hideSiteSelector && Object.keys(allSites).length > 1) || isB2BUser;
  const displayLanguageSelector = !hideLanguageSelector && siteSettings.selectedAdditionalLanguages.length > 1;
  const displayCurrencySelector =
    (!hideCurrencySelector && siteSettings.selectedPriceListGroupList.length > 1) || isB2BUser;

  const displaySelectors = displaySiteSelector || displayCurrencySelector || displayLanguageSelector;

  /**
   * Failure callback function
   */
  const onNotOk = useCallback(
    ({error: {message = ''} = {}} = {}) => {
      action('notify', {level: 'error', message});
    },
    [action]
  );

  /**
   * If the price list group is changed,
   * then do a price cart call to get the current incomplete order with the latest price list group.
   */
  useEffect(() => {
    if (currentOrder && currentOrder.id) {
      if (currentOrder.priceListGroup.id !== currentPriceListGroup.id) {
        action('priceCart', {}).then(response => {
          if (!response.ok) {
            onNotOk(response);
          }
        });
      }
    }
  }, [action, currentOrder, currentPriceListGroup, onNotOk]);

  /**
   * Method hide the country store/language/currency picker overlay
   * @param {*} event - contains context of the event from which event is triggered
   */
  const hideLocalePickerModal = event => {
    if (event) {
      event.preventDefault();
    }
    setDisplayLocalePickerModal(false);
    setSiteSettings(prevState => {
      return {
        ...prevState,
        selectedSiteId: currentSite.id,
        selectedAdditionalLanguages: additionalLanguages,
        selectedPriceListGroupList: priceListGroupList,
        selectedLocale: locale
      };
    });
  };

  /**
   * handles the site change event and update the locale and currency selection values
   * based on the selected site.
   * @param {*} siteId - site id of current selection of site selector
   */
  const handleSiteChange = event => {
    event.preventDefault();
    const newSiteId = event.target.value;
    const defaultLanguage = allSites[newSiteId].additionalLanguages.find(
      language => language.localeId === allSites[newSiteId].defaultLocaleId
    );
    const defaultPriceListGroupId = allSites[newSiteId].defaultPriceListGroup.id;
    setSiteSettings(prevState => {
      return {
        ...prevState,
        selectedSiteId: newSiteId,
        selectedAdditionalLanguages: allSites[newSiteId].additionalLanguages,
        selectedPriceListGroupList: allSites[newSiteId].priceListGroupList,
        selectedLocale: defaultLanguage.name,
        selectedPriceListGroupId: defaultPriceListGroupId,
        defaultLanguage
      };
    });
  };

  /**
   * handles the language change event and sets the locale value based on the selected language
   * @param {*} event - contains context of the event from which event is triggered
   */
  const handleLanguageChange = event => {
    event.preventDefault();
    const newLocale = event.target.value;
    setSiteSettings(prevState => {
      return {
        ...prevState,
        selectedLocale: newLocale
      };
    });
  };

  /**
   * handles the currency change event and sets the price list group id value
   * based on the selected currency
   * @param {*} event - contains context of the event from which event is triggered
   */
  const handleCurrencyChange = event => {
    event.preventDefault();
    const newPriceListGroupId = event.target.value;
    oldPriceListGroupId = newPriceListGroupId;
    setSiteSettings(prevState => {
      return {
        ...prevState,
        selectedPriceListGroupId: newPriceListGroupId
      };
    });
  };

  /**
   * returns the dynamic title based on the selectors available for selection
   */
  const getLocalePickerTitle = () => {
    let title = '';
    if (displaySiteSelector && displayLanguageSelector && displayCurrencySelector) {
      /** All the 3 selectors are available */
      title = labelSelectCountryLanguageAndCurrency;
    } else if (displaySiteSelector && displayLanguageSelector && !displayCurrencySelector) {
      /** Only site and language selectors are available */
      title = labelSelectCountryAndLanguage;
    } else if (displaySiteSelector && !displayLanguageSelector && displayCurrencySelector) {
      /** Only site and currency selectors are available */
      title = labelSelectCountryAndCurrency;
    } else if (!displaySiteSelector && displayLanguageSelector && displayCurrencySelector) {
      /** Only language and currency selectors are available */
      title = labelSelectLanguageAndCurrency;
    } else if (displaySiteSelector && !displayLanguageSelector && !displayCurrencySelector) {
      /** Only site selector is available */
      title = labelSelectCountry;
    } else if (!displaySiteSelector && displayLanguageSelector && !displayCurrencySelector) {
      /** Only language selector is available */
      title = labelSelectLanguage;
    } else if (!displaySiteSelector && !displayLanguageSelector && displayCurrencySelector) {
      /** Only currency selector is available */
      title = labelSelectCurrency;
    }

    return title;
  };

  /**
   * returns the current base url
   */
  const getBaseURL = () => {
    let {productionURL} = allSites[siteSettings.selectedSiteId];
    if (!productionURL.match(/^http?:\/\//i) && !productionURL.match(/^https?:\/\//i)) {
      productionURL = `${location.protocol}//${productionURL}`;
    }

    return `${productionURL}`;
  };

  /**
   * Handles the form submit after selection of settings from site/language/currency selector.
   * @param {*} event - form submit event
   */
  const handleSubmitForm = event => {
    event.preventDefault();
    // navigate to the site with user preferred store/site, language and PLG
    // first check whether site is same or not
    let url = '';
    if (siteSettings.selectedSiteId === undefined || currentSite.id === siteSettings.selectedSiteId) {
      // if Site is not changed, redirect to same site with selected locale and currency.
      if (locale !== siteSettings.selectedLocale) {
        if (siteSettings.defaultLanguage.name !== siteSettings.selectedLocale) {
          url = `${getBaseURL()}/${siteSettings.selectedLocale}${page.charAt(0) === '/' ? page : `/${page}`}`;
        } else {
          // while redirecting to site's default locale based page, remove the locale from URL.
          url = `${getBaseURL()}${page.charAt(0) === '/' ? page : `/${page}`}`;
        }
      } else {
        url = `${getBaseURL()}${page.charAt(0) === '/' ? page : `/${page}`}`;
      }
      const lastChar = url.slice(-1);
      // Strip the last character from the URL if it is equal to '/'
      if (lastChar === '/') {
        url = url.slice(0, -1);
      }

      if (oldPriceListGroupId !== siteSettings.selectedPriceListGroupId) {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set(PRICE_GROUP_PARAM, siteSettings.selectedPriceListGroupId);
        const newParams = searchParams.toString();
        const urlWithParams = new URL(url);
        urlWithParams.search = newParams;
        url = urlWithParams.toString();
      }
      window.location.assign(url);
    } else {
      // If Site is changed, redirect to the new site with selected locale and currency.
      // obtain the URL of the selected site
      url = allSites[siteSettings.selectedSiteId].productionURL;
      if (url) {
        if (!url.match(/^http?:\/\//i) && !url.match(/^https?:\/\//i)) {
          url = `//${url}`;
        }

        if (siteSettings.defaultLanguage.name !== siteSettings.selectedLocale) {
          url = `${url}/${siteSettings.selectedLocale}`;
        }

        if (priceListGroup !== siteSettings.selectedPriceListGroupId) {
          const searchParams = new URLSearchParams('');
          searchParams.set(PRICE_GROUP_PARAM, siteSettings.selectedPriceListGroupId);
          const newParams = searchParams.toString();
          url = `${url}?${newParams}`;
        }
        window.location.assign(url);
      }
    }
  };

  /**
   * Country Store/Site selector.
   */
  const siteSelector = () =>
    (displaySiteSelector && !isB2BUser && (
      <div className="CountryStoreLanguageCurrencyPicker__InputElement">
        {/* Country Store / Site */}
        <label htmlFor={`siteSelector`}>{labelCountryStoreOrSite}</label>
        <div className="CountryStoreLanguageCurrencyPicker__InputElementIconDiv">
          <DropDownArrowIcon className="CountryStoreLanguageCurrencyPicker__IconBasicStyle" />
        </div>
        <div className="CountryStoreLanguageCurrencyPicker__InputElementDiv">
          <select
            id={`siteSelector`}
            name={`siteSelector`}
            data-testid="siteSelector"
            className="CountryStoreLanguageCurrencyPicker__SiteSelectorWithIcon"
            style={
              iconToDisplayInSiteSelector !== DO_NOT_DISPLAY_ICON && iconUrl
                ? {
                    backgroundImage: `url('${iconUrl}')`,
                    paddingLeft: `2.5rem`
                  }
                : {}
            }
            value={siteSettings.selectedSiteId}
            onChange={event => {
              handleSiteChange(event);
            }}
          >
            {Object.keys(allSites).map(site => (
              <option key={site} value={site}>
                {allSites[site].name}
              </option>
            ))}
          </select>
          <span className="validationMessage"></span>
        </div>
      </div>
    )) ||
    (isB2BUser && (
      <div className="CountryStoreLanguageCurrencyPicker__Display">
        <label htmlFor="siteDisplay">{labelCountryStoreOrSite}</label>
        <span id="siteDisplay">
          {allSites[siteSettings.selectedSiteId] && allSites[siteSettings.selectedSiteId].name}
        </span>
      </div>
    ));

  /**
   * Language selector.
   */
  const languageSelector = () =>
    displayLanguageSelector && (
      <div className="CountryStoreLanguageCurrencyPicker__InputElement">
        {/* Language */}
        <label htmlFor={`languageSelector`}>{textLanguage}</label>
        <div className="CountryStoreLanguageCurrencyPicker__InputElementIconDiv">
          <DropDownArrowIcon className="CountryStoreLanguageCurrencyPicker__IconBasicStyle" />
        </div>
        <div className="CountryStoreLanguageCurrencyPicker__InputElementDiv">
          <select
            id={`languageSelector`}
            name={`languageSelector`}
            data-testid="languageSelector"
            value={siteSettings.selectedLocale}
            onChange={event => {
              handleLanguageChange(event);
            }}
          >
            {siteSettings.selectedAdditionalLanguages.map(locale => (
              <option key={locale.localeId} value={locale.name}>
                {locale.displayName}
              </option>
            ))}
          </select>
          <span className="validationMessage"></span>
        </div>
      </div>
    );

  /**
   *  Currency selector.
   */
  const currencySelector = () =>
    (displayCurrencySelector && !isB2BUser && (
      <div className="CountryStoreLanguageCurrencyPicker__InputElement">
        {/* Currency */}
        <label htmlFor={`currencySelector`}>{textCurrency}</label>
        <div className="CountryStoreLanguageCurrencyPicker__InputElementIconDiv">
          <DropDownArrowIcon className="CountryStoreLanguageCurrencyPicker__IconBasicStyle" />
        </div>
        <div className="CountryStoreLanguageCurrencyPicker__InputElementDiv">
          <select
            id={`currencySelector`}
            name={`currencySelector`}
            value={siteSettings.selectedPriceListGroupId}
            onChange={event => {
              handleCurrencyChange(event);
            }}
          >
            {siteSettings.selectedPriceListGroupList.map(plg => (
              <option key={plg.id} value={plg.id}>
                {`${plg.currency.symbol} `} {plg.currency.currencyCode}
              </option>
            ))}
          </select>
          <span className="validationMessage"></span>
        </div>
      </div>
    )) ||
    (isB2BUser && (
      <div className="CountryStoreLanguageCurrencyPicker__Display">
        <label htmlFor="currencyDisplay">{textCurrency}</label>
        <span id="currencyDisplay">
          {`${symbol} `}
          {currencyCode}
        </span>
      </div>
    ));
  /**
   * Locale pickers modal title sub component
   */
  const localePickersTitleForMobile = () => (
    <span className="CountryStoreLanguageCurrencyPicker__ModalTitle">
      <h2>{getLocalePickerTitle()}</h2>
    </span>
  );

  /**
   * Locale pickers modal title sub component
   */
  const localePickersTitleForDesktop = () => (
    <span className="CountryStoreLanguageCurrencyPicker__ModalTitle">
      <span>{getLocalePickerTitle()}</span>
    </span>
  );

  /**
   * Renders Apply button.
   */
  const applyButton = () =>
    (!isB2BUser || (isB2BUser && displayLanguageSelector)) && (
      <div className="CountryStoreLanguageCurrencyPicker__SubmitButtonDiv">
        <button
          type="submit"
          className="CountryStoreLanguageCurrencyPicker__SubmitButton"
          onKeyDown={event => {
            if (!event.shiftKey && event.key === TAB_KEY) {
              event.preventDefault();
            }
          }}
        >
          {actionApply}
        </button>
      </div>
    );

  /**
   * renders the locale picker modal as an overlay with site,language & currency selectors.
   */
  const localePickerModal = () =>
    displayLocalePickerModal && (
      <div className="CountryStoreLanguageCurrencyPicker">
        <Form noValidate onSubmit={handleSubmitForm}>
          {
            <div>
              {siteSelector()}
              {languageSelector()}
              {currencySelector()}
              {applyButton()}
            </div>
          }
        </Form>
      </div>
    );

  return (
    <Styled id="CountryStoreLanguageCurrencyPicker" css={css}>
      <>
        {displaySelectors && isMobile && typeof window !== 'undefined' && (
          <Suspense fallback={null}>
            <Modal
              show={displayLocalePickerModal}
              closeIconTitle={textClose}
              closeArialLabel={textClose}
              onClose={hideLocalePickerModal}
              title={localePickersTitleForMobile()}
              cssOverride={cssOverride}
            >
              {localePickerModal()}
            </Modal>
          </Suspense>
        )}

        {displaySelectors && !isMobile && typeof window !== 'undefined' && (
          <div className="LocalePickerPopover">
            <Suspense fallback={null}>
              <Popover
                show={displayLocalePickerModal}
                closeIconTitle={textClose}
                closeArialLabel={textClose}
                onClose={hideLocalePickerModal}
                title={localePickersTitleForDesktop()}
                cssOverride={cssOverride}
                displayBackdrop={true}
              >
                {localePickerModal()}
              </Popover>
            </Suspense>
          </div>
        )}
      </>
    </Styled>
  );
};

export default connect(getOrderData)(CountryStoreLanguageCurrencyPicker);
