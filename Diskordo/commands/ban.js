

const { SlashCommandBuilder } = require('discord.js');

//create a ban command  with the ban @user
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a user')
        .addUserOption(option => option.setName('user').setDescription('The user to ban').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the ban')),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');
        //role check
        if (interaction.member.roles.cache.some(role => role.name === 'Admin')) {
            if (user) {
                const member = interaction.guild.members.cache.get(user.id);
                if (member) {
                    member
                        .ban({
                            reason: reason,
                        })
                        .then(() => {
                            interaction.reply(`Successfully banned ${user.tag}`);
                        })
                        .catch(err => {
                            interaction.reply('I was unable to ban the member');
                            console.error(err);
                        });
                } else {
                    interaction.reply("That user isn't in this guild!");
                }
            }
        }
        else {
            interaction.reply('You do not have the permissions to use this command!');
        }

    }


}