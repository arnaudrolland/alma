# alma

Pour installer le projet : 

1/
Cloner le repo git 

2/
Créer une base de données vide

3/
Changer les valeur dans .env  (/alma/.env):
- la base de données : DATABASE_URL=mysql://root:root@127.0.0.1:3306/alma?serverVersion=5.7
- l'url (si besoin) du l'api react : API_URL="'http://localhost:8000/api'"
- l'url de l'api  alma : ALMA_URL="'http://0.0.0.0:5000/'"

ATTENTION aux doubles guillemets !


4/
Telecharger composer à la racine du projet (/alma) : 
https://getcomposer.org/download/

5/
Installer les dépendances via composer a la racine du projet (/alma)
$ php composer.phar install

6/
Injecter les data fixtures (données d'exemple en base) a la racine du projet (/alma):
$ php bin/consle doctrine:fixtures:load

7/
Lancer le serveur (si local) a la racine du projet (/alma):
$ php bin/console server:run

