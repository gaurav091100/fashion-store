import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProctectedRoute = ({ isAdmin, children }) => {
  const { isLoading, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );
  //   console.log(user);
  //   console.log(isAdmin);

  console.log({ isAuthenticated, isAdmin, user: user?.role });

  return (
    <>
      {isLoading === false &&
      isAuthenticated &&
      isAdmin === true &&
      user?.role === "admin" ? (
        children
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
  // MdOutlineAssignmentReturn;
};

export default AdminProctectedRoute;
