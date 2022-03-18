/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, { useState } from 'react';

import { CartContext } from '@oracle-cx-commerce/react-ui/contexts';
import CartPlaceholder from '@oracle-cx-commerce/react-widgets/cart/cart-container/components/cart-placeholder';
import CartValidation from '@oracle-cx-commerce/react-widgets/cart/cart-container/components/cart-validations';
import PageLoader from '@oracle-cx-commerce/react-components/page-loader';
import Region from '@oracle-cx-commerce/react-components/region';
import Styled from '@oracle-cx-commerce/react-components/styled';
import { connect } from '@oracle-cx-commerce/react-components/provider';
import css from './styles.css';
import { getComponentData } from './selectors';
import { StoreContext } from '@oracle-cx-commerce/react-ui/contexts';
import { useCartOnloadData } from '../../fetchers/hooks'

/**
 * CartContainer displays widgets of the cart page in responsive way.
 * It supports single shipping group only.
 * @param {*} props
 */
const CartContainerCustom = props => {
  const store = React.useContext(StoreContext)
  useCartOnloadData(store)

  const { regions = [], className = '', headingYourCart, isGetCartInProgress } = props;
  const [cartStatus, setCartStatus] = useState({
    isCartInValid: false,
    hasOutOfStockItems: false,
    hasInactiveItems: false
  });

  const [showCartOrSave, setShowCartOrSave] = useState("cart")

  const toggleCartOrShow = (e) => {
    if (e.target.textContent == "Save For Later") {
      setShowCartOrSave("saveforlater")
    }
    else {
      setShowCartOrSave("cart")
    }
  }





  return (
    <Styled id="CartContainer" css={css}>
      <div className="CartContainer">
        <div className='cart_pages'>
          <p className='cart_toggle_button' onClick={toggleCartOrShow}>Cart</p>
          <p className='cart_toggle_button' onClick={toggleCartOrShow}>Save For Later</p>
        </div>
        <CartContext.Provider value={{ cartStatus, setCartStatus, showCartOrSave }}>
          <CartValidation {...props} />
          <PageLoader show={isGetCartInProgress === 1}>
            <CartPlaceholder />
          </PageLoader>
          <section
            className={`CartContainer__Section ${className}`.trim()}
            style={{ visibility: isGetCartInProgress !== 1 ? 'visible' : 'hidden' }}
          >
            {
              showCartOrSave == "cart" ? regions.map((regionId, index) => (
                /*
                Using region ids as keys causes unnecessary DOM reconciliation.
                
                https://reactjs.org/docs/reconciliation.html#keys
                */
                <Region key={index} regionId={regionId} /> // eslint-disable-line react/no-array-index-key
              )) : regions.map((regionId, index) => (
                /*
                Using region ids as keys causes unnecessary DOM reconciliation.
                
                https://reactjs.org/docs/reconciliation.html#keys
                */
                index == 0 ? <Region key={index} width={"4"} regionId={regionId} /> : ''// eslint-disable-line react/no-array-index-key
              ))
            }
          </section>
        </CartContext.Provider>
        {/* render each child region */}
      </div>
    </Styled>
  );
};


export default connect(getComponentData)(CartContainerCustom);
