/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import Link from '@oracle-cx-commerce/react-components/link';
import PropTypes from 'prop-types';
import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {noop} from '@oracle-cx-commerce/utils/generic'

/**
 * Following widget component renders image and image caption based on the component settings.
 *
 * @param props
 */
const CustomPromoHomeBanner = props => {

  const {
    media = {},
    mediaLink = '',
    mediaLinkBehavior = '',
    mediaScreenText = '',
    mediaScreenTextPosition = '',
    mediaScreenText1 = '',
    mediaScreenTextPosition1 = '',
    mediaTitle = '',
    mediaAlt = '',
    errorSrc = null,
    onErrorCallback = noop
  } = props;

  const mediaObject = JSON.parse(media.replace(/'/g, '"'))
  const mediaSrc = mediaObject.src;
  

  let textStyle = {
    order: 2
  };
  let imgLinkCSS = 'Image_Link ';
  let imgCSS = 'Image_Img ';

  switch (mediaScreenTextPosition) {
    case 'below':
      textStyle = {
        order: 2
      };
      imgLinkCSS += 'Image_ColumnDirection';
      break;

    case 'above':
      textStyle = {
        order: -1
      };
      imgLinkCSS += 'Image_ColumnDirection';
      break;

    case 'right':
      textStyle = {
        order: 2
      };
      imgLinkCSS += 'Image_RowDirection';
      break;

    case 'left':
      textStyle = {
        order: -1
      };
      imgLinkCSS += 'Image_RowDirection';
      break;

    // skip default
  }

  switch (mediaScreenTextPosition1) {
    case 'below':
      textStyle = {
        order: 2
      };
      imgLinkCSS += 'Image_ColumnDirection';
      break;

    case 'above':
      textStyle = {
        order: -1
      };
      imgLinkCSS += 'Image_ColumnDirection';
      break;

    case 'right':
      textStyle = {
        order: 2
      };
      imgLinkCSS += 'Image_RowDirection';
      break;

    case 'left':
      textStyle = {
        order: -1
      };
      imgLinkCSS += 'Image_RowDirection';
      break;

    // skip default
  }

  if (mediaScreenText) {
    imgCSS += 'Image_WithCaption';
  }

  if (mediaScreenText1) {
    imgCSS += 'Image_WithCaption';
  }

  const renderImage = () => {
    return (
      <>
        <div className={`Image_ImgContainer ${imgCSS} Promo_banner`}>
          <img  src={mediaSrc} title={mediaTitle} alt={mediaAlt}  />
          
        </div>
      </>
    );
  };

  const ImageLink = () => {
    let linkProps = {
      className: imgLinkCSS
    };

    if (mediaLink) {
      linkProps = {...linkProps, href: mediaLink};
    }

    if (mediaLinkBehavior === '_self') {
      return <Link {...linkProps}>{renderImage()}</Link>;
    }
    linkProps = {...linkProps, target: mediaLinkBehavior};

    return <a {...linkProps}>{renderImage()}</a>;
  };

  return (
    <Styled id="Image" css={css}>
      <figure className="Image">
        <ImageLink />
      </figure>
    </Styled>
  );
};





export default CustomPromoHomeBanner;
