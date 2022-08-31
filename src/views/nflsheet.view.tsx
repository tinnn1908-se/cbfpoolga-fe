import React, { useEffect, useState } from 'react'
import { Game, IModal, initialPickingDetail, Picking, Pickingdetail } from '../models';
import NFLSheetService from '../services/nflsheet.service';
import '../css/nflsheet.scss'
import { Button, Col, Container, Modal, Row, Table } from 'react-bootstrap';
import { Checkbox, TextField } from '@mui/material';
import Form from 'react-bootstrap/Form';
import ReactToPrint from 'react-to-print'
import NFLSheetPDF from '../components/pdf/nflsheet.pdf';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { MutatingDots } from 'react-loader-spinner'
import '../css/loading.scss'
import MyHelper from '../helper';
import { useSelector } from 'react-redux';
import { authSelector } from '../redux/store';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/user.service';

const NFLSheetView = React.forwardRef<HTMLDivElement, any>((props, ref) => {
    const [games, setGames] = useState<Array<Game>>([]);
    const [pickings, setPickings] = useState<Array<Picking>>([]);
    const [currPickingDetail, setCurrPickingDetail] = useState<Pickingdetail>(initialPickingDetail);
    const [isLoading, setIsLoading] = useState(false);
    const [isDataChanged, setIsDataChanged] = useState(false);
    const auth = useSelector(authSelector);
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
    useEffect(() => {
        setIsLoading(false);
    }, [isDataChanged])
    const [modal, setModal] = useState<IModal>({
        title: '',
        isOpen: false,
        message: ''
    })
    // const navigate = useNavigate();
    function handleModalClose(event: React.MouseEvent) {
        var btnID = event.currentTarget.getAttribute('id');
        if (btnID === 'btnOK') {
            setModal({ ...modal, isOpen: false });
        } else {
            setModal({ ...modal, isOpen: false });
        }

    }
    const componentRef = useRef(null);
    const printHandler = useReactToPrint({
        content: () => componentRef.current
    })
    function onHideHandler() {
        setModal({ ...modal, isOpen: false });
    }
    async function onSubmitSheetsHandler(event: React.MouseEvent) {
        event.preventDefault();
        var isValidPickings = MyHelper.isValidPickings(pickings, games.length);
        var message = MyHelper.generateMessageForEmailSending(pickings);
        console.log('message : ' + message)

        if (isValidPickings) {
            setIsLoading(true);
            //send request
            var res = await UserService.submitSheets(pickings);
            setIsDataChanged(!isDataChanged);
            if (res) {
                // var isSent = await emailjs.send("service_ngoctin0001", "template_wrxck5l", {
                //     username: signupReq.username,
                //     url: `${APPCONSTANT.verify_email_base_url}/verifyemail/${token}`,
                //     cust_email: signupReq.email,
                // }, );
                if (auth && auth.user && auth.user.username && auth.user.email) {
                    var isSent = await emailjs.send("service_ngoctin0001", "template_gnduc3e", {
                        username: auth.user?.username,
                        from_name: "CBFPoolGA",
                        message: message,
                        cust_email: auth.user?.email,
                    },'rAEQCkSTv3QadJkmF');
                    if (isSent.status === 200) {
                        
                        setModal({
                            isOpen: true,
                            message: 'Your sheets is saved ! Please check your email !',
                            title: 'Submit Successfully !'
                        })
                    } else {
                        setModal({
                            isOpen: true,
                            message: 'Your sheets is saved ! But can not send the email !',
                            title: 'Submit Successfully !'
                        })
                    }
                } else {
                    setModal({
                        isOpen: true,
                        message: 'Please login again !',
                        title: 'Submit failed !'
                    })
                }
            } else {
                setModal({
                    isOpen: true,
                    message: 'Submit Failed ! Please try again !',
                    title: 'Submit failed !'
                })
            }
        } else {
            setModal({
                isOpen: true,
                message: 'Submit Failed ! Please try again !',
                title: 'Submit failed !'
            })
        }
    }
    function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        console.log('onChangeHandler')
        const name = event.currentTarget.getAttribute('name');
        const value = event.currentTarget.getAttribute('value');
        console.log(`name : ${name} + value : ${value}`);
        if (name && value) {
            var entry = name ? name.substring(6, 8) : '';
            var gameNo = name ? name.slice(-2) : '';
            console.log(`name : ${name} + entry : ${entry} + gameno : ${gameNo}`);
            var pickingPosition = MyHelper.getPickingPosition(pickings, entry);
            console.log('pickingPosition : ' + pickingPosition)
            if (pickingPosition != null) {
                console.log(`name : ${name} + value : ${value}`);
                var selectedPicking = pickings[pickingPosition];
                var pickingDetailPosition = MyHelper.getPickingDetailPosition(selectedPicking.pickingdetails, Number(gameNo));
                console.log('pickingPosition : ' + pickingPosition)
                console.log('pickingDetailPosition : ' + pickingDetailPosition)
                if (pickingDetailPosition != null) {
                    //update pickingDetailPosition in a Picking since it's existed
                    var selectedPickingDetail = selectedPicking.pickingdetails[pickingDetailPosition];
                    selectedPickingDetail.selected_team = value;
                    selectedPicking.pickingdetails[pickingDetailPosition] = selectedPickingDetail;
                    //update picking in pickings
                    var newPickings = [...pickings];
                    newPickings[pickingPosition] = selectedPicking;
                    console.log('pickingDetailPosition newPickings : ' + newPickings);
                    setPickings(newPickings);
                } else {
                    // create new picking detail
                    var pickingDetailId = MyHelper.generatePickingDetailID();
                    var selectedGame = games[Number(gameNo)];
                    var pickingdetail: Pickingdetail = {
                        pickingDetailId,
                        gameNo: Number(gameNo),
                        awayteam: selectedGame.shortName.split('@')[0],
                        awaynumber: ((Number(gameNo) + 1) * 2 - 1),
                        awayscore: selectedGame.awayTeam.score,
                        hometeam: selectedGame.shortName.split('@')[1],
                        homenumber: ((Number(gameNo) + 1) * 2),
                        homescore: selectedGame.homeTeam.score,
                        isChanged: true,
                        isLastgame: (Number(gameNo) === (games.length - 1)),
                        selected_team: value
                    }
                    selectedPicking.pickingdetails = [...selectedPicking.pickingdetails, pickingdetail];
                    //update picking in pickings
                    var newPickings = [...pickings];
                    newPickings[pickingPosition] = selectedPicking;
                    console.log('Not pickingDetailPosition newPickings : ' + newPickings);
                    setPickings(newPickings);
                }
            } else {// create new picking + new picking detail
                var pickingID = MyHelper.generateID();
                if (auth.user) {
                    // create new detail picking
                    var pickingDetailId = MyHelper.generatePickingDetailID();
                    var selectedGame = games[Number(gameNo)];
                    var pickingdetail: Pickingdetail = {
                        pickingDetailId,
                        gameNo: Number(gameNo),
                        awayteam: selectedGame.shortName.split('@')[0],
                        awaynumber: ((Number(gameNo) + 1) * 2 - 1),
                        awayscore: selectedGame.awayTeam.score,
                        hometeam: selectedGame.shortName.split('@')[1],
                        homenumber: ((Number(gameNo) + 1) * 2),
                        homescore: selectedGame.homeTeam.score,
                        isChanged: true,
                        isLastgame: (Number(gameNo) === (games.length - 1)),
                        selected_team: value
                    }
                    var picking: Picking = {
                        id: pickingID,
                        entry: entry,
                        isChanged: true,
                        pickingdetails: [pickingdetail],
                        tiebreak: '',
                        username: auth.user.username
                    }
                    // add new picking 

                    setPickings([...pickings, picking]);
                } else {
                    console.log("user is not log in yet !")
                }
            }
        } else {
            console.log('name or value is not existed !');
        }

    }
    function onTiebreakChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        const name = event.currentTarget.getAttribute('name');
        const value = event.currentTarget.value;
        console.log('onTiebreakChangeHandler : ' + value)
        if (name && value) {
            var entry = name ? name.substring(6, 8) : '';
            var pickingPosition = MyHelper.getPickingByEntry(pickings, entry);
            console.log('pickingPosition : ' + pickingPosition)
            if (MyHelper.isValidTiebreakNumber(value)) {
                if (pickingPosition != null) {
                    var picking: Picking = pickings[pickingPosition];
                    if (picking.isChanged) {
                        picking.tiebreak = value;
                        var newPickings = [...pickings];
                        newPickings[pickingPosition] = picking;
                        setPickings(newPickings);
                    } else {
                        setModal({
                            isOpen: true,
                            message: 'Please pick team before typing the tiebreak points',
                            title: 'Submit failed !'
                        })
                    }
                } else {
                    setModal({
                        isOpen: true,
                        message: 'Please pick team before typing the tiebreak points',
                        title: 'Submit failed !'
                    })
                }
            } else {
                setModal({
                    isOpen: true,
                    message: 'Only number is allowed ',
                    title: 'Submit failed !'
                })
                event.currentTarget.setAttribute('value', '');
            }
        } else {
            console.log("user is not log in yet !")
            setModal({
                isOpen: true,
                message: 'Please pick team before typing the tiebreak points',
                title: 'Submit failed !'
            })

        }
    }
    if (games.length === 0 || isLoading) {
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
    } else {
        return (
            <div className='nflsheet'  >
                <div className='__top' >
                    <h3>Due :Friday, August , 26,2022</h3>
                    <h3>Cash App: $CBFPOOLGA</h3>
                    <div className='buttons'>
                        <button onClick={printHandler}>Print sheets out !</button>
                        <button onClick={onSubmitSheetsHandler}>Submit sheets !</button>
                    </div>
                </div>
                <div className='__middle' ref={componentRef}>
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
                                <Table striped bordered responsive>
                                    <thead>
                                    </thead>
                                    <tbody>
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
                                            }} colSpan={3}><th colSpan={3}>Home</th>
                                            </th>
                                            <th></th>

                                        </tr>
                                        {games.map((game, index) => (
                                            <tr>
                                                <th>{(index + 1) * 2 - 1}</th>
                                                <th style={{
                                                    'fontSize': '14px'

                                                }} colSpan={3}><Form.Check
                                                        inline
                                                        label={game.shortName.split('@')[0]}
                                                        name={(index < 10) ? `group-01-0${index}` : `group-01-${index}`}
                                                        type='radio'
                                                        value={game.shortName.split('@')[0]}
                                                        id={`inline-radio-1`}
                                                        onChange={onChangeHandler}
                                                    /></th>
                                                <th style={{
                                                    'fontSize': '14px',
                                                }} colSpan={3}>
                                                    <Form.Check
                                                        inline
                                                        label={game.shortName.split('@')[1]}
                                                        name={(index < 10) ? `group-01-0${index}` : `group-01-${index}`}
                                                        type='radio'
                                                        value={game.shortName.split('@')[1]}
                                                        onChange={onChangeHandler}
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
                                                        label={game.shortName.split('@')[0]}
                                                        name={(index < 10) ? `group-02-0${index}` : `group-02-${index}`}
                                                        type='radio'
                                                        value={game.shortName.split('@')[0]}
                                                        onChange={onChangeHandler}
                                                        id={`inline-radio-3`}

                                                    /></th>
                                                <th style={{
                                                    'fontSize': '14px',
                                                }} colSpan={3}><Form.Check
                                                        inline
                                                        label={game.shortName.split('@')[1]}
                                                        name={(index < 10) ? `group-02-0${index}` : `group-02-${index}`}
                                                        type='radio'
                                                        value={game.shortName.split('@')[1]}
                                                        onChange={onChangeHandler}
                                                        id={`inline-radio-4`}
                                                    />
                                                </th>
                                                <th>{(index + 1) * 2}</th>
                                            </tr>
                                        ))}
                                        <tr>
                                            <th colSpan={8} >^^ Tiebreaker Game ^^</th>
                                            <th colSpan={2}></th>
                                            <th colSpan={8} >^^ Tiebreaker Game ^^</th>
                                        </tr>
                                        <tr>
                                            <th colSpan={8} ><input onChange={onTiebreakChangeHandler} style={{ 'textAlign': 'center' }} type="text" name="group-01" id="" /></th>
                                            <th colSpan={2}></th>
                                            <th colSpan={8} ><input onChange={onTiebreakChangeHandler} style={{ 'textAlign': 'center' }} type="text" name="group-02" id="" /></th>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        {
                            Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).map((i) => (
                                <Container key={i} >
                                    <Row>
                                        <Col>
                                            <Table striped bordered responsive style={{
                                                'marginTop': '150px',
                                                'marginBottom': ' 150px'
                                            }} >
                                                <tbody>
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
                                                        }} colSpan={3}><th colSpan={3}>Home</th>
                                                        </th>
                                                        <th></th>

                                                    </tr>
                                                    {games.map((game, index) => (
                                                        <tr>
                                                            <th>{(index + 1) * 2 - 1}</th>
                                                            <th style={{
                                                                'fontSize': '14px'

                                                            }} colSpan={3}><Form.Check
                                                                    inline
                                                                    // name={`group-${(i * 4 - 1)}-${index}`}
                                                                    // name={((i * 4 - 1) < 10) ? `group-0${(i * 4 - 1)}-${index}` : `group-${(i * 4 - 1)}-${index}`}
                                                                    name={((i * 4 - 1) < 10) ?
                                                                        ((index < 10) ? `group-0${(i * 4 - 1)}-0${index}` : `group-0${(i * 4 - 1)}-${index}`) :
                                                                        ((index < 10) ? `group-${(i * 4 - 1)}-0${index}` : `group-${(i * 4 - 1)}-${index}`)}
                                                                    type='radio'
                                                                    value={game.shortName.split('@')[0]}
                                                                    onChange={onChangeHandler}
                                                                    label={game.shortName.split('@')[0]}
                                                                    id={`inline-radio-1`}
                                                                /></th>
                                                            <th style={{
                                                                'fontSize': '14px',
                                                            }} colSpan={3}>
                                                                <Form.Check
                                                                    inline
                                                                    type='radio'
                                                                    name={((i * 4 - 1) < 10) ?
                                                                        ((index < 10) ? `group-0${(i * 4 - 1)}-0${index}` : `group-0${(i * 4 - 1)}-${index}`) :
                                                                        ((index < 10) ? `group-${(i * 4 - 1)}-0${index}` : `group-${(i * 4 - 1)}-${index}`)}

                                                                    value={game.shortName.split('@')[1]}
                                                                    label={game.shortName.split('@')[1]}
                                                                    onChange={onChangeHandler}
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
                                                                    // name={`group-${(i * 4)}-${index}`}
                                                                    label={game.shortName.split('@')[0]}
                                                                    name={((i * 4) < 10) ?
                                                                        ((index < 10) ? `group-0${(i * 4)}-0${index}` : `group-0${(i * 4)}-${index}`) :
                                                                        ((index < 10) ? `group-${(i * 4)}-0${index}` : `group-${(i * 4)}-${index}`)}
                                                                    value={game.shortName.split('@')[0]}
                                                                    onChange={onChangeHandler}
                                                                    type='radio'
                                                                    id={`inline-radio-3`}
                                                                /></th>
                                                            <th style={{
                                                                'fontSize': '14px',
                                                            }} colSpan={3}><Form.Check
                                                                    inline
                                                                    // name={`group-${(i * 4)}-${index}`}
                                                                    label={game.shortName.split('@')[1]}
                                                                    name={((i * 4) < 10) ?
                                                                        ((index < 10) ? `group-0${(i * 4)}-0${index}` : `group-0${(i * 4)}-${index}`) :
                                                                        ((index < 10) ? `group-${(i * 4)}-0${index}` : `group-${(i * 4)}-${index}`)}
                                                                    value={game.shortName.split('@')[1]}
                                                                    onChange={onChangeHandler}
                                                                    type='radio'
                                                                    id={`inline-radio-4`}
                                                                />
                                                            </th>
                                                            <th>{(index + 1) * 2}</th>
                                                        </tr>
                                                    ))}
                                                    <tr>
                                                        <th colSpan={8} >^^ Tiebreaker Game ^^</th>
                                                        <th colSpan={2}></th>
                                                        <th colSpan={8} >^^ Tiebreaker Game ^^</th>
                                                    </tr>
                                                    <tr>
                                                        <th colSpan={8} ><input onChange={onTiebreakChangeHandler} style={{ 'textAlign': 'center' }} type="text" name={((i * 4 - 1) < 10) ? `group-0${(i * 4 - 1)}` : `group-${(i * 4 - 1)}`} id="" /></th>
                                                        <th colSpan={2}></th>
                                                        <th colSpan={8} ><input onChange={onTiebreakChangeHandler} style={{ 'textAlign': 'center' }} type="text" name={((i * 4) < 10) ? `group-0${(i * 4)}` : `group-${(i * 4)}`} id="" /></th>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Col>
                                        <Col>
                                            <Table striped bordered responsive style={{
                                                'marginTop': '150px',
                                                'marginBottom': ' 150px'
                                            }} >
                                                <tbody>
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
                                                        }} colSpan={3}><th colSpan={3}>Home</th>
                                                        </th>
                                                        <th></th>

                                                    </tr>
                                                    {games.map((game, index) => (
                                                        <tr key={index} >
                                                            <th>{(index + 1) * 2 - 1}</th>
                                                            <th style={{
                                                                'fontSize': '14px'

                                                            }} colSpan={3}><Form.Check
                                                                    inline
                                                                    // name={`group-${(i * 4 + 1)}-${index}`}
                                                                    label={game.shortName.split('@')[0]}
                                                                    name={((i * 4 + 1) < 10) ?
                                                                        ((index < 10) ? `group-0${(i * 4 + 1)}-0${index}` : `group-0${(i * 4 + 1)}-${index}`) :
                                                                        ((index < 10) ? `group-${(i * 4 + 1)}-0${index}` : `group-${(i * 4 + 1)}-${index}`)}

                                                                    value={game.shortName.split('@')[0]}
                                                                    onChange={onChangeHandler}
                                                                    type='radio'
                                                                    id={`inline-radio-1`}
                                                                /></th>
                                                            <th style={{
                                                                'fontSize': '14px',
                                                            }} colSpan={3}>
                                                                <Form.Check
                                                                    inline
                                                                    // name={`group-${(i * 4 + 1)}-${index}`}
                                                                    label={game.shortName.split('@')[1]}
                                                                    name={((i * 4 + 1) < 10) ?
                                                                        ((index < 10) ? `group-0${(i * 4 + 1)}-0${index}` : `group-0${(i * 4 + 1)}-${index}`) :
                                                                        ((index < 10) ? `group-${(i * 4 + 1)}-0${index}` : `group-${(i * 4 + 1)}-${index}`)}
                                                                    value={game.shortName.split('@')[1]}
                                                                    onChange={onChangeHandler}
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
                                                                    // name={`group-${(i * 4 + 2)}-${index}`}
                                                                    label={game.shortName.split('@')[0]}
                                                                    name={((i * 4 + 2) < 10) ?
                                                                        ((index < 10) ? `group-0${(i * 4 + 2)}-0${index}` : `group-0${(i * 4 + 2)}-${index}`) :
                                                                        ((index < 10) ? `group-${(i * 4 + 2)}-0${index}` : `group-${(i * 4 + 2)}-${index}`)}
                                                                    value={game.shortName.split('@')[0]}
                                                                    onChange={onChangeHandler}
                                                                    type='radio'
                                                                    id={`inline-radio-3`}
                                                                /></th>
                                                            <th style={{
                                                                'fontSize': '14px',
                                                            }} colSpan={3}><Form.Check
                                                                    inline
                                                                    // name={`group-${(i * 4 + 2)}-${index}`}
                                                                    label={game.shortName.split('@')[1]}
                                                                    name={((i * 4 + 2) < 10) ?
                                                                        ((index < 10) ? `group-0${(i * 4 + 2)}-0${index}` : `group-0${(i * 4 + 2)}-${index}`) :
                                                                        ((index < 10) ? `group-${(i * 4 + 2)}-0${index}` : `group-${(i * 4 + 2)}-${index}`)}
                                                                    value={game.shortName.split('@')[1]}
                                                                    onChange={onChangeHandler}
                                                                    type='radio'
                                                                    id={`inline-radio-4`}
                                                                />
                                                            </th>
                                                            <th>{(index + 1) * 2}</th>
                                                        </tr>

                                                    ))}
                                                    <tr>
                                                        <th colSpan={8} >^^ Tiebreaker Game ^^</th>
                                                        <th colSpan={2}></th>
                                                        <th colSpan={8} >^^ Tiebreaker Game ^^</th>
                                                    </tr>
                                                    <tr>
                                                        <th colSpan={8} ><input onChange={onTiebreakChangeHandler} style={{ 'textAlign': 'center' }} type="text" name={((i * 4 + 1) < 10) ? `group-0${(i * 4 + 1)}` : `group-${(i * 4 + 1)}`} id="" /></th>
                                                        <th colSpan={2}></th>
                                                        <th colSpan={8} ><input onChange={onTiebreakChangeHandler} style={{ 'textAlign': 'center' }} type="text" name={((i * 4 + 2) < 10) ? `group-0${(i * 4 + 2)}` : `group-${(i * 4 + 2)}`} id="" /></th>
                                                    </tr>
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
                {(modal.message.length !== 0) && (
                    <Modal style={{
                        "display": "flex",
                        "flexDirection": "column",
                        "alignItems": "center",
                        "justifyContent": "center"
                    }} show={modal.isOpen}
                        onHide={onHideHandler}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered>
                        <Modal.Header closeButton>
                            <Modal.Title>{modal.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {modal.message.split('!').map(single => (
                                <p>{single}</p>
                            ))}
                        </Modal.Body>
                        <Modal.Footer>
                            {modal.title === 'Submit Successfully !' && <Button variant="success" id='btnOK' onClick={handleModalClose}>
                                Ok
                            </Button>}
                            {modal.title === 'Submit failed !' && <Button variant="danger" id='btnClose' onClick={handleModalClose}>
                                Close
                            </Button>}
                        </Modal.Footer>
                    </Modal>
                )
                }
            </div >
        )
    }
});

export default NFLSheetView