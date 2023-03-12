import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export default function ImageGallery({ data, error, showModal, activeIdx }) {
  return (
    <div>
      {error && <h1>{error.message}</h1>}
      {data && (
        <ul className={css.ImageGallery}>
          {data.map((el, idx) => (
            <ImageGalleryItem
              key={el.id}
              webformatURL={el.webformatURL}
              tags={el.tags}
              showModal={showModal}
              idx={idx}
              activeIdx={activeIdx}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

ImageGallery.propTypes = {
  activeIdx: PropTypes.func.isRequired,
  data: PropTypes.array,
  error: PropTypes.string,
  searchedName: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
};
