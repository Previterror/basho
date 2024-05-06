/* eslint-disable no-console */
import { AppState } from "../AppState.js"
import { League } from "../models/League.js"
import { router } from "../router.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { tournamentsService } from "./TournamentsService.js"




class LeaguesService {
  async createNewLeague(leagueData) {
    await tournamentsService.getBashoById()
    leagueData.tournamentId = AppState.activeTournament.bashoId
    const response = await api.post(`api/leagues`, leagueData)
    console.log('🦒', response.data);
    const newLeague = new League(response.data)

    console.log('active tourn 1', AppState.activeTournament);
    console.log('new league 2', newLeague);

    // router.push({ name: 'ActiveLeague', params: { leagueId: newLeague.id } })
    console.log('New league probably created', newLeague);
    // AppState.leagues.push(newLeague)

    // router.push(`activeLeague/${newLeague.id}`)

    // console.log('league actually created', AppState.leagues); xx
    // AppState.activeLeague=newLeague xx
    // console.log('active league', AppState.activeLeague); xx
    // console.log("active league", AppState.activeLeague);
    // return newLeague xx
    // AppState.activeLeague = response.data
  }





  async getLeagueById(leagueId) {
    const response = await api.get(`api/leagues/${leagueId}`)
    console.log('found league', leagueId);
  }

}


export const leaguesService = new LeaguesService