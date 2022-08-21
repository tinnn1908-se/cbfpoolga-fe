import React, { useEffect, useState } from 'react'
import { Game } from '../models';
import NFLSheetService from '../services/nflsheet.service';
import '../css/nflsheet.scss'
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Checkbox } from '@mui/material';
import Form from 'react-bootstrap/Form';

const NFLSheetView = () => {
    const [games, setGames] = useState<Array<Game>>([]);
    useEffect(() => {
        async function fetchGames() {
            var response = await NFLSheetService.getGames();
            if (response && response.length > 0) {
                setGames(response);
            } else {
                console.log("empty")
            }
        }
        fetchGames();
    }, [])

    return (
        <div className='nflsheet'>
            <div className='__top' >
                <h3>Due :Friday, August , 26,2022</h3>
                <h3>Cash App: $CBFPOOLGA</h3>
            </div>
            <div className='__middle' >
                <Container>
                    <Row>
                        <Col>
                            <Table bordered  >
                                <thead>
                                    <tr>
                                        <th colSpan={13} >Pre 3</th>
                                    </tr>
                                    <tr>
                                        <th colSpan={13} >WWW.CBFPOOLGA.COM</th>
                                    </tr>
                                    <tr>
                                        <th colSpan={13} ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th> </th>
                                        <th colSpan={5}>Away</th>
                                        <th></th>
                                        <th colSpan={5}>Home</th>
                                        <th> </th>
                                    </tr>
                                    {
                                        games.map((game, index) => (
                                            <tr>
                                                <th style={{
                                                    'fontSize': '16px',
                                                    'fontWeight': 'lighter'
                                                }}  >{(index + 1) * 2 - 1}</th>
                                                <th style={{
                                                    'fontSize': '16px',
                                                    'fontWeight': 'lighter'
                                                }} colSpan={5}>{game.shortName.split('@')[0]}</th>
                                                <th style={{
                                                    'fontSize': '16px',
                                                    'fontWeight': 'lighter'
                                                }}  >@</th>
                                                <th style={{
                                                    'fontSize': '16px',
                                                    'fontWeight': 'lighter'
                                                }} colSpan={5}>{game.shortName.split('@')[1]}</th>
                                                <th style={{
                                                    'fontSize': '16px',
                                                    'fontWeight': 'lighter'
                                                }}  >{(index + 1) * 2}</th>
                                            </tr>
                                        ))
                                    }
                                    <tr>
                                        <th style={{
                                            'fontSize': '16px',
                                            'fontWeight': 'lighter'
                                        }} colSpan={13} >^^ Tiebreaker IS LAST GAME ON THE SHEET ^^</th>
                                    </tr>
                                    <tr>
                                        <th colSpan={13} >TOTAL COMBINED SCORE FOR TIE BREAKER GAME</th>
                                    </tr>

                                </tbody>
                            </Table>
                        </Col>
                        <Col>
                            <Table bordered responsive>
                                <thead>
                                    <tr>
                                        <th style={{
                                            'fontSize': '16px',

                                        }} colSpan={18} >PUT A "X" IN THE BOX FOR EACH WINNING TEAM</th>
                                    </tr>
                                    <tr>
                                        <th colSpan={8} style={{
                                            'fontSize': '14px',

                                        }} >PICK 1 - $10 TOTAL</th>
                                        <th colSpan={2} ></th>
                                        <th colSpan={8} style={{
                                            'fontSize': '14px',

                                        }} >PICK 2 - $20 TOTAL</th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th style={{
                                            'fontSize': '14px',
                                            'textDecoration': 'underline'
                                        }} colSpan={3}>Away</th>
                                        <th style={{
                                            'fontSize': '14px',
                                            'textDecoration': 'underline'
                                        }} colSpan={3}>Home
                                        </th>
                                        <th></th>
                                        <th colSpan={2} ></th>
                                        <th></th>
                                        <th style={{
                                            'fontSize': '14px',
                                            'textDecoration': 'underline'
                                        }} colSpan={3}>Away</th>
                                        <th style={{
                                            'fontSize': '14px',
                                            'textDecoration': 'underline'
                                        }} colSpan={3}>                                        <th colSpan={3}>Home</th>
                                        </th>
                                        <th></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {games.map((game, index) => (
                                        <tr>
                                            <th>{(index + 1) * 2 - 1}</th>
                                            <th style={{
                                                'fontSize': '14px'

                                            }} colSpan={3}><Form.Check
                                                    inline
                                                    name={`group-1-${index}`}
                                                    type='radio'
                                                    id={`inline-radio-1`}
                                                /></th>
                                            <th style={{
                                                'fontSize': '14px',
                                            }} colSpan={3}>
                                                <Form.Check
                                                    inline
                                                    name={`group-1-${index}`}
                                                    type='radio'
                                                    id={`inline-radio-2`}
                                                />
                                            </th>
                                            <th>{(index + 1) * 2}</th>
                                            <th colSpan={2} ></th>
                                            <th>{(index + 1) * 2 - 1}</th>
                                            <th style={{
                                                'fontSize': '14px',
                                            }} colSpan={3}>
                                                <Form.Check
                                                    inline
                                                    name={`group-2-${index}`}
                                                    type='radio'
                                                    id={`inline-radio-3`}
                                                /></th>
                                            <th style={{
                                                'fontSize': '14px',
                                            }} colSpan={3}><Form.Check
                                                    inline
                                                    name={`group-2-${index}`}
                                                    type='radio'
                                                    id={`inline-radio-4`}
                                                />
                                            </th>
                                            <th>{(index + 1) * 2}</th>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    {
                        Array.from([1, 2]).map((i) => (
                            <Container>
                                <Row>
                                    <Col>
                                        <Table bordered responsive>
                                            <thead>
                                                <tr>
                                                    <th style={{
                                                        'fontSize': '16px',

                                                    }} colSpan={18} >PUT A "X" IN THE BOX FOR EACH WINNING TEAM</th>
                                                </tr>
                                                <tr>
                                                    <th colSpan={8} style={{
                                                        'fontSize': '14px',

                                                    }} >PICK {(i * 4 - 1)} - ${(i * 4 - 1) * 10} TOTAL</th>
                                                    <th colSpan={2} ></th>
                                                    <th colSpan={8} style={{
                                                        'fontSize': '14px',

                                                    }} >PICK {(i * 4)} - ${(i * 4) * 10} TOTAL</th>
                                                </tr>
                                                <tr>
                                                    <th></th>
                                                    <th style={{
                                                        'fontSize': '14px',
                                                        'textDecoration': 'underline'
                                                    }} colSpan={3}>Away</th>
                                                    <th style={{
                                                        'fontSize': '14px',
                                                        'textDecoration': 'underline'
                                                    }} colSpan={3}>Home
                                                    </th>
                                                    <th></th>
                                                    <th colSpan={2} ></th>
                                                    <th></th>
                                                    <th style={{
                                                        'fontSize': '14px',
                                                        'textDecoration': 'underline'
                                                    }} colSpan={3}>Away</th>
                                                    <th style={{
                                                        'fontSize': '14px',
                                                        'textDecoration': 'underline'
                                                    }} colSpan={3}>                                        <th colSpan={3}>Home</th>
                                                    </th>
                                                    <th></th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {games.map((game, index) => (
                                                    <tr>
                                                        <th>{(index + 1) * 2 - 1}</th>
                                                        <th style={{
                                                            'fontSize': '14px'

                                                        }} colSpan={3}><Form.Check
                                                                inline
                                                                name={`group-${(i * 4 - 1)}-${index}`}
                                                                type='radio'
                                                                id={`inline-radio-1`}
                                                            /></th>
                                                        <th style={{
                                                            'fontSize': '14px',
                                                        }} colSpan={3}>
                                                            <Form.Check
                                                                inline
                                                                name={`group-${(i * 4 - 1)}-${index}`}
                                                                type='radio'
                                                                id={`inline-radio-2`}
                                                            />
                                                        </th>
                                                        <th>{(index + 1) * 2}</th>
                                                        <th colSpan={2} ></th>
                                                        <th>{(index + 1) * 2 - 1}</th>
                                                        <th style={{
                                                            'fontSize': '14px',
                                                        }} colSpan={3}>
                                                            <Form.Check
                                                                inline
                                                                name={`group-${(i * 4)}-${index}`}
                                                                type='radio'
                                                                id={`inline-radio-3`}
                                                            /></th>
                                                        <th style={{
                                                            'fontSize': '14px',
                                                        }} colSpan={3}><Form.Check
                                                                inline
                                                                name={`group-${(i * 4)}-${index}`}
                                                                type='radio'
                                                                id={`inline-radio-4`}
                                                            />
                                                        </th>
                                                        <th>{(index + 1) * 2}</th>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Col>
                                    <Col>
                                        <Table bordered responsive>
                                            <thead>
                                                <tr>
                                                    <th style={{
                                                        'fontSize': '16px',

                                                    }} colSpan={18} >PUT A "X" IN THE BOX FOR EACH WINNING TEAM</th>
                                                </tr>
                                                <tr>
                                                    <th colSpan={8} style={{
                                                        'fontSize': '14px',

                                                    }} >PICK {(i * 4 + 1)} - ${(i * 4 + 1) * 10} TOTAL</th>
                                                    <th colSpan={2} ></th>
                                                    <th colSpan={8} style={{
                                                        'fontSize': '14px',

                                                    }} >PICK {(i * 4 + 2)} - ${(i * 4 + 2) * 10} TOTAL</th>
                                                </tr>
                                                <tr>
                                                    <th></th>
                                                    <th style={{
                                                        'fontSize': '14px',
                                                        'textDecoration': 'underline'
                                                    }} colSpan={3}>Away</th>
                                                    <th style={{
                                                        'fontSize': '14px',
                                                        'textDecoration': 'underline'
                                                    }} colSpan={3}>Home
                                                    </th>
                                                    <th></th>
                                                    <th colSpan={2} ></th>
                                                    <th></th>
                                                    <th style={{
                                                        'fontSize': '14px',
                                                        'textDecoration': 'underline'
                                                    }} colSpan={3}>Away</th>
                                                    <th style={{
                                                        'fontSize': '14px',
                                                        'textDecoration': 'underline'
                                                    }} colSpan={3}>                                        <th colSpan={3}>Home</th>
                                                    </th>
                                                    <th></th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {games.map((game, index) => (
                                                    <tr>
                                                        <th>{(index + 1) * 2 - 1}</th>
                                                        <th style={{
                                                            'fontSize': '14px'

                                                        }} colSpan={3}><Form.Check
                                                                inline
                                                                name={`group-${(i * 4 + 1)}-${index}`}
                                                                type='radio'
                                                                id={`inline-radio-1`}
                                                            /></th>
                                                        <th style={{
                                                            'fontSize': '14px',
                                                        }} colSpan={3}>
                                                            <Form.Check
                                                                inline
                                                                name={`group-${(i * 4 + 1)}-${index}`}
                                                                type='radio'
                                                                id={`inline-radio-2`}
                                                            />
                                                        </th>
                                                        <th>{(index + 1) * 2}</th>
                                                        <th colSpan={2} ></th>
                                                        <th>{(index + 1) * 2 - 1}</th>
                                                        <th style={{
                                                            'fontSize': '14px',
                                                        }} colSpan={3}>
                                                            <Form.Check
                                                                inline
                                                                name={`group-${(i * 4 + 2)}-${index}`}
                                                                type='radio'
                                                                id={`inline-radio-3`}
                                                            /></th>
                                                        <th style={{
                                                            'fontSize': '14px',
                                                        }} colSpan={3}><Form.Check
                                                                inline
                                                                name={`group-${(i * 4 + 2)}-${index}`}
                                                                type='radio'
                                                                id={`inline-radio-4`}
                                                            />
                                                        </th>
                                                        <th>{(index + 1) * 2}</th>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                            </Container>
                        ))
                    }
                </Container>
            </div>
            <div className='__bottom' >
                <h3>WWW.CBFPOOLGA.COM</h3>
            </div>
        </div>
    )
}

export default NFLSheetView