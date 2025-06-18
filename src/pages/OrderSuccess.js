import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const OrderSuccess = () => {
  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="green.50" p={6}>
      <Box textAlign="center">
        <Heading color="green.500">🎉 Order Placed Successfully!</Heading>
        <Text mt={4}>Thank you for shopping with us. We'll deliver your order soon!</Text>
      </Box>
    </Box>
  );
};

export default OrderSuccess;
