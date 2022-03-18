/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import Badge from '@oracle-cx-commerce/react-components/badge';
import Card from '@oracle-cx-commerce/react-components/card';
import Link from '@oracle-cx-commerce/react-components/link';
import {PAGE_PROFILE_SAVED_CARDS_LINK} from '@oracle-cx-commerce/commerce-utils/constants';
import React from 'react';
import {formatCardNumber} from '@oracle-cx-commerce/react-components/utils/payment';
import {t} from '@oracle-cx-commerce/utils/generic';

/***
 * Displays default saved card (if no default card then first card) View
 * @param {object} the required property object
 */
const DefaultSavedCardView = props => {
  const {actionManage, cardType, defaultCard, labelManageCardLink, labelSavedCard, textDefaultCard, textExpiryDate} =
    props;

  return (
    <div className="ProfileSavedCardSummary__DefaultCardContent">
      <Card>
        <div className="ProfileSavedCardSummary__CardIconContainer">
          <img
            className="ProfileSavedCardSummary__CardIcon"
            src={cardType ? cardType.img.url : ''}
            alt={cardType ? cardType.name : defaultCard.cardType}
          />
        </div>
        <div className="ProfileSavedCardSummary__CardDetailsContainer">
          <span className="ProfileSavedCardSummary__CardText">{defaultCard.nameOnCard}</span>
          <span className="ProfileSavedCardSummary__CardText">
            {formatCardNumber(defaultCard.cardNumber, defaultCard.cardType)}
          </span>
          <span className="ProfileSavedCardSummary__CardText">
            {t(textExpiryDate, {MONTH: defaultCard.expiryMonth, YEAR: defaultCard.expiryYear})}
          </span>
          {defaultCard.isDefault && (
            <Badge
              className="ProfileSavedCardSummary__DefaultBadge"
              badgeText={textDefaultCard}
              ariaLabel={textDefaultCard}
            />
          )}
        </div>
        <div className="ProfileSavedCardSummary__ManageLinkContainer">
          <span
            aria-label={`${t(labelSavedCard, {
              cardNumber: defaultCard.cardNumber.substr(defaultCard.cardNumber.length - 4),
              cardType: cardType ? cardType.name : defaultCard.cardType,
              nameOnCard: defaultCard.nameOnCard,
              expiryDate: `${defaultCard.expiryMonth}/${defaultCard.expiryYear}`
            })}${defaultCard.isDefault ? ` ${textDefaultCard} ` : ' '}${labelManageCardLink}`}
          >
            <Link href={PAGE_PROFILE_SAVED_CARDS_LINK}>{actionManage}</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default DefaultSavedCardView;
