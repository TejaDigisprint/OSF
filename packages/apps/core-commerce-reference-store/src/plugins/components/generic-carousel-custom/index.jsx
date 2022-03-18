/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import GenericCarouselSlider from './generic-carousel-slider';
import GenericMobileCarouselSlider from './generic-mobile-carousel-slider';
import PropTypes from 'prop-types';

/**
 * Generic Carousel component
 * This component takes an array as input and renders the data as a Carousel.
 */
const GenericCarousel = props => {
  const {
    slides,
    itemsPerSlideDesktop = 1,
    slideIncrementFactor = itemsPerSlideDesktop,
    mobile = false,
    autoSlideInterval = 3,
    isAutoSlide = true,
    showIndicator = true,
    itemsPerSlideMobile = 1
  } = props;

  return (
    <Styled id="GenericCarousel" css={css}>
      <div className="GenericCarousel">
        <div className="CarouselHolder">
          {/* Displays carousel for desktop view*/}
          {!mobile && (
            <GenericCarouselSlider
              itemsPerSlideDesktop={itemsPerSlideDesktop}
              slideIncrementFactor={slideIncrementFactor}
              slides={slides}
              isAutoSlide={isAutoSlide}
              autoSlideInterval={autoSlideInterval}
              showIndicator={showIndicator}
              {...props}
            />
          )}

          {/* Displays carousel for mobile view*/}

          {mobile && (
            <GenericMobileCarouselSlider
              isAutoSlide={isAutoSlide}
              autoSlideInterval={autoSlideInterval}
              showIndicator={showIndicator}
              itemsPerSlideMobile={itemsPerSlideMobile}
              {...props}
            />
          )}
        </div>
      </div>
    </Styled>
  );
};

GenericCarousel.propTypes = {
  /**
   * An array of items passed as input to the carousel component.
   */
  slides: PropTypes.arrayOf(PropTypes.object).isRequired,

  /**
   * No of items to be displayed at a time in the slide in desktop view
   */
  itemsPerSlideDesktop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * If the device is mobile or desktop. Default value is false.
   */
  mobile: PropTypes.bool,

  /**
   * Automatically display the next slide after the specified interval in seconds. Default value is 3
   */
  autoSlideInterval: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Boolean value whether to automatically slide the items. Default value is true.
   */
  isAutoSlide: PropTypes.bool,

  /**
   * Contains the HTML tag
   */
  showIndicator: PropTypes.bool,

  /**
   * Number of Items to slide for next/previous button click. Default value is no of items displayed per slide in desktop view.
   */
  slideIncrementFactor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * No of items to be displayed at a time in the slide in mobile view. Default value is 1.
   */
  itemsPerSlideMobile: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

GenericCarousel.defaultProps = {
  itemsPerSlideDesktop: 1,
  slideIncrementFactor: 1,
  mobile: false,
  autoSlideInterval: 3,
  isAutoSlide: true,
  showIndicator: true,
  itemsPerSlideMobile: 1
};

export default GenericCarousel;
