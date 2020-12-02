# oasis-manager
Outil d'aide à la création et gestion d'habitats partagés. Le projet sous license GNU GPL est en développement actif.
> Ce projet n'a pour l'instant pas l'ambition de devenir un CMS. Afin de l'utiliser et le modifier selon vos besoins
> il est nécessaire de connaitre les languages web PHP/JS

## Fonctionnalités

Voici la liste, sans doute non exhaustive, des fonctionnalités prévues à terme.

| Fonctionnalité | TODO | En cours de développement | Fonctionnel/Fonctionnalité incomplète | Achevé |
| ------------- | ------------- | --------- | --------- | --------- |
| Création/Edition de page | | ✓ | ✓ | |
| Blog/Actualités | ✓ | | | |
| Gestion de fichiers | ✓ | | | |
| Gestion de membres | ✓ | ✓ | | |
| Sécurité (login/logout/permissions) | ✓ | | ✓ | |
| Calendrier et aide aux réunions | ✓ | | | |
| Mails automatiques | ✓ | | | |

## Contributions

Les contributions sont bienvenues mais le projet étant sous développement actif,
je vous demande de passer par la **création d'une issue** pour pouvoir planifier son développement

### Intégration

Cette partie est encore en développement mais voici ce que doit respecter un code pour être validé
* PHP
    * Tests PhpUnit validés, coverage > 80%
    * Phpstan niveau 5
    * PHP CS fixer ne renvoie pas d'erreur
* JS
    * Tests jest validé, coverage > 80%

Une action gitlab est déclenchée à chaque push pour effectuer ces validations.
TODO: Lors d'un merge sur main, le code est déployé en production.

## Développement

### Introduction
* API : L'api fonctionne avec l'incroyable [Api-platform](https://api-platform.com/) basé sur le framework php Symfony
* App : L'app tourne avec l'excellent [Nuxt](https://fr.nuxtjs.org/), framework JS basé sur VueJs
* La librairie graphique [Vuetify](https://vuetifyjs.com/en/) est utilisée pour fournir des composants prets a l'emploi

### Installation

Vous devez bien sur installer Php et Node en préambule

```shell script
composer install
yarn install

# Generations des clés SSH pour la génération des JWT
openssl genpkey -out config/jwt/private.pem -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096
openssl pkey -in config/jwt/private.pem -out config/jwt/public.pem -pubout
```

### Utilisation

```shell script
# Lancement du serveur php via l'executable symfony 
symfony server:start
#lancement du serveur nuxt
yarn dev
```

## FAQ

### Pourquoi JS et pas TS ?
Pour ne pas bloquer les contribuants potentiels. Même si TS est vraiment agréable à utiliser,
il est encore loin d'être autant utilisé que JS

## Crédits

Créé par Marc, dans le cadre du développement de l'oasis porté par l'association "Les transalpins"