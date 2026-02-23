import type { Position,PositionDisplay } from '../types/stock.types';

export const MockPositions:Position[]=[
    {symbol:"AAPL",qty:10,avgprice:150.00,ltp:175.50},
    { symbol: 'TSLA', qty: 5, avgprice: 240.50, ltp: 235.10 },
  { symbol: 'NVDA', qty: 15, avgprice: 420.00, ltp: 485.25 },
  { symbol: 'MSFT', qty: 8, avgprice: 310.00, ltp: 325.00 },

]

export const getProcessedPositions=(positons:Position[]):PositionDisplay[]=>{
    return positons.map(pos=>{
        const pnl=(pos.ltp-pos.avgprice)*pos.qty;
        const pnlPercent=((pos.ltp-pos.avgprice)/pos.avgprice)*100;
        return{
            ...pos,
            pnl:parseFloat(pnl.toFixed(2)),
            pnlPercent:parseFloat(pnlPercent.toFixed(2))
        }
    })
};