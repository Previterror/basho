import { Auth0Provider } from "@bcwdev/auth0provider/lib/Auth0Provider.js";
import BaseController from "../utils/BaseController.js";
import { stableMembersService } from "../services/StableMembersService.js";

export class StableMembersController extends BaseController {
    constructor() {
        super('api/stablemembers')
        this.router
            .get('/:leagueId', this.getStablemembersByLeague)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.addWrestlertoStable)
            .get('/:accountId', this.getStablebyAccountId)
    }

    async getStablebyAccountId(request, response, next) {
        try {
            const accountId = request.params.accountId
            const leagueId = request.body
            const stable = await stableMembersService.getStablebyAccountId(accountId, leagueId)
            response.send(stable)
        } catch (error) {
            next(error)
        }
    }
    async getStablemembersByLeague(request, response, next) {
        try {
            const leagueId = request.params.leagueId
            const stablemembersbyleague = await stableMembersService.getStablemembersByLeague(leagueId)
            response.send(stablemembersbyleague)
        } catch (error) {
            next(error)
        }
    }



    async addWrestlertoStable(request, response, next) {
        try {
            const user = request.userInfo
            const stableMemberData = request.body
            stableMemberData.playerId = user.id
            const stableMember = await stableMembersService.addWrestlertoStable(stableMemberData)
            response.send(stableMember)
        } catch (error) {
            next(error)
        }
    }

}