/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import Link, {useNavigator} from '@oracle-cx-commerce/react-components/link';
import {PAGE_PROFILE_LINK, PAGE_UPDATE_PASSWORD_LINK} from '@oracle-cx-commerce/commerce-utils/constants';
import React, {useCallback, useContext, useMemo, useState} from 'react';

import Alert from '@oracle-cx-commerce/react-components/alert';
import EnvelopeIcon from '@oracle-cx-commerce/react-components/icons/email';
import Form from '@oracle-cx-commerce/react-components/form';
import PhoneIcon from '@oracle-cx-commerce/react-components/icons/phone';
import PropTypes from 'prop-types';
import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import css from './styles.css';
import {getPageData} from '@oracle-cx-commerce/react-widgets/profile/profile-details/selectors';
import {validateRequiredField} from '@oracle-cx-commerce/react-components/utils/payment';

/**
 * Displays the profile details to be updated on profile details page.
 * @param {*} props - includes labels for account details title and form fields.
 * Contains the link to update password page.
 */

const CustomProfileDetails = props => {
  const {
    actionSave,
    actionUpdatePassword,
    actionCancel,
    alertUpdateProfileSuccessful,
    labelEmailAddress,
    labelFirstName,
    labelLastName,
    labelPhoneNumberOptional,
    headingAccountDetails,
    textAllFieldsRequired,
    textRequiredField
  } = props;
  const {isUserLoggedIn, firstName = '', lastName = '', email = '', daytimeTelephoneNumber = null} = props;
  const goToPage = useNavigator();

  const [updateProfileStatus, setUpdateProfileStatus] = useState({});

  const {action} = useContext(StoreContext);

  /**
   * Map holds 'validators' function declaration for Account Details fields
   */
  const validators = useMemo(
    () => ({
      firstName: elementValue => validateRequiredField(elementValue, textRequiredField),
      lastName: elementValue => validateRequiredField(elementValue, textRequiredField)
    }),
    [textRequiredField]
  );

  /**
   * This method validates value for input fields  by triggering respective 'validators'
   * And sets error message (if any) at corresponding ui elements
   * @param {Object} element ui element
   */
  const validateElement = useCallback(
    element => {
      const fieldValue = element.value;

      element.setCustomValidity('');
      const elementValidator = validators[element.name];
      //set 'validator' to the element
      if (elementValidator) {
        element.setCustomValidity(elementValidator(fieldValue));
      }
    },
    [validators]
  );

  /**
   * success callback method when profile details form submitted.
   */
  const onSuccess = useCallback(() => {
    action('notifyClearAll');
    action('notify', {level: 'info', message: alertUpdateProfileSuccessful});
    goToPage(PAGE_PROFILE_LINK);
  }, [action, alertUpdateProfileSuccessful, goToPage]);

  /**
   * failure callback method when profile details form submitted.
   */
  const onError = useCallback(({error: {message = ''} = {}} = {}) => {
    setUpdateProfileStatus(prevState => {
      return {
        ...prevState,
        type: 'error',
        message
      };
    });
  }, []);

  /**
   * method to navigate to profile page.
   */
  const gotoProfilePage = event => {
    event.preventDefault();
    goToPage(PAGE_PROFILE_LINK);
  };

  return (
    <Styled id="ProfileDetails" css={css}>
      <div className="ProfileDetails ProfileDetails_div">
        {isUserLoggedIn && firstName && (
          <div className="ProfileDetails__Wrapper">
            <h1>{headingAccountDetails}</h1>
            <div className="ProfileDetails__AllFieldsRequiredText"> {textAllFieldsRequired}</div>
            <div className="ProfileDetails__Content">
              <Form
                action="updateProfile"
                setCustomValidity={validateElement}
                onOk={onSuccess}
                onNotOk={onError}
                noValidate={true}
                enableUnsavedChangesTracking={true}
              >
                {updateProfileStatus.message && updateProfileStatus.message !== '' && (
                  <Alert
                    id="ProfileDetails__Alert"
                    type={updateProfileStatus.type}
                    message={updateProfileStatus.message}
                  />
                )}
                <div className="ProfileDetails__InputElement">
                  {/* firstName */}
                  <label htmlFor="firstName">{labelFirstName}</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="ProfileDetails__InputField"
                    data-testid="firstName"
                    autoCapitalize="words"
                    defaultValue={firstName}
                    required
                  />
                  <span className="validationMessage"></span>
                </div>

                <div className="ProfileDetails__InputElement">
                  {/* lastName */}
                  <label htmlFor="lastName">{labelLastName}</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="ProfileDetails__InputField"
                    data-testid="lastName"
                    autoCapitalize="words"
                    defaultValue={lastName}
                    required
                  />
                  <span className="validationMessage"></span>
                </div>

                <div className="ProfileDetails__InputElement">
                  {/* email */}
                  <label htmlFor="email">{labelEmailAddress}</label>
                  <div className="ProfileDetails__InputElementIconDiv">
                    <EnvelopeIcon className="ProfileDetails__IconBasicStyle" />
                  </div>
                  <div className="ProfileDetails__InputElementDiv">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      data-testid="email"
                      readOnly={true}
                      className="ProfileDetails__InputField ProfileDetails__DisabledField "
                      defaultValue={email}
                      required
                    />
                    <span className="validationMessage"></span>
                  </div>
                </div>

                <div className="ProfileDetails__InputElement">
                  {/* daytimeTelephoneNumber */}
                  <label htmlFor="daytimeTelephoneNumber">{labelPhoneNumberOptional}</label>
                  <div className="ProfileDetails__InputElementIconDiv">
                    <PhoneIcon className="ProfileDetails__IconBasicStyle" />
                  </div>
                  <div className="ProfileDetails__InputElementDiv">
                    <input
                      type="text"
                      id="daytimeTelephoneNumber"
                      name="daytimeTelephoneNumber"
                      className="ProfileDetails__InputField"
                      data-testid="daytimeTelephoneNumber"
                      defaultValue={daytimeTelephoneNumber}
                    />
                    <span className="validationMessage"></span>
                  </div>
                </div>

                <div className="ProfileDetails__Link">
                  <Link href={PAGE_UPDATE_PASSWORD_LINK}>{actionUpdatePassword}</Link>
                </div>

                <div className="ProfileDetails__Buttons">
                  <button data-testid="submitButton" type="submit" className="ProfileDetails__SubmitButton saveBtn">
                    {actionSave}
                  </button>
                  <button
                    type="button"
                    data-testid="cancelButton"
                    className="ProfileDetails__CancelButton secondary"
                    onClick={gotoProfilePage}
                  >
                    {actionCancel}
                  </button>
                </div>
              </Form>
            </div>
          </div>
        )}
      </div>
    </Styled>
  );
};

CustomProfileDetails.propTypes = {
  /**
   * Boolean flag to indicate whether User is logged-in or not.
   */
  isUserLoggedIn: PropTypes.bool.isRequired,

  /**
   * First name of the logged-in user.
   */
  firstName: PropTypes.string.isRequired,

  /**
   * Last name of the logged-in user.
   */
  lastName: PropTypes.string.isRequired,

  /**
   * Last name of the logged-in user.
   */
  email: PropTypes.string.isRequired,

  /**
   * Daytime Telephone Number of the logged-in user.
   */
  daytimeTelephoneNumber: PropTypes.string
};

CustomProfileDetails.defaultProps = {
  daytimeTelephoneNumber: ''
};

export default connect(getPageData)(CustomProfileDetails);
