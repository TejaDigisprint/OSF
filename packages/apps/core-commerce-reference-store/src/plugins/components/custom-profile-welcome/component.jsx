/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import css from './styles.css';
import {getProfileData} from '@oracle-cx-commerce/react-widgets/profile/profile-welcome/selectors';
import {t} from '@oracle-cx-commerce/utils/generic';
import PropTypes from 'prop-types';

/**
 * A widget that displays a welcome message to the shopper
 */
const CustomProfileWelcome = props => {
  const {textWelcome, headingYourAccount} = props;
  const {firstName, isUserLoggedIn} = props;

  return (
    <Styled id="ProfileWelcome" css={css}>
      <div className="ProfileWelcome alignCenter">
        {isUserLoggedIn && (
          <div className="ProfileWelcome__Wrapper">
            {/* <h1>{headingYourAccount}</h1> */}
            <div className="ProfileWelcome__WelcomeText">
              <span>{t(textWelcome, {firstName})}.</span>
            </div>
          </div>
        )}
      </div>
    </Styled>
  );
};

CustomProfileWelcome.propTypes = {
  firstName: PropTypes.string,
  isUserLoggedIn: PropTypes.bool.isRequired
};

CustomProfileWelcome.defaultProps = {
  firstName: undefined
};

export default connect(getProfileData)(CustomProfileWelcome);
