const { SlashCommandBuilder } = require('@discordjs/builders');
const { get } = require('node-superfetch');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('youtube')
        .setDescription('Affiche la dernière vidéo de la chaîne de La Rochelle Univ'),
    async execute(interaction) {
        const {body} = await get('https://www.googleapis.com/youtube/v3/search')
            .query({
                part: 'snippet',
                order: 'date',
                type: 'video',
                channelId: 'UC-Cf7Z00cbodH9qC8i7SHXA',
                maxResults: 1,
                key: 'AIzaSyCPJ4DY4GWi34FzgXfhos9NUlZOuJvPeWc'
            });
        await interaction.reply(`https://www.youtube.com/watch?v=${body.items[0].id.videoId}`);
    }
}