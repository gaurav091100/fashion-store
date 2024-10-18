import { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NEW_PRODUCT_RESET } from "../../../redux/products/actionTypes";
import { createProduct } from "../../../redux/products/action";

const AddProductForm = () => {
  const [colors, setColors] = useState([{ color: "", images: [], sizes: [] }]);
  const [brand, setBrand] = useState("");
  const [title, setTitle] = useState("");
  const [mrp, setMrp] = useState(0);
  const [offer, setOffer] = useState(0);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [stock, setStock] = useState(1);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isLoading, error, success, message } = useSelector(
    (state) => state.newProduct
  );
  //   console.log(success, message);

  useEffect(() => {
    if (error) {
      alert(error);
    }
    if (success) {
      console.log(success);
      alert(message);

      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, success, message]);
  const handleColorChange = (index, key, value) => {
    const newColors = [...colors];
    newColors[index][key] = value;
    setColors(newColors);
  };

  const handleImageChange = (index, colorIndex, value) => {
    const newColors = [...colors];
    newColors[index].images[colorIndex] = value;
    setColors(newColors);
  };

  const handleSizeChange = (index, colorIndex, value) => {
    const newColors = [...colors];
    newColors[index].sizes[colorIndex] = value;
    setColors(newColors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const productData = {
      colors,
      brand,
      title,
      mrp,
      offer,
      category,
      subCategory,
      stock,
    };
    dispatch(createProduct(productData));
    console.log(productData);
    // TODO: Send data to backend or perform other actions
  };

  const addColor = () => {
    setColors([...colors, { color: "", images: [], sizes: [] }]);
  };

  const removeColor = (index) => {
    const newColors = [...colors];
    newColors.splice(index, 1);
    setColors(newColors);
  };

  return (
    <Box
      //   boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
      w={{ base: "400px", sm: "500px", md: "600px", lg: "700px" }}
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"lg"}
      p={8}
      m={{ base: 4, sm: 8, md: 12, lg: 16 }}
    >
      <form
        onSubmit={handleSubmit}
        // style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
      >
        {colors.map((color, index) => (
          <Box key={index}>
            <FormControl mb={4}>
              <FormLabel>Color {index + 1}</FormLabel>
              <Input
                value={color.color}
                onChange={(event) =>
                  handleColorChange(index, "color", event.target.value)
                }
                placeholder="Enter color"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Images</FormLabel>
              {color.images.map((image, colorIndex) => (
                <Input
                  key={colorIndex}
                  value={image}
                  onChange={(event) =>
                    handleImageChange(index, colorIndex, event.target.value)
                  }
                  placeholder={`Enter image URL for ${color.color}`}
                />
              ))}
            </FormControl>
            <Button
              mb={4}
              variant="outline"
              size={"sm"}
              onClick={() => handleImageChange(index, color.images.length, "")}
            >
              Add image
            </Button>
            <FormControl mb={4}>
              <FormLabel>Sizes</FormLabel>
              {color.sizes.map((size, colorIndex) => (
                <Select
                  key={colorIndex}
                  value={size}
                  onChange={(event) =>
                    handleSizeChange(index, colorIndex, event.target.value)
                  }
                  placeholder={`Select size for ${color.color}`}
                >
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                </Select>
              ))}
            </FormControl>
            <Button
              mb={4}
              size={"sm"}
              onClick={() => handleSizeChange(index, color.sizes.length, "")}
            >
              Add size
            </Button>
            <Button
              mb={4}
              ml={4}
              size={"sm"}
              variant="outline"
              //   bg="navajowhite"
              onClick={() => removeColor(index)}
            >
              Remove color
            </Button>
          </Box>
        ))}
        <Button size={"sm"} variant="outline" mb={4} onClick={addColor}>
          Add color
        </Button>
        <FormControl mb={4}>
          <FormLabel>Brand</FormLabel>
          <Input
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
            placeholder="Enter brand"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Title</FormLabel>
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter title"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>MRP</FormLabel>
          <Input
            type="number"
            value={mrp}
            onChange={(event) => setMrp(event.target.value)}
            placeholder="Enter MRP"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Offer</FormLabel>
          <Input
            type="number"
            value={offer}
            onChange={(event) => setOffer(event.target.value)}
            placeholder="Enter offer"
          />
        </FormControl>
        {/* <FormControl mb={4}>
        <FormLabel>Category</FormLabel>
        <Input
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          placeholder="Enter category"
        />
      </FormControl> */}
        <FormControl mb={4}>
          <FormLabel>Category</FormLabel>
          <Select
            // variant=
            placeholder="Select Category"
            name="category"
            onChange={(event) => setCategory(event.target.value)}
            value={category}
            required
          >
            {/* <option value="">Select</option> */}
            <option value="mens">Mens</option>
            <option value="womens">Womens</option>
            <option value="kids">Kids</option>
          </Select>
        </FormControl>
        {/* <FormControl mb={4}>
        <FormLabel>Sub-category</FormLabel>
        <Input
          value={subCategory}
          onChange={(event) => setSubCategory(event.target.value)}
          placeholder="Enter sub-category"
        />
      </FormControl> */}
        {category && (
          <FormControl mb={4}>
            <FormLabel>Sub Category</FormLabel>
            <Select
              //   variant="flushed"
              placeholder="Select Sub Category"
              name="subCategory"
              value={subCategory}
              onChange={(event) => setSubCategory(event.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="shirt">Shirt</option>
              <option value="tshirt">T-Shirt</option>
              <option value="jeans">Jeans</option>
              <option value="pants">Pants</option>
              <option value="shoes">Shoes</option>
            </Select>
          </FormControl>
        )}
        <FormControl mb={4}>
          <FormLabel>Stock</FormLabel>
          <Input
            type="number"
            value={stock}
            onChange={(event) => setStock(event.target.value)}
            placeholder="Enter stock"
          />
        </FormControl>
        {/* <Button colorScheme="blue" type="submit">
        Submit
      </Button> */}
        <Button
          type="submit"
          bg={"#000"}
          color={"white"}
          _hover={{
            bg: "#e3ae52",
            color: "#000",
          }}
          isLoading={isLoading}
        >
          Add Product
        </Button>
        <Button
          type="submit"
          variant="outline"
          ml={4}
          color="#000"
          _hover={{
            bg: "#e3ae52",
            color: "#000",
          }}
          onClick={() => navigate("/admin/dashboard")}
        >
          Go Back
        </Button>
      </form>
    </Box>
  );
};

export default AddProductForm;
