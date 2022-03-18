/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from '@oracle-cx-commerce/react-widgets/site/country-store-language-currency/components/desktop-locale-links/styles.css';
import {noop} from '@oracle-cx-commerce/utils/generic';

/**
 * Defines the Locale Link component for Desktop Version of the Country Store/Language/Currency Picker Widget.
 */
const LocaleLink = props => {
  const {
    ariaLabel,
    dataTestId,
    linkType,
    linkDisplayText,
    displayLocalePickerModal,
    setDisplayLocalePickerModal = noop,
    iconUrl = null
  } = props;

  /**
   * Shows the country store/language/currency Link (site settings portal) overlay.
   */
  const showLocalePickerOverlay = event => {
    event.preventDefault();
    setDisplayLocalePickerModal(true);
  };

  return (
    <div
      className={`DesktopLocaleLinks__LinkItem ${linkType === 'site' ? 'DesktopLocaleLinks__SiteLink' : ''} `}
      role="button"
      data-testid={dataTestId}
      aria-label={ariaLabel}
      tabIndex={displayLocalePickerModal === false ? 0 : -1}
      onClick={showLocalePickerOverlay}
      onKeyUp={event => {
        if (event.key === 'Enter') showLocalePickerOverlay(event);
      }}
    >
      <div className={`DesktopLocaleLinks__LinkItemLinkWithDisplayText`}>
        {linkType === 'site' && iconUrl && (
          <img data-testid="flag-icon" alt="" className="DesktopLocaleLinks__FlagIcon" src={`${iconUrl}`} />
        )}
        {linkDisplayText && <span>{linkDisplayText}</span>}
      </div>
    </div>
  );
};

/**
 * Displays the site settings of current site and provides links to select country store/
 * language/currency from the respective selector.
 * @param {*} props - includes labels for site settings contains current site properties.
 */
const DesktopLocaleLinks = props => {
  /** Site Initial settings from props */
  const {allSites = {}, currentSite} = props;

  const {displayLocalePickerModal, setDisplayLocalePickerModal} = props;

  /** Labels */
  const {textCurrency, textLanguage, textPipeSymbol, textSite} = props;

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

  /**
   * Link Display Texts
   */
  const currencyDisplayText =
    selectedPLG && selectedPLG.currency ? ` ${selectedPLG.currency.symbol} ${selectedPLG.currency.currencyCode}` : '';
  const siteLinkDisplayText =
    iconUrl && displaySiteLink && (displayLocaleLink || displayCurrencyLink) ? '' : allSites[currentSite.id].name;
  const localeLinkDisplayText =
    (iconUrl && displaySiteLink) || !selectedLanguage ? '' : selectedLanguage.name.toUpperCase();
  const currencyLinkDisplayText = iconUrl && displaySiteLink ? '' : currencyDisplayText;

  return (
    <Styled id="DesktopLocaleLinks" css={css}>
      <>
        {displayLocaleLinks && (
          <div className="DesktopLocaleLinks">
            <div className="DesktopLocaleLinks__Content">
              {displaySiteLink && (
                <LocaleLink
                  ariaLabel={`${textSite} ${allSites[currentSite.id].name}`}
                  dataTestId={`siteLink`}
                  linkDisplayText={siteLinkDisplayText}
                  linkType={`site`}
                  displayLocalePickerModal={displayLocalePickerModal}
                  setDisplayLocalePickerModal={setDisplayLocalePickerModal}
                  iconUrl={iconUrl}
                />
              )}
              {displaySiteLink && displayLocaleLink && localeLinkDisplayText && (
                <span className="DesktopLocaleLinks__LocaleSeparator"> {textPipeSymbol} </span>
              )}
              {displayLocaleLink && localeLinkDisplayText && (
                <LocaleLink
                  ariaLabel={`${textLanguage} ${selectedLanguage.displayName}`}
                  dataTestId={`languageLink`}
                  linkDisplayText={localeLinkDisplayText}
                  linkType={`language`}
                  displayLocalePickerModal={displayLocalePickerModal}
                  setDisplayLocalePickerModal={setDisplayLocalePickerModal}
                  iconUrl={iconUrl}
                />
              )}
              {((displaySiteLink && displayCurrencyLink) || (displayLocaleLink && displayCurrencyLink)) &&
                currencyLinkDisplayText && (
                  <span className="DesktopLocaleLinks__LocaleSeparator"> {textPipeSymbol} </span>
                )}
              {displayCurrencyLink && currencyLinkDisplayText && (
                <LocaleLink
                  ariaLabel={`${textCurrency} ${
                    selectedPLG && selectedPLG.currency
                      ? `${selectedPLG.currency.symbol} ${selectedPLG.currency.currencyCode}`
                      : ''
                  }`}
                  dataTestId={`currencyLink`}
                  linkDisplayText={currencyLinkDisplayText}
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

export default DesktopLocaleLinks;
