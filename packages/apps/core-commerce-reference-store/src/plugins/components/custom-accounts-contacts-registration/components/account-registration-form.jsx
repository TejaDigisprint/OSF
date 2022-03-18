/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useState} from 'react';
import {uuid} from '@oracle-cx-commerce/utils/generic';
import Form from '@oracle-cx-commerce/react-components/form';
import EmailIcon from '@oracle-cx-commerce/react-components/icons/email';
import CommentsAndSubmitSection from '@oracle-cx-commerce/react-widgets/profile/accounts-contacts-registration/components/comments-submit-section';
import AddressInput from '@oracle-cx-commerce/react-widgets/profile/accounts-contacts-registration/components/address-input';
import PropTypes from 'prop-types';

/**
 *  Displays Account registration form along with shipping address
 *   for self registration of accounts
 *   @param {*} props : Takes Shipping countries,onOK,onNotOkay, translations as props
 */
const AccountRegistrationForm = props => {
  const {onOk, onNotOk, shippingCountries = {}} = props;
  const {labelFirstName, labelLastName, labelEmail, labelCompanyName, existingAccount} = props;
  const [companyName, setCompanyName] = useState('companyName');
  const id = uuid();

  return (
    <React.Fragment>
      <Form action="createOrganizationRegistrationRequest" onOk={onOk} onNotOk={onNotOk} noValidate>
        <div className="AccountAndContactRegistration__Row">
          <p className="AccountAndContactRegistration__Col">
            <label htmlFor={`${labelFirstName}-${id}`}>{labelFirstName}</label>
            <input
              aria-label={labelFirstName}
              id={`${labelFirstName}-${id}`}
              name="profile[firstName]"
              type="text"
              required={true}
              autoCapitalize="words"
              autoComplete="given-name"
              maxLength="254"
              data-testid="Account-firstName"
            />
            <span className="validationMessage"></span>
          </p>
          <p className="AccountAndContactRegistration__Col">
            <label htmlFor={`${labelLastName}-${id}`}>{labelLastName}</label>
            <input
              aria-label={labelLastName}
              id={`${labelLastName}-${id}`}
              name="profile[lastName]"
              type="text"
              required={true}
              autoCapitalize="words"
              autoComplete="family-name"
              maxLength="254"
              data-testid="Account-lastName"
            />
            <span className="validationMessage"></span>
          </p>
        </div>
        <div className="AccountAndContactRegistration__Row">
          <p className="AccountAndContactRegistration__Col AccountAndContactRegistration_EmailField">
            <label htmlFor={`labelEmail-+${id}`}>{labelEmail}</label>
            <EmailIcon className="AccountAndContactRegistration_EmailIcon" />
            <input
              aria-label={labelEmail}
              type="email"
              id={`labelEmail-+${id}`}
              name="profile[email]"
              required={true}
              maxLength="254"
              data-testid="Account-email"
            />
            <span className="validationMessage" />
          </p>
          <p className="AccountAndContactRegistration__Col">
            <label htmlFor={`${labelCompanyName}-${id}`}>{labelCompanyName}</label>
            <input
              aria-label={labelCompanyName}
              id={`${labelCompanyName}-${id}`}
              name="name"
              type="text"
              required={true}
              onChange={event => {
                setCompanyName(event.target.value);
              }}
              autoCapitalize="words"
              autoComplete="organization"
              maxLength="254"
              data-testid="Account-companyName"
            />
            <span className="validationMessage"></span>
          </p>
        </div>
        <div className="AccountAndContactRegistration__Row">
          <p className="AccountAndContactRegistration__SingleColumn">
            <label htmlFor={`${existingAccount}-${id}`}>{existingAccount}</label>
            <input
              aria-label={existingAccount}
              id={`${existingAccount}-${id}`}
              name="relatedOrganizationName"
              type="text"
              required={false}
              autoCapitalize="words"
              maxLength="254"
              data-testid="Account-relatedOrg"
            />
            <span className="validationMessage"></span>
          </p>
        </div>

        <AddressInput companyName={companyName} shippingCountries={shippingCountries} translations={props} />
        <CommentsAndSubmitSection {...props} />
      </Form>
    </React.Fragment>
  );
};

AccountRegistrationForm.propTypes = {
  /**
   * Callback function invoked upon createOrganizationRegistrationRequest endpoint call success
   */
  onOk: PropTypes.func.isRequired,
  /**
   * Callback function invoked upon createOrganizationRegistrationRequest endpoint call failure
   */
  onNotOk: PropTypes.func.isRequired,
  /**
   * List of shipping countries
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

AccountRegistrationForm.defaultProps = {
  shippingCountries: {}
};
export default AccountRegistrationForm;
