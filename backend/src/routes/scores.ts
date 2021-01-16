import restify = require('restify');
const fetch = require('node-fetch');
const baseExtension = '/scores';

export class ScoresAPI {

  async getLiveScores(req: restify.Request, res: restify.Response, next: any) {
    fetch('http://static.nfl.com/liveupdate/scores/scores.json', { method: "Get" })
    .then((response:any) => response.json())
    .then((json:any) => {
      res.contentType = 'json';
      res.send(json);
    })
    .catch((error:any) => {
      console.error(error);
    })
    .finally(() => {
      next();
    });
  }

  initialize(server:restify.Server) {
    server.get(`${baseExtension}`, this.getLiveScores);
  }
}
