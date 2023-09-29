import { SimpleGrid, Card, Text, Loader, Center } from "@mantine/core";
import RepoCard, { type RepoData } from "./RepoCard";

type RepoListProps = {
  repos: RepoData[];
  isLoading: boolean;
};

export default function RepoList(props: RepoListProps) {
  const { repos } = props;
  return (
    <Card withBorder w="100%" h="fit">
      {props.isLoading ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <SimpleGrid
          cols={repos.length ? 3 : 1}
          breakpoints={[
            { maxWidth: "62rem", cols: 3, spacing: "md" },
            { maxWidth: "48rem", cols: 2, spacing: "sm" },
            { maxWidth: "36rem", cols: 1, spacing: "sm" },
          ]}
        >
          {repos.length ? (
            repos.map((repo) => (
              <RepoCard {...repo} key={repo.owner + "/" + repo.repo} />
            ))
          ) : (
            <Text ta="center" fz="xl">
              No Repos to display
            </Text>
          )}
        </SimpleGrid>
      )}
    </Card>
  );
}
