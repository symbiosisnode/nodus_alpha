#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

echo "🔧 Starting NODUS Deploy + Archive Ritual (Using netlify.toml for build)"
echo "📅 $(date)"

# --- Environment Setup ---
ENV_FILE="client/.env"
if [ ! -f "$ENV_FILE" ]; then
  echo "✨ Creating default .env file..."
  cat << EOF > "$ENV_FILE"
VITE_APP_NAME=NODUS
VITE_API_URL=https://api.nodus-now.net
VITE_MAPBOX_TOKEN=${MAPBOX_TOKEN:-""}
EOF
else
  echo "✅ .env already exists"
fi

# --- Dependency Check ---
if [ ! -d "client/node_modules" ]; then
  echo "📦 Installing client dependencies..."
  (cd client && npm install)
else
  echo "✅ Client dependencies already installed"
fi

# --- Build Verification ---
echo "🔍 Verifying build prerequisites..."
if [ ! -f "client/package.json" ]; then
  echo "❌ Error: client/package.json not found"
  exit 1
fi

if [ ! -f "netlify.toml" ]; then
  echo "❌ Error: netlify.toml not found"
  exit 1
fi

# --- Build Step ---
echo "🔨 Building the project..."
(cd client && npm run build)

# Verify build output
if [ ! -d "client/dist" ]; then
  echo "❌ Error: Build failed - dist directory not created"
  exit 1
fi

# --- Deployment ---
echo "🌍 Deploying to Netlify..."
netlify deploy --prod

# Verify deployment
if [ $? -ne 0 ]; then
  echo "❌ Error: Deployment failed"
  exit 1
fi

# --- Archive ---
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
ARCHIVE_NAME="../NODUS_DEPLOY_ARCHIVE_${TIMESTAMP}.zip"
echo "📦 Creating backup archive at ${ARCHIVE_NAME}"

# Create archive with build artifacts
zip -r "${ARCHIVE_NAME}" \
  client/dist/ \
  client/package.json \
  client/package-lock.json \
  netlify.toml \
  build-and-deploy.sh

# Verify archive
if [ ! -f "${ARCHIVE_NAME}" ]; then
  echo "❌ Error: Archive creation failed"
  exit 1
fi

echo "✅ Deployment + Archive complete!"
echo "📅 $(date)" 