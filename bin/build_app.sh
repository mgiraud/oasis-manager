NODE_ENV=production API_BASE_URL=https://api.lestransalpins.org/api yarn build
cp ./bin/server.js .output/server/

## A faire sur le serveur
# cloudlinux-selector restart  --json --interpreter nodejs --app-root public_html/oasis-manager
