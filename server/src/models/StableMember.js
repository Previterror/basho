import { Schema } from "mongoose";

export const StableMemberSchema = new Schema({
    wrestlerId: { type: Number, required: true, ref: 'Wrestler' },
    leagueId: { type: Schema.ObjectId, required: true, ref: 'League' },
    playerId: { type: Schema.ObjectId, required: true, ref: 'Player' },
}, {
    timestamps: true, toJSON: { virtuals: true }
})

StableMemberSchema.virtual('player', {
    localField: 'playerId',
    ref: 'Player',
    foreignField: '_id',
})

StableMemberSchema.virtual('wrestler', {
    localField: 'wrestlerId',
    ref: 'Wrestler',
    foreignField: 'rikishiId',
    justOne: true
})

StableMemberSchema.virtual('league', {
    localField: 'leagueId',
    ref: 'League',
    foreignField: '_id',
})