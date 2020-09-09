# alma

Pour installer le projet : 

1/
Cloner le repo git 

2/
Créer une base de données vide

3/
Changer les valeur dans .env :
- la base de données : DATABASE_URL=mysql://root:root@127.0.0.1:3306/alma?serverVersion=5.7
- l'url (si besoin) du l'api react : API_URL="'http://localhost:8000/api'"
- l'url de l'api  alma : ALMA_URL="'http://0.0.0.0:5000/'"

ATTENTION aux doubles guillemets !


4/
Telecharger composer à la racine du projet : 
https://getcomposer.org/download/

5/
Installer les dépendances via composer
$ php composer.phar install

