const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('add')
	.setDescription("Ajouter un professeur à la liste."),
    async execute(interaction){
        
    }
};