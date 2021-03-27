# Deal with JWT SSH keys
rm config/jwt/*.pem
ln -s ${APP_CONGIG_PATH}/jwt/private.pem ./config/jwt/private.pem
ln -s ${APP_CONGIG_PATH}/jwt/public.pem ./config/jwt/public.pem

rm .env.local
ln -s ${APP_CONGIG_PATH}/.env.local .env.local

export APP_ENV=prod
export APP_DEBUG=0