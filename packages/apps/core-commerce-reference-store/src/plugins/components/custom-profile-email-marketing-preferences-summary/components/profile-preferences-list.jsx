/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import ProfileEmailPreference from '@oracle-cx-commerce/react-widgets/profile/profile-email-marketing-preferences-summary/components/profile-email-preference-summary';
import ProfileGDPRConsentSummary from '@oracle-cx-commerce/react-widgets/profile/profile-email-marketing-preferences-summary/components/profile-gdpr-consent-summary';
import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from '@oracle-cx-commerce/react-widgets/profile/profile-email-marketing-preferences-summary/components/styles.css';

const ProfilePreferencesList = props => {
  const {textCurrentPreferences} = props;
  const {requireGDPRP13nConsent} = props;

  return (
    <Styled id="ProfilePreferencesList" css={css}>
      <div className="ProfilePreferencesList">
        <span>{textCurrentPreferences}</span>
        <ul>
          <li>
            <ProfileEmailPreference {...props} />
          </li>
          {requireGDPRP13nConsent && (
            <li>
              <ProfileGDPRConsentSummary {...props} />
            </li>
          )}
        </ul>
      </div>
    </Styled>
  );
};

export default ProfilePreferencesList;
