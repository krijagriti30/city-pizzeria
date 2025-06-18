import React, { useState } from 'react';
import {
  Box, Button, Input, FormControl, FormLabel, Stack,
  Heading, Select, useToast, Switch, Flex, Text
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom'; // ✅ React Router v5 navigation
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; // ✅ make sure the path is correct

const CheckoutForm = () => {
  const toast = useToast();
  const history = useHistory(); // ✅ useHistory for navigation

  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const themeStyles = {
    backgroundColor: darkMode ? '#1a202c' : '#f0f4f8',
    formBg: darkMode ? '#2d3748' : '#ffffff',
    color: darkMode ? '#e2e8f0' : '#1a202c',
    inputBg: darkMode ? '#4a5568' : '#edf2f7',
    borderColor: darkMode ? '#718096' : '#cbd5e0',
    boxShadow: darkMode ? 'dark-lg' : 'xl'
  };

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    paymentMethod: '',
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'orders'), {
        ...formData,
        createdAt: new Date(),
      });

      toast({
        title: 'Order Placed!',
        description: 'Your order has been saved successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      history.push('/order-success'); // ✅ redirect to order success page
    } catch (error) {
      toast({
        title: 'Error placing order',
        description: error.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Box minH="100vh" bg={themeStyles.backgroundColor} color={themeStyles.color} py="10" px="4">
      <Box maxW="600px" mx="auto" bg={themeStyles.formBg} p={8} borderRadius="lg" boxShadow={themeStyles.boxShadow}>
        <Flex justify="space-between" align="center" mb="6">
          <Heading size="lg" color="teal.400">Checkout</Heading>
          <Flex align="center" gap="2">
            <Text>Dark Mode</Text>
            <Switch isChecked={darkMode} onChange={toggleDarkMode} colorScheme="teal" />
          </Flex>
        </Flex>

        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <Heading size="md" color="teal.500" mb={2}>Contact Information</Heading>
            {[
              ['Email', 'email'],
              ['First Name', 'firstName'],
              ['Last Name', 'lastName'],
              ['Phone', 'phone']
            ].map(([label, name]) => (
              <FormControl key={name} isRequired>
                <FormLabel>{label}</FormLabel>
                <Input
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  bg={themeStyles.inputBg}
                  borderColor={themeStyles.borderColor}
                />
              </FormControl>
            ))}

            <Heading size="md" color="teal.500" pt="4" mb={2}>Shipping Address</Heading>
            <FormControl isRequired>
              <FormLabel>Street Address</FormLabel>
              <Input name="address" value={formData.address} onChange={handleChange} bg={themeStyles.inputBg} borderColor={themeStyles.borderColor} />
            </FormControl>

            <FormControl>
              <FormLabel>Apartment / Landmark</FormLabel>
              <Input name="apartment" value={formData.apartment} onChange={handleChange} bg={themeStyles.inputBg} borderColor={themeStyles.borderColor} />
            </FormControl>

            {[
              ['City', 'city'],
              ['State', 'state'],
              ['Pincode', 'pincode']
            ].map(([label, name]) => (
              <FormControl key={name} isRequired>
                <FormLabel>{label}</FormLabel>
                <Input
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  bg={themeStyles.inputBg}
                  borderColor={themeStyles.borderColor}
                />
              </FormControl>
            ))}

            <Heading size="md" color="teal.500" pt="4" mb={2}>Payment Method</Heading>
            <FormControl isRequired>
              <Select
                placeholder="Select Payment Method"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                bg={themeStyles.inputBg}
                borderColor={themeStyles.borderColor}
              >
                <option value="cod">Cash on Delivery</option>
              </Select>
            </FormControl>

            <Button type="submit" colorScheme="teal" size="lg" mt="4" width="full">
              Place Order
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default CheckoutForm;
