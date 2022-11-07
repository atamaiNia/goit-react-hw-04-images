import { RotatingLines } from 'react-loader-spinner';
import { LoaderEl } from './Loader.styled';

const Loader = () => {
  return (
    <LoaderEl>
      <RotatingLines
        strokeColor="#3f51b5"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
      ;
    </LoaderEl>
  );
};

export default Loader;
