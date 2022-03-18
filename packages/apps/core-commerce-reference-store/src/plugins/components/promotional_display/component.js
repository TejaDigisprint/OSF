/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import Link from '@oracle-cx-commerce/react-components/link';
import PropTypes from 'prop-types';
import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {noop} from '@oracle-cx-commerce/utils/generic';

/**
 * Following widget component renders image and image caption based on the component settings.
 *
 * @param props
 */
const PromotionalDisplay = props => {
  // return(
  //   <div className='ImageContainer PromotionalDisplay' >
  //     <img src='https://digital4.michaelkors.com/refreshes/2021/holiday/refresh3/global/desktop/homepage/HP_PROMO_7.jpg' alt='promotinal Display' width='100%'/>
  //     <div style={{textAlign: 'center', 'padding-bottom':'20px'}}>
  //     <h1><b>SPRING/SUMMER 2022</b></h1>
  //     </div>
  //     <div style={{textAlign: 'center'}}>
  //     <h3>My Spring/Summer 2022 Collection is an homage and a love letter to urban romance. Right now the world is dealing with difficult news every day, and I like to think that fashion can add a jolt of joy and optimisim. This season is all about polish and glamour, but in an easy kind of way.” —Michael Kors</h3>
  //     </div>
  //   </div>
  // )

  // props
  const {
    media = {},
    mediaLink = '',
    mediaLinkBehavior = '',
    mediaScreenText = '',
    mediaScreenTextPosition = '',
    mediaScreenText1='',
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
        <div className={`Image_ImgContainer ${imgCSS}`}>
          <img  src={mediaSrc} title={mediaTitle} alt={mediaAlt} 
          style={{padding: '20px !important', width: '100% !important', height: '450px !important'}}/>
          {mediaScreenText1 ? (
          <figcaption style={textStyle} className="Image_FigCaption custom_text">
            {mediaScreenText1}
          </figcaption>
        ) : null}
          {mediaScreenText ? (
          <figcaption style={textStyle} className="Image_FigCaption custom_text">
            {mediaScreenText}
          </figcaption>
        ) : null}
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



export default PromotionalDisplay;
