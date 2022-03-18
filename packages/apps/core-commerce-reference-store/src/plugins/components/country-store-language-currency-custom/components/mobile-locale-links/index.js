/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import CurrencyIcon from '@oracle-cx-commerce/react-components/icons/currency';
import GlobeIcon from '@oracle-cx-commerce/react-components/icons/globe';
import React, {useContext} from 'react';
import {MenuMobileContext} from '@oracle-cx-commerce/react-widgets/common/menu-mobile/context';
import SiteIcon from '@oracle-cx-commerce/react-components/icons/site';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from '@oracle-cx-commerce/react-widgets/site/country-store-language-currency/components/mobile-locale-links/styles.css';
import {noop} from '@oracle-cx-commerce/utils/generic';

/**
 * Defines the Locale Link component for Mobile Version of the Country Store/Language/Currency Picker Widget.
 */
const LocaleLink = props => {
  const {
    ariaLabel,
    dataTestId,
    linkType,
    iconDisplayText,
    linkDisplayText,
    displayLocalePickerModal,
    setDisplayLocalePickerModal = noop,
    iconUrl = null
  } = props;

  const {isVisible = noop, index} = useContext(MenuMobileContext) || {};
  /**
   * Shows the country store/language/currency Link (site settings portal) overlay.
   */
  const showLocalePickerOverlay = event => {
    event.preventDefault();
    setDisplayLocalePickerModal(true);
  };

  return (
    <div
      className="MobileLocaleLinks__LinkItem"
      role="button"
      data-testid={dataTestId}
      aria-label={ariaLabel}
      tabIndex={isVisible(index) && displayLocalePickerModal === false ? 0 : -1}
      onClick={showLocalePickerOverlay}
      onKeyUp={event => {
        if (event.key === 'Enter') showLocalePickerOverlay(event);
      }}
    >
      <div className="MobileLocaleLinks__LinkItemIconWithDisplayText">
        {linkType === 'site' && <SiteIcon className="MobileLocaleLinks__IconBasicStyle" />}
        {linkType === 'language' && <GlobeIcon className="MobileLocaleLinks__IconBasicStyle" />}
        {linkType === 'currency' && <CurrencyIcon className="MobileLocaleLinks__IconBasicStyle" />}
        {` ${iconDisplayText}`}
      </div>
      <div className="MobileLocaleLinks__LinkItemLinkWithDisplayText">
        {linkType === 'site' && iconUrl && (
          <img data-testid="flag-icon" alt="" className="MobileLocaleLinks__FlagIcon" src={`${iconUrl}`} />
        )}
        <span>{linkDisplayText}</span>
      </div>
    </div>
  );
};

/**
 * Displays the site settings of current site and provides links to select country store/
 * language/currency from the respective selector.
 * @param {*} props - includes labels for site settings contains current site properties.
 */
const MobileLocaleLinks = props => {
  /** Site Initial settings from props */
  const {allSites = {}, currentSite} = props;

  const {displayLocalePickerModal, setDisplayLocalePickerModal} = props;

  /** Labels */
  const {textCurrency, textLanguage, textSite, headingSiteSettings} = props;

  /** Site Settings */
  const {siteConfigSettings = {}} = props;
  const {
    selectedPLG,
    selectedLanguage,
    displaySiteLink,
    displayLocaleLink,
    displayCurrencyLink,
    displayLocaleLinks,
    iconUrl
  } = siteConfigSettings;

  return (
    <Styled id="MobileLocaleLinks" css={css}>
      <>
        {displayLocaleLinks && (
          <div className="MobileLocaleLinks">
            <div className="MobileLocaleLinks__Title">
              <h2> {headingSiteSettings} </h2>
            </div>
            <div className="MobileLocaleLinks__Content">
              {displaySiteLink && (
                <LocaleLink
                  ariaLabel={`${textSite} ${allSites[currentSite.id].name}`}
                  dataTestId={`siteLink`}
                  iconDisplayText={textSite}
                  linkDisplayText={allSites[currentSite.id].name}
                  linkType={`site`}
                  displayLocalePickerModal={displayLocalePickerModal}
                  setDisplayLocalePickerModal={setDisplayLocalePickerModal}
                  iconUrl={iconUrl}
                />
              )}
              {displayLocaleLink && (
                <LocaleLink
                  ariaLabel={`${textLanguage} ${selectedLanguage.displayName}`}
                  dataTestId={`languageLink`}
                  iconDisplayText={textLanguage}
                  linkDisplayText={selectedLanguage.displayName}
                  linkType={`language`}
                  displayLocalePickerModal={displayLocalePickerModal}
                  setDisplayLocalePickerModal={setDisplayLocalePickerModal}
                  iconUrl={iconUrl}
                />
              )}
              {displayCurrencyLink && (
                <LocaleLink
                  ariaLabel={`${textCurrency} ${
                    selectedPLG && selectedPLG.currency
                      ? `${selectedPLG.currency.symbol} ${selectedPLG.currency.currencyCode}`
                      : ''
                  }`}
                  dataTestId={`currencyLink`}
                  iconDisplayText={textCurrency}
                  linkDisplayText={
                    selectedPLG && selectedPLG.currency
                      ? ` ${selectedPLG.currency.symbol} ${selectedPLG.currency.currencyCode}`
                      : ''
                  }
                  linkType={`currency`}
                  displayLocalePickerModal={displayLocalePickerModal}
                  setDisplayLocalePickerModal={setDisplayLocalePickerModal}
                  iconUrl={iconUrl}
                />
              )}
            </div>
          </div>
        )}
      </>
    </Styled>
  );
};

export default MobileLocaleLinks;
