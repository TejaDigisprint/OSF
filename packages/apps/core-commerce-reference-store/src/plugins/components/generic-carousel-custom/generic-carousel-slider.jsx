/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useState, useEffect, useRef} from 'react';
import AngleRightIcon from '@oracle-cx-commerce/react-components/icons/angle-right';
import AngleLeftIcon from '@oracle-cx-commerce/react-components/icons/angle-left';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import GenericSliderControls from './generic-slider-controls';

const DEFAULT_SLIDE_INTERVAL = 3000;
const SLIDER_PERCENTAGE_WIDTH = 85;
/**
 * GenericCarouselSlider is a component used to display the input slides in a carousel in desktop view.
 */
const GenericCarouselSlider = props => {
  const {
    itemsPerSlideDesktop,
    slides = [],
    isAutoSlide,
    autoSlideInterval,
    showIndicator,
    slideIncrementFactor
  } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateValue, setTranslateValue] = useState(0);
  const [autoSlide, setAutoSlide] = useState(isAutoSlide);

  const [width, setWidth] = useState(0);

  //Parsed value of itemsPerSlideDesktop, if a not a number is passed then it is set to 1
  const parsedItemsPerSlide = parseInt(itemsPerSlideDesktop, 10) || 1;

  //Parsed value of slideIncrementFactor, if a not a number is passed then it is set to 1
  const parsedSlideIncrementFactor = parseInt(slideIncrementFactor, 10) || 1;

  //Calculate the number of item translations per slide
  const itemTranslationCount =
    parsedSlideIncrementFactor > 0 &&
    parsedSlideIncrementFactor !== parsedItemsPerSlide &&
    parsedSlideIncrementFactor < parsedItemsPerSlide
      ? parsedSlideIncrementFactor
      : parsedItemsPerSlide;

  // Dot indicators will not be displayed, if the slideIncrementFactor is not same as parsedItemsPerSlide
  const isDisplayDotIndicator = itemTranslationCount === parsedItemsPerSlide ? showIndicator : false;

  //Fetch the parsedItemsPerSlide from props and calculate the item width
  let parsedItemWidth;
  if (parsedItemsPerSlide !== undefined && parsedItemsPerSlide > 1) {
    parsedItemWidth = width / parsedItemsPerSlide;
  }

  //Calculate the total number of slides
  const calcSlidesCount = Math.ceil(slides.length / parsedItemsPerSlide);

  //Calculate the margin required between items.
  const itemMarginInPixels = parsedItemWidth !== undefined && parsedItemsPerSlide > 1 ? 8 : 0;

  useEffect(() => {
    setTranslateValue(0);
    setCurrentIndex(0);
  }, [slides]);

  // Event listens for the window re size and set the width value in the state based on window.innerWidth value
  useEffect(() => {
    if (window.innerWidth !== undefined) {
      const calculatedWidth = (SLIDER_PERCENTAGE_WIDTH * window.innerWidth) / 100;
      setWidth(calculatedWidth - itemMarginInPixels * 2 * parsedItemsPerSlide);
    }

    const updateWidth = () => {
      const calculatedWidth = (SLIDER_PERCENTAGE_WIDTH * window.innerWidth) / 100;
      const totalMargin = itemMarginInPixels * 2 * parsedItemsPerSlide;
      setWidth(calculatedWidth - totalMargin);
      setTranslateValue(0);
      setCurrentIndex(0);
    };
    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, [setWidth, itemMarginInPixels, parsedItemsPerSlide]);

  // Wrapper Reference to get the width of the wrapper div to calculate the
  // translate value when the parsedItemsPerSlide is 1.
  const slideWrapperEl = useRef(null);
  const sliderWrapperWidth = () => {
    if (slideWrapperEl && slideWrapperEl.current) {
      return slideWrapperEl.current.clientWidth;
    }

    return 0;
  };

  //This will set the index of the slide when itemTranslationCount is equal to parsedItemsPerSlide
  // else calculates the translate value based on the width of each item.
  const setCurrentSlideIndex = (index, slideDirection) => {
    if (itemTranslationCount === parsedItemsPerSlide) {
      if (index === calcSlidesCount) {
        index = 0;
        setCurrentIndex(0);
        setTranslateValue(0);
      } else if (index > currentIndex) {
        const indexDifference = index - currentIndex;
        setCurrentIndex(index);
        setTranslateValue(translateValue + -(sliderWrapperWidth() * indexDifference));
      } else if (index < currentIndex) {
        const indexDifference = currentIndex - index;
        setCurrentIndex(index);
        setTranslateValue(translateValue + sliderWrapperWidth() * indexDifference);
      }
    } else {
      const maxTranslate =
        (parsedItemWidth + itemMarginInPixels * 2) *
        itemTranslationCount *
        Math.ceil((slides.length - parsedItemsPerSlide) / itemTranslationCount);

      if (slideDirection === 'next') {
        const translateSlideBy = translateValue + -((parsedItemWidth + itemMarginInPixels * 2) * itemTranslationCount);
        if (translateSlideBy < -maxTranslate) {
          setTranslateValue(0);
        } else {
          setTranslateValue(translateSlideBy);
        }
      }
      if (slideDirection === 'prev') {
        const translateSlideBy = translateValue + (parsedItemWidth + itemMarginInPixels * 2) * itemTranslationCount;
        if (translateSlideBy > 0) {
          setTranslateValue(-maxTranslate);
        } else {
          setTranslateValue(translateSlideBy);
        }
      }
    }
  };

  //Style which sets the width of the div based on the available window size.
  const sliderStyle = {
    flexDirection: 'row',
    maxWidth: parsedItemWidth !== undefined ? `${width + itemMarginInPixels * 2 * parsedItemsPerSlide}px` : '100%',
    minWidth: parsedItemWidth !== undefined ? `${width + itemMarginInPixels * 2 * parsedItemsPerSlide}px` : '100%'
  };

  const isDisplayArrowIndicator = slides.length > parsedItemsPerSlide ? 'visible' : 'hidden';

  //Style set for each thumbnail and margin between thumbnails based on the window size.
  const contentStyle = {
    minWidth: parsedItemsPerSlide > 1 ? `${parsedItemWidth}px` : '100%',
    height: '100%',
    maxWidth: parsedItemsPerSlide > 1 ? `${parsedItemWidth}px` : '100%',
    marginRight: parsedItemsPerSlide > 1 ? '8px' : 'unset',
    marginLeft: parsedItemsPerSlide > 1 ? '8px' : 'unset'
  };

  const wrapperStyle = {
    width: slides.length > 1 ? 'auto' : '100%'
  };

  let touchstartX = 0;
  let touchendX = 0;

  // Click handler for next slide button.
  const handleNextSlide = () => {
    const lastIndex = calcSlidesCount - 1;
    const shouldResetIndex = currentIndex === lastIndex;
    const index = shouldResetIndex ? 0 : currentIndex + 1;

    setCurrentSlideIndex(index, 'next');
  };

  // Click handler for previous slide button.
  const handlePreviousSlide = () => {
    const lastIndex = calcSlidesCount - 1;
    const shouldResetIndex = currentIndex === 0;
    const index = shouldResetIndex ? lastIndex : currentIndex - 1;

    setCurrentSlideIndex(index, 'prev');
  };

  const handleGesture = () => {
    if (touchendX < touchstartX) {
      handleNextSlide();
    }

    if (touchendX > touchstartX) {
      handlePreviousSlide();
    }
  };

  const handleTouchStart = event => {
    touchstartX = event.changedTouches[0].screenX;
  };

  const handleTouchEnd = event => {
    touchendX = event.changedTouches[0].screenX;
    handleGesture();
  };

  const handleMouseOver = () => {
    setAutoSlide(false);
  };

  const handleMouseLeave = () => {
    if (isAutoSlide) {
      setAutoSlide(true);
    }
  };

  const getSlideInterval = () => {
    if (!isNaN(autoSlideInterval) && autoSlideInterval > 0) {
      return parseInt(autoSlideInterval, 10) * 1000;
    }

    return DEFAULT_SLIDE_INTERVAL;
  };

  useEffect(() => {
    let intervalTimer;

    if (autoSlide) {
      intervalTimer = setInterval(() => {
        handleNextSlide();
      }, getSlideInterval());
    }

    return () => {
      if (autoSlide && intervalTimer) {
        clearInterval(intervalTimer);
      }
    };
  });

  return (
    <Styled id="GenericCarouselSlider" css={css}>
      <div className="GenericCarouselSlider" style={sliderStyle}>
        {width > 0 && (
          <div className="GenericCarouselSlider__WrapperSection" style={wrapperStyle}>
            {parsedItemsPerSlide < slides.length && (
              <div
                className="GenericCarouselSlider__Button"
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
                onFocus={handleMouseOver}
                onBlur={handleMouseLeave}
              >
                <button
                  type="button"
                  style={{
                    visibility: isDisplayArrowIndicator
                  }}
                  onClick={() => handlePreviousSlide()}
                  aria-label="CarouselBack"
                  className="GenericCarouselSlider__BackButton"
                >
                  <AngleLeftIcon className="GenericCarouselSlider__LeftRightButton" />
                </button>
              </div>
            )}
            <div
              className="GenericCarouselSlider__Wrapper"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
              onFocus={handleMouseOver}
              onBlur={handleMouseLeave}
              style={{transform: `translateX(${translateValue}px)`}}
              ref={slideWrapperEl}
            >
              {slides.map((slide, index) => {
                const key = `${slide}_${index}`;

                return (
                  <span key={key} className="GenericCarouselSlider__Content" style={contentStyle}>
                    {slide}
                  </span>
                );
              })}
            </div>

            {/* Back and forward Buttons to navigate the carousel slides */}

            {parsedItemsPerSlide < slides.length && (
              <div
                className="GenericCarouselSlider__Button"
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
                onFocus={handleMouseOver}
                onBlur={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => handleNextSlide()}
                  style={{visibility: isDisplayArrowIndicator}}
                  aria-label="CarouselForward"
                  className="GenericCarouselSlider__ForwardButton"
                >
                  <AngleRightIcon className="GenericCarouselSlider__LeftRightButton" />
                </button>
              </div>
            )}

            {isDisplayDotIndicator && slideWrapperEl && (
              <div
                className="GenericCarouselSlider__IndicatorSection"
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
                onFocus={handleMouseOver}
                onBlur={handleMouseLeave}
                style={{
                  width:
                    parsedItemWidth !== undefined ? `${width + itemMarginInPixels * 2 * parsedItemsPerSlide}px` : '100%'
                }}
              >
                <GenericSliderControls
                  slidesCount={calcSlidesCount}
                  currentIndex={currentIndex}
                  setCurrentSlideIndex={setCurrentSlideIndex}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </Styled>
  );
};
export default GenericCarouselSlider;
