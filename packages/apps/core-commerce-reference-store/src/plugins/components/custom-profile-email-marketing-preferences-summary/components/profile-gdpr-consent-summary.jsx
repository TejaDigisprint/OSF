/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from '@oracle-cx-commerce/react-widgets/profile/profile-email-marketing-preferences-summary/components/styles.css';

const ProfileGDPRConsentSummary = props => {
  const {GDPRProfileP13nConsentGranted} = props;
  const {textShowRelevantSiteContent, textDoNotShowRelevantSiteContent} = props;

  return (
    <Styled id="ProfileGDPRConsentSummary" css={css}>
      <div>
        {GDPRProfileP13nConsentGranted ? (
          <span>{textShowRelevantSiteContent}</span>
        ) : (
          <span>{textDoNotShowRelevantSiteContent}</span>
        )}
      </div>
    </Styled>
  );
};

export default ProfileGDPRConsentSummary;
