const { SlashCommandBuilder } = require('discord.js');
const MongoClient = require('mongodb').MongoClient;
const {databaseToken} = require('../config.json')

/**
 * À la manière de la commande /question, nous récupérons l'argument de la commande grace au getString afin de cibler l'objet dans la base de données.
 */

module.exports = {
	data: new SlashCommandBuilder()
    .setName('delete')
	.setDescription('Supprimer un professeur de la liste.')
    .addStringOption(option =>
		option.setName('nom')
			.setDescription("Merci de fournir le nom du personnel que vous voulez enlevez de la liste.")),
    async execute(interaction) {
        const name = interaction.options.getString('nom')

        MongoClient.connect(databaseToken, { useNewUrlParser: true }, (err, client) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log('Connected to MongoDB');
      
            const collection = client.db("diskordo").collection("personnel");
            collection.deleteOne({ name: name }, (err, result) => {
              if (err) {
                console.error(err);
                return;
              }
      
              if (result.deletedCount === 0) {
                interaction.reply(`Aucun élément avec le nom : "${name}".`);
              } else {
                interaction.reply(`Le membre du personnel : "${name}" a bien été supprimé de la liste.`);
              }
      
              client.close();
            });
          });
	},
};
