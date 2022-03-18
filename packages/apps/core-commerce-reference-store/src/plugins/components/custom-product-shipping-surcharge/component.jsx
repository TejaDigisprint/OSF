/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import Link from '@oracle-cx-commerce/react-components/link';
import {ProductContext} from '@oracle-cx-commerce/react-ui/contexts';
import React, {useContext, useState} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled/index';
import Alert from '@oracle-cx-commerce/react-components/alert';
import {useNumberFormatter} from '@oracle-cx-commerce/react-components/utils/hooks';
import {t} from '@oracle-cx-commerce/utils/generic';
import css from './styles.css';

/**
 * Widget to display the shipping surcharge of a selected product.
 */
const CustomProductShippingSurcharge = props => {
  // resources
  const {shippingSurchargeText, shippingSurchargeMessage, labelDetails} = props;

  // context
  const {shippingSurcharge} = useContext(ProductContext);
  const [displayInfo, setDisplayInfo] = useState(false);
  const formatCurrency = useNumberFormatter({style: 'currency'});

  /**
   * Function handles the onClick event of Details anchor tag. This
   * takes the event object information as parameter and sets displayInfo
   * to true via setDisplayInfo method.If Details is clicked twice, displayInfo
   * is set to false.
   *
   * @param {Object} information of the event object
   */
  function displayShippingSurchargeInfo(event) {
    event.preventDefault();
    setDisplayInfo(!displayInfo);
  }

  return (
    <Styled id="ProductShippingSurcharge" css={css}>
      <div className="ProductShippingSurcharge">
        {shippingSurcharge > 0 && (
          <>
            <div className="SurchargeValue">
              {t(shippingSurchargeText, {price: formatCurrency(shippingSurcharge)})}
              <Link key="DetailsButton" className="Details" onClick={displayShippingSurchargeInfo} href="/">
                {labelDetails}
              </Link>
            </div>
            {displayInfo && (
              <Alert id="ProductShippingSurcharge__Alert" type="info" message={shippingSurchargeMessage} />
            )}
          </>
        )}
      </div>
    </Styled>
  );
};

export default CustomProductShippingSurcharge;
