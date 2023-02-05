const { Schema, model } = require("mongoose");

const MyMatchesSchema = new Schema(
    {
        matchId: {
            type: Number,
        },
        members: [
            {
                memberId: String
            }
        ],
        season: String,
        status: String,
        phase: String,
        voiceChannelId: String,
        statusMessasgeId: String,
        blueVoiceChannelId: String,
        redVoiceChannelId: String,
        winningTeam: String,
        endedAt: String,
        losedRounds: Number,
        totalRounds: Number,
        draw: Boolean,
        overtime: Boolean,
        rank: Number,
        createdAt: String,
        textChannelId: String,
        channelName: String,
        unrated: Boolean,
        killReason: String,
        map: String,
        startedAt: String,
    },
    {
        versionKey: false,
        _id: false
    }
);

module.exports = model('Matches', MyMatchesSchema, 'Matches');