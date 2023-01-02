const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('liens')
        .setDescription("Affichage des liens de l'Université"),


    async execute(interaction) {
        const exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Liens officiels de l'Université de La Rochelle")
            .setAuthor({ name: 'Information'})
            .setThumbnail('https://www.univ-larochelle.fr/wp-content/uploads/png/logo-universite-de-la-rochelle-2X.png')
            .addFields({name:'ENT : ', value: 'https://ent.univ-lr.fr/uPortal/f/u28l1s14/normal/render.uP', inline: true })
            .addFields({name:'Moodle : ', value:'https://etudiant.univ-lr.fr/?_action=caslogin', inline:true})
            .addFields({name:'Messagerie étudiante', value:'https://etudiant.univ-lr.fr/?_action=caslogin', inline:true})
            .addFields({name:'EDT', value:'https://apps.univ-lr.fr/cgi-bin/WebObjects/EdtWeb.woa/wa/casLogin', inline:true})

        await interaction.reply({ embeds: [exampleEmbed] });
    },
};