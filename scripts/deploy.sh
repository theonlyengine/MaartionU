#!/bin/bash
echo "Deploying application..."

# Pull latest changes from git
git pull origin main

# Navigate to backend and frontend and install dependencies
cd backend
npm install
npm run build

cd ../frontend
npm install
npm run build

# Restart server (assuming PM2 is used)
pm2 restart all

echo "Deployment complete!"
