/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import Card from '@oracle-cx-commerce/react-components/card';
import EmailIcon from '@oracle-cx-commerce/react-components/icons/email';
import Link from '@oracle-cx-commerce/react-components/link';
import {PAGE_PROFILE_DETAILS_LINK} from '@oracle-cx-commerce/commerce-utils/constants';
import PhoneIcon from '@oracle-cx-commerce/react-components/icons/phone';
import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import UserIcon from '@oracle-cx-commerce/react-components/icons/user';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import css from './styles.css';
import {getPageData} from '@oracle-cx-commerce/react-widgets/profile/profile-details-summary/selectors';
/**
 * Displays the profile details summary on profile page.
 * @param {*} props - labels for account details title and edit link.
 * Contains the link to profile details page.
 */

const CustomProfileDetailsSummary = props => {
  const {actionEdit, headingAccountDetails} = props;
  const {isUserLoggedIn, firstName = '', lastName = '', email = '', daytimeTelephoneNumber} = props;

  return (
    <Styled id="ProfileDetailsSummary" css={css}>
      <div className={`ProfileDetailsSummary ${(isUserLoggedIn && firstName) && 'ProfileDetailsSummary_div'}`}>
        {isUserLoggedIn && firstName && (
          <>
            <h2> {headingAccountDetails} </h2>
            <Card>
              <div className="ProfileDetailsSummary__UpdateProfileDetailsLink">
                <Link href={"custom-profile-details"}>{actionEdit}</Link>
              </div>

              <div className="ProfileDetailsSummary__Item">
                {firstName && (
                  <div data-testid="userName">
                    {<UserIcon className="ProfileDetailsSummary__IconBasicStyle" />}
                    <div className="ProfileDetailsSummary__Item_Text">{`${firstName} ${lastName}`}</div>
                  </div>
                )}
              </div>
              <div className="ProfileDetailsSummary__Item">
                {email && (
                  <div data-testid="email">
                    {<EmailIcon className="ProfileDetailsSummary__IconBasicStyle" />}
                    <div className="ProfileDetailsSummary__Item_Text">{email}</div>
                  </div>
                )}
              </div>
              <div className="ProfileDetailsSummary__Item">
                {daytimeTelephoneNumber && (
                  <div>
                    {<PhoneIcon className="ProfileDetailsSummary__IconBasicStyle" />}
                    <div className="ProfileDetailsSummary__Item_Text">{daytimeTelephoneNumber}</div>
                  </div>
                )}
              </div>
            </Card>
          </>
        )}
      </div>
    </Styled>
  );
};



export default connect(getPageData)(CustomProfileDetailsSummary);
