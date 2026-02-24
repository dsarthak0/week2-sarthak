export interface Stock{
    id:string;
    symbol:string;
    name:string,
    price:number;
    change:number;
    changePct:number;
    volume:number;
    marketCap:number;
    sector:string;
}

export interface PaginationResult{
    totalItems:number;
    currentPage:number;
    totalPage:number;

}


export interface Holdings{
    symbol:string;
    quantity:number;
    investedvalue:number;
    currentvalue:number;
    totalreturn:number;
}

export interface Trade{
    id:string;
    stockId:string;
    symbol:string;
    type:'BUY'|'SELL';
    quantity:number;
    price:number;
    date:string;
   
}
export interface Portfolio{
    totalValue:number;
    totalCost:number;
    gainLoss:number;
    holdings:Stock[];
}
export interface Position{
    symbol:string;
    qty:number;
    avgprice:number;
    ltp:number;
}
export interface PositionDisplay extends Position {
  pnl: number;
  pnlPercent: number;
}
export interface HoldingsDisplay extends Holdings {
  returnPercentage: number;
  currentPrice: number;
}
