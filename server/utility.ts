/* eslint-disable @typescript-eslint/no-explicit-any */
import { Octokit } from "@octokit/rest";
import { graphql } from "@octokit/graphql";
export const octokit = new Octokit({
  auth: process.env.GITHUB_PAT,
});
export async function getUserRepos(username: string) {
  try {
    // Fetch user-owned repositories
    // authenticated user requires different function for listing

    const userReposResponse = await octokit.rest.repos.listForUser({
      username,
      type: "all",
    });
    const userRepos = userReposResponse.data.map((repo: any) => [
      repo.full_name,
      repo.fork,
    ]);

    return userRepos;
  } catch (error) {
    console.error("Error getting user contributions:", error.message);
  }
}

export async function getTotalCommitCountForRepo(
  repoOwner: string,
  repoName: string
) {
  // only gets commit count for default branch
  try {
    const query = `
        query {
          repository(owner: "${repoOwner}", name: "${repoName}") {
            defaultBranchRef {
              target {
                ... on Commit {
                  history {
                    totalCount
                  }
                }
              }
            }
          }
        }
      `;

    const response: any = await graphql(query, {
      headers: {
        authorization: `token ${process.env.GITHUB_PAT}`,
      },
    });

    const contributorStats =
      response.repository.defaultBranchRef.target.history;
    const totalCommits = contributorStats.totalCount;
    // const totalAuthors = contributorStats.authors.totalCount;

    return totalCommits;
  } catch (error) {
    console.error("Error getting data:", error.message);
  }
}

export async function getUserCommitCountFromContributorStats(
  repoOwner: string,
  repoName: string,
  username: string
) {
  try {
    const contributorStats = await octokit.repos.getContributorsStats({
      owner: repoOwner,
      repo: repoName,
    });
    if (Object.keys(contributorStats.data).length) {
      const userStats = contributorStats.data.find(
        (contributor: any) => contributor.author.login === username
      );
      if (userStats) {
        const commitCount = userStats.total;
        return commitCount;
      }
    } else {
      if (JSON.stringify(contributorStats.data) == "{}") return -1;
      return 0;
    }
  } catch (error) {
    console.error("Error getting data:", error.message);
  }
}
