/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React from 'react';
import {uuid} from '@oracle-cx-commerce/utils/generic';
import Form from '@oracle-cx-commerce/react-components/form';
import EmailIcon from '@oracle-cx-commerce/react-components/icons/email';
import CommentsAndSubmitSection from '@oracle-cx-commerce/react-widgets/profile/accounts-contacts-registration/components/comments-submit-section';
import PropTypes from 'prop-types';

/**
 * Displays Account registration form along with shipping address
 *   for self registration of accounts
 *   @param {*} props : Takes Shipping countries,onOK,onNotOkay, translations as props
 */
const ContactRegistrationForm = props => {
  const {labelFirstName, labelLastName, labelEmail, labelAccountID, onOk, onNotOk} = props;
  const id = uuid();

  return (
    <React.Fragment>
      <Form action="createContactRegistrationRequest" onNotOk={onNotOk} onOk={onOk} noValidate>
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
              data-testid="Contact-firstName"
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
              data-testid="Contact-lastName"
            />
            <span className="validationMessage"></span>
          </p>
        </div>

        <div className="AccountAndContactRegistration__Row">
          <p className="AccountAndContactRegistration__Col AccountAndContactRegistration_EmailField">
            <label htmlFor={`${labelEmail}-+${id}`}>{labelEmail}</label>
            <EmailIcon className="AccountAndContactRegistration_EmailIcon" />
            <input
              aria-label={labelEmail}
              type="email"
              id={`${labelEmail}-+${id}`}
              name="profile[email]"
              required={true}
              maxLength="254"
              data-testid="Contact-email"
            />
            <span className="validationMessage" />
          </p>
          <p className="AccountAndContactRegistration__Col">
            <label htmlFor={`${labelAccountID}-${id}`}>{labelAccountID}</label>
            <input
              aria-label={labelAccountID}
              id={`${labelAccountID}-${id}`}
              name="requestedOrganization[id]"
              type="text"
              required={false}
              data-testid="Contact-organizationId"
            />
            <span className="validationMessage"></span>
          </p>
        </div>
        <CommentsAndSubmitSection {...props} />
      </Form>
    </React.Fragment>
  );
};

ContactRegistrationForm.propTypes = {
  /**
   * Callback function to be invoked on success of  createContactRegistrationRequest endpoint
   */
  onOk: PropTypes.string.isRequired,
  /**
   * Callback function to be invoked on failure of  createContactRegistrationRequest endpoint
   */
  onNotOk: PropTypes.string.isRequired
};

export default ContactRegistrationForm;
