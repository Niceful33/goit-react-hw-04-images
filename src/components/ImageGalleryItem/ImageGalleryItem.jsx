import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  showModal,
  activeIdx,
  idx,
  tags,
  webformatURL,
}) {
  const setActiveIdx = idx => {
    showModal();
    activeIdx(idx);
  };

  return (
    <li className={css.ImageGalleryItem} onClick={() => setActiveIdx(idx)}>
      <img
        className={css.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  activeIdx: PropTypes.func.isRequired,
  idx: PropTypes.number,
  showModal: PropTypes.func.isRequired,
  webformatURL: PropTypes.string.isRequired,
};
