import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
  Switch,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const tagx = Math.floor(100000 + Math.random() * 900000);
  const [agent, setAgent] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    pic: "",
    isAgent: agent,
    tag: tagx,
  });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const toast = useToast();
  const element = document.getElementById("agent");
  if (element) {
    element.addEventListener("change", (event) => {
      if (event.target.checked) {
        setAgent(true);
      } else {
        setAgent(false);
      }
    });
  }
  const submitHandler = async () => {
    setLoading(true);
    if (!user.name || !user.email || !user.password) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let params = {
        name: user.name,
        email: user.email,
        password: user.password,
        pic: user.pic
          ? user.pic
          : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        isAgent: agent,
        tag: tagx,
      };
      const { data } = await axios.post(
        "https://cswa.onrender.com/api/user",
        params,
        config
      );
      toast({
        title: "Registration successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/queries");
    } catch (error) {
      toast({
        title: "Error Occured",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const handleSignUp = (event) => {
    if (event.key === "Enter") {
      submitHandler();
    }
  };
  function handleChange(event) {
    setUser((prevUserData) => {
      return {
        ...prevUserData,
        [event.target.name]: event.target.value,
      };
    });
  }
  const handleClick = () => {
    setShow(!show);
  };
  return (
    <VStack spacing="5px">
      <FormControl isRequired onKeyDown={handleSignUp}>
        <FormLabel>Name</FormLabel>
        <Input
          id="signUpName"
          placeholder="Enter Your Name"
          onChange={handleChange}
          name="name"
          value={user.name}
          autoComplete="off"
        />
        <FormLabel>Email</FormLabel>
        <Input
          id="signUpEmail"
          placeholder="Enter Your Email"
          onChange={handleChange}
          name="email"
          value={user.email}
          autoComplete="off"
        />
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            id="signUpPassword"
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={handleChange}
            name="password"
            value={user.password}
          />
          <InputRightElement width={"4.5rem"}>
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <FormLabel>Agent account</FormLabel>
        <Switch size="lg" id="agent" />
      </div>
      <FormControl>
        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={submitHandler}
          isLoading={loading}
          bg="#083AA9"
        >
          Sign Up
        </Button>
      </FormControl>
    </VStack>
  );
};

export default SignUp;
