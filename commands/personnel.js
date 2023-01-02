const { SlashCommandBuilder, messageLink, EmbedBuilder } = require('discord.js');
const { databaseToken } = require("../config.json");
const MongoClient = require('mongodb').MongoClient;

module.exports = {
	data: new SlashCommandBuilder()
    .setName('personnel')
	.setDescription("Donne la liste du personnel de l'université."),

    async execute(interaction) {
        
        MongoClient.connect(databaseToken, { useNewUrlParser: true }, (err, client) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log('Connecté à MongoDB');
      
            // Trouve tout les objets contenus dans la collection "personnel" dans la base de donnée "diskordo"
            const collection = client.db("diskordo").collection("personnel");
            collection.find({}).toArray((err, result) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log(result);
      
              if (!result) {
                message.channel.send("Pas de personnel trouvé dans la base de données.");
                return;
              }
      
              // Créé l'embed affichant la liste du personnel
              const embed = new EmbedBuilder()

                .setColor(0x0099FF)
                .setTitle("Liste du personnel")
                .setDescription(result.map(person => `${person.name} ${person.firstName}\nMail: ${person.email}\n`).join('\n'))
                .setThumbnail('https://www.univ-larochelle.fr/wp-content/uploads/png/logo-universite-de-la-rochelle-2X.png')
      
              // Envoie l'embed en répondant au message de l'utilisateur
              interaction.reply({embeds : [embed]});

      
              client.close();
            });
          });
	},
};