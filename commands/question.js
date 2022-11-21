const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('question')
	.setDescription('Replies with your input!')
	.addStringOption(option =>
		option.setName('test')
			.setDescription('desc')),
    async execute(interaction) {
		const reply = interaction.options.getString('test');

        await interaction.reply(reply);
	},
};