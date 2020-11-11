# oasis-manager
Outil d'aide à la création et gestion d'habitats partagés

## Développement

### Installation

```shell script
composer install
yarn install

# Generations des clés SSH pour la génération des JWT
openssl genpkey -out config/jwt/private.pem -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096
openssl pkey -in config/jwt/private.pem -out config/jwt/public.pem -pubout
```

### Utilisation

```shell script
# Lancement du serveur php
php -S 127.0.0.1:8000 -t public
#lancement du serveur nuxt
yarn dev
```
