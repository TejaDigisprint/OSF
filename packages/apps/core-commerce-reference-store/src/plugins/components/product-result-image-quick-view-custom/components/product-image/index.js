/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
// import Img from '@oracle-cx-commerce/react-components/img';

// eslint-disable-next-line spellcheck/spell-checker
/**
 * Displays the product image
 *
 * @param {string} props.imageUrl the url of the product image to be displayed
 * @param {string} props.imageSize the size of the image (xsmall, small, medium, large)
 * @param {string} props.altText the altText associated with the product image
 */
const ProductImage = props => {
  // context
  const { imageUrl, altText } = props;

  return (
    <Styled id="ProductImage" css={css}>
     
      <div className="ProductImage">
        
        <img src={imageUrl} alt={altText} className='ProductImage__img' />
      </div>

    </Styled>
  );
};

ProductImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired
};

export default ProductImage;
