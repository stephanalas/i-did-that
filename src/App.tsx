import { useState } from "react";
import { Flex, Space, Title, Container } from "@mantine/core";
import ProfileForm from "./ProfileForm";
import Notes from "./Notes";
import "./index.css";
import RepoList from "./RepoList";
import { type RepoData } from "./RepoCard";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

// TODO: center loading spinner after subsequent searchs

function App() {
  const [data, setData] = useState<RepoData[] | null>();
  const mutation = useMutation({
    mutationFn: (data: { profile: string }) => {
      return axios.get(`/api/${data.profile}`);
    },
    onSuccess: (response) => {
      console.log("recieved response", response);
      setData(response.data);
    },
    onError: (error) => {
      console.log("was errored", error);
    },
  });

  const handleSubmit = async (values: { profile: string }) => {
    try {
      mutation.mutate(values);
    } catch (error) {
      console.log("caught in try catch block", error);
    }
  };

  return (
    <Container
      fluid
      sx={(theme) => ({
        paddingLeft: 0,
        paddingRight: 0,
        width: "100%",
        height: "100%",
        background: theme.colors.gray[0],
      })}
    >
      <Flex
        id="app-flex-container"
        sx={(theme) => ({
          height: "100%",
          width: "100%",
          background: theme.colors.gray[0],
        })}
        direction="column"
      >
        <Space h="md" />
        {/* typing animation */}
        <Title ta="center">I Did That</Title>
        <Space h="md" />
        <Container fluid h="100vh">
          <Notes />
          <Space h="md" />
          <ProfileForm
            handleSubmit={handleSubmit}
            isLoading={mutation.isLoading}
            clearData={() => setData(null)}
          />
          <Space h="xl" />
          <RepoList repos={data || []} isLoading={mutation.isLoading} />
        </Container>
      </Flex>
    </Container>
  );
}

export default App;
