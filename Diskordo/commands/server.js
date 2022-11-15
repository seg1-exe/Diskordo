const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Donne des infos sur le serveur.'),
    async execute(interaction) {
        // interaction.guild is the object representing the Guild in which the command was run
        await interaction.reply(`Le serveur ce nomme  ${interaction.guild.name} et a ${interaction.guild.memberCount} membres.`);
    },
};
