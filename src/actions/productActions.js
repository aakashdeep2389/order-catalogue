import { FETCH_PRODUCTS } from "../types";
import { FILTER_PRODUCTS_BY_BRAND, ORDER_PRODUCTS_BY_PRICE } from "../types";
import ProductList from '../data.json'

export const fetchProducts = () => async (dispatch) => {
  // const res = await fetch("/api/products");
  const data = ProductList?.products;
  console.log(ProductList, 'ProductListProductList')
  console.log(data);
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data,
  });
};

export const filterProducts = (products, brand) => (dispatch) => {
  console.log(products, 'aproductsproductsproducts')
  dispatch({
    type: FILTER_PRODUCTS_BY_BRAND,
    payload: {
      brand: brand,
      items:
        brand === ""
          ? products
          : products.filter((x) => x.availableSizes.indexOf(brand) >= 0),
    },
  });
};

export const sortProducts = (products, categ) => (dispatch) => {
  console.log({ products, categ }, '1a21s2a1s32a1sd')
  dispatch({
    type: FILTER_PRODUCTS_BY_BRAND,
    payload: {
      size: categ,
      items:
        categ == ""
          ? products
          : products.filter((x) => x.category.toLowerCase().indexOf(categ.toLowerCase()) >= 0),
    },
  });
};

export const searchProduct = (searchval) => (dispatch) => {

}