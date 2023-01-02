# Diskordo - Projet Transversal

Diskordo est un bot Discord basé sur ``node.js`` et la librairie ``discord.js``, il permet de regrouper différentes informations relative à l'université de La Rochelle.

## Installation

Vous devez au préalable télécharger [Node.js](https://nodejs.org/) pour installer le bot. Vous devez ensuite installer npm en faisant :

```bash
npm i
```

Vous devez ensuite créer un fichier ``config.json`` sur lequel vous allez placer les informations suivantes :

```
{
    "token" : " ",
    "clientId" : " ",
    "guildId" :  " ",
    "databaseToken" : " " 
}
```

Vous pouvez récuperer le "token" sur la page développeur de [Discord](https://discord.com/developers/applications). Les clientId et guildId directement depuis votre serveur Discord. Et le databaseToken sur [MongoDB](https://www.mongodb.com/fr-fr) directement.


Une dernière configuration est requise pour faire fonctionner la commande ``/youtube`` 

```
npm install node-superfetch
```


Lorsque dans la console vous avez ces deux logs : 
```
Logged in as Diskordo#0001
Connecté à MongoDB
```
Le bot est opérationnel et vous pourrez tester ses fonctions.

## Utilisation

Vous avez plusieurs commandes à disposition, voici une liste décrivant leurs utilités et comment les utiliser:

- ``/question {votre question}`` : cette commande permet à un étudiant de poser une question en utilisant la commande suivie de sa question. Un fil sera créé prenant l'énoncé de la question comme nom du fil. Cela permet donc une meilleure lisibilité des questions et un espace unique pour répertorier les réponses.

- ``/liens`` : la commande ``liens`` permet de répertorier tout les liens officiels de l'université de La Rochelle. 

- ``/youtube`` : renvoie la dernière video ``youtube`` de la chaîne de l'Université de la Rochelle.

- ``/add`` : utilisez cette commande renverra un [modal](https://discordjs.guide/interactions/modals.html#building-and-responding-with-modals) discord où vous pourrez ajouter un membre du personnel à la liste.

- ``/delete {nom du personnel}`` : à l'inverse de la commande ``/add`` elle permet de supprimer un membre de la liste. Vous devez saisir en argument le nom exact du membre que vous voulez supprimer.

- ``/personnel`` : cette commande renvoie un message [embed](https://discordjs.guide/popular-topics/embeds.html#embed-preview) listant tout les membres du personnel avec leurs emails associés.

- ``/ping`` : à l'execution de cette commande le Bot vous répondra avec un "Pong !"

- ``/server`` : cette commande donne des informations sur le serveur.

- ``/user`` : cette commande donne des informations sur l'utilisateur qui réalise la commande.

## Limites

- Utilisation restreintes aux fonctionnalités proposées.
- Utilisation exclusive aux étudiants de l'Université de La Rochelle.

## Licence

Projet réalisé par Alexandre Ecalle, Yasin Lahrouri, Arthur Gillier et Valentin Bouquet.
