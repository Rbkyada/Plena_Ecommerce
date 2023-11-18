import axios from 'axios';
import { ApiConfig } from '@ApiConfig/index';

export const getProductList = async (skip: number, limit: number) => {
  const url = `${ApiConfig.productList}?skip=${skip}&limit=${limit}`;
  const response = await axios.get(url);
  return response.data;
};

export const getProductDetail = async (id: string) => {
  const url = `${ApiConfig.productList}/${id}`;
  const response = await axios.get(url);
  return response.data;
};
