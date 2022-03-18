/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import CartItemsTable from './components/cart-items-table/index';
import Link from '@oracle-cx-commerce/react-components/link';
import {PAGE_HOME_LINK} from '@oracle-cx-commerce/commerce-utils/constants';
import PropTypes from 'prop-types';
import React,{useContext} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import css from './styles.css';
import {getComponentData} from './selectors';
import {isEmptyObject} from '@oracle-cx-commerce/utils/generic';
import {useCartInitializer} from '@oracle-cx-commerce/react-components/utils/cart/hooks';
import {CartContext} from '@oracle-cx-commerce/react-ui/contexts';
import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import Card from '@oracle-cx-commerce/react-components/card/index'
import SaveForLaterView from '../../components/saveforlaterview/index'

/**
 * CartItemDetails widget displays shopping cart commerce items to view each item quantity, price and promotion information.
 * It supports single shipping group only.
 * @param {*} props
 */
const CartItemDetails = props => {
  const store = React.useContext(StoreContext)

  const storeState = store.getState()

  const [demoState,setDemoState] = React.useState(storeState && storeState.saveForLater &&  storeState.saveForLater.saveforlater && storeState.saveForLater.saveforlater.length)
  
  React.useEffect(()=>{
    setDemoState(demoState+1)
  },[demoState])
  //resources
  const {messageEmptyCart, actionContinueShopping} = props;

  const cartContext = useContext(CartContext)

  //current order and shipping group info.
  const {currentOrder, isGetCartInProgress} = props;
  const {commerceItems = {}} = currentOrder;

  useCartInitializer(currentOrder, isGetCartInProgress);

  return (
    <Styled id="CartItemDetails" css={css}>
      {cartContext.showCartOrSave == 'cart'?
      <div className="CartItemDetails">
        {isGetCartInProgress !== 1 && (
          <>
            {isEmptyObject(commerceItems) ? (
              <>
                <h2 className="CartItemDetails__EmptyMessage">{messageEmptyCart}</h2>
                <Link className="btn btn-primary continue_shopping_button" href={PAGE_HOME_LINK}>
                  {actionContinueShopping}
                </Link>
              </>
            ) : (
              <CartItemsTable {...props} />
            )}
          </>
        )}
      </div>:<>
      {storeState && storeState.saveForLater &&  storeState.saveForLater.saveforlater && storeState.saveForLater.saveforlater.length>0 ?
      storeState.saveForLater.saveforlater.map((item,index)=>{
        return <Card className='cardview'><SaveForLaterView {...item} indexKey = {index}/></Card>
      })
    :
     <>
     <div className="CartItemDetails"><h2 className="CartItemDetails__EmptyMessage">{"Your Save Later Empty"}</h2>
                <Link className="btn btn-primary continue_shopping_button" href={PAGE_HOME_LINK}>
                  {actionContinueShopping}
                </Link></div>
     </>}
      </>}
    </Styled>
  );
};




export default connect(getComponentData)(CartItemDetails);
