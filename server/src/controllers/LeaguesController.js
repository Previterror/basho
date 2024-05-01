import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { leaguesService } from "../services/LeaguesService.js";


export class LeaguesController extends BaseController {
    constructor() {
        super('api/leagues')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createNewLeague)
            .post('/:wrestlerId')
    }

    async createNewLeague(request, response, next) {
        try {
            const user = request.userInfo
            const leagueData = request.body
            leagueData.creatorId = user.id
            const newLeague = await leaguesService.createNewLeague(leagueData)
            response.send(newLeague)
        } catch (error) {
            next(error)
        }
    }

    async addWrestlertoStable(request, response, next) {
        try {
            const user = request.userInfo
            const wrestlerId = request.params.wrestlerId


            const addedWrestler = await leaguesService.addWrestlertoStable(wrestlerId, user.id)
            response.send(addedWrestler)
        } catch (error) {
            next(error)
        }
    }
}