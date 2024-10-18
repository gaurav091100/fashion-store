import { Select, Text } from "@chakra-ui/react";

const SortingPanel = () => {
  return (
    <>
      <Text>Sort By:</Text>
      <Select placeholder="Select option" w="50%" size="sm" variant="filled">
        <option value="manual">Featured</option>
        <option value="best-selling">Best Selling</option>
        <option value="title-asc">Title, A-Z</option>
        <option value="title-desc">Title, Z-A</option>
        <option value="price-asc">Price, low to high</option>
        <option value="price-desc">Price, high to low</option>
        <option value="created-asc">Date, old to new</option>
        <option value="created-desc">Date, new to old</option>
      </Select>
    </>
  );
};

export default SortingPanel;
