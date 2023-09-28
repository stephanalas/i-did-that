import express from "express";
import {
  getTotalCommitCountForRepo,
  getUserCommitCountFromContributorStats,
  getUserRepos,
} from "./utility.ts";
const router = express.Router();

router.get("/:username", async (req, res, next) => {
  try {
    const username = req.params.username;
    // now we will get users repos
    // [['repoOwner/repoName', isForked: boolean]]
    const userRepos = await getUserRepos(username);
    // we should still check if the user has repos
    if (!userRepos?.length) {
      res.send({ message: "No repos to check", error: false });
    } else {
      // [[ownerName, repoName]]
      const repoData = userRepos.map((contribution) => [
        ...contribution[0].split("/"), // ownerName
        contribution[1], // repoName
      ]);
      const formattedData: {
        owner: string;
        repo: string;
        username: string;
        commitsToRepo: number;
        totalCommits: number;
        commitPercentage: number;
        forked: boolean;
      }[] = [];

      for (const data of repoData) {
        const [ownerName, repoName, forked] = data;
        // we only want repos that the username owns
        const totalCommits = await getTotalCommitCountForRepo(
          ownerName,
          repoName
        );
        const userCommitCount = await getUserCommitCountFromContributorStats(
          ownerName,
          repoName,
          username
        );
        // calculate commits to repo
        let commitsToRepo = 0;

        // userCommitCount == -1 all commits belong to user
        // negative numbers are still truthy
        if (userCommitCount && userCommitCount != -1)
          commitsToRepo = userCommitCount;
        else if (userCommitCount == -1) {
          commitsToRepo = totalCommits;
        } else {
          commitsToRepo = 0;
        }
        // calculate percentage
        const percentage = (100 * commitsToRepo) / totalCommits;
        const commitPercentage = Math.round(percentage * 100) / 100;
        // result
        if (totalCommits) {
          formattedData.push({
            owner: ownerName,
            repo: repoName,
            username,
            commitsToRepo,
            totalCommits,
            commitPercentage,
            forked,
          });
        }
      }

      res.send(formattedData);
    }
  } catch (error) {
    console.log("error=====================");
    console.log(error);
    next(error);
  }
});

export default router;
