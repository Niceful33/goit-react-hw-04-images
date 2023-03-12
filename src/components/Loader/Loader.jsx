import React from 'react';
import css from './Loader.module.css';
import { ThreeDots } from 'react-loader-spinner';

const Loader = () => (
  <div className={css.LoaderOverlay}>
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="#3f51b5"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
  </div>
);

export default Loader;
