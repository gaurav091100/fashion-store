import React, { useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAdminProducts } from "../redux/products/action";
import ProductItem from "../components/Admin/Products/ProductItem";
import { DELETE_PRODUCT_RESET } from "../redux/products/actionTypes";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { isLoading, products, error } = useSelector((state) => state.products);
  console.log(products);

  const {
    error: deleteError,
    isLoading: loading,
    isDeleted,
    message,
  } = useSelector((state) => state.product);

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (deleteError) {
      toast.error(deleteError);
    }
    if (isDeleted) {
      toast.success(message);
    }
    dispatch({ type: DELETE_PRODUCT_RESET });
    dispatch(getAdminProducts());
  }, [error, dispatch, isDeleted, message, deleteError]);
  return (
    <Box>
      <Heading w="100%" textAlign={"center"} fontWeight={600} my="20px">
        All Products
      </Heading>

      <table className="table">
        <thead>
          <tr>
            <th>PorductID</th>
            <th>Title</th>
            <th>Stock</th>
            <th>Mrp</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? products.map((item) => {
                return (
                  <Box key={item._id} my="10px">
                    <Loader heightProps="40px" widthProps={"100vw"} />
                  </Box>
                );
              })
            : products &&
              products?.map((item) => (
                <ProductItem
                  key={item._id}
                  item={item}
                  loading={loading}
                  handleDeleteProduct={handleDeleteProduct}
                />
              ))}
        </tbody>
      </table>
    </Box>
  );
};

export default AllProducts;
