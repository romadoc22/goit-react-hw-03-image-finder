import { Rings } from 'react-loader-spinner';

import { createPortal } from 'react-dom';

import { LoaderContainer } from './Loader.styled';

const loaderRoot = document.querySelector('#loader-root');

const Loader = () => {
  return createPortal(
    <LoaderContainer>
      <Rings
        height="160"
        width="160"
        color="#4236ee"
        radius="6"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="rings-loading"
      />
    </LoaderContainer>,
    loaderRoot
  );
};

export default Loader;
