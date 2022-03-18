/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import Link from '@oracle-cx-commerce/react-components/link';
import PropTypes from 'prop-types';
import React, {useContext, useState} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {ProductContext} from '@oracle-cx-commerce/react-ui/contexts';
import {t} from '@oracle-cx-commerce/utils/generic';

/**
 * Displays the product color swatches for use in search results
 *
 * @param props
 */
const customProductResultColorSwatches = props => {
  const {
    colorIndicator = 'firstFew',
    numberOfSwatchesDisplayed = '5',
    colorSwatchShape = 'circular',
    colorSwatchImageHeight = 24,
    colorSwatchImageWidth = 24,
    colorSwatchUrlPlaceholder = '/ccstore/v1/images/?source=/file/products/__productId__.__swatchKey__.png&outputFormat=JPEG&quality=0.8&height=__height__&width=__width__',
    swatchMappingProperty = 'x_swatchMapping',
    swatchVariantOption = 'color',
    textNumberOfColors,
    textShowMoreColors
  } = props;

  const {record, route, selection = {}, setSelection = null} = useContext(ProductContext);

  const productId = record.attributes['product.repositoryId'] && record.attributes['product.repositoryId'][0];
  const skuId = record.attributes['sku.repositoryId'] && record.attributes['sku.repositoryId'][0];

  // Use skuId as key if available to ensure unique IDs, otherwise use product ID
  const productKey = skuId || productId;

  // Get color swatch mapping
  let swatchMapping;
  try {
    swatchMapping =
      record.attributes[`product.${swatchMappingProperty}`] &&
      JSON.parse(record.attributes[`product.${swatchMappingProperty}`][0]);
  } catch (error) {
    swatchMapping = {};
  }

  // Find the property matching swatchVariantOption
  let colorPropertyName;
  if (record.records && record.records[0]) {
    colorPropertyName = Object.keys(record.records[0].attributes).find(propertyName =>
      propertyName.endsWith(swatchVariantOption)
    );
  }

  // Get list of all color options for the product
  const availableColors = [];
  if (colorPropertyName) {
    record.records.forEach(item => {
      const colorName = item.attributes[colorPropertyName] && item.attributes[colorPropertyName][0];
      if (colorName && !availableColors.includes(colorName)) {
        availableColors.push(colorName);
      }
    });
  }

  // Filter out any colors that don't have a swatch key configured
  const availableSwatches = swatchMapping ? availableColors.filter(colorName => swatchMapping[colorName]) : [];

  // Used for temporarily setting the selected color on hover
  const [previousColorParameters, setPreviousColorParameters] = useState(null);
  const [previousImageUrl, setPreviousImageUrl] = useState(null);

  // Used for determining the list of colors to display
  // Hide colors after numberOfSwatchesDisplayed if configured to only show first few
  const [displayedSwatches, setdisplayedSwatches] = useState(
    colorIndicator === 'firstFew' && availableSwatches.length > numberOfSwatchesDisplayed
      ? availableSwatches.slice(0, numberOfSwatchesDisplayed - 1)
      : availableSwatches
  );

  // If numberOfColors indicator selected, display just text with number of colors
  if (colorIndicator === 'numberOfColors') {
    return (
      <Styled id="ProductResultColorSwatches" css={css}>
        {availableColors.length > 0 && (
          <Link className="ProductResultColorSwatches__NumberOfColors" href={route}>
            {t(textNumberOfColors, {numberOfColors: availableColors.length})}
          </Link>
        )}
      </Styled>
    );
  }

  // Show the rest of the colors
  const showMoreColors = () => {
    setdisplayedSwatches(availableSwatches);
  };

  // If color swatch configuration is missing, do not render color swatches
  if (!swatchMapping || !colorSwatchUrlPlaceholder) {
    return <div />;
  }

  // Update the color selection to include selected color information
  const setColor = colorName => {
    const selectedSku = record.records.find(
      record => record.attributes[colorPropertyName] && record.attributes[colorPropertyName][0] === colorName
    );

    // Save the url portion to specify the color selection on the PDP
    const colorParameters = `?variantName=${swatchVariantOption}&variantValue=${colorName}`;

    // Save the url for the color-specific image
    const imageUrl =
      selectedSku.attributes['sku.listingFullImageURL'] && selectedSku.attributes['sku.listingFullImageURL'][0];

    setSelection({colorParameters, imageUrl});
  };

  const onClick = colorName => {
    // Clear out previous selection to prevent reverting when mouse leaves the region
    setPreviousColorParameters(null);
    setPreviousImageUrl(null);

    setColor(colorName);
  };

  const onMouseOver = colorName => {
    // Set previous color to revert selection when mouse leaves the region
    setPreviousColorParameters(selection ? selection['colorParameters'] : '');
    setPreviousImageUrl(selection ? selection['imageUrl'] : '');

    setColor(colorName);
  };

  const onMouseLeave = () => {
    // If a previous color is saved, meaning a color swatch has been hovered over but not selected, revert to that color
    if (previousColorParameters !== null && previousImageUrl !== null) {
      setSelection({colorParameters: previousColorParameters, imageUrl: previousImageUrl});

      setPreviousColorParameters(null);
      setPreviousImageUrl(null);
    }
  };

  if (availableSwatches.length > 0) {
    return (
      <Styled id="ProductResultColorSwatches" css={css}>
        <div className="ProductResultColorSwatches">
          {displayedSwatches.map(colorName => {
            const swatchId = swatchMapping[colorName];

            if (swatchId) {
              const swatchUrl = colorSwatchUrlPlaceholder
                .replace('__productId__', productId)
                .replace('__swatchKey__', swatchId)
                .replace('__height__', colorSwatchImageHeight)
                .replace('__width__', colorSwatchImageWidth);

              // Whether this color is currently selected
              const isSelected =
                selection &&
                selection['colorParameters'] &&
                selection['colorParameters'].split('&variantValue=')[1] === colorName;

              return (
                <span
                  role="button"
                  key={`${productKey}-${colorName}`}
                  onClick={() => onClick(colorName)}
                  onMouseOver={() => onMouseOver(colorName)}
                  onFocus={() => onMouseOver(colorName)}
                  onMouseLeave={onMouseLeave}
                  onKeyDown={event => {
                    if (event.key === 'Enter') {
                      onClick(colorName);
                    }
                  }}
                  className={`ProductResultColorSwatches__Swatch ${
                    colorSwatchShape === 'circular'
                      ? 'ProductResultColorSwatches__Swatch--Circular'
                      : 'ProductResultColorSwatches__Swatch--Rectangular'
                  } ${
                    isSelected
                      ? 'ProductResultColorSwatches__Swatch--Selected'
                      : 'ProductResultColorSwatches__Swatch--Unselected'
                  }`}
                  title={colorName}
                  aria-label={colorName}
                  style={{
                    background: `url("${swatchUrl}")`,
                    height: `${colorSwatchImageHeight}px`,
                    width: `${colorSwatchImageWidth}px`
                  }}
                  tabIndex="0"
                />
              );
            }

            return <div key={`${productKey}-${colorName}`} />;
          })}
          {colorIndicator === 'firstFew' && availableSwatches.length > displayedSwatches.length && (
            <span
              role="button"
              className="ProductResultColorSwatches__MoreColorsLink"
              onClick={showMoreColors}
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  showMoreColors();
                }
              }}
              tabIndex="0"
            >
              {t(textShowMoreColors, {numberOfColors: availableSwatches.length - displayedSwatches.length})}
            </span>
          )}
        </div>
      </Styled>
    );
  }

  return <div />;
};

