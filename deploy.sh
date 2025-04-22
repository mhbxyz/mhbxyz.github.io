#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -euo pipefail
IFS=$'\n\t'

# Constants
REPO_URL="git@github.com:mhbxyz/mhbxyz.github.io.git"
DEPLOY_DIR="public"
BRANCH="main"
COMMIT_MESSAGE="Deploy website"

# Build the project using Hugo
echo "Building the Hugo site..."
hugo

# Navigate to the deployment directory
cd "$DEPLOY_DIR"

# Initialize a new Git repository
echo "Initializing Git repository in $DEPLOY_DIR..."
git init
git remote add origin "$REPO_URL"
git checkout -b "$BRANCH"

# Add, commit, and push changes to the remote repository
echo "Deploying to $REPO_URL..."
git add --all
git commit -m "$COMMIT_MESSAGE"
git push -f origin "$BRANCH"

# Return to the root directory
cd ..

# Clean up the deployment directory
echo "Cleaning up..."
rm -rf "$DEPLOY_DIR"

echo "Deployment complete."
