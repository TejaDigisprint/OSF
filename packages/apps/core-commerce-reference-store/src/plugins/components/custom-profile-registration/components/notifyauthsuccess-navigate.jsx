/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import {useNavigator} from '@oracle-cx-commerce/react-components/link';
import React, {useEffect} from 'react';
import {getRedirect} from '@oracle-cx-commerce/utils/browser';
import Alert from '@oracle-cx-commerce/react-components/alert';

/**
 *  On successful Registration displays the success message for two sec
 * and navigates to home page.
 */
const NotifyAuthSuccessAndNavigate = props => {
  const {formSubmitted, defaultAutoLoginSuccessPage, alertCreateProfileSuccessful, authenticated} = props;
  const goToPage = useNavigator('');
  const NO_REDIRECT_ON_SUCCESS = 'noredirect';

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!formSubmitted && authenticated) {
        goToPage(defaultAutoLoginSuccessPage);
      }
      if (defaultAutoLoginSuccessPage !== NO_REDIRECT_ON_SUCCESS) {
        goToPage(getRedirect(defaultAutoLoginSuccessPage), {redirect: true});
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [authenticated, defaultAutoLoginSuccessPage, formSubmitted, goToPage]);

  return (
    formSubmitted && (
      <>
        <Alert id="ProfileRegistration__Alert" type="success" message={alertCreateProfileSuccessful} />
      </>
    )
  );
};

export default NotifyAuthSuccessAndNavigate;
