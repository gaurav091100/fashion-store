import React from "react";

import {
  
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
 
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import { AiOutlineHome, AiOutlinePhone } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { City, Country, State } from "country-state-city";

const ShippingAddress = ({ userInput, setUserInput }) => {
  // const [show, setShow] = React.useState(false);

  console.log(userInput);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };
  // const handleClick = () => setShow(!show);
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Shipping Address
      </Heading>
      <Flex>
        <FormControl mr="5%">
          <FormLabel fontWeight={"normal"}>Address</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<AiOutlineHome color="gray.300" />}
            />
            <Input
              type="text"
              placeholder="Enter Address"
              name="address"
              value={userInput.address}
              onChange={handleChange}
              required
            />
          </InputGroup>
        </FormControl>

        <FormControl>
          <FormLabel fontWeight={"normal"}>Country</FormLabel>
          <Select
            variant="flushed"
            placeholder="Select Country"
            name="country"
            onChange={handleChange}
            value={userInput.country}
            required
          >
            {Country.getAllCountries().map((country) => (
              <option key={country.isoCode} value={country.isoCode}>
                {country.name}
              </option>
            ))}
          </Select>
        </FormControl>

        {userInput.country && (
          <FormControl>
            <FormLabel fontWeight={"normal"}>State</FormLabel>
            <Select
              variant="flushed"
              placeholder="Select State"
              name="state"
              onChange={handleChange}
              value={userInput.state}
              required
            >
              {State &&
                State.getStatesOfCountry(userInput.country).map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
            </Select>
          </FormControl>
        )}
        {userInput.state && (
          <FormControl>
            <FormLabel fontWeight={"normal"}>City</FormLabel>
            <Select
              variant="flushed"
              placeholder="Select City"
              name="city"
              onChange={handleChange}
              value={userInput.city}
              required
            >
              {City &&
                City.getCitiesOfState(userInput.country, userInput.state).map(
                  (city) => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  )
                )}
            </Select>
          </FormControl>
        )}
      </Flex>
      <FormControl mr="5%">
        <FormLabel fontWeight={"normal"}>Pincode</FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<IoLocationOutline color="gray.300" />}
          />
          <Input
            type="number"
            placeholder="Enter Pincode"
            name="pincode"
            value={userInput.pincode}
            onChange={handleChange}
            required
          />
        </InputGroup>
      </FormControl>
      <FormControl mr="5%">
        <FormLabel fontWeight={"normal"}>Phone No.</FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<AiOutlinePhone color="gray.300" />}
          />
          <Input
            type="number"
            placeholder="Enter Phone No."
            name="phone"
            value={userInput.phone}
            onChange={handleChange}
            required
          />
        </InputGroup>
      </FormControl>
    </>
  );
};

export default ShippingAddress;
