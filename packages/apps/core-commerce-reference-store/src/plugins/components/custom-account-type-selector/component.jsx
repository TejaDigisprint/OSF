/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useState} from 'react';

import CustomAccountsAndContactsRegistration from '../custom-accounts-contacts-registration/component';
import BuildingIcon from '@oracle-cx-commerce/react-components/icons/building';
import HomeIcon from '@oracle-cx-commerce/react-components/icons/home';
import Link from '@oracle-cx-commerce/react-components/link';
import {PAGE_LOGIN_LINK} from '@oracle-cx-commerce/commerce-utils/constants';
import CustomProfileRegistration from '../custom-profile-registration/component';
import PropTypes from 'prop-types';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import css from '@oracle-cx-commerce/react-widgets/profile/account-type-selector/styles.css';
import {forbiddenPageTypes} from './customconfig';
import {getComponentData} from './selectors';

/***
 *  Component to display account type selection for creating accounts
 * @param props
 */
const CustomAccountTypeSelector = props => {
  const {
    textLogIn,
    personalAccountText,
    selectAccountTypeTextSummary,
    businessAccountText,
    selectAccountTypeText,
    siteTypeHelpText,
    b2bCommerceValueIndex,
    commerceValueIndex,
    pageType,
    isLoggedInUser
  } = props;

  const defaultSate = {isSiteSupportsB2C: false, isSiteSupportsB2B: false};
  const show = !isLoggedInUser || !forbiddenPageTypes.includes(pageType);
  

  if (b2bCommerceValueIndex >= 0 && commerceValueIndex < 0) {
    defaultSate.isSiteSupportsB2B = false;
    defaultSate.isSiteSupportsB2C = true;
  } else if (b2bCommerceValueIndex < 0 && commerceValueIndex >= 0) {
    defaultSate.isSiteSupportsB2C = true;
    defaultSate.isSiteSupportsB2B = false;
  } else if (commerceValueIndex >= 0 && b2bCommerceValueIndex >= 0) {
    defaultSate.isSiteSupportsB2B = true;
    defaultSate.isSiteSupportsB2C = true;
  }

  const [display, setDisplay] = useState(defaultSate);

  if (display.isSiteSupportsB2C && !display.isSiteSupportsB2B && show) {
    return <CustomProfileRegistration {...props} />;
  }
  if (!display.isSiteSupportsB2C && display.isSiteSupportsB2B && show) {
    return <CustomAccountsAndContactsRegistration {...props} />;
  }
  if (!display.isSiteSupportsB2C && !display.isSiteSupportsB2B && show) {
    return <h1>{siteTypeHelpText}</h1>;
  }

  return (
    <Styled id="AccountTypeSelector" css={css}>
      {show && (
        <div className="AccountTypeSelector">
          <h1>{selectAccountTypeText}</h1>
          <p>{selectAccountTypeTextSummary}</p>
          <div className="AccountTypeSelector__Row">
            <button
              type="button"
              className="AccountTypeSelector__Option"
              onClick={() => {
                setDisplay({...display, isSiteSupportsB2C: true, isSiteSupportsB2B: false});
              }}
            >
              <HomeIcon className="AccountTypeSelector_Icon" />
              <p>{personalAccountText}</p>
            </button>
            <button
              type="button"
              className="AccountTypeSelector__Option"
              onClick={() => {
                setDisplay({...display, isSiteSupportsB2C: false, isSiteSupportsB2B: true});
              }}
            >
              <BuildingIcon className="AccountTypeSelector_Icon" />
              <p>{businessAccountText}</p>
            </button>
          </div>
          <Link href={PAGE_LOGIN_LINK} className="AccountTypeSelector__LinkToLogin">
            {textLogIn}
          </Link>
        </div>
      )}
    </Styled>
  );
};

CustomAccountTypeSelector.propTypes = {
  /**
   * This is the index of 'b2b-commerce' type in siteTypes
   */
  b2bCommerceValueIndex: PropTypes.number,
  /**
   * This is the index of 'commerce' type in siteTypes
   */
  commerceValueIndex: PropTypes.number
};

CustomAccountTypeSelector.defaultProps = {
  b2bCommerceValueIndex: -1,
  commerceValueIndex: 0
};

export default connect(getComponentData)(CustomAccountTypeSelector);
