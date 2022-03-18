/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import Card from '@oracle-cx-commerce/react-components/card';
import Link from '@oracle-cx-commerce/react-components/link';
import {PAGE_EMAIL_MARKETING_PREFERENCES_LINK} from '@oracle-cx-commerce/commerce-utils/constants';
import ProfilePreferencesList from '@oracle-cx-commerce/react-widgets/profile/profile-email-marketing-preferences-summary/components/profile-preferences-list';
import React from 'react';
import SettingsIcon from '@oracle-cx-commerce/react-components/icons/settings';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import css from './styles.css';
import {getProfileData} from '@oracle-cx-commerce/react-widgets/profile/profile-email-marketing-preferences/selectors';
import PropTypes from 'prop-types';

/**
 * widget that displays the email and marketing preferences summary to the shopper
 */
const CustomProfileEmailMarketingPreferencesSummary = props => {
  const {actionEdit, headingEmailMarketingPreferences} = props;
  const {isUserLoggedIn} = props;

  return (
    <Styled id="ProfileEmailMarketingPreferencesSummary" css={css}>
      <div className={`ProfileEmailMarketingPreferencesSummary ${isUserLoggedIn && 'ProfileEmailMarketingPreferencesSummary_div'}`}>
        {isUserLoggedIn && (
          <div>
            <h2>{headingEmailMarketingPreferences}</h2>
            <Card>
              <div className="ProfileEmailMarketingPreferencesSummary__Content">
                <SettingsIcon />

                <ProfilePreferencesList {...props} />

                <div className="ProfileEmailMarketingPreferencesSummary__EditLink">
                  <Link href={PAGE_EMAIL_MARKETING_PREFERENCES_LINK} aria-label={actionEdit}>
                    {actionEdit}
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </Styled>
  );
};

CustomProfileEmailMarketingPreferencesSummary.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  requireGDPRP13nConsent: PropTypes.bool.isRequired,
  GDPRProfileP13nConsentGranted: PropTypes.bool,
  receiveEmail: PropTypes.string
};

CustomProfileEmailMarketingPreferencesSummary.defaultProps = {
  GDPRProfileP13nConsentGranted: undefined,
  receiveEmail: undefined
};

export default connect(getProfileData)(CustomProfileEmailMarketingPreferencesSummary);
