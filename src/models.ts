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
    username: string,
    tiebreak: string,
    isChanged: boolean
    pickingdetails: Array<Pickingdetail>
}
export interface PickingResponse {
    id: string,
    entry: string,
    username: string,
    tiebreak: string,
    counter: number;
    pickingdetails: Array<Pickingdetail>
}
export interface Pickingdetail {
    gameNo: number,
    awayteam: string,
    awayscore: string,
    awaynumber: number,
    hometeam: string,
    homescore: string,
    homenumber: number,
    selected_team: string,
    isLastgame: boolean,
    pickingDetailId: string,
    isChanged: boolean
}

export const initialPickingDetail: Pickingdetail = {
    gameNo: 9999,
    pickingDetailId: '',
    awayteam: '',
    awaynumber: 0,
    awayscore: '',
    homenumber: 0,
    homescore: '',
    hometeam: '',
    isChanged: false,
    isLastgame: false,
    selected_team: ''
}

export interface User {
    id: string,
    username: string,
    password: string,
    email: string,
    created_date: string,
    is_activated: boolean,
    is_deleted: boolean,
    tokens: {
        access_token: string,
        refresh_token: string
    }
}
export interface SignupRequest {
    username: string,
    password: string,
    email: string,
    confirmPassword: string
}

export interface SigninRequest {
    username: string,
    email: string,
    password: string
}
export const initialSignupRequest: SignupRequest = {
    username: '',
    password: '',
    email: '',
    confirmPassword: ''
}

export interface IAuth {
    isLoggedIn: boolean,
    user: User | null,
    tokens: {
        access_token: string,
        refresh_token: string
    };
}
export const initialAuth: IAuth = {
    isLoggedIn: false,
    user: null,
    tokens: {
        access_token: '',
        refresh_token: ''
    }
}

export interface IModal {
    title: string,
    isOpen: boolean,
    message: string
}