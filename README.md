# I-DID-THAT

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

[i-did-that](https://i-did-that.onrender.com/) is a user-friendly application that lets you explore GitHub profiles and gain insights into a user's contributions to public repositories. By analyzing a user's commits relative to the total commits in a repository's default branch, i-did-that helps you quickly identify the repositories a user has actively contributed to.

## Key Features

- Explore GitHub profiles and contributions at a glance.
- Gain insights into a user's level of activity and involvement in public repositories.
- Easy setup with a `.env` file containing your GitHub Personal Access Token (GITHUB_PAT).

## Technologies Used

- Typescript
- Node.js
- Express
- Github API
- Octokit
- React
- Vite

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Installation

1. Clone this repository to your local machine.
2. Create a `.env` file in the project root and add your GitHub Personal Access Token:
   GITHUB_PAT=your_personal_access_token
3. Install dependencies using npm:

```bash
npm install
```

4. Start the development server:

```
npm run dev
```

5. Access the application in your web browser at `http://localhost:5173`

[Explain how to install and set up your project]

## Usage

1. Enter a GitHub username in the search bar.
2. Browse the user's contributions and active repositories based on commit activity.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or feedback, please email Stephan Alas at stephan.j.alas@gmail.com.
