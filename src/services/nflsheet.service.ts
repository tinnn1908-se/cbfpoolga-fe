import NFLSheetAPI from "../apis/nflsheet.http";

export default class NFLSheetService {
    static async getGames() {
        var games = await NFLSheetAPI.getGames();
        console.log("NFLSheetService : " + games)
        return games;
    }
}