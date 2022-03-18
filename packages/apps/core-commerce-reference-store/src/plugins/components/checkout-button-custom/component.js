/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useContext} from 'react';
import {CartContext} from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import css from './styles.css';
import {getComponentData} from './selectors';
import {useNavigator} from '@oracle-cx-commerce/react-components/link';
import {getCheckoutLink} from '@oracle-cx-commerce/react-widgets/checkout/checkout-button/utils';
import PropTypes from 'prop-types';

/**
 * Widget for the 'Checkout' button in the cart page
 * If the cart is valid, then it navigates to the checkout-shipping/checkout-login page
 */
const CheckoutButtonCustom = props => {
  const {actionCheckout} = props;
  const {isUserLoggedIn, numberOfItems = 0} = props;

  // cart context
  const {
    cartStatus: {isCartInValid, hasOutOfStockItems, hasInactiveItems}
  } = useContext(CartContext);

  const goToPage = useNavigator();

  /**
   * Click handler for the checkout button
   * If the cart is valid, then navigate to the checkout page,
   * else scroll up in the cart page to display the alert message to the user
   */
  const onCheckoutClick = () => {
    if (!isCartInValid && !hasOutOfStockItems && !hasInactiveItems) {
      goToPage(getCheckoutLink(isUserLoggedIn));
    } else {
      scrollTo({top: 0, left: 0});
    }
  };

  return (
    <Styled id="CheckoutButton" css={css}>
      <div className="CheckoutButton">
        {numberOfItems > 0 && (
          <button className='btn btn-warning btn_color_warning'
            type="button"
            disabled={isCartInValid || hasOutOfStockItems || hasInactiveItems}
            onClick={onCheckoutClick}
          >
            {actionCheckout}
          </button>
        )}
      </div>
    </Styled>
  );
};

CheckoutButtonCustom.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  numberOfItems: PropTypes.number
};

CheckoutButtonCustom.defaultProps = {
  numberOfItems: 0
};

export default connect(getComponentData)(CheckoutButtonCustom);
