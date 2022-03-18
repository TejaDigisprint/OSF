/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { ProductListingContext } from "@oracle-cx-commerce/react-widgets/contexts";
import Styled from "@oracle-cx-commerce/react-components/styled";
import css from "./styles.css";
import DynamicProductListItem from "./components/dynamic-product-list-item";
import Modal from "../modal-custom";
/**
 * Lists the results in table format, dependent on sort by button.
 *
 * @param props
 */
const customDynamicProductList = (props) => {
  const { className = "", regions = [] } = props;

  // Product Listing results data
  const {
    searchResults: { results },
    mobile,
  } = useContext(ProductListingContext);
  
  const [wishList, setWishList] = useState([]);
  const [wishListDisplay, setWishListDisplay] = useState(false);

  const wishListHandler = (item) => {
    // console.log(item);
    setWishList([...wishList, item]);
  };
  const setIcon = (item)=>{
    props.setIcon(false)
  }
  // console.log(wishList);
  // console.log(results);

  // Otherwise display table of search results
  return (
    <Styled id="DynamicProductList" css={css}>
      <div
        className={`DynamicProductList__Table ${
          mobile
            ? "DynamicProductList__Table--Mobile"
            : "DynamicProductList__Table--Desktop"
        } ${className}`}
      >
        {/* <Modal title="WishListed Items" show={wishListDisplay} onClose={() => setWishListDisplay(false)}>
          <div className="container">
            <div className="row">
              {wishList &&
                wishList.map((record, index) => (
                  <div className="col" style={{padding:"10px"}}  key={index}>
                    <DynamicProductListItem
                      key={index}
                      record={record}
                      regions={regions}
                    />
                  </div>
                ))}
            </div>
          </div>

          
        </Modal> */}

        {results &&
          results.records &&
          results.records.map((record) => {
            const productId =
              record.attributes["product.repositoryId"] &&
              record.attributes["product.repositoryId"][0];
            const skuId =
              record.attributes["sku.repositoryId"] &&
              record.attributes["sku.repositoryId"][0];

            // Use skuId as key if available to ensure unique IDs, otherwise use product ID
            const productKey = skuId || productId;

            return (
              <DynamicProductListItem
                key={productKey}
                record={record}
                regions={regions}
                wishList={wishListHandler}
                wishListDisplay={wishListDisplay}
                setWishListDisplay={setWishListDisplay}
                setIcon = {setIcon}
              />
            );
          })}
        {/* Pre-fetch ListItem to avoid latency */}
        <span style={{ display: "none" }}>
          <DynamicProductListItem
            record={{ attributes: {} }}
            regions={regions}
          />
        </span>
      </div>
    </Styled>
  );
};

customDynamicProductList.propTypes = {
  /**
   * The css class name
   */
  className: PropTypes.string,
  /**
   * The page regions
   */
  regions: PropTypes.arrayOf(PropTypes.string),
};

customDynamicProductList.defaultProps = {
  className: "",
  regions: [],
};

export default customDynamicProductList;
