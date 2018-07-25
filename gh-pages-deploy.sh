#!/bin/bash

set -ev

# Add ssh key w/ write permission for `showcar-react` repo
chmod 600 travis_ci_rsa
eval `ssh-agent -s`
ssh-add travis_ci_rsa

# Create gh-pages dir
mv ./storybook-static ./docs/storybook

# Push to gh-pages
yarn run gh-pages-deploy