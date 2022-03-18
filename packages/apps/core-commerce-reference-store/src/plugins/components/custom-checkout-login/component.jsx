/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import Link, {useNavigator} from '@oracle-cx-commerce/react-components/link';
import {PAGE_CHECKOUT_SHIPPING_LINK, PAGE_RESET_PASSWORD_LINK} from '@oracle-cx-commerce/commerce-utils/constants';
import React, {useCallback, useContext, useEffect, useState} from 'react';

import Alert from '@oracle-cx-commerce/react-components/alert';
import EmailIcon from '@oracle-cx-commerce/react-components/icons/email';
import Form from '@oracle-cx-commerce/react-components/form';
import PasswordIcon from '@oracle-cx-commerce/react-components/icons/password';
import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import css from './styles.css';
import {getComponentData} from '@oracle-cx-commerce/react-widgets/checkout/checkout-login/selectors';
import PropTypes from 'prop-types';

/**
 * Widget that provides an option to login before proceeding to checkout
 */
const CustomCheckoutLogin = props => {
  //resources
  const {
    actionCheckout,
    actionCheckoutAsGuest,
    alertLoginSuccessful,
    alertLoginUnSuccessful,
    headingReturningCustomer,
    labelEmailAddress,
    labelPassword,
    textForgottenPassword
  } = props;

  const {id, isUserLoggedIn} = props;

  const {action} = useContext(StoreContext);
  const goToPage = useNavigator();

  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [inProgress, setInProgress] = useState(false);

  /**
   * Success callback for the login action
   * On successful login, it navigates to the checkout page.
   */
  const onOk = useCallback(() => {
    setLoginErrorMessage('');
    action('notify', {level: 'success', message: alertLoginSuccessful});
    goToPage(PAGE_CHECKOUT_SHIPPING_LINK);
  }, [action, alertLoginSuccessful, goToPage]);

  /**
   * Failure callback for the login action
   * Shows the relevant error message
   */
  const onNotOk = useCallback(
    ({error = {}}) => {
      error.code === '500'
        ? action('notify', {level: 'error', message: error.message})
        : setLoginErrorMessage(error.message === 'unauthorized_client' ? alertLoginUnSuccessful : error.message);
    },
    [action, alertLoginUnSuccessful]
  );

  /**
   * Click handler for the 'Checkout As Guest' button
   * It'll navigate to the checkout page as an anonymous user
   */
  const onCheckoutAsGuestClick = () => {
    goToPage(PAGE_CHECKOUT_SHIPPING_LINK);
  };

  /**
   * For a logged in user, it will navigate to the checkout page
   */
  useEffect(() => {
    if (isUserLoggedIn) {
      goToPage(PAGE_CHECKOUT_SHIPPING_LINK);
    }
  }, [goToPage, isUserLoggedIn]);

  return (
    <Styled id="CheckoutLogin" css={css}>
      <div className="CheckoutLogin CheckoutLogin_div">
        {!isUserLoggedIn && (
          <>
            <h1>{headingReturningCustomer}</h1>

            <Form action="login" onOk={onOk} onNotOk={onNotOk} setInProgress={setInProgress} noValidate>
              <input type="hidden" name="rememberUserEmail" value="true" />
              {loginErrorMessage && <Alert id="CheckoutLogin_Alert" type="error" message={loginErrorMessage}></Alert>}

              {/* Email Address */}
              <div className="CheckoutLogin__Row">
                <label htmlFor={`username-${id}`}>{labelEmailAddress}</label>
                <div className="CheckoutLogin__EmailField">
                  <EmailIcon className="CheckoutLogin__EmailIcon" />
                  <input id={`username-${id}`} type="email" name="username" required />
                  <span className="validationMessage"></span>
                </div>
              </div>

              {/* Password */}
              <div className="CheckoutLogin__Row">
                <label htmlFor={`password-${id}`}>{labelPassword}</label>
                <div className="CheckoutLogin__PasswordField">
                  <PasswordIcon className="CheckoutLogin__PasswordIcon" />
                  <input id={`password-${id}`} type="password" name="password" required />
                  <span className="validationMessage"></span>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="CheckoutLogin__ForgotPassword">
                <Link href={PAGE_RESET_PASSWORD_LINK}>{textForgottenPassword}</Link>
              </div>

              {/* 1. Log in before proceeding to checkout */}
              <button className="CheckoutLogin__CheckoutButton submitBtncustom" type="submit" disabled={inProgress}>
                {actionCheckout}
              </button>
            </Form>

            {/* 2. Proceed to checkout as a guest */}
            <button className="secondary" type="button" onClick={onCheckoutAsGuestClick}>
              {actionCheckoutAsGuest}
            </button>
          </>
        )}
      </div>
    </Styled>
  );
};

CustomCheckoutLogin.propTypes = {
  isUserLoggedIn: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default connect(getComponentData)(CustomCheckoutLogin);
