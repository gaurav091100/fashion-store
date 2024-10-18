import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserDetails, updateUser } from "../../../redux/users/action";
import { UPDATE_USER_RESET } from "../../../redux/users/actionTypes";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Select,
} from "@chakra-ui/react";
import Loader from "../../Loader";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, user } = useSelector((state) => state.userDetails);

  const {
    isLoading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.user);

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { id: userId } = useParams();

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setFirstName(user.firstName);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      toast.error(error);
    }

    if (updateError) {
      toast.error(updateError);
    }

    if (isUpdated) {
      toast.success(
        `${firstName.charAt(0).toUpperCase() + firstName.slice(1)} is Now an ${
          role.charAt(0).toUpperCase() + role.slice(1)
        }`
      );
      navigate("/admin/users");
      setFirstName("");
      setEmail("");
      setRole("");

      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [
    dispatch,
    error,
    isUpdated,
    navigate,
    firstName,
    role,
    updateError,
    user,
    userId,
  ]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(updateUser(userId, { firstName, email, role }));
  };

  return (
    <Box bgColor="#f5f5f7">
      {/* <MetaData title="Update User" /> */}
      <Heading w="100%" fontWeight={600} textAlign="center" size="lg" py="20px">
        Update User
      </Heading>
      <Flex justifyContent="center" align="center">
        {isLoading ? (
          <Loader heightProps="400px" widthProps="400px" />
        ) : (
          <form
            style={{
              width: "400px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              margin: "40px 0",
              background: "#fff",
              padding: "40px 20px",
            }}
            onSubmit={updateUserSubmitHandler}
          >
            <FormControl>
              <Input
                type="text"
                placeholder="Name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormControl>

            <FormControl>
              {/* <MailOutlineIcon /> */}
              <Input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl>
              {/* <VerifiedUserIcon /> */}
              <Select
                variant="filled"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Choose Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Select>
            </FormControl>

            <Button
              colorScheme="#000"
              bgColor="#000"
              _hover={{ bgColor: "#e3ae52", color: "#000" }}
              type="submit"
              isDisabled={
                updateLoading ? true : false || role === "" ? true : false
              }
            >
              Update
            </Button>
          </form>
        )}
      </Flex>
    </Box>
  );
};

export default UpdateUser;
