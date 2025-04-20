#!/bin/bash

# Exit on error
set -e

# Build the project
hugo

# Go to public folder
cd public

# Add, commit, push
git add --all
git commit -m "Deploy website"
git push -f origin main

# Return to root
cd ..
