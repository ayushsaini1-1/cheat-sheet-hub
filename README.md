# Cheat Sheet Hub

A simple and responsive cheat sheet manager built with vanilla HTML, CSS, and JavaScript.

## Features
- Add code snippets and notes with categories (CSS, JavaScript, Git, HTML, General/Commands).
- Instant search filter across title, category, and content.
- Persistent storage using browser `localStorage`.
- Fully responsive design.

## GitHub Pages Setup

This repository is ready to be deployed to GitHub Pages!

### Option 1: Using GitHub Actions (Automated)
1. Push this repository to GitHub.
2. Go to your repository on GitHub.
3. Navigate to **Settings** > **Pages** (under "Code and automation").
4. Under **Build and deployment** > **Source**, select **GitHub Actions**.
5. The workflow in `.github/workflows/deploy.yml` will automatically build and publish your site upon every push to `main`.

### Option 2: Deploy from Branch
1. Go to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select **Deploy from a branch**.
3. Choose branch: `main` and folder: `/ (root)`.
4. Click **Save**.
