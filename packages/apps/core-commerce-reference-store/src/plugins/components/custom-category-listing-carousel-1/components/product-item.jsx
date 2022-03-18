/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

 import React, {useState} from 'react';
 import css from '../styles.css';
 import Img from '@oracle-cx-commerce/react-components/img';
 // import ProductPrice from '@oracle-cx-commerce/react-widgets/product/product-price/component';
 import Styled from '@oracle-cx-commerce/react-components/styled';
 import {isEmptyObject} from '@oracle-cx-commerce/utils/generic';
 import {getProduct} from '@oracle-cx-commerce/commerce-utils/selector';
 import {useSelector} from '@oracle-cx-commerce/react-components/provider';
 import { useNumberFormatter } from '@oracle-cx-commerce/react-components/utils/hooks';
 import {ContainerContext, ProductContext, ProductSelectionContext} from '@oracle-cx-commerce/react-ui/contexts';
 
 /**
  * ProductItem component takes productId as param and fetches the corresponding product information from the redux state.
  * The fetched information is used to render the Product Image, DisplayName and Price. *
  */
 const ProductItem = props => {
   const {productId} = props;
   const [selections, setSelections] = useState({});
   let productSelection = {};
   const formatCurrency = useNumberFormatter({ style: 'currency' }, props.priceListGroup);
   // The idea initially was to get product object to this component and use it for creating a slide.
   // Now the approach is to only send productId from another component and fetch the product object from the redux state.
   // The props.product check is still a part of this to ensure that the code is backward compatible.
   // If both product and productId are sent as props then the preference to productId is given
   let {product} = props;
   const productData = useSelector(getProduct, {productId});
   if (!isEmptyObject(productData)) {
     product = productData;
   }
   if (isEmptyObject(product)) {
     product = null;
   }
 
   if (product) {
     // setSelections only when there is valid product/sku
     if (isEmptyObject(selections)) {
       const {variantOptionsSeed, variantToSkuLookup = []} = product;
 
       // For products with no variant options, the skuId is set in the initial state.
       const skuId = isEmptyObject(variantOptionsSeed) ? variantToSkuLookup[''] : null;
       setSelections({
         skuId,
         variantOptions: {},
         qty: 1
       });
     }
     productSelection = {
       productId: product.id,
       skuId: selections.skuId,
       quantity: selections.qty
     };
   }
 
   if (product) {
     return (
       <Styled id="ProductItem" css={css}>
         {product && !isEmptyObject(productSelection) && (
           <div className="ProductItem">
             <ProductContext.Provider value={product}>
               <ContainerContext.Provider value={{selections, setSelections}}>
                 <ProductSelectionContext.Provider value={{productSelection}}>
                   <a href={product.route}>
                     <div className="ProductItem__Image">
                       <Img src={product.primaryFullImageURL} alt={product.primaryImageAltText} />
                     </div>
 
                     {/* <div className="ProductItem__DisplayName">{product.displayName}</div> */}
                     <h3 className='Product_item_name'>{product.displayName}</h3>
                       <span className='productItem-salePrice'>{formatCurrency(product.salePrice)}</span><span className='productItem-listPrice'>{formatCurrency(product.listPrice)}</span>
                     
                   </a>
                 </ProductSelectionContext.Provider>
               </ContainerContext.Provider>
             </ProductContext.Provider>
           </div>
         )}
       </Styled>
     );
   }
 
   return null;
 };
 
 export default ProductItem;
 