import OnePiece from "../../OnePiecetype";

const rook=(team:string,position:Array<number>,NewPosition:Array<number>,board:Array<Array<OnePiece>>)=>{
    let moves=[]
    let blockedtop=false;
    let blockedright=false;
    let blockedbottom=false;
    let blockedleft=false;
      for (let i=0;i<=7;i++){
        if((position[0]+i>=0) &&(position[0]+i<=7) && (blockedbottom===false)){
          if(position[0]+i!==position[0]&&position[1]===position[1]){
            if(board[position[0]+i][position[1]].piecetype!=="none"){
              if(board[position[0]+i][position[1]].type!==team){moves.push([position[0]+i,position[1]]);}
              blockedbottom=true;
            }
            else{moves.push([position[0]+i,position[1]]);}
            
          }
        }
        if((position[0]-i>=0) &&(position[0]-i<=7) && (blockedtop===false)){
          if(position[0]-i!==position[0]&&position[1]===position[1]){
            if(board[position[0]-i][position[1]].piecetype!=="none"){
              if(board[position[0]-i][position[1]].type!==team){moves.push([position[0]-i,position[1]]);}
              blockedtop=true;
            }
            else{moves.push([position[0]-i,position[1]]);}
           
          }
         
        }
        if((position[1]+i>=0) && (position[1]+i<=7) && (blockedright===false)){
          if(position[0]===position[0]&&position[1]+i!==position[1]){
            if(board[position[0]][position[1]+i].piecetype!=="none"){
              if(board[position[0]][position[1]+i].type!==team){moves.push([position[0],position[1]+i]);}
              blockedright=true;
            }
            else{moves.push([position[0],position[1]+i]);}
          }
        
        }
        if((position[1]-i>=0) && (position[1]-i<=7)&& (blockedleft===false)){
          if(position[0]===position[0]&&position[1]-i!==position[1]){
            if(board[position[0]][position[1]-i].piecetype!=="none"){
              if(board[position[0]][position[1]-i].type!==team){moves.push([position[0],position[1]-i]);}
              blockedleft=true;
            }
            else{moves.push([position[0],position[1]-i]);}
          } 
        }
      }
    return moves;
}

export default rook;