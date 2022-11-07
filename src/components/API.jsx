import axios from 'axios';
import { ToastError } from './Notification/ToastError';

axios.defaults.baseURL = 'https://pixabay.com/api';

export const fetchImages = async (query, currentPage) => {
  try {
    const options = {
      params: {
        q: query,
        page: currentPage,
        key: '29539692-12de6be8def0b7ebbead6ba62',
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
      },
    };
    return (await axios.get('/', options)).data;
  } catch (error) {
    return ToastError('Something wrong. Try again!!!');
  }
};

// export const fetchImages = async (query, page) => {
//   const BASE_URL = 'https://pixabay.com/api/';
//   const KEY = '29539692-12de6be8def0b7ebbead6ba62';
//   const url = `${BASE_URL}?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`;

//   try {
//     const response = await axios.get(url);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// };
