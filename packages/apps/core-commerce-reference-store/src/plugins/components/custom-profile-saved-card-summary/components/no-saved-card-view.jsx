/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import Card from '@oracle-cx-commerce/react-components/card';
import CardIcon from '@oracle-cx-commerce/react-components/icons/credit-card';
import Link from '@oracle-cx-commerce/react-components/link';
import {PAGE_PROFILE_ADD_CREDIT_CARD_LINK} from '@oracle-cx-commerce/commerce-utils/constants';
import React from 'react';

/***
 * Displays No saved card View
 * @param {object} the required property object
 */
const NoSavedCardView = props => {
  const {actionAddACreditCard, textProfileCardHelper1, textProfileCardHelper2} = props;

  return (
    <div className="ProfileSavedCardSummary__NoCardContent">
      <Card type="primary">
        <span>{textProfileCardHelper1}</span>
        <span>{textProfileCardHelper2}</span>
        <div className="ProfileSavedCardSummary__AddACardLinkContainer">
          <span aria-label={`${textProfileCardHelper1} ${textProfileCardHelper2} ${actionAddACreditCard}`}>
            <Link href={PAGE_PROFILE_ADD_CREDIT_CARD_LINK}>
              <CardIcon />
              <span>{actionAddACreditCard}</span>
            </Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default NoSavedCardView;
