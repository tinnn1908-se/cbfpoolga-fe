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

export interface Picking {
    id: string,
    entry: string,
    user_id: string,
    tiebreak: number,
    isChanged : boolean
}

export interface Pickingdetails {
    awayteam: string,
    awayscore: string,
    awaynumber: number,
    hometeam: string,
    homescore: string,
    homenumber: number,
    selected_team_number: number,
    isLastgame: boolean,
    pickingId: string,
    isChanged : boolean
}

export interface User {
    id: string,
    username: string,
    password: string,
    email: string,
    created_date: string,
    is_activated: boolean,
    is_deleted: boolean
}