import { Paper, Title, Text, Progress, Flex, Box, Badge } from "@mantine/core";

export interface RepoData {
  owner: string;
  repo: string;
  username: string;
  commitsToRepo: number;
  totalCommits: number;
  commitPercentage: number;
  forked: boolean;
}

type RepoCardProps = RepoData;

export default function RepoCard(props: RepoCardProps) {
  let progressColor: string;
  if (props.commitPercentage === 100) progressColor = "green";
  else if (props.commitPercentage < 100 && props.commitPercentage > 50)
    progressColor = "blue";
  else if (props.commitPercentage < 50 && props.commitPercentage > 25)
    progressColor = "yellow";
  else progressColor = "red";

  return (
    <Paper
      withBorder
      sx={(theme) => ({
        background: theme.colors.green[0],
      })}
      p={"xl"}
    >
      <Flex justify="space-between">
        <Title order={3}>{props.repo}</Title>
        {props.commitPercentage > 49 && <Badge bg={"green.4"}>DID THAT</Badge>}
      </Flex>
      <Flex direction="row" align="center" justify="space-between">
        <Box>
          <Text>
            Owner: {props.owner}{" "}
            <Badge
              color="purple"
              sx={{
                visibility: props.forked ? "visible" : "hidden",
              }}
            >
              forked
            </Badge>
          </Text>

          <Text>
            Commits made by {props.username} : {props.commitsToRepo}
          </Text>
          {/* <Text>Forked: {props.forked ? "true" : "false"}</Text> */}
          <Text>Total Commits: {props.totalCommits}</Text>
          {
            // progress bar on percentage
          }
        </Box>
        <Box>
          <Title>{props.commitPercentage}%</Title>
        </Box>
      </Flex>
      <Progress
        value={props.commitPercentage}
        size="xl"
        radius="xl"
        color={progressColor}
      />
    </Paper>
  );
}
