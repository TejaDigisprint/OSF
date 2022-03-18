/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import {PAGE_HOME_LINK, PAGE_LOGIN_LINK} from '@oracle-cx-commerce/commerce-utils/constants';
import React, {useCallback, useContext, useState} from 'react';

import Alert from '@oracle-cx-commerce/react-components/alert';
import EmailIcon from '@oracle-cx-commerce/react-components/icons/email';
import Form from '@oracle-cx-commerce/react-components/form';
import Link from '@oracle-cx-commerce/react-components/link';
import NotifyAuthSuccessAndNavigate from '@oracle-cx-commerce/react-widgets/profile/profile-registration/components/notifyauthsuccess-navigate';
import {ProfileCustomProperties} from '@oracle-cx-commerce/react-widgets/profile/profile-registration/components/profile-custom-properties';
import PasswordIcon from '@oracle-cx-commerce/react-components/icons/password';
import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import css from './styles.css';
import {fetchCommonResources} from '@oracle-cx-commerce/fetchers/resources';
import {fetchShopperSettings} from '@oracle-cx-commerce/fetchers/merchant-settings';
import {getPageData} from './selectors';
import {passwordHelpers} from '@oracle-cx-commerce/react-components/utils';
import {useCommonResourcesFetcher} from '@oracle-cx-commerce/fetchers/resources/hooks';
import {useShopperSettingsFetcher} from '@oracle-cx-commerce/fetchers/merchant-settings/hooks';

/**
 * export fetchers to load common resources & shopper settings (password policies)
 * and shopper custom properties into the state during server-side rendering.
 */
export const fetchers = [fetchCommonResources, fetchShopperSettings];

/**
 * Displays a Registration form to create a component.
 * @param {*} props - includes labels of the input fields.
 */

