import React, { useState } from "react";
import { Box, IconButton, Image, useBreakpointValue } from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";

// Settings for the slider
const settings = {
  dots: true,
  arrows: true,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Carousel = () => {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = useState(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });

  // These are the images used in the slide
  const cards = [
    "https://assets.ajio.com/cms/AJIO/WEB/27022023-UHP-D-MainBanner-P3-ArrowUSPA-upto50.jpg",
    "https://assets.ajio.com/cms/AJIO/WEB/27022023-UHP-D-MainBanner-P4-WomenWestern-LevisUSPA-Min40.jpg",
    "https://assets.ajio.com/cms/AJIO/WEB/27022023-UHP-D-MainBanner-P7-Soigne-RituKumarMasaba-Starting2499.jpg",
    "https://assets.ajio.com/cms/AJIO/WEB/27022023-UHP-D-MainBanner-P5-ComfyBottomwear-IvocGilto-Starting599ExtraUpto35.jpg",
    "https://assets.ajio.com/cms/AJIO/WEB/D-UHP-AppEntryPoint-1440x470.gif",
  ];

  return (
    <Box
      position={"relative"}
      // height={"400px"}
      width={"100%"}
      overflow={"hidden"}
      borderRadius={"3px"}
    >
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        variant="unstyled"
        color="white"
        borderRadius="full"
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt fontSize={"25px"} />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        // colorScheme="messenger"
        variant="unstyled"
        color="white"
        borderRadius="full"
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt fontSize={"25px"} />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((url, index) => (
          // <Box
          //   key={index}
          //   height={"6xl"}
          //   position="relative"
          //   backgroundPosition="center"
          //   backgroundRepeat="no-repeat"
          //   backgroundSize="cover"
          //   backgroundImage={`url(${url})`}
          // />
          <Image key={index} src={url} alt="img-slider" h={"auto"} w={"full"} />
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;
