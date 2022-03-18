import React, {useContext} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import Link from '@oracle-cx-commerce/react-components/link';
import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';

const saveforlaterview = props => {
  const store = React.useContext(StoreContext)
  const removeFromSaveForLaterMethod = (index,commerceId) =>{
    store.action("saveforlaterremover",{removeIndex:index,commerceId:commerceId})
  }
  const moveToCartMethod = async(productId,catRefId,index,commerceId) =>{

    await store.endpoint("addItemsToCart",{items:[{productId,catRefId,quantity:1}]})

    await removeFromSaveForLaterMethod(index,commerceId)

  }
  return (
    <Styled id="saveforlaterview" css={css}>
      <div>
      <div className='saveforlaterfcontainer'>
          <div className='saveItems'>
        <Link href={props.route && props.route.slice(1,props.route.length) || ""}>
          <img className='saveItemImage' src={props.primaryThumbImageURL || ""} alt={props.primaryImageAltText || ""}/>
        </Link>
        </div>
        <div>
        <h3 className='itemPrice'>{props.primaryImageTitle || ""}</h3>
        <span>{"Price: $"+props.price || ""}</span>
        &nbsp; &nbsp;
        {/* <span className='commerceItemDiscountprice'>{"Save: $ ",props.discountAmount}</span> */}
             <span className='commerceItemActualprice'>{"$"+props.listPrice}</span>
             <br/>
             <a className="movetocartLink" onClick={(e)=>{e.preventDefault();moveToCartMethod(props.productId,props.catRefId,props.indexKey,props.commerceItemId)}}>Move to Cart</a>
        <a onClick={(e)=>{e.preventDefault();removeFromSaveForLaterMethod(props.indexKey,props.commerceItemId)}} className="removeLInk">Remove</a>
        </div>
      </div>
      </div>
    </Styled>
  );
};

export default saveforlaterview;
