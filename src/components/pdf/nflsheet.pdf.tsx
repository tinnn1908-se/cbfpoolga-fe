import React, { useRef } from 'react';
import {useReactToPrint} from 'react-to-print';
import NFLSheetView from '../../views/nflsheet.view';

const NFLSheetPDF = () => {

    const componentRef = useRef(null);
    const printHandler = useReactToPrint({
        content : ()=> componentRef.current
    })

    return (
        <div>
           <NFLSheetView ref={componentRef} />
           <button onClick={printHandler}>Print this out!</button>
        </div>
    )
}

export default NFLSheetPDF