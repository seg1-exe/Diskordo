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
        const thread = await channel.threads.create({
            name: 'reply',
            autoArchiveDuration: 60,
            reason: 'Needed a separate thread for food',
        });
        
        console.log(`Created thread: ${thread.name}`);

        await interaction.reply(thread);
	},
};