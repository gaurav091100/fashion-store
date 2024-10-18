import React, { useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers } from "../redux/users/action";
import { DELETE_USER_RESET } from "../redux/users/actionTypes";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import UserTable from "../components/Admin/Users/UserTable";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { isLoading, users, error } = useSelector((state) => state.allUsers);
  console.log(users);

  const {
    error: deleteError,
    isLoading: loading,
    isDeleted,
    message,
  } = useSelector((state) => state.user);

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isDeleted) {
      toast.success(message);
      dispatch({ type: DELETE_USER_RESET });
    }
    if (deleteError) {
      toast.error("Something Went Wrong.");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [error, dispatch, deleteError, isDeleted, message]);
  return (
    <Box>
      <Heading w="100%" textAlign={"center"} fontWeight={600} my="20px">
        All Users
      </Heading>

      {isLoading ? (
        users.map((item) => {
          return (
            <Box key={item._id} my="10px">
              <Loader heightProps="40px" widthProps={"100vw"} />
            </Box>
          );
        })
      ) : (
        <UserTable
          loading={loading}
          users={users}
          handleDeleteUser={handleDeleteUser}
        />
      )}
    </Box>
  );
};

export default AllUsers;
