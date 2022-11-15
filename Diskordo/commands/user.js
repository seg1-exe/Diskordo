const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Donne des infos par rapport à un utilisateur.'),
    async execute(interaction) {
        // interaction.user is the object representing the User who ran the command
        // interaction.member is the GuildMember object, which represents the user in the specific guild
        await interaction.reply(`La commande a été utilisé par ${interaction.user.username}, qui à rejoint le ${interaction.member.joinedAt}.`);
    },
};
