import { Box, Link, Image, HStack, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      as="footer"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.700"
      px={8}
      py={4}
      color="white"
    >
      <HStack align="center" fontSize="lg" fontWeight="semibold">
        <Link
          href="https://github.com/ForkEyeee"
          isExternal
          display="flex"
          alignItems="center"
          spacing="4px"
          _hover={{ textDecoration: "underline" }}
        >
          <Text>ForkEyeee</Text>
        </Link>
        <Image src="/assets/icons/github.png" alt="github-image" boxSize={8} />
      </HStack>
    </Box>
  );
};

export default Footer;
