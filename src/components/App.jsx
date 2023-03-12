import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import css from '../components/Modal/Modal.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [searchedName, setSearchedName] = useState(() => '');
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noData, setNoData] = useState(false);
  const [noNewData, setNoNewData] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [activeImgIdx, setActiveImgIdx] = useState(null);
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '30800366-aecfdce11bab1e79da5c222a8';

  const reset = () => {
    setData(null);
    setNoData(false);
    setNoNewData(false);
  };

  const formSubmitHandler = searchedName => {
    reset();
    setSearchedName(searchedName);
  };

  const changePagePagination = () => {
    setPage(page + 1);
  };

  const responceDataInput = responce => {
    if (responce.total < 12 && responce.total > 0) {
      setNoNewData(true);
    }
    if (responce.total === 0) {
      setNoData(true);
    }
    if (responce.total) {
      setData(responce.hits);
      setNoData(false);
    }
  };

  const paginationDataInput = responce => {
    setData(prevData => [...prevData, ...responce.hits]);
    if (responce.total < 12) {
      setNoNewData(true);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const setCurrentImgIdx = idx => {
    console.log(idx);
    setActiveImgIdx(idx);
  };

  useEffect(() => {
    if (searchedName !== '') {
      setLoading(true);
      fetch(
        `${BASE_URL}?q=${searchedName}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(responce => {
          if (responce.ok) {
            return responce.json();
          }

          return Promise.reject(new Error('Something has gone wrong!'));
        })
        .catch(error => setError({ error }))
        .then(data => responceDataInput(data))
        .finally(() => setLoading(false));
    }
  }, [searchedName]);

  useEffect(() => {
    if (searchedName !== '') {
      setLoading(true);
      fetch(
        `${BASE_URL}?q=${searchedName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(responce => {
          if (responce.ok) {
            return responce.json();
          }
          return Promise.reject(new Error('Something has gone wrong!'));
        })
        .catch(error => setError({ error }))
        .then(data => paginationDataInput(data))
        .finally(() => setLoading(false));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      <Searchbar onSubmit={formSubmitHandler} />

      <ImageGallery
        searchedName={searchedName}
        data={data}
        error={error}
        showModal={toggleModal}
        activeIdx={setCurrentImgIdx}
      />
      {noData && (
        <div style={{ fontSize: 24 }}>
          Sorry, no results were found for your request...
        </div>
      )}
      {loading && <Loader />}
      {data && !loading && !noNewData && (
        <Button onClick={changePagePagination} />
      )}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img
            src={data[activeImgIdx].largeImageURL}
            alt={data[activeImgIdx].tags}
            className={css.Modal}
          ></img>
        </Modal>
      )}
      <ToastContainer autoClose={3000} />
    </>
  );
}