const CustomProfileRegistration = props => {
  const {
    id,
    defaultAutoLoginSuccessPage = PAGE_HOME_LINK,
    alertAccountCreated,
    headingCreateAnAccount,
    actionCreateAnAccount,
    alertCreateProfileEmailSentSuccessful,
    alertCreateProfileSuccessful,
    labelEmailAddress,
    labelEmailUpdates,
    labelFirstName,
    labelGdprConsentGranted,
    labelLastName,
    textLogIn,
    labelNo,
    labelPassword,
    labelPasswordConfirm,
    alertPasswordNotMatched,
    labelYes,
    requireGDPRP13nConsent,
    secureEmailEnabled,
    firstName = '',
    lastName = '',
    email = '',
    autoLogin = true
  } = props;

  console.log('secureEmailEnabled',secureEmailEnabled)
  const store = useContext(StoreContext);
  const {action} = store;

  /**
   * invoke fetcher hook to load common resources, shopper custom properties & shopper custom properties
   * into state during client side rendering
   * this will not perform any task if state already has shopper custom properties
   * This is effective if SSR didn't populate the state with shopper custom properties data
   */

  useCommonResourcesFetcher(store);
  useShopperSettingsFetcher(store);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [accountCreationStatus, setAccountCreationStatus] = useState('');
  const [values, setValues] = useState({
    email: props.email
  });

  /**
   * success callback of create account.
   */
  const onOk = useCallback(() => {
    setFormSubmitted(true);
    if (props.authenticated) {
      action('notify', {level: 'info', message: alertCreateProfileSuccessful});
    }
  }, [action, alertCreateProfileSuccessful, props.authenticated]);

  /**
   * failure callback of create account.
   */
  const onNotOk = useCallback(({error}) => {
    setAccountCreationStatus(error.message);
  }, []);

  /**
   * method to get the password policies using passwordHelpers utility js.
   */
  function getEmbeddedAssistance() {
    const policies = props.passwordPolicies;
    const embeddedAssistance = passwordHelpers.getEmbeddedAssistence(policies, props.commonResources);

    return embeddedAssistance;
  }

  /**
   * method to set the custom element validate message.
   */
  function setElementValidity(element) {
    const {validity, name, value} = element;
    if (name === 'email' || name === 'password' || name === 'confirmPassword') {
      setValues(values => ({...values, [name]: value}));
    }

    if ((name === 'password' || name === 'confirmPassword') && validity.valid) {
      const login = values.email;
      const password = value;
      const policies = props.passwordPolicies;
      const passwordValid = passwordHelpers.validatePassword(policies, {login, password});
      if (!passwordValid) {
        element.setCustomValidity(getEmbeddedAssistance());
      }
    }

    if (name === 'confirmPassword' && validity.valid) {
      if (values.password && value && values.password !== value) {
        element.setCustomValidity(alertPasswordNotMatched);
      }
    }
  }

  /**
   * function to handle checkbox inputs on form submission
   * TODO Fix for: Checkbox value is not submitted as part of the form when it is unchecked
   * TODO Change this implementation once the form component is fixed to handle checkbox values
   */
  const handleOnSubmitForm = event => {
    event.preventDefault();
    document.querySelector('#receiveEmailYesHidden').disabled = false;
    if (document.querySelector('#receiveEmailYes').checked) {
      document.querySelector('#receiveEmailYesHidden').disabled = true;
    }

    if (requireGDPRP13nConsent) {
      document.querySelector('#GDPRProfileP13nConsentGrantedHidden').disabled = false;
      if (document.querySelector('#GDPRProfileP13nConsentGranted').checked) {
        document.querySelector('#GDPRProfileP13nConsentGrantedHidden').disabled = true;
      }
    }
  };

  /**
   * Displays the information related to create profile email success.
   * This is displayed only when secure email flow is enabled.
   */
  const getSecureEmailRegistrationSuccessInfo = () => {
    return <Alert id="ProfileRegistration__Alert" type="success" message={alertCreateProfileEmailSentSuccessful} />;
  };

  /**
   * this method displays the registration form
   *
   * if the user is not authenticated
   *    and form is not submitted - displays registration form
   * if the user is not authenticated
   *    and form is submitted - displays secure email registration success information
   */
  const getProfileRegistrationContent = () => {
    return (
      <>
        {!formSubmitted ? (
          <>
            <Form
              action="createProfile"
              onOk={onOk}
              onNotOk={onNotOk}
              setCustomValidity={setElementValidity}
              setInProgress={setInProgress}
              onSubmit={handleOnSubmitForm}
              noValidate
            >
              {accountCreationStatus && (
                <Alert id="ProfileRegistration__Alert" type="error" message={accountCreationStatus} />
              )}

              {!props.secureEmailEnabled && <input type="hidden" name="autoLogin" value={autoLogin} />}

              {/* firstName */}
              <div>
                <label htmlFor={`firstName-${id}`}>{labelFirstName}</label>
                <input
                  type="text"
                  id={`firstName-${id}`}
                  name="firstName"
                  defaultValue={firstName}
                  maxLength="255"
                  autoComplete="given-name"
                  autoCapitalize="words"
                  required
                />
                <span className="validationMessage"></span>
              </div>

              {/* lastName */}
              <div>
                <label htmlFor={`lastName-${id}`}>{labelLastName}</label>
                <input
                  type="text"
                  id={`lastName-${id}`}
                  name="lastName"
                  defaultValue={lastName}
                  maxLength="255"
                  autoComplete="family-name"
                  autoCapitalize="words"
                  required
                />
                <span className="validationMessage"></span>
              </div>

              {/* email */}
              <div>
                <label htmlFor={`email-${id}`}>{labelEmailAddress}</label>
                <div className="ProfileRegistration__EmailField">
                  <EmailIcon className="ProfileRegistration__EmailIcon" />
                  <input
                    type="email"
                    name="email"
                    id={`email-${id}`}
                    defaultValue={email}
                    maxLength="255"
                    autoComplete="email"
                    required
                  />
                  <span className="validationMessage"></span>
                </div>
              </div>

              {/* password */}
              {/* confirmPassword */}
              {!secureEmailEnabled && (
                <>
                  <div>
                    <label htmlFor={`password-${id}`}>{labelPassword}</label>
                    <span className="ProfileRegistration__PasswordField">
                      <PasswordIcon className="ProfileRegistration__PasswordIcon" />
                      <input type="password" name="password" id={`password-${id}`} required />
                      <span className="validationMessage"></span>
                    </span>
                  </div>

                  <div>
                    <label htmlFor={`confirmPassword-${id}`}>{labelPasswordConfirm}</label>
                    <span className="ProfileRegistration__ConfirmPasswordField">
                      <PasswordIcon className="ProfileRegistration__PasswordIcon" />
                      <input type="password" id={`confirmPassword-${id}`} name="confirmPassword" required />
                      <span className="validationMessage"></span>
                    </span>
                  </div>
                </>
              )}

              <ProfileCustomProperties labelYes={labelYes} labelNo={labelNo} />

              <div className="ProfileRegistration__UserPreferences">
                <input type="checkbox" id="receiveEmailYes" name="receiveEmail" defaultValue="yes"></input>
                <input id="receiveEmailYesHidden" type="hidden" value="no" name="receiveEmail"></input>
                <label htmlFor="receiveEmailYes">{labelEmailUpdates}</label>
              </div>

              {requireGDPRP13nConsent ? (
                <div className="ProfileRegistration__UserPreferences">
                  <input
                    type="checkbox"
                    id="GDPRProfileP13nConsentGranted"
                    name="GDPRProfileP13nConsentGranted"
                    defaultValue="true"
                  />
                  <input
                    type="hidden"
                    id="GDPRProfileP13nConsentGrantedHidden"
                    name="GDPRProfileP13nConsentGranted"
                    value="false"
                  />
                  <label htmlFor="GDPRProfileP13nConsentGranted">{labelGdprConsentGranted}</label>
                </div>
              ) : (
                ''
              )}
              <div>
                <button type="submit" className="submitBtn" disabled={inProgress}>
                  {actionCreateAnAccount}
                </button>
              </div>
            </Form>
            <Link href={PAGE_LOGIN_LINK} className="ProfileRegistration__LinkToLogin">
              {textLogIn}
            </Link>
          </>
        ) : (
          getSecureEmailRegistrationSuccessInfo()
        )}
      </>
    );
  };

  return (
    <Styled id="ProfileRegistration" css={css}>
      <>
        <div className="ProfileRegistration ProfileRegistration_div">
          {props.authenticated ? (
            <React.Fragment>
              <h1>{alertAccountCreated}</h1>
              <NotifyAuthSuccessAndNavigate
                formSubmitted={formSubmitted}
                authenticated={props.authenticated}
                defaultAutoLoginSuccessPage={defaultAutoLoginSuccessPage}
                alertCreateProfileSuccessful={alertCreateProfileSuccessful}
                alertAccountCreated={alertAccountCreated}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h1>{headingCreateAnAccount}</h1>
              {getProfileRegistrationContent()}
            </React.Fragment>
          )}
        </div>
      </>
    </Styled>
  );
};

export default connect(getPageData)(CustomProfileRegistration);
