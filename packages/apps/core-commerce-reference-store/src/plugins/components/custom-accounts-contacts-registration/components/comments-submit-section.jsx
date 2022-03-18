/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useState} from 'react';

import Checkbox from '@oracle-cx-commerce/react-components/checkbox';
import Link from '@oracle-cx-commerce/react-components/link';
import {PAGE_LOGIN_LINK} from '@oracle-cx-commerce/commerce-utils/constants';
import {uuid} from '@oracle-cx-commerce/utils/generic';

/***
 * Captures email and GDPR preference and comments while submitting account/contact request
 * @param props
 */
const CommentsAndSubmitSection = props => {
  const [gdprPreference, setGdprPreference] = useState(false);
  const [receiveEmail, setReceiveEmail] = useState(false);
  const {labelEmailUpdates, labelRequesterComments, labelForGdpr, textLogIn, labelRequestAnAccount} = props;
  const id = uuid();

  return (
    <React.Fragment>
      <div>
        <label htmlFor="AccountAndContactRegistration__comments">{labelRequesterComments}</label>
        <textarea
          maxLength="1024"
          id="AccountAndContactRegistration__comments"
          name="requesterComments"
          autoCapitalize="sentences"
        />
      </div>
      <div>
        <p>
          <Checkbox
            name="profile[receiveEmail]"
            checked={receiveEmail}
            id={`receive-email-${id}`}
            onChange={event => {
              setReceiveEmail(event.target.checked);
            }}
            value={receiveEmail ? 'yes' : 'no'}
            labelText={labelEmailUpdates}
          />
        </p>
      </div>
      <div>
        <p>
          <Checkbox
            name="profile[GDPRProfileP13nConsentGranted]"
            checked={gdprPreference}
            id={`gdpr-preference-${id}`}
            onChange={event => {
              setGdprPreference(event.target.checked);
            }}
            value={gdprPreference}
            labelText={labelForGdpr}
          />
        </p>
      </div>
      <div>
        <button type="submit">{labelRequestAnAccount}</button>
        <Link href={PAGE_LOGIN_LINK} className="AccountAndContactRegistration__LinkToLogin">
          {textLogIn}
        </Link>
      </div>
    </React.Fragment>
  );
};

export default CommentsAndSubmitSection;
