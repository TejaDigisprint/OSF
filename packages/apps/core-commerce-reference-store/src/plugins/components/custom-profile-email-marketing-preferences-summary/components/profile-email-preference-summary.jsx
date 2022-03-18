/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from '@oracle-cx-commerce/react-widgets/profile/profile-email-marketing-preferences-summary/components/styles.css';

const RECEIVE_EMAIL_YES = 'yes';

const ProfileEmailPreferenceSummary = props => {
  const {receiveEmail} = props;
  const {textReceiveEmailUpdates, textDoNotReceiveEmailUpdates} = props;

  return (
    <Styled id="ProfileEmailPreferenceSummary" css={css}>
      <div>
        {receiveEmail === RECEIVE_EMAIL_YES ? (
          <span>{textReceiveEmailUpdates}</span>
        ) : (
          <span>{textDoNotReceiveEmailUpdates}</span>
        )}
      </div>
    </Styled>
  );
};

export default ProfileEmailPreferenceSummary;
