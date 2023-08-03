import { Paper, Title, Text, List, Flex } from "@mantine/core";

export default function Notes() {
  return (
    <Flex>
      <Paper
        withBorder
        p={"1em"}
        shadow="lg"
        // mah={"10%"}
        sx={(theme) => ({
          background: theme.colors.yellow[0],
        })}
      >
        <Title order={3}>Things to consider...</Title>
        <Text fz="lg">
          The original idea for this application was to get a github profile's
          percentage of the profile's commits relative to the total commits of{" "}
          <span
            style={{
              fontWeight: 700,
            }}
          >
            ANY
          </span>{" "}
          public repo (even if the repo belonged to an organization).
          Immediately, the issue is clear.... that's a lot of data. To keep the
          app useable and prevent exceeding Github API limit here are some
          things to keep in mind.
        </Text>
        <List
          withPadding
          listStyleType="disc"
          pr={"md"}
          sx={{
            paddingTop: ".5em",
          }}
        >
          <List.Item>
            <Text fz="md">
              Only public repositories owned or contributed to by profile will
              be shown (No private or organization repos)
            </Text>
          </List.Item>
          <List.Item>
            <Text fz="md">
              Commits percentage is calculated using the repo's default branch
              (Imagine if it was for every branch &#128514;)
            </Text>
          </List.Item>
          <List.Item>
            <Text>Merged PRs are not included in commit count</Text>
          </List.Item>
          <List.Item>
            <Text fz="md">Results include forked repos</Text>
          </List.Item>
        </List>
      </Paper>
    </Flex>
  );
}
