import React from 'react';
import css from './styles.css';
// import GenericCarousel from '@oracle-cx-commerce/react-components/generic-carousel';;
import GenericCarousel from '../generic-carousel-custom'
import Styled from '@oracle-cx-commerce/react-components/styled';
import Link from '@oracle-cx-commerce/react-components/link'

// This component displays image carousel with hero images.
const customImageCarousel = props => {
   const {isAutoSlide = false, autoSlideInterval = 3000} = props;

   const imgList = [
    {
      "albumId": 1,
      "id": 1,
      "title": "accusamus beatae ad facilis cum similique qui sunt",
      "url": "/file/general/kidsfashion.jpg",
      "thumbnailUrl": "https://via.placeholder.com/150/92c952",
      "redirectUrl": "/kids-fashion/category/Kids001"
    },
    {
      "albumId": 1,
      "id": 2,
      "title": "reprehenderit est deserunt velit ipsam",
      "url": "/file/general/menswear.jpg",
      "thumbnailUrl": "https://via.placeholder.com/150/771796",
      "redirectUrl": "/mens-fashion/category/coll123"
    },
    {
      "albumId": 1,
      "id": 3,
      "title": "officia porro iure quia iusto qui ipsa ut modi",
      "url": "/file/general/summer.png",
      "thumbnailUrl": "https://via.placeholder.com/150/24f355",
      "redirectUrl": "/womens-fashion/category/coll132"
    },
    {
      "albumId": 1,
      "id": 4,
      "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
      "url":"/file/general/sportswear.jpg",
      "thumbnailUrl": "https://via.placeholder.com/150/d32776",
      "redirectUrl": "/sports/category/coll231"
    }
    
  ]

const slides = [];

  for (let index = 0; index < imgList.length; index++) {
    slides.push(<Link href={imgList[index].redirectUrl}><img width='50%' src={imgList[index].url} /></Link>);
  }


  return (
    <Styled id="ImageCarousel" css={css}>
      {slides.length > 0 && (
        <div className="ImageCarousel">
          <GenericCarousel
            slides={slides}
            isAutoSlide={isAutoSlide}
            autoSlideInterval={autoSlideInterval}
            mobile={false}
            itemsPerSlide={2}
            showIndicator={true}
          />
        </div>
      )}
    </Styled>
  );
};

export default customImageCarousel;