customProductResultColorSwatches.propTypes = {
  /**
   * The format in which to display color swatches: plain text, first few, or all swatches
   */
  colorIndicator: PropTypes.string,
  /**
   * The maximum number of color swatches to be displayed
   */
  numberOfSwatchesDisplayed: PropTypes.string,
  /**
   * The shape of the color swatches, either circular or rectangular
   */
  colorSwatchShape: PropTypes.string,
  /**
   * The height of the color swatch in pixels
   */
  colorSwatchImageHeight: PropTypes.string,
  /**
   * The width of the color swatch in pixels
   */
  colorSwatchImageWidth: PropTypes.string,
  /**
   * The template for the color swatch image url
   */
  colorSwatchUrlPlaceholder: PropTypes.string,
  /**
   * The name of the color swatch mapping property
   */
  swatchMappingProperty: PropTypes.string,
  /**
   * The name of the variant property associated with the swatches
   */
  swatchVariantOption: PropTypes.string,
  /**
   * The resource string for the total number of color swatches
   */
  textNumberOfColors: PropTypes.string.isRequired,
  /**
   * The resource string for the show more color swatches link
   */
  textShowMoreColors: PropTypes.string.isRequired
};

customProductResultColorSwatches.defaultProps = {
  colorIndicator: 'firstFew',
  numberOfSwatchesDisplayed: '5',
  colorSwatchShape: 'circular',
  colorSwatchImageHeight: 24,
  colorSwatchImageWidth: 24,
  colorSwatchUrlPlaceholder:
    '/ccstore/v1/images/?source=/file/products/__productId__.__swatchKey__.png&outputFormat=JPEG&quality=0.8&height=__height__&width=__width__',
  swatchMappingProperty: 'x_swatchMapping',
  swatchVariantOption: 'color'
};

export default customProductResultColorSwatches;
