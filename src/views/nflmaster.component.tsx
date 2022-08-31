import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap'
import UserAPI from '../apis/http.user';
import { Game, Picking, PickingResponse } from '../models';
import { MutatingDots } from 'react-loader-spinner'

const NFLMasterView = () => {
    const [pickings, setpickings] = useState<Array<PickingResponse>>([]);
    const [awayTeams, setAwayTeams] = useState<Array<String>>([]);
    const [homeTeams, setHomeTeams] = useState<Array<String>>([]);
    useEffect(() => {
        async function fetchPickings() {
            var response = await UserAPI.getPickings();
            if (response && response.length > 0) {
                setpickings(response);
            } else {
                console.log("empty")
            }
        }
        fetchPickings();
    }, [])
    if (pickings.length > 0) {
        return (
            <div className='nflmaster' >
                <Container>
                    <Row>
                        <Col>
                            <Table striped bordered responsive style={{
                                'marginTop': '150px',
                                'marginBottom': ' 150px'
                            }}>
                                <tbody>
                                    <tr><th style={{ 'textAlign': 'center' }} colSpan={(pickings[0].pickingdetails.length + 8)} >Pre 3</th></tr>
                                    <tr>
                                        <th colSpan={5}>PTS - 510</th>
                                        <th colSpan={1}></th>
                                        <th colSpan={1}>Away</th>
                                        {pickings[0].pickingdetails.map(pickingdetail => (
                                            <th colSpan={1}>{pickingdetail.awayteam}</th>
                                        ))}
                                        <th colSpan={1}></th>
                                    </tr>
                                    <tr>
                                        <th colSpan={5}></th>
                                        <th colSpan={1}>Entry</th>
                                        <th colSpan={1}>Home</th>
                                        {pickings[0].pickingdetails.map(pickingdetail => (
                                            <th colSpan={1}>{pickingdetail.hometeam}</th>
                                        ))}
                                        <th colSpan={1}>Tie</th>
                                    </tr>
                                    <tr style={{ 'backgroundColor': 'gray' }}>
                                        <th colSpan={5}>Wining team</th>
                                        <th colSpan={1}></th>
                                        <th colSpan={1}>#</th>
                                        {pickings[0].pickingdetails.map(pickingdetail => (
                                            <th colSpan={1}></th>
                                        ))}
                                        <th colSpan={1}></th>
                                    </tr>
                                    {
                                        pickings.map(picking => (
                                            <tr>
                                                <th colSpan={5}>{picking.username}</th>
                                                <th colSpan={1}>{(picking.counter < 10) ? `0${picking.counter}.${Number(picking.entry)}` : `${picking.counter}.${Number(picking.entry)}`}</th>
                                                <th colSpan={1}>0</th>
                                                {pickings[0].pickingdetails.map(pickingdetail => (
                                                    <th colSpan={1}>{pickingdetail.selected_team}</th>
                                                ))}
                                                <th colSpan={1}>{picking.tiebreak}</th>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    } else {
        return (
            <div className='loading'>
                <MutatingDots
                    height="100"
                    width="100"
                    color="#4fa94d"
                    secondaryColor='#4fa94d'
                    radius='12.5'
                    ariaLabel="mutating-dots-loading"
                    wrapperStyle={{
                        'display': 'flex',
                        'flexDirection': 'column',
                        'justifyContent': 'center',
                        'alignItems': 'center',
                    }}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        )
    }
}

export default NFLMasterView