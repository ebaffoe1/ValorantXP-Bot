const { Schema, model } = require("mongoose");

const MyUserSchema = new Schema(
    {
        discordId: {
            type: String
        },
        baseXp: {
            type: Number
        },
        gameLineTag: {
            type: String
        },
        inGameName: {
            type: String
        },
        verification: {
            state: {
                type: String
            }
        },
        activeWizard: {
            type: String
        },
        unCountedMatches: [{
            matchId: Number
        }],
        region: {
            type: String
        },
        performance: {
            win: Number,
            lose: Number,
            draw: Number
        },
        rank: {
            type: String
        },
        valorantRank: {
            type: String
        }
    },
    {
        versionKey: false,
        _id: false
    }
);

module.exports = model('User', MyUserSchema, 'User');