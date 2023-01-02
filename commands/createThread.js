const { SlashCommandBuilder, messageLink } = require('discord.js');


/*
Explication du code :

L'utilisateur réalise la commande /question [argument], grace au getString on récupère l'intitulé de la question afin de créer un channel thread portant comme nom l'intitulé de la question. Le bot mentionne alors le rôle Professeur dans le channel thread créé.
*/
module.exports = {
	data: new SlashCommandBuilder()
    .setName('question')
	.setDescription('Vous avez une question à poser à un professeur ? Allez-y !')
	.addStringOption(option =>
		option.setName('questionnement')
			.setDescription("Posez votre question et un channel sera créé afin d'en parler avec un professeur.")),
    async execute(interaction) {
		const reply = interaction.options.getString('questionnement');
        const thread = await interaction.channel.threads.create({
            name: reply,
            autoArchiveDuration: 60,
        });
        await thread.send({content : `<@&1044351028847460369>`})

        await interaction.reply({content : 'Votre question a été posée dans le salon suivant :', ephemeral : true})
	},
};