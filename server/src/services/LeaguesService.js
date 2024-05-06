import { dbContext } from "../db/DbContext.js"
import { logger } from "../utils/Logger.js"



class LeaguesService {
    async createPlayer(newPlayerData) {

        const existingPlayer = await dbContext.Players.findById(newPlayerData.accountId)
        if (existingPlayer) {
            existingPlayer.leagues.push(newPlayerData.leagueId)
        }



        logger.log('service received', newPlayerData)
        const newPlayer = await dbContext.Players.create(newPlayerData)
        newPlayer.populate('league profile')
        return newPlayer
    }

    // async addWrestlertoStable(wrestlerId, userId) {
    //     const addedWrestler = await dbContext.StableMembers.create(wrestlerId, userId)
    //     await addedWrestler.populate('player wrestler league')
    // }

    async createNewLeague(leagueData) {
        const newLeague = await dbContext.Leagues.create(leagueData)
        await newLeague.populate('creator tournament')
        return newLeague
    }

    async getAllLeagues() {
        const leagues = await dbContext.Leagues.find().populate('creator tournament', '-email')
        return leagues
    }

    async getLeagueById(leagueId) {
        const league = await dbContext.Leagues.findById(leagueId)
        league.populate('creator tournament', '-email')
        return league
    }

}

export const leaguesService = new LeaguesService