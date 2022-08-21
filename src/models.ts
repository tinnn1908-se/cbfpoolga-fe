export interface Game {
    date: string,
    venue: string,
    name: string,
    shortName: string,
    awayTeam: {
        name: string,
        score: string
    },
    homeTeam: {
        name: string,
        score: string
    }
}