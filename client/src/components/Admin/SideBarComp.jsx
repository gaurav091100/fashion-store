import React from "react";
import {
  MdAdd,
  MdDashboard,
  MdGroups,
  MdOutlineExpandMore,
  MdOutlineFactCheck,
  MdReviews,
  MdViewList,
  MdMenu,
} from "react-icons/md";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";

const SideBarComp = () => {
  const { collapseSidebar } = useProSidebar();

  //   const [isExpanded, setIsExpanded] = useState(true);
  //   function handleToggle() {
  //     if (isCollapsed) {
  //       collapseSidebar(false);
  //       setIsExpanded(true);
  //     } else {
  //       collapseSidebar(true);
  //       setIsExpanded(false);
  //     }
  //   }
  return (
    <>
      <Sidebar
        // breakPoint="sm"
        // #232f3e
        defaultCollapsed={true}
        // collapsed={!isExpanded}
        backgroundColor="#000"
        style={{
          color: "gray",
          minHeight: "auto",
          height: "100%",
          position: "absolute",
          left: "0px",
          top: "0px",
        }}
      >
        <Menu>
          {/* <MenuItem
          icon={<M />}
          onClick={() => collapseSidebar()}
          // component={<Link to="/admin/dashboard" />}
        >
          open
        </MenuItem> */}
          {/* <button onClick={() => collapseSidebar()}>open</button> */}
          <Box display={{ base: "none", sm: "none", md: "block", lg: "block" }}>
            <MenuItem
              icon={<MdMenu />}
              onClick={() => {
                collapseSidebar();
              }}
              style={{ textAlign: "center" }}
            >
              {" "}
            </MenuItem>
          </Box>
          <MenuItem
            icon={<MdDashboard />}
            component={<Link to="/admin/dashboard" />}
          >
            Dashboard
          </MenuItem>
          <SubMenu label="Products" icon={<MdOutlineExpandMore />}>
            <MenuItem
              icon={<MdViewList />}
              component={<Link to="/admin/products" />}
            >
              All
            </MenuItem>
            <MenuItem
              icon={<MdAdd />}
              component={<Link to="/admin/product/add" />}
            >
              Add New Product
            </MenuItem>
          </SubMenu>
          <MenuItem
            icon={<MdOutlineFactCheck />}
            component={<Link to="/admin/orders" />}
          >
            Orders
          </MenuItem>
          <MenuItem icon={<MdGroups />} component={<Link to="/admin/users" />}>
            Users
          </MenuItem>
          <MenuItem
            icon={<MdReviews />}
            component={<Link to="/admin/reviews" />}
          >
            Reviews
          </MenuItem>
          {/* MdViewList */}
        </Menu>
      </Sidebar>
    </>
  );
};

export default SideBarComp;
