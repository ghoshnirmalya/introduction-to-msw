import React, { useState } from "react";
import {
  Stack,
  Box,
  Icon,
  Flex,
  Text,
  Input,
  Button,
  Avatar,
} from "@chakra-ui/core";

const Home = ({ users = [] }) => {
  const [messages, setMessages] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [fetchingMessages, setFetchingMessages] = useState(false);
  const [savingMessage, setSavingMessage] = useState(false);
  const [message, setMessage] = useState("");

  const handleFetchMessages = async (userId) => {
    // 1. Set the fetching state to 'true' to show a spinner
    // 2. Store the current user's id in the state
    // 3. Fetch all the mock messages
    // 4. Store the messages in the state
    // 5. Set the fetching state to 'false' to remove the spinner

    setFetchingMessages(true);
    setCurrentUserId(userId);

    const response = await fetch(`users/${userId}/messages`);
    const messages = await response.json();

    setMessages(messages);
    setFetchingMessages(false);
  };

  const handleSaveMessage = async () => {
    // 1. Set the saving state to 'true' to show a spinner
    // 2. Do an API call to save the new message
    // 3. Add the new message from the response into the messages state
    // 4. Set the state of the current message to empty
    // 5. Set the saving state to 'false' to remove the spinner

    setSavingMessage(true);

    // A better approach will be to do this API call inside a try...catch block
    // in order to handle any error state as well. The code will be something
    // like the following:
    // let data
    // try {
    //   const response = await fetch(`users/${currentUserId}/messages`, {
    //     method: "POST",
    //     body: JSON.stringify({
    //       message,
    //     }),
    //   });
    //   data = await response.json();
    // } catch (error) {
    //   Store the error in the state and render on the browser
    // }

    const response = await fetch(`users/${currentUserId}/messages`, {
      method: "POST",
      body: JSON.stringify({
        message,
      }),
    });
    const data = await response.json();

    setMessages(messages.concat(data));
    setMessage("");
    setSavingMessage(false);
  };

  const usersNode = () => {
    // This function is responsible for rendering a list of users

    if (!users.length) {
      return <>No users found</>;
    }

    return (
      <Stack spacing={0}>
        {users.map((user) => {
          return (
            <Box
              key={user.id}
              p={4}
              onClick={() => handleFetchMessages(user.id)}
              role="button"
              borderBottomWidth={1}
            >
              <Stack isInline spacing={4} alignItems="center">
                <Avatar name={user.first_name} src={user.avatar} size="sm" />
                <Text fontSize="md">
                  {user.first_name} {user.last_name}
                </Text>
              </Stack>
            </Box>
          );
        })}
      </Stack>
    );
  };

  const messagesNode = () => {
    // This function is responsible for rendering a list of messages

    if (fetchingMessages) {
      return (
        <Flex h="100vh" justifyContent="center" alignItems="center">
          <Stack alignItems="center">
            <Icon name="spinner" size="32px" />
            <Text fontSize="md">Fetching messages</Text>
          </Stack>
        </Flex>
      );
    }

    if (!messages.length) {
      return (
        <Flex h="80vh" justifyContent="center" alignItems="center">
          <Stack alignItems="center">
            <Icon name="warning-2" size="32px" />
            <Text fontSize="md">
              Please click on any items from the left sidebar
            </Text>
          </Stack>
        </Flex>
      );
    }

    return (
      <Box minH="calc(80vh - 90px)">
        <Stack spacing={4} m={4}>
          {messages.map((message) => {
            return (
              <Box key={message.id} p={4} bg="white" rounded="md" shadow="sm">
                {message.message}
              </Box>
            );
          })}
        </Stack>
      </Box>
    );
  };

  const inputNode = () => {
    // This function is responsible for rendering a form for submititng the new
    // message

    if (!messages.length) {
      return false;
    }

    return (
      <Box p={4} borderTopWidth={1} pos="relative" shadow="sm" bg="white">
        <Stack spacing={4} isInline>
          <Input
            placeholder="What's happening?"
            isDisabled={savingMessage}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            rightIcon="arrow-forward"
            variantColor="purple"
            onClick={handleSaveMessage}
            isDisabled={!message.trim()}
            isLoading={savingMessage}
          >
            Send
          </Button>
        </Stack>
      </Box>
    );
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      h="100vh"
      w="100vw"
      fontSize="sm"
      bg="purple.900"
    >
      <Stack
        isInline
        h="80vh"
        w="80vw"
        borderWidth={1}
        rounded="md"
        bg="white"
        shadow="xl"
        spacing={0}
      >
        <Box
          w="30%"
          overflowY="scroll"
          borderRightWidth={1}
          pos="relative"
          shadow="sm"
        >
          {usersNode()}
        </Box>
        <Box w="70%" overflowY="scroll" bg="gray.100">
          <Stack spacing={4}>
            {messagesNode()}
            {inputNode()}
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export async function getServerSideProps() {
  const response = await fetch("https://backend.dev/users");
  const users = await response.json();

  return {
    props: {
      users,
    },
  };
}

export default Home;
