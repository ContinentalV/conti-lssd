const { SlashCommandBuilder } = require('discord.js')

const axios = require('axios');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Envoie les information général de continental V.'),
  async execute(interaction) {

  }
}