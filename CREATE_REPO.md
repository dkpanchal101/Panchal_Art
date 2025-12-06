# Create GitHub Repository - Step by Step

## Quick Steps to Create and Push Your Repository

### Step 1: Create Repository on GitHub (Manual)

1. **Go to GitHub**: Open https://github.com in your browser and sign in

2. **Create New Repository**:
   - Click the **"+"** icon in the top right corner
   - Select **"New repository"**

3. **Repository Settings**:
   - **Repository name**: `panchal-art` (or any name you prefer)
   - **Description**: `Full-stack service design business website with React frontend and Node.js backend`
   - **Visibility**: Choose **Public** or **Private**
   - **IMPORTANT**: 
     - ❌ Do NOT check "Add a README file"
     - ❌ Do NOT check "Add .gitignore"
     - ❌ Do NOT check "Choose a license"
   - Click **"Create repository"**

### Step 2: Copy Your Repository URL

After creating the repository, GitHub will show you a page with setup instructions. You'll see a URL like:
- `https://github.com/YOUR_USERNAME/panchal-art.git`

**Copy this URL** - you'll need it in the next step.

### Step 3: Connect and Push (Run these commands)

Open PowerShell in your project directory and run:

```powershell
# Make sure you're in the project directory
cd "D:\programming\Panchal Art"

# Add the remote (replace YOUR_USERNAME and REPO_NAME with your actual values)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Rename branch to main (GitHub uses 'main' by default)
git branch -M main

# Push your code
git push -u origin main
```

### Example Commands

If your GitHub username is `dkpanchal101` and repository name is `panchal-art`:

```powershell
git remote add origin https://github.com/dkpanchal101/panchal-art.git
git branch -M main
git push -u origin main
```

### Step 4: Authentication

When you run `git push`, GitHub will ask for authentication:

**Option A: Personal Access Token (Recommended)**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name like "Panchal Art Project"
4. Select expiration (30 days, 90 days, or no expiration)
5. Check the `repo` scope
6. Click "Generate token"
7. **Copy the token** (you won't see it again!)
8. When prompted for password, paste the token

**Option B: GitHub Desktop**
- Install GitHub Desktop and use it to push (easier for beginners)

### Troubleshooting

**If you get "remote origin already exists":**
```powershell
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```

**If you want to change the remote URL:**
```powershell
git remote set-url origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```

**If you get authentication errors:**
- Make sure you're using a Personal Access Token, not your password
- Tokens must have `repo` scope

---

## Need Help?

If you share your GitHub username, I can provide the exact commands ready to copy-paste!

