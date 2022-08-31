import { Picking, Pickingdetail } from "./models";

export default class MyHelper {
    static generateID(): string {
        var dateObj = new Date();
        return dateObj.getTime().toString();
    }
    static generatePickingID(): string {
        var dateObj = new Date();
        return `p${dateObj.getTime().toString()}`;
    }
    static generatePickingDetailID(): string {
        var dateObj = new Date();
        return `pd${dateObj.getTime().toString()}`;
    }
    static isExistedPicking(pickings: Array<Picking>, entry: string): boolean {
        var counter = 0;
        for (let i = 0; i < pickings.length; i++) {
            if (pickings[i].entry === entry) {
                counter++;
            }
        }
        return (counter > 0);
    }
    static getPickingPosition(pickings: Array<Picking>, entry: string): number | null {
        var position = null;
        for (let i = 0; i < pickings.length; i++) {
            if (pickings[i].entry === entry) {
                position = i;
            }
        }
        return position;
    }
    static getPickingDetailPosition(pickingDetails: Array<Pickingdetail>, gameNo: number) {
        var position = null;
        for (let i = 0; i < pickingDetails.length; i++) {
            if (pickingDetails[i].gameNo === gameNo) {
                position = i;
            }
        }
        return position;
    }
    static isValidPicking(picking: Picking, gameLenght: number) {
        if (picking && picking.isChanged) {
            console.log('picking.pickingdetails.length : ' + picking.pickingdetails.length)
            console.log('gameLenght : ' + gameLenght)
            if (picking.pickingdetails.length === gameLenght) {
                if (picking.tiebreak.length > 0) {
                    return true;
                }
            }
            return false;
        } else {
            console.log('picking not existed ! ')
            return true;
        }
    }
    static isValidPickings(pickings: Array<Picking>, gameLenght: number): boolean {
        for (let i = 0; i < pickings.length; i++) {
            var check = this.isValidPicking(pickings[i], gameLenght);
            if (!check) {
                console.log("Not Valid at : " + pickings[i].entry)
                console.log("Not Valid at (tiebreak) : " + pickings[i].tiebreak)
                return false;
            }
        }
        return true;
    }
    static getPickingByEntry(pickings: Array<Picking>, entry: string) {
        var pos: number | null = null;
        for (let index = 0; index < pickings.length; index++) {
            if (pickings[index].entry === entry) {
                pos = index;
            }
        }
        return pos;
    }
    static isValidTiebreakNumber(tiebreak: string) {
        var regex = /^\d+$/;
        return regex.test(tiebreak);
    }
    static generateMessageForEmailSending(pickings: Array<Picking>) {
        var message: string = '';
        for (let i = 0; i < pickings.length; i++) {
            var picking = pickings[i]
            var pickingStr = `Pick-${pickings[i].entry} : [`;
            for (let j = 0; j < picking.pickingdetails.length; j++) {
                const pickingDetail = pickings[i].pickingdetails[j];
                pickingStr += `${pickingDetail.selected_team},`
            }
            pickingStr += `tiebreak : ${picking.tiebreak} ]\n`
            message += pickingStr;
        }
        return message;
    }
}