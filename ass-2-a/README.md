# Assignment 2A: Git & GitHub Version Control Guide

## Complete Tutorial on GitHub Setup and Git Commands

This guide covers everything you need to know about setting up GitHub, configuring Git, and pushing your code to a remote repository. This is essential for ass-2-b (Angular application) and any future projects.

---

## Table of Contents
1. [GitHub Account Setup](#github-account-setup)
2. [Git Installation & Configuration](#git-installation--configuration)
3. [Repository Creation](#repository-creation)
4. [Essential Git Commands](#essential-git-commands)
5. [Complete Workflow Example](#complete-workflow-example)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)

---

## GitHub Account Setup

### Step 1: Create GitHub Account
1. Go to [https://github.com](https://github.com)
2. Click "Sign up" button in top-right corner
3. Enter your email address
4. Create a strong password (mix of uppercase, lowercase, numbers, special characters)
5. Choose a username (this will be in your repository URL)
6. Verify your email address
7. Complete the GitHub setup wizard

### Step 2: Create SSH Key (Optional but Recommended)

SSH keys allow you to push code to GitHub without entering your password every time.

#### On Windows (Git Bash):
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Or if ed25519 not supported:
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# Press Enter to accept default location (~/.ssh/id_rsa)
# Enter passphrase (or leave empty for no passphrase)
# Confirm passphrase
```

#### View your public key:
```bash
cat ~/.ssh/id_rsa.pub
```

#### Add SSH key to GitHub:
1. Log into GitHub
2. Go to Settings → SSH and GPG keys
3. Click "New SSH key"
4. Paste your public key
5. Click "Add SSH key"

### Step 3: Install Git

#### On Windows:
1. Download from [https://git-scm.com](https://git-scm.com)
2. Run the installer
3. Choose default options (or customize as needed)
4. Select "Use Git from the command line and also from 3rd-party software"
5. Choose CRLF line endings for Windows
6. Use MinTTY as terminal emulator

#### Verify Installation:
```bash
git --version
```

---

## Git Installation & Configuration

### Configure Git Locally

```bash
# Configure your username (shown in all commits)
git config --global user.name "Your Name"

# Configure your email (should match GitHub email)
git config --global user.email "your_email@example.com"

# View all configuration
git config --global --list

# View specific config
git config user.name
git config user.email
```

### Configure Default Branch Name

```bash
# Set default branch to 'main' (GitHub standard)
git config --global init.defaultBranch main
```

### Configure Default Editor

```bash
# Set default text editor (for commit messages)
git config --global core.editor "notepad"  # Windows
```

---

## Repository Creation

### Option 1: Create Repository on GitHub First (Recommended)

#### On GitHub:
1. Log into GitHub
2. Click "+" icon → "New repository"
3. Enter repository name (e.g., `ass-2-b`)
4. Add description (optional)
5. Select "Public" or "Private"
6. Check "Add a README file" (optional)
7. Choose ".gitignore template: Node" for Angular projects
8. Choose license (optional)
9. Click "Create repository"

#### On Your Computer:
```bash
# Clone the repository to your computer
git clone https://github.com/YOUR_USERNAME/ass-2-b.git

# Navigate into the directory
cd ass-2-b

# You're ready to add your project files here!
```

### Option 2: Initialize Repository Locally First

```bash
# Create project directory
mkdir ass-2-b
cd ass-2-b

# Initialize git repository
git init

# Create initial files (Angular app will be here)
# ... add your project files ...

# Create .gitignore file for Angular
echo "node_modules/" > .gitignore
echo "dist/" >> .gitignore
echo ".env" >> .gitignore
```

#### Then Create Remote on GitHub:
1. Create repository on GitHub (WITHOUT initializing with README)
2. Add remote origin to local repository:

```bash
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/ass-2-b.git

# Verify remote is added
git remote -v

# Push local repository to GitHub
git branch -M main
git push -u origin main
```

---

## Essential Git Commands

### Basic Commands

#### `git init`
Initialize a new Git repository in current directory
```bash
git init
```

#### `git add`
Stage changes for commit
```bash
# Add specific file
git add filename.js

# Add all changes in current directory
git add .

# Add all changes in entire repository
git add -A
```

#### `git commit`
Create a commit with staged changes
```bash
# Commit with message
git commit -m "Your commit message here"

# Commit with detailed message (opens editor)
git commit

# Add and commit all changes in one command
git commit -am "Your message"
```

#### `git push`
Upload commits to remote repository
```bash
# Push to main branch
git push origin main

# Push to any branch
git push origin branch-name

# Push and set upstream (first push from new branch)
git push -u origin branch-name
```

#### `git pull`
Download updates from remote repository
```bash
# Pull from main branch
git pull origin main

# Pull from current branch
git pull
```

### Checking Status

#### `git status`
Show current status of repository
```bash
# See which files are modified, staged, untracked
git status

# Short format
git status -s
```

#### `git log`
View commit history
```bash
# Show recent commits
git log

# Show last 5 commits
git log -5

# Show commits with changes
git log -p

# Show commits in one line
git log --oneline

# Visual graph of branches
git log --graph --oneline --all
```

#### `git diff`
Show differences in files
```bash
# Show changes in unstaged files
git diff

# Show changes in staged files
git diff --staged

# Compare between branches
git diff main branch-name
```

### Branch Management

#### `git branch`
List and create branches
```bash
# List local branches
git branch

# List all branches
git branch -a

# Create new branch
git branch feature-name

# Delete branch
git branch -d feature-name

# Force delete branch
git branch -D feature-name
```

#### `git checkout`
Switch between branches
```bash
# Switch to existing branch
git checkout branch-name

# Create and switch to new branch
git checkout -b feature-name

# Switch to main branch
git checkout main
```

### Merge Operations

#### `git merge`
Merge branches together
```bash
# Switch to main first
git checkout main

# Merge feature branch into main
git merge feature-name

# Abort merge if conflicts occur
git merge --abort
```

---

## Complete Workflow Example

This is a real-world workflow for developing and pushing code to GitHub.

### Scenario: Developing Angular Application (ass-2-b)

#### Step 1: Create Repository on GitHub
```bash
# Create repository on GitHub named "ass-2-b"
# (Follow GitHub UI steps above)

# Clone to local computer
git clone https://github.com/YOUR_USERNAME/ass-2-b.git
cd ass-2-b
```

#### Step 2: Set Up Angular Project
```bash
# Create Angular application
ng new . --skip-git

# Install dependencies (should be automatic)
npm install

# Verify everything works
ng serve
```

#### Step 3: Add Initial Commit
```bash
# Check status
git status

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initialize Angular project with CLI"

# Push to GitHub
git push origin main
```

#### Step 4: Create Feature Branch
```bash
# Create feature branch for registration component
git checkout -b feature/register-component

# Create registration component
ng generate component components/register

# Make changes to component (edit files...)
# (Implement register component here)

# Check what's changed
git status
```

#### Step 5: Commit Feature Changes
```bash
# Stage changes
git add src/app/components/register/

# Commit with descriptive message
git commit -m "Implement RegisterComponent with form validation"

# Push feature branch
git push -u origin feature/register-component
```

#### Step 6: Create More Components
```bash
# Switch to new branch for login
git checkout -b feature/login-component

# Generate and implement login component
ng generate component components/login

# Add changes
git add src/app/components/login/

# Commit
git commit -m "Implement LoginComponent with authentication"

# Push
git push origin feature/login-component
```

#### Step 7: Merge to Main Branch
```bash
# Review changes on GitHub (create Pull Request)
# - Go to GitHub repository
# - Create Pull Request from feature/login-component to main
# - Add description
# - Merge PR when ready

# Or merge locally:
git checkout main
git pull origin main
git merge feature/login-component
git push origin main
```

#### Step 8: Cleanup
```bash
# Delete local feature branch
git branch -d feature/login-component

# Delete remote feature branch
git push origin --delete feature/login-component
```

---

## Commit Message Conventions

### Good Commit Practices

#### Format:
```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Types:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, missing semicolons, etc.)
- `refactor:` - Code refactoring without changing functionality
- `test:` - Adding or updating tests
- `chore:` - Changes to build process, dependencies, etc.

#### Examples:

**Good:**
```bash
git commit -m "feat(register): Add form validation for email and phone"
git commit -m "fix(login): Correct password comparison logic"
git commit -m "docs: Update README with installation instructions"
git commit -m "refactor(auth): Extract authentication logic to service"
```

**Bad:**
```bash
git commit -m "fixed stuff"
git commit -m "updated files"
git commit -m "changes"
```

---

## Best Practices

### 1. Commit Frequently
- Make commits for each logical change
- Not too large (hundreds of changes) or too small (single character)
- Aim for 5-20 files per commit

### 2. Use Meaningful Commit Messages
- Describe WHAT changed and WHY, not HOW
- First line: 50 characters or less
- Add detailed explanation in body if needed

### 3. Keep Main Branch Stable
- Always use feature branches for new work
- Make sure code passes tests before merging
- Do code review before merging

### 4. Use .gitignore
```
# Example .gitignore for Angular project
node_modules/
dist/
.env
.env.local
.vscode/
.idea/
*.log
temp/
build/
```

### 5. Pull Before Push
```bash
# Always pull latest changes before pushing
git pull origin main

# Fix any conflicts if they occur

# Then push your changes
git push origin main
```

### 6. Branching Strategy
```
main (production-ready)
  ├── feature/register-component
  ├── feature/login-component
  ├── feature/profile-component
  └── feature/auth-service
```

### 7. Code Review Process
1. Create feature branch from main
2. Make changes and commit
3. Push branch to GitHub
4. Create Pull Request (PR)
5. Request review from team members
6. Address feedback and update PR
7. Merge PR after approval
8. Delete feature branch

---

## Troubleshooting

### Issue: "fatal: not a git repository"
**Cause:** Not inside a Git repository
```bash
# Solution: Initialize repository or navigate to git folder
git init
# OR
cd path/to/git/repository
```

### Issue: "permission denied" when pushing
**Cause:** SSH key not configured or wrong credentials
```bash
# Solution: Check SSH key
ssh -T git@github.com

# If fails, reconfigure SSH key or use HTTPS
git remote set-url origin https://github.com/USERNAME/REPO.git
```

### Issue: "Updates were rejected because the tip of your current branch is behind"
**Cause:** Remote repository has changes you don't have
```bash
# Solution: Pull before pushing
git pull origin main
git push origin main
```

### Issue: Merge Conflicts
**When:** Two branches modify same file at same location
```bash
# Solution: Open file and resolve conflicts
# Look for <<<<<<, =====, and >>>>>> markers
# Edit file to resolve, then:
git add filename.js
git commit -m "Resolve merge conflict"
```

### Issue: "fatal: The current branch main has no upstream branch"
**Cause:** First push from new branch
```bash
# Solution: Use -u flag (upstream)
git push -u origin main
```

### Issue: Accidentally Committed Wrong Files
```bash
# View last commit
git show HEAD

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Re-stage correct files and commit again
git add correct-files.js
git commit -m "Fixed commit with correct files only"
```

---

## Common Workflows

### Workflow 1: Pushing Existing Project to GitHub

```bash
# 1. Initialize git in project folder
cd your-project
git init

# 2. Create .gitignore
echo "node_modules/" > .gitignore
echo "dist/" >> .gitignore

# 3. Add all files
git add .

# 4. Create initial commit
git commit -m "Initial project setup"

# 5. Create repository on GitHub

# 6. Add remote
git remote add origin https://github.com/YOUR_USERNAME/your-project.git

# 7. Push to GitHub
git branch -M main
git push -u origin main
```

### Workflow 2: Updating Your Repository

```bash
# 1. Make changes to your files

# 2. Check status
git status

# 3. Add changes
git add .

# 4. Commit
git commit -m "Update features"

# 5. Push to GitHub
git push origin main
```

### Workflow 3: Collaborating with Others

```bash
# 1. Clone repository
git clone https://github.com/USERNAME/project.git
cd project

# 2. Create your feature branch
git checkout -b feature/my-feature

# 3. Make changes and commits
git add .
git commit -m "Add my feature"

# 4. Push branch
git push origin feature/my-feature

# 5. Create Pull Request on GitHub
# (Click "Create Pull Request" button on GitHub)

# 6. After merge, switch back to main
git checkout main
git pull origin main
```

---

## Quick Reference

```bash
# Essential commands in order
git config --global user.name "Your Name"
git config --global user.email "email@example.com"
git clone <repository-url>
git status
git add .
git commit -m "message"
git push origin main
git pull origin main
git checkout -b feature-name
git merge feature-name
```

---

## Summary

This guide covers everything needed to work with GitHub and Git for ass-2-b (Angular application). Key points:

1. **GitHub Account**: Create account and repository
2. **Git Configuration**: Configure name and email
3. **Clone/Initialize**: Get repository on your computer
4. **Add & Commit**: Stage and commit your changes
5. **Push & Pull**: Sync with remote repository
6. **Branches**: Organize development with feature branches
7. **Merge**: Combine branches when features are complete

For ass-2-b (Angular application), use these commands to push your code to GitHub and ensure proper version control throughout development.

---

## Additional Resources

- GitHub Documentation: https://docs.github.com
- Git Official Tutorial: https://git-scm.com/book
- GitHub Guides: https://guides.github.com
- Commit Message Conventions: https://www.conventionalcommits.org/

