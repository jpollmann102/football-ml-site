import restify = require('restify');
import cors = require('restify-cors-middleware');

import * as api from './routes/routes';

var server = restify.createServer({ name: 'football-restify-server' });
const corsOptions = cors({
  origins: ['*'],
  allowHeaders: [],
  exposeHeaders: []
});

server.pre(corsOptions.preflight);
server.use(corsOptions.actual);

server.use(restify.plugins.bodyParser({ mapParams: true }));
server.use(restify.plugins.queryParser({ mapParams: true }));
server.use(restify.plugins.acceptParser( server.acceptable ));

let teams = new api.TeamsAPI();
teams.initialize(server);

let scores = new api.ScoresAPI();
scores.initialize(server);

let results = new api.ResultsAPI();
results.initialize(server);

server.listen(8626, () => {
  console.log('%s listening at %s', server.name, server.url);
});
