const fs = require('node:fs');
const path = require('node:path');
const dotenv = require('dotenv'); dotenv.config();
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { token, tokenDatabase } = require('./config.json');
const mongoose = require ('mongoose');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });


//Command Manager
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

//Erreur si il trouve pas la commande

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}});

client.once(Events.ClientReady, c => {

	console.log(`Ready! Logged in as ${c.user.tag}`);
});

mongoose.connect(tokenDatabase, {
	autoIndex: false,
	maxPoolSize: 10,
	serverSelectionTimeoutMS: 5000,
	socketTimeoutMS: 45000,
	family: 4
}).then(() => {console.log('connecté à bdd')}).catch(err => {console.log(err);});
client.login(token);