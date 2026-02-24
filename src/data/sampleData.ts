import type { Position,PositionDisplay } from '../types/stock.types';
import type { Holdings ,HoldingsDisplay} from '../types/stock.types';
export const MockPositions:Position[]=[
    {symbol:"AAPL",qty:10,avgprice:150.00,ltp:175.50},
    { symbol: 'TSLA', qty: 5, avgprice: 240.50, ltp: 235.10 },
  { symbol: 'NVDA', qty: 15, avgprice: 420.00, ltp: 485.25 },
  { symbol: 'MSFT', qty: 8, avgprice: 310.00, ltp: 325.00 },

]
export const sampleHoldings: Holdings[] = [
  {
    symbol: "AAPL",
    quantity: 50,
    investedvalue: 7500.00, // 50 * $150
    currentvalue: 9150.00,  // 50 * $183
    totalreturn: 1650.00    // +22%
  },
  {
    symbol: "MSFT",
    quantity: 30,
    investedvalue: 9000.00, // 30 * $300
    currentvalue: 12600.00, // 30 * $420
    totalreturn: 3600.00    // +40%
  },
  {
    symbol: "GOOGL",
    quantity: 100,
    investedvalue: 12000.00,// 100 * $120
    currentvalue: 14500.00, // 100 * $145
    totalreturn: 2500.00    // +20.8%
  },
  {
    symbol: "AMZN",
    quantity: 40,
    investedvalue: 6000.00, // 40 * $150
    currentvalue: 5800.00,  // 40 * $145
    totalreturn: -200.00    // -3.3% (Loss example)
  },
  {
    symbol: "JPM",
    quantity: 60,
    investedvalue: 8400.00, // 60 * $140
    currentvalue: 9600.00,  // 60 * $160
    totalreturn: 1200.00    // +14.2%
  }
];



export const getProcessedHoldings = (holdings: Holdings[]): HoldingsDisplay[] => {
  return holdings.map((hold) => {
    // Calculate percentage return: (Total Return / Invested Value) * 100
    const returnPercentage = (hold.totalreturn / hold.investedvalue) * 100;
    
    // Calculate current market price per share
    const currentPrice = hold.currentvalue / hold.quantity;

    return {
      ...hold,
      returnPercentage: parseFloat(returnPercentage.toFixed(2)),
      currentPrice: parseFloat(currentPrice.toFixed(2)),
    };
  });
};

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