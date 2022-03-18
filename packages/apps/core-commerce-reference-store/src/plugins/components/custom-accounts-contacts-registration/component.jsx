/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useState, useContext, useCallback} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import {isEmptyObject} from '@oracle-cx-commerce/utils/generic';
import {fetchShippingCountries} from '@oracle-cx-commerce/fetchers/shipping-countries';
import {useShippingCountriesFetcher} from '@oracle-cx-commerce/fetchers/shipping-countries/hooks';
import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import Radio from '@oracle-cx-commerce/react-components/radio';
import ContactRegistrationForm from '@oracle-cx-commerce/react-widgets/profile/accounts-contacts-registration/components/contact-registration-form';
import AccountRegistrationForm from '@oracle-cx-commerce/react-widgets/profile/accounts-contacts-registration/components/account-registration-form';
import {getComponentData} from '@oracle-cx-commerce/react-widgets/profile/accounts-contacts-registration/selectors';
import Alert from '@oracle-cx-commerce/react-components/alert';
import PropTypes from 'prop-types';

/**
 * export fetchers to load all shipping countries into the state during server-side rendering.
 */
export const fetchers = [fetchShippingCountries];
/**
 * Displays Account and contact registration forms based on the selection
 *
 * @param props
 */
const CustomAccountsAndContactsRegistration = props => {
  const store = useContext(StoreContext);
  const [registrationStatus, setRegistrationStatus] = useState({success: null, message: null});
  /**
   * invoke fetcher hook to load all shipping countries into state,
   * this will not perform any task if state already has shipping countries
   * This is effective if SSR didn't populate the state with shipping countries data
   */
  useShippingCountriesFetcher(store);

  const [isAccountRegistration, setIsAccountRegistration] = useState(false);

  const {
    labelsRequestAccountRadioGroupText,
    labelsContactRegistration,
    labelAccountRegistration,
    textSuccessfulRegistration,
    pageHeaderRequestAccount,
    textRequestAccountInfo,
    textSuccessfulRegistrationPart2,
    shippingCountries = {}
  } = props;

  const onOk = useCallback(() => {
    setRegistrationStatus({...registrationStatus, success: true, message: null});
    window.scrollTo(0, 0); //scroll to top to display success message to user
  }, [registrationStatus]);

  const onNotOk = useCallback(
    response => {
      setRegistrationStatus({...registrationStatus, success: false, message: response.error.message});
      window.scrollTo(0, 0); //scroll to top to display error message to user
    },
    [registrationStatus]
  );

  return (
    <Styled id="AccountAndContactRegistration" css={css}>
      <div className="AccountAndContactRegistration AccountAndContactRegistration_div">
        <h1>{pageHeaderRequestAccount}</h1>
        {registrationStatus.success === false ? (
          <Alert
            id="Alert"
            type={'error'}
            message={registrationStatus.message !== null ? registrationStatus.message : 'Something went wrong'}
          />
        ) : null}
        {registrationStatus.success === true ? (
          <div>
            <Alert id="Alert" type={'info'} message={textSuccessfulRegistration + textSuccessfulRegistrationPart2} />
          </div>
        ) : (
          <>
            <div>
              <p>{textRequestAccountInfo}</p>
            </div>

            <div role="group">
              <p className="AccountAndContactRegistration_BoldText AccountAndContactRegistration_paragraph">
                {labelsRequestAccountRadioGroupText}
              </p>
              <div>
                <Radio
                  onChange={() => {
                    setIsAccountRegistration(false);
                    setRegistrationStatus({success: null, message: null});
                  }}
                  id="contact-registration"
                  name="registration-choice"
                  value="contact-registration"
                  checked={!isAccountRegistration}
                  labelText={labelsContactRegistration}
                  className={!isAccountRegistration ? 'AccountAndContactRegistration_Checked_label' : ''}
                />
              </div>
              <div className="AccountAndContactRegistration_SelectionChoice">
                <Radio
                  onChange={() => {
                    setIsAccountRegistration(true);
                    setRegistrationStatus({success: null, message: null});
                  }}
                  id="account-registration"
                  name="registration-choice"
                  value="account-registration"
                  data-testid="account-registration"
                  checked={isAccountRegistration}
                  labelText={labelAccountRegistration}
                  className={isAccountRegistration ? 'AccountAndContactRegistration_Checked_label' : ''}
                  disabled={isEmptyObject(shippingCountries)}
                />
              </div>

              <div className={`${!isAccountRegistration ? 'AccountAndContactRegistration--hidden' : ''}`}>
                <AccountRegistrationForm
                  shippingCountries={shippingCountries}
                  onOk={onOk}
                  onNotOk={onNotOk}
                  {...props}
                />
              </div>

              <div className={`${isAccountRegistration ? 'AccountAndContactRegistration--hidden' : ''}`}>
                <ContactRegistrationForm onOk={onOk} onNotOk={onNotOk} {...props} />
              </div>
            </div>
          </>
        )}
      </div>
    </Styled>
  );
};

CustomAccountsAndContactsRegistration.propTypes = {
  /**
   * The list of shipping countries
   */
  shippingCountries: PropTypes.arrayOf(
    PropTypes.shape({
      country: PropTypes.shape({
        /**
         * The country repository id, display name and country code.
         */
        repositoryId: PropTypes.string.isRequired,

        /**
         * Localized country name.
         */
        displayName: PropTypes.string.isRequired,

        /**
         * ISO 3166-1 two letter country code.
         */
        countryCode: PropTypes.string.isRequired
      }),

      /**
       * The list of regions for particular country.
       */
      regions: PropTypes.shape({
        items: PropTypes.shape({
          /**
           * The ID of the region item.
           */
          repositoryId: PropTypes.string.isRequired,
          /**
           * The region code (4 character ISO code).
           */
          regionCode: PropTypes.string.isRequired,
          /**
           *The region code in abbreviated form. Usually a 2 character ISO code.
           */
          abbreviation: PropTypes.string.isRequired,
          /**
           * Localized region name..
           */
          displayName: PropTypes.string.isRequired
        })
      }),

      /**
       * The ID of the country item
       */
      repositoryId: PropTypes.string.isRequired
    })
  )
};

CustomAccountsAndContactsRegistration.defaultProps = {
  shippingCountries: {}
};
export default connect(getComponentData)(CustomAccountsAndContactsRegistration);
