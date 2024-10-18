import { Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { clearErrors, updatePassword } from "../../redux/profile/action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UPDATE_PASSWORD_RESET } from "../../redux/profile/actionTypes";
const UpdatePasswordForm = () => {
  const [userInput, setUserInput] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  //   console.log(userInput);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isUpdated, message, error } = useSelector(
    (store) => store.updatePassword
  );

  const handleUpdatePassword = () => {
    dispatch(updatePassword(userInput));

    // if (!isLoading && isUpdated) {
    //   navigate("/profile");
    // }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success(message);
      navigate("/profile");
    }
    dispatch({ type: UPDATE_PASSWORD_RESET });
  }, [isUpdated, dispatch, navigate, message, error]);
  return (
    <>
      <FormControl isRequired>
        <FormLabel>Old Password</FormLabel>
        <Input
          placeholder="Enter Old Password"
          _placeholder={{ color: "gray.500" }}
          type="password"
          name="oldPassword"
          value={userInput.oldPassword}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>New Password</FormLabel>
        <Input
          placeholder="Enter New Password"
          _placeholder={{ color: "gray.500" }}
          type="password"
          name="newPassword"
          value={userInput.newPassword}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm New Password</FormLabel>
        <Input
          placeholder="Confirm New Password"
          _placeholder={{ color: "gray.500" }}
          type="password"
          name="confirmPassword"
          value={userInput.confirmPassword}
          onChange={handleChange}
        />
      </FormControl>
      <Stack spacing={6}>
        <Button
          bg={"#000"}
          color={"white"}
          _hover={{
            bg: "#e3ae52",
            color: "#000",
          }}
          isLoading={isLoading}
          onClick={handleUpdatePassword}
        >
          Update Password
        </Button>
      </Stack>
    </>
  );
};

export default UpdatePasswordForm;
