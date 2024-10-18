import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Center,
} from "@chakra-ui/react";
import React from "react";

const BreadCrumb = ({ title }) => {
  return (
    <>
      <Center py="20px" bgColor="#fff">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="#" isCurrentPage>
              {title}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Center>
    </>
  );
};

export default BreadCrumb;
