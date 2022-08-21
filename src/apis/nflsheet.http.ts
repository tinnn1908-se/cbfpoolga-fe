import axios from 'axios';
import request from 'axios'
import { Game } from '../models';
export default class NFLSheetAPI {
    static async getGames() {
        try {
            var games: Array<Game> = [];
            var response = await axios.get('https://nfl-schedule.p.rapidapi.com/v1/schedules', {
                headers: {
                    'X-RapidAPI-Key': '2fe0a14911msh9ef5c00a39f0359p1fc081jsn2ae0f5af93bd',
                    'X-RapidAPI-Host': 'nfl-schedule.p.rapidapi.com',
                    'Content-Type': 'application/json'
                }
            })
            console.log(response.data)
            if (response && response.data){
                games = response.data.data
                console.log("games : " + games)
            };
            return games;
        } catch (error) {
            if (request.isAxiosError(error) && error.response) {
                return [];
            }
        }
    }
}