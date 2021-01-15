import csvdb = require('csv-database');

async function connectToDB() {
  const db = await csvdb("nflPrepared.csv", ['date','season','away','home','passing_yards_away','passing_yards_home','rushing_yards_away','rushing_yards_home','total_yards_away','total_yards_home','attempts_away','attempts_home','completions_away','completions_home','sacks_away','sacks_home','rushing_attempts_away','rushing_attempts_home','fumbles_away','fumbles_home','int_away','int_home','turnovers_away','turnovers_home','drives_away','drives_home','def_st_td_away','def_st_td_home','score_away','score_home','home_season_pass_yards','away_season_pass_yards','home_season_pass_attempts','away_season_pass_attempts','home_season_rush_yards','away_season_rush_yards','home_season_rush_attempts','away_season_rush_attempts','home_season_points_scored','away_season_points_scored','home_season_yardage','away_season_yardage','home_season_defensive_td','away_season_defensive_td','home_pass_yards_per_attempt','away_pass_yards_per_attempt','home_rush_yards_per_attempt','away_rush_yards_per_attempt','home_turnovers_per_game','away_turnovers_per_game','home_sacks_per_game','away_sacks_per_game','home_fumbles_per_game','away_fumbles_per_game','home_int_per_game','away_int_per_game','home_forced_int_per_game','away_forced_int_per_game','home_forced_fumbles_per_game','away_forced_fumbles_per_game','home_forced_turnovers_per_game','away_forced_turnovers_per_game'], ",");
  return db;
}

export default connectToDB;
