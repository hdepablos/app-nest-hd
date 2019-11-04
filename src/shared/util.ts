import * as moment from 'moment';

export class Util{

    static encriptar(cadena){
        return 'cadennanaa';
    }

    static async diffDias(fecha: Date): Promise<number>{
        const ahora = moment();
        const last = moment(fecha);
        return await Math.floor(moment.duration(ahora.diff(last)).days());
    }

    static async diffMin(fecha: Date): Promise<number>{
        const ahora = moment();
        const last = moment(fecha);
        return await Math.floor(moment.duration(ahora.diff(last)).asMinutes());
    }
}