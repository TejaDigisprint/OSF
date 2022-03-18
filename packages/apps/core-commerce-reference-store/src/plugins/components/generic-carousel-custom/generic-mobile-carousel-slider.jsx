/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import React, {useEffect, useRef, useState} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import GenericSliderControls from './generic-slider-controls';
import css from './styles.css';

const DEFAULT_SLIDE_INTERVAL = 3000;
/**
 * GenericMobileCarouselSlider is a component used to display the input slides in a carousel in mobile view.
 */
const GenericMobileCarouselSlider = props => {
  // variables
  let touchstartX = 0;
  let touchendX = 0;

  const {slides = [], showIndicator, itemsPerSlideMobile, isAutoSlide, autoSlideInterval} = props;

  // state
  const [translateValue, setTranslateValue] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  //Parsed value of itemsPerSlideMobile, if a not a number is passed then it is set to 1
  const parsedItemsPerSlide = parseInt(itemsPerSlideMobile, 10) || 1;

  const slideWrapperEl = useRef(null);
  const sliderWrapperWidth = () => (slideWrapperEl.current ? slideWrapperEl.current.clientWidth : 0);

  const maxSlideIndex =
    parsedItemsPerSlide > 1 ? Math.ceil(slides.length / parsedItemsPerSlide) - 1 : slides.length - 1;

  useEffect(() => {
    setTranslateValue(0);
    setCurrentIndex(0);
  }, [slides]);

  /**
   * Set the current index selected in the carousel
   * @param  {Number} index
   */
  const setCurrentSlideIndex = index => {
    if (index > maxSlideIndex) {
      setCurrentIndex(0);
      setTranslateValue(0);
    } else if (index > currentIndex && index <= maxSlideIndex) {
      const indexDifference = index - currentIndex;
      setCurrentIndex(index);
      setTranslateValue(translateValue + -(sliderWrapperWidth() * indexDifference));
    } else if (index < currentIndex) {
      const indexDifference = currentIndex - index;
      setCurrentIndex(index);
      setTranslateValue(translateValue + sliderWrapperWidth() * indexDifference);
    }
  };

  const handleGesture = () => {
    if (touchendX < touchstartX) {
      setCurrentSlideIndex(currentIndex + 1 > maxSlideIndex ? 0 : currentIndex + 1);
    }

    if (touchendX > touchstartX) {
      setCurrentSlideIndex(currentIndex - 1 < 0 ? maxSlideIndex : currentIndex - 1);
    }
  };
  /**
   * Handle touch start
   * @param  {Event} event
   */
  const handleTouchStart = event => {
    touchstartX = event.changedTouches[0].screenX;
  };

  const handleTouchEnd = event => {
    touchendX = event.changedTouches[0].screenX;
    handleGesture();
  };

  const getSlideInterval = () => {
    if (!isNaN(autoSlideInterval) && autoSlideInterval > 0) {
      return parseInt(autoSlideInterval, 10) * 1000;
    }

    return DEFAULT_SLIDE_INTERVAL;
  };
  useEffect(() => {
    let intervalTimer;

    if (isAutoSlide) {
      intervalTimer = setInterval(() => {
        setCurrentSlideIndex(currentIndex + 1);
      }, getSlideInterval());
    }

    return () => {
      if (isAutoSlide && intervalTimer) {
        clearInterval(intervalTimer);
      }
    };
  });

  const widthForMultiItems = {
    marginRight: `calc(1%)`,
    width: `calc(${100 - parsedItemsPerSlide}%/${parsedItemsPerSlide} )`
  };

  const widthForSingleItem = {
    width: '100%'
  };

  return (
    <Styled id="GenericMobileCarouselSlider__Slider" css={css}>
      <div className="GenericMobileCarouselSlider">
        <div className="GenericMobileCarouselSlider__Slider">
          <div
            className="GenericMobileCarouselSlider__SliderWrapper"
            style={{transform: `translateX(${translateValue}px)`}}
            ref={slideWrapperEl}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {slides.map((slide, index) => {
              const imgKey = `${slide}_${index}`;

              return (
                <div
                  key={imgKey}
                  className="GenericMobileCarouselSlider__Slide"
                  style={parsedItemsPerSlide > 1 ? widthForMultiItems : widthForSingleItem}
                >
                  {slide}
                </div>
              );
            })}
          </div>
          {showIndicator && (
            <GenericSliderControls
              slidesCount={Math.ceil(slides.length / parsedItemsPerSlide)}
              currentIndex={currentIndex}
              setCurrentSlideIndex={setCurrentSlideIndex}
            />
          )}
        </div>
      </div>
    </Styled>
  );
};

export default GenericMobileCarouselSlider;
