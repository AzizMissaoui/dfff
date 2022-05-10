
import bishop from "./Pieces/bishop";
import horse from "./Pieces/horse";
import pawn from "./Pieces/pawn";
import rook from "./Pieces/rook";
import queen from "./Pieces/queen";
import king from "./Pieces/king"



type ArrayofNumbers = Array<Array<number>>
interface OnePiece {
  currentpiece: string | any ;
  clearw: boolean;
  clearb: boolean;
  pos:Array<number>
  piecetype:String,
  highlighted:boolean,
  type:string,
  firstMove:boolean,
}

const Verification=(piecetype:string,team:string,position:Array<number>,NewPosition:Array<number>,board:Array<Array<OnePiece>>)=>{
    let isTheMoveRight=false;    
    let moves:ArrayofNumbers=[];
   
    switch (piecetype){

      case "rook":
        moves=rook(team,position,NewPosition,board);
        break;
      case "bishop":
        moves=bishop(team,position,NewPosition,board);
        break;
      case "queen":
        moves=queen(team,position,NewPosition,board);
        break;
      case "pawn":
        moves=pawn(team,position,NewPosition,board);
        break;
      case "horse":
        moves=horse(team,position,NewPosition,board);
        break;
      case "king":
        moves=king(team,position,NewPosition,board);
        break;

    }

   moves.map((element)=>{
       if( (element[0]===NewPosition[0]) && (element[1]===NewPosition[1]) ){
        isTheMoveRight=true;
       }
   })

        return {moves,isTheMoveRight};
  }


  export default Verification;