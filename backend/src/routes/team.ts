import restify = require('restify');
import { default as connectToDb } from '../db';

const baseExtension = '/team';

export class TeamsAPI {

  async getHomeStatsForTeam(req: restify.Request, res: restify.Response, next: any) {
    const team = req.params.team;
    const season = req.params.season;
    const dbConn = await connectToDb();
    await dbConn.get({ home: team, season: season })
                .then((response:any) => {
                  res.contentType = 'json';
                  res.send(response);
                })
                .catch((error:any) => {
                  console.error(error);
                })
                .finally(() => {
                  next();
                });
  }

  async getAwayStatsForTeam(req: restify.Request, res: restify.Response, next: any) {
    const team = req.params.team;
    const season = req.params.season;
    const dbConn = await connectToDb();
    await dbConn.get({ away: team, season: season })
                .then((response:any) => {
                  res.contentType = 'json';
                  res.send(response);
                })
                .catch((error:any) => {
                  console.error(error);
                })
                .finally(() => {
                  next();
                });
  }

  initialize(server:restify.Server) {
    server.get(`${baseExtension}/:team/homeSeasonStats/:season`, this.getHomeStatsForTeam);
    server.get(`${baseExtension}/:team/awaySeasonStats/:season`, this.getAwayStatsForTeam);
  }
}
