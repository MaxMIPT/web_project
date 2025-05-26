import { Outlet } from "react-router-dom";
import { Box, Container } from "@chakra-ui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout({ onOpenCreate }) {
  return (
    <>
      <Header onOpenCreate={onOpenCreate} />
      <Box as="header" position="sticky" top="90px" zIndex="sticky" py={4}>
        <Container maxW="container.lg" px={4}></Container>
      </Box>

      <Box minHeight="calc(100vh - 120px)" pb="60px">
        <Container maxW="container.lg" py={4}>
          <Outlet />
        </Container>
      </Box>

      <Footer />
    </>
  );
}
