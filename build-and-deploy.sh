#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

echo "🔧 Starting NODUS Deploy + Archive Ritual (Using netlify.toml for build)"

# --- Environment Setup ---
# Create a default .env file if it doesn't exist
ENV_FILE="client/.env"
if [ ! -f "$ENV_FILE" ]; then
  echo "✨ Creating default .env file..."
  cat << EOF > "$ENV_FILE"
VITE_APP_NAME=NODUS
VITE_API_URL=https://api.nodus-now.net
EOF
else
  echo "✅ .env already exists"
fi

# --- Dependency Check ---
# Check if node_modules exists in the client directory
if [ ! -d "client/node_modules" ]; then
  echo "📦 Installing client dependencies..."
  (cd client && npm install)
else
  echo "✅ Client dependencies already installed"
fi

# --- Build Step (Handled by Netlify based on netlify.toml) ---
# echo "🔨 Building the project with Vite..."
# (cd client && npm run build) 
# Netlify will run the command specified in netlify.toml during its build process

# --- Deployment ---
echo "🌍 Deploying to Netlify (using CLI and netlify.toml settings)..."

# Use Netlify CLI to deploy. It should pick up the publish dir from netlify.toml
# Ensure you are logged in (netlify login) and linked (netlify link)
netlify deploy --prod 
# If needed, specify site: netlify deploy --prod --site <your-netlify-site-id>

# --- Archive ---
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
ARCHIVE_NAME="../NODUS_DEPLOY_ARCHIVE_${TIMESTAMP}.zip"
echo "📦 Creating backup archive at ${ARCHIVE_NAME}"

# Zip the built client distribution directory
zip -r "${ARCHIVE_NAME}" client/dist/

echo "✅ Deployment + Archive complete!" 