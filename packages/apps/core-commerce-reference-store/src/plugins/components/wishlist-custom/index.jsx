import React, { useContext, useState } from "react";
import Styled from "@oracle-cx-commerce/react-components/styled";
import { StoreContext } from "@oracle-cx-commerce/react-ui/contexts";
import Modal from "../modal-custom";

import css from "./styles.css";
import DynamicProductListItem from "../dynamic-product-list-custom/components/dynamic-product-list-item";
import { useSelector } from "@oracle-cx-commerce/react-components/provider";

const wishlistcustom = (props) => {
  const { className = "", regions = [] } = props;
  const [wishListOpen, setWishListOpen] = useState(false);
  const data = useSelector((state) => state);
  // const store = useContext(StoreContext);
  const state = data;

  const removeWishListHanndler = (record) => {
    record &&
      record.attributes &&
      record.attributes["product.repositoryId"] &&
      store.action(
        "wishListremove",
        record && record.attributes["product.repositoryId"][0]
      );
    setWishListOpen(false);
  };

  return (
    <Styled id="wishlistcustom" css={css}>
      <div className="wishlistcustom">
        <div
          className="wishlistcustom__Container"
          onClick={() => setWishListOpen((prevstate) => !prevstate)}
        >
          <i
            className={`far fa-heart wishlistcustom__Icon ${
              state.wishList &&
              state.wishList?.wishListItems &&
              state.wishList?.wishListItems.length > 0 &&
              "icon"
            }`}
          ></i>
        </div>
        <p className="wishlistcustom__text">WishList</p>

        <Modal
          title="WishListed Items"
          show={wishListOpen}
          onClose={() => setWishListOpen((prevstate) => !prevstate)}
        >
          <div className="container">
            <div className="row">
              {state.wishList &&
              state.wishList?.wishListItems &&
              state.wishList?.wishListItems.length > 0 ? (
                state.wishList?.wishListItems.map((record, index) => (
                  <div
                    className="col wishlistcustom__div"
                    style={{ padding: "10px" }}
                    key={index}
                  >
                    <div className="wishlistcustom__close">
                      <i
                        className="fas fa-times icon"
                        onClick={() => removeWishListHanndler(record)}
                      ></i>
                    </div>
                    <DynamicProductListItem
                      key={index}
                      record={record}
                      regions={regions}
                    />
                  </div>
                ))
              ) : (
                <h4>No Items WishListed</h4>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </Styled>
  );
};

export default wishlistcustom;
