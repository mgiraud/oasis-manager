# oasis-manager
Outil d'aide à la création et gestion d'habitats partagés. Le projet sous license GNU GPL est en développement actif.
> Ce projet n'a pour l'instant pas l'ambition de devenir un CMS. Afin de l'utiliser et le modifier selon vos besoins
> il est nécessaire de connaitre les languages web PHP et Typescript

Le site est en ligne à l'adresse : https://www.lestransalpins.org 

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

## Développement

### Introduction
* API : L'API fonctionne avec l'incroyable [Api-platform](https://api-platform.com/) basé sur le framework PHP Symfony
* App : L'app tourne avec l'excellent [Nuxt](https://fr.nuxtjs.org/), framework JS basé sur VueJs
* La librairie graphique [Vuetify](https://vuetifyjs.com/en/) est utilisée pour fournir des composants prêts à l'emploi
* Les icônes utilisées sont celles de la bibliothèque open source [Remixicons](https://remixicon.com/)

### Installation

Vous devez bien sur installer PHP 7.4 avec une configuration suffisante, Node 14.x et yarn en préambule

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

### Intégration

L'association a pris un hébergement chez [O2switch](https://www.o2switch.fr/). Il est impossible de `build` l'application sur le serveur
car la génération de processus enfant est interdite. Du coup l'app doit être build avant le merge sur master (dossier .nuxt).

De même le serveur utilise une protection par IP pour filtrer les connexions SSH, il est donc impossible d'utiliser [le workflow github](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners#ip-addresses) 

## Crédits

Créé par Marc, dans le cadre du développement de l'oasis porté par l'association "Les transalpins"
