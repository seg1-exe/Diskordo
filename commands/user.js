const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Donne des infos par rapport à un utilisateur.'),
    async execute(interaction) {
        await interaction.reply(`La commande a été utilisé par ${interaction.user.username}, qui à rejoint le ${interaction.member.joinedAt}.`);
    },
};
