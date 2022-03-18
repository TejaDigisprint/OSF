/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';

/**
 * GenericSliderControls is a component used to display the dot indicators.
 */
const GenericSliderControls = props => {
  const {currentIndex, setCurrentSlideIndex, slidesCount} = props;

  const indicator = [];

  for (let indicatorIndex = 0; indicatorIndex < slidesCount; indicatorIndex++) {
    indicator.push(
      <li key={indicatorIndex + 1}>
        <button
          className="GenericSliderControls__SliderIndicatorButton"
          aria-label={`indicator-${indicatorIndex + 1}`}
          aria-pressed={indicatorIndex === currentIndex}
          onClick={() => setCurrentSlideIndex(indicatorIndex)}
          type="button"
        ></button>
      </li>
    );
  }

  return (
    <Styled id="GenericSliderControls__SliderControls" css={css}>
      <div className="GenericSliderControls__SliderControls">
        {slidesCount > 1 && <ul className="GenericSliderControls__SliderIndicators">{indicator}</ul>}
      </div>
    </Styled>
  );
};

export default GenericSliderControls;
