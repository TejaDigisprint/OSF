/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import { ProductContext } from "@oracle-cx-commerce/react-ui/contexts";
import { StoreContext } from "@oracle-cx-commerce/react-ui/contexts";

import React, { useState, useContext, useEffect } from "react";
import Region from "@oracle-cx-commerce/react-components/region";
import Styled from "@oracle-cx-commerce/react-components/styled";
import css from "./styles.css";
import { useSelector } from '@oracle-cx-commerce/react-components/provider';

/**
 * A component for a product result item.
 *
 * @param {object} props.record The product result data, from the getSearchResults selector
 * @param {array} props.regions The regions to display in the product result, defined in page layout.
 */
const DynamicProductListItem = (props) => {
  const { record = { attributes: {} }, regions } = props;
  const data = useSelector(state => state)

  // Used to keep track of color swatch selections. Object with properties:
  // - colorParameters: a url segment with query parameters for pre-selecting the correct color variant
  // - imageUrl: url for the product image in the selected color variant
  const store = useContext(StoreContext);
  const state = data

  const [selection, setSelection] = useState({});
  // const [whisList, setWishList] = useState([]);
  const [love, setLove] = useState(false);
  // Get product route
  let route =
    record.attributes["product.route"] && record.attributes["product.route"][0];
  if (route && route.charAt(0) === "/") {
    route = route.substring(1);
  }
  if (selection && selection["colorParameters"]) {
    // If a color variant has been set by selecting a swatch, append this selection to the url
    route += selection["colorParameters"];
  }
  const demoWihs = () => {

    let aay = state.wishList && state.wishList?.wishListItems && state.wishList?.wishListItems.map((item, index) => {
      if (record && record.attributes && record.attributes["product.repositoryId"] && item.attributes["product.repositoryId"][0] == record.attributes["product.repositoryId"][0]) {
        return true
      }
      else {
        return false
      }
    })
    if (aay?.includes(true)) {
      return true
    }
  }
  function addToWishListHandler(record) {
    const payload = {
      item: record,
    };
    setLove(true)
    store.action("wishListsaga", record);
    demoWihs()
    props.wishList(record);
    props.setWishListDisplay(true);
  }



  // console.log("dsdgsvsfsdfsdf");
  return (
    // Pass down product context to any children.
    <Styled id="DynamicProductListItem" css={css}>
      <div className="productlistCardCustom">
        <ProductContext.Provider
          value={{ record, route, selection, setSelection }}
        >
          <div className="card rounded Custom DynamicProductListItem__Product Container__Section">
            <div className="DynamicProductListItem__Wishlist">
              {
                demoWihs() ? <i className="fas fa-heart icon" title="WishListed"></i> : <i
                  className="far fa-heart icon" title="Add To WishList"
                  onClick={() => addToWishListHandler(record)}
                ></i>
              }
            </div>
            {regions.map((regionId, index) => (
              /*
                Using region ids as keys causes unnecessary DOM reconciliation.
                  
                https://reactjs.org/docs/reconciliation.html#keys
              */
              <Region key={index} regionId={regionId} /> // eslint-disable-line react/no-array-index-key
            ))}
          </div>
        </ProductContext.Provider>
      </div>
    </Styled>
  );
};

export default DynamicProductListItem;
