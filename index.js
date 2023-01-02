const fs = require('node:fs');
const path = require('node:path');
const dotenv = require('dotenv'); dotenv.config();
const { Client, Events, GatewayIntentBits, Collection, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder} = require('discord.js');
const { token, databaseToken } = require('./config.json');
const MongoClient = require('mongodb').MongoClient;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//Command Manager
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[ATTENTION] La commande ${filePath}, il manque une propriété "data" ou "execute" requise.`);
	}
}

//Erreur si il trouve pas la commande

client.on(Events.InteractionCreate, async interaction => {
	
	if (interaction.isChatInputCommand()){
		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`Pas de commande ${interaction.commandName}.`);
			return;
		}
		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: "Une erreur s'est produite lors de l'exécution de cette commande !", ephemeral: true });
		}

		if(interaction.commandName === "add"){
			const modal = new ModalBuilder()
				.setCustomId('addModal')
				.setTitle("Ajout d'un personnel à la liste.")
	
			const nom = new TextInputBuilder()
				.setCustomId('persoNom')
				.setLabel('Nom : ')
				.setStyle(TextInputStyle.Short);
	
			const prenom = new TextInputBuilder()
				.setCustomId('persoPrenom')
				.setLabel('Prénom : ')
				.setStyle(TextInputStyle.Short);
			
			const email = new TextInputBuilder()
				.setCustomId('persoEmail')
				.setLabel('Email : ')
				.setStyle(TextInputStyle.Short);
			
			const nomRow = new ActionRowBuilder().addComponents(nom);
			const prenomRow = new ActionRowBuilder().addComponents(prenom);
			const emailRow = new ActionRowBuilder().addComponents(email);
	
			modal.addComponents(nomRow, prenomRow, emailRow);
			await interaction.showModal(modal);
		}
	}

	if(interaction.isModalSubmit && interaction.customId === 'addModal'){
		const inputNom = interaction.fields.getTextInputValue('persoNom')
		const inputPrenom = interaction.fields.getTextInputValue('persoPrenom')
		const inputEmail = interaction.fields.getTextInputValue('persoEmail')
		
		MongoClient.connect(databaseToken, { useNewUrlParser: true }, (err, client) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log('Connecté à MongoDB');
      
            const collection = client.db("diskordo").collection("personnel");
            
            collection.insertOne({ name: inputNom, firstName: inputPrenom, email: inputEmail }, (err, result) => {
                client.close();
            })
        });

		await interaction.reply({content : 'Objet inséré.'})
	}
	
},

client.once(Events.ClientReady, c => {
	console.log(`Logged in as ${client.user.tag}!`);

	MongoClient.connect(databaseToken, { useNewUrlParser: true }, (err, client) => {
		if (err) {
		  console.error(err);
		  return;
		}
		console.log("Connecté à MongoDB")
	  });
}));

client.login(token);