const { Schema, model } = require("mongoose");

const MyAnnouncementSchema = new Schema(
    {
        announcementId: String,
        title: String,
        body: String,
        isDmed: Boolean,
        expireAt: String,
        createdDate: String   
    },
    {
        versionKey: false,
        _id: false
    }
);

module.exports = model('Announcement', MyAnnouncementSchema, 'Announcement');