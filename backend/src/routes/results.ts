import restify = require('restify');
import { default as connectToDb } from '../db';

const baseExtension = '/results';

export class ResultsAPI {

  async getAllResults(req: restify.Request, res: restify.Response, next: any) {
    const dbConn = await connectToDb('models');
    await dbConn?.get()
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

  async getResultsForModel(req: restify.Request, res: restify.Response, next: any) {
    const model = req.params.model;
    const dbConn = await connectToDb('models');
    await dbConn?.get({ model: model })
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
    server.get(`${baseExtension}`, this.getAllResults);
    server.get(`${baseExtension}/:model`, this.getResultsForModel);
  }
}
