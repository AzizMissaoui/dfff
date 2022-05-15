import OnePiece from "../../OnePiecetype";
const horse=(team:string,position:Array<number>,NewPosition:Array<number>,board:Array<Array<OnePiece>>)=>{
    let moves=[];
     //upperleftright
     if((position[0]+2<8 && position[0]+2>=0) && (position[1]+1<8 && position[1]+1>=0)){
        if(board[position[0]+2][position[1]+1].type!==team){ moves.push([position[0]+2,position[1]+1]);}
         }
      if((position[0]+2<8 && position[0]+2>=0) && (position[1]-1<8 && position[1]-1>=0)){
        if(board[position[0]+2][position[1]-1].type!==team){ moves.push([position[0]+2,position[1]-1]);}
         }
      //rightupperdown
      if((position[0]+1<8 && position[0]+1>=0) && (position[1]+2<8 && position[1]+2>=0)){
        if(board[position[0]+1][position[1]+2].type!==team){ moves.push([position[0]+1,position[1]+2]);}
         }
      if((position[0]-1<8 && position[0]-1>=0) && (position[1]+2<8 && position[1]+2>=0)){
        if(board[position[0]-1][position[1]+2].type!==team){ moves.push([position[0]-1,position[1]+2]);}
         }
      //downrightleft
      if((position[0]-2<8 && position[0]-2>=0) && (position[1]+1<8 && position[1]+1>=0)){
        if(board[position[0]-2][position[1]+1].type!==team){ moves.push([position[0]-2,position[1]+1]);}
         }
      if((position[0]-2<8 && position[0]-2>=0) && (position[1]-1<8 && position[1]-1>=0)){
         if(board[position[0]-2][position[1]-1].type!==team){ moves.push([position[0]-2,position[1]-1]);}
         }
      //leftupperdown
      if((position[0]+1<8 && position[0]+1>=0) && (position[1]-2<8 && position[1]-2>=0)){
        if(board[position[0]+1][position[1]-2].type!==team){ moves.push([position[0]+1,position[1]-2]);}
         }
      if((position[0]-1<8 && position[0]-1>=0) && (position[1]-2<8 && position[1]-2>=0)){
        if(board[position[0]-1][position[1]-2].type!==team){ moves.push([position[0]-1,position[1]-2  ]);}
         }
         return moves;
}
export default horse;