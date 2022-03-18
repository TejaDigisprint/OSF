/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import Img from "@oracle-cx-commerce/react-components/img";
import Link from "@oracle-cx-commerce/react-components/link";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Styled from "@oracle-cx-commerce/react-components/styled";
import css from "./styles.css";
import { noop } from "@oracle-cx-commerce/utils/generic";


/**
 * Following widget component renders image and image caption based on the component settings.
 *
 * @param props
 */
const CustomImageSpotlight6 = (props) => {
  // props
  const {
    mediaLink = "",
    mediaLinkBehavior = "",
    mediaScreenText = "",
    mediaScreenTextPosition = "below",
    mediaTitle = "",
    mediaAlt = "",
    
    onErrorCallback = noop,
  } = props;

  //  const mediaObject = JSON.parse(media.replace(/'/g, '"'))
  //  const mediaSrc = mediaObject.src;

  let textStyle = {
    order: 2,
  };
  let imgLinkCSS = "Image_Link ";
  let imgCSS = "Image_Img ";

  switch (mediaScreenTextPosition) {
    case "below":
      textStyle = {
        order: 2,
      };
      imgLinkCSS += "Image_ColumnDirection";
      break;

    case "above":
      textStyle = {
        order: -1,
      };
      imgLinkCSS += "Image_ColumnDirection";
      break;

    case "right":
      textStyle = {
        order: 2,
      };
      imgLinkCSS += "Image_RowDirection";
      break;

    case "left":
      textStyle = {
        order: -1,
      };
      imgLinkCSS += "Image_RowDirection";
      break;

    // skip default
  }
  // mediaScreenText = "Women Footwear";
  if (mediaScreenText) {
    imgCSS += "Image_WithCaption";
  }

  const renderImage = () => {
    return (
      <>
        <div className={`Image_ImgContainer ${imgCSS}`}>
          <Link href="/mens-brand/category/Mbrand1">
            <img
              className="Img_Tag"
              
              src="/file/general/tommyjeansmen.jpg"
              title={mediaTitle}
              alt={mediaAlt}
              
              style={{ width: "95%", height: "400px", paddingLeft: "10px",cursor:'pointer' }}
            />
          </Link>
          <figcaption style={textStyle} className="Image_FigCaption">
            <h1 className="Image_h1">Men Brands</h1>
          </figcaption>
         
        </div>
        <br />
        
          
      </>
    );
  };

  const ImageLink = () => {
    let linkProps = {
      className: imgLinkCSS,
    };

    if (mediaLink) {
      linkProps = { ...linkProps, href: mediaLink };
    }

    if (mediaLinkBehavior === "_self") {
      return <Link {...linkProps}>{renderImage()}</Link>;
    }
    linkProps = { ...linkProps, target: mediaLinkBehavior };

    return <a {...linkProps}>{renderImage()}</a>;
  };

  return (
    <Styled id="Image" css={css}>
      <figure className="Image Image_Spot">
        <ImageLink />
      </figure>
    </Styled>
  );
};

CustomImageSpotlight6.propTypes = {
  
  mediaLink: PropTypes.string,
  mediaLinkBehavior: PropTypes.string,
  mediaScreenText: PropTypes.string,
  mediaScreenTextPosition: PropTypes.string,
  mediaTitle: PropTypes.string,
  
  
};

CustomImageSpotlight6.defaultProps = {
  mediaLink: "",
  mediaLinkBehavior: "",
  mediaScreenText: "",
  mediaScreenTextPosition: "",
  mediaTitle: "",
  
};

export default CustomImageSpotlight6;
