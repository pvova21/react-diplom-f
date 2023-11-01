import {
  FETCH_BESTSALES_REQUEST,
  FETCH_BESTSALES_FAILURE,
  FETCH_BESTSALES_SUCCESS,

  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORIES_SUCCESS,

  FETCH_DATA_CATEGORIES_REQUEST,
  FETCH_DATA_CATEGORIES_FAILURE,
  FETCH_DATA_CATEGORIES_SUCCESS,

  FIND_GOODS
} from './actionTypes';

export const findGoods = (text) => ({
  type: FIND_GOODS,
  payload: {
    text
  }
});

export const fetchServicesRequest = () => ({
  type: FETCH_BESTSALES_REQUEST,
});

export const fetchServicesFailure = (error) => ({
  type: FETCH_BESTSALES_FAILURE,
  payload: {
    error,
  },
});

export const fetchServicesSuccess = (items) => ({
  type: FETCH_BESTSALES_SUCCESS,
  payload: {
    items,
  },
});

export const fetchCategoriesRequest = () => ({
  type: FETCH_CATEGORIES_REQUEST,
});

export const fetchCategoriesFailure = (error) => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: {
    error,
  },
});

export const fetchCategoriesSuccess = (items) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: {
    items,
  },
});

export const fetchDataCategoriesRequest = () => ({
  type: FETCH_DATA_CATEGORIES_REQUEST,
});

export const fetchDataCategoriesFailure = (error) => ({
  type: FETCH_DATA_CATEGORIES_FAILURE,
  payload: {
    error,
  },
});

export const fetchDataCategoriesSuccess = (data, text = null) => ({
  type: FETCH_DATA_CATEGORIES_SUCCESS,
  payload: {
    data,
    text,
  },
});

export const fetchBestSales = () => async (dispatch) => {
  dispatch(fetchServicesRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_BESTSALES_URL}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(fetchServicesSuccess(data));
  } catch (error) {
    dispatch(fetchServicesFailure(error.message));
  }
};

export const fetchCategories = () => async (dispatch) => {
  dispatch(fetchCategoriesRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_CATEGORIES_URL}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(fetchCategoriesSuccess(data));
  } catch (error) {
    dispatch(fetchCategoriesFailure(error.message));
  }
};

export const fetchDataCategories = (id = null, offset = null, text = null) => async (dispatch) => {
  dispatch(fetchDataCategoriesRequest());
  let url = process.env.REACT_APP_DATA_CATEGORIES_URL;

  if (id) {
    url += `?categoryId=${id}`;
    if (text) {
      url += `&q=${text}`;
    }
  } else if (text) {
    url += `?q=${text}`;
  }

  if (offset) {
    url += offset;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(fetchDataCategoriesSuccess(data, text));
  } catch (error) {
    dispatch(fetchDataCategoriesFailure(error.message));
  }
};

export const searchGoods = (text) => async (dispatch) => {
  dispatch(findGoods(text));
  try {
    const response = await fetch(`${process.env.REACT_APP_FIND_GOODS_URL}${text}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(fetchDataCategoriesSuccess(data));
  } catch (error) {
    dispatch(fetchDataCategoriesFailure(error.message));
  }
};

export const fetchDataProduct = (id) => async (dispatch) => {
  dispatch(fetchDataCategoriesRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_DATA_CATEGORIES_URL}/${id}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(fetchDataCategoriesSuccess(data));
  } catch (error) {
    dispatch(fetchDataCategoriesFailure(error.message));
  }
};
