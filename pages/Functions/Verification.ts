

type ArrayofNumbers = Array<Array<number>>

const Verification=(piecetype:string,position:Array<number>,NewPosition:Array<number>)=>{
    let isTheMoveRight=false;    
    let moves:ArrayofNumbers=[];
  if (piecetype==="rook"){
      for (let i=0;i<=7;i++){
        if((position[0]+i>=0) &&(position[0]+i<=7)){
          if(position[0]+i!==position[0]&&position[1]===position[1]){
            moves.push([position[0]+i,position[1]]);
          }
        }
        if((position[0]-i>=0) &&(position[0]-i<=7)){
          if(position[0]-i!==position[0]&&position[1]===position[1]){
            moves.push([position[0]-i,position[1]]);
          }
         
        }
        if((position[1]+i>=0) && (position[1]+i<=7)){
          if(position[0]===position[0]&&position[1]+i!==position[1]){
            moves.push([position[0],position[1]+i]);
          }
        
        }
        if((position[1]-i>=0) && (position[1]-i<=7)){
          if(position[0]===position[0]&&position[1]-i!==position[1]){
            moves.push([position[0],position[1]-i]);
          }
          
        }
      }
    }
  if(piecetype==="bishop"){
  for (let i=0;i<=7;i++){
    if((position[0]+i>=0) && (position[0]+i<=7) && (position[1]+i>=0) && (position[1]+i<=7)){
        if(position[0]+i!==position[0] && position[1]!==position[1]+i){
      moves.push([position[0]+i,position[1]+i]);}
    }
    if((position[0]-i>=0) && (position[0]-i<=7) && (position[1]-i>=0) && (position[1]-i<=7)){
        if(position[0]-i!==position[0] && position[1]!==position[1]-i){
        moves.push([position[0]-i,position[1]-i]);}
      }
    if((position[0]+i>=0) && (position[0]+i<=7) && (position[1]-i>=0) && (position[1]-i<=7)){
        if(position[0]+i!==position[0] && position[1]!==position[1]-i){
        moves.push([position[0]+i,position[1]-i]);}
      }
    if((position[0]-i>=0) && (position[0]-i<=7) && (position[1]+i>=0) && (position[1]+i<=7)){
        if(position[0]-i!==position[0] && position[1]!==position[1]+i){
        moves.push([position[0]-i,position[1]+i]);}
      }


    }}
  if(piecetype==="queen"){
    for (let i=0;i<=7;i++){
        if((position[0]+i>=0) && (position[0]+i<=7) && (position[1]+i>=0) && (position[1]+i<=7)){
            if(position[0]+i!==position[0] && position[1]!==position[1]+i){
          moves.push([position[0]+i,position[1]+i]);}
        }
        if((position[0]-i>=0) && (position[0]-i<=7) && (position[1]-i>=0) && (position[1]-i<=7)){
            if(position[0]-i!==position[0] && position[1]!==position[1]-i){
            moves.push([position[0]-i,position[1]-i]);}
          }
        if((position[0]+i>=0) && (position[0]+i<=7) && (position[1]-i>=0) && (position[1]-i<=7)){
            if(position[0]+i!==position[0] && position[1]!==position[1]-i){
            moves.push([position[0]+i,position[1]-i]);}
          }
        if((position[0]-i>=0) && (position[0]-i<=7) && (position[1]+i>=0) && (position[1]+i<=7)){
            if(position[0]-i!==position[0] && position[1]!==position[1]+i){
            moves.push([position[0]-i,position[1]+i]);}
          }
    
    
        }
    for (let i=0;i<=7;i++){
            if((position[0]+i>=0) &&(position[0]+i<=7)){
              if(position[0]+i!==position[0]&&position[1]===position[1]){
                moves.push([position[0]+i,position[1]]);
              }
            }
            if((position[0]-i>=0) &&(position[0]-i<=7)){
              if(position[0]-i!==position[0]&&position[1]===position[1]){
                moves.push([position[0]-i,position[1]]);
              }
             
            }
            if((position[1]+i>=0) && (position[1]+i<=7)){
              if(position[0]===position[0]&&position[1]+i!==position[1]){
                moves.push([position[0],position[1]+i]);
              }
            
            }
            if((position[1]-i>=0) && (position[1]-i<=7)){
              if(position[0]===position[0]&&position[1]-i!==position[1]){
                moves.push([position[0],position[1]-i]);
              }
              
            }
    }

  }
  if (piecetype==="horse"){
    //upperleftright
    if((position[0]+2<8 && position[0]+2>=0) && (position[1]+1<8 && position[1]+1>=0)){
        moves.push([position[0]+2,position[1]+1]);
       }
    if((position[0]+2<8 && position[0]+2>=0) && (position[1]-1<8 && position[1]-1>=0)){
        moves.push([position[0]+2,position[1]-1]);
       }
    //rightupperdown
    if((position[0]+1<8 && position[0]+1>=0) && (position[1]+2<8 && position[1]+2>=0)){
        moves.push([position[0]+1,position[1]+2]);
       }
    if((position[0]-1<8 && position[0]-1>=0) && (position[1]+2<8 && position[1]+2>=0)){
        moves.push([position[0]-1,position[1]+2]);
       }
    //downrightleft
    if((position[0]-2<8 && position[0]-2>=0) && (position[1]+1<8 && position[1]+1>=0)){
        moves.push([position[0]-2,position[1]+1]);
       }
    if((position[0]-2<8 && position[0]-2>=0) && (position[1]-1<8 && position[1]-1>=0)){
        moves.push([position[0]-2,position[1]-1]);
       }
    //leftupperdown
    if((position[0]+1<8 && position[0]+1>=0) && (position[1]-2<8 && position[1]-2>=0)){
        moves.push([position[0]+1,position[1]-2]);
       }
    if((position[0]-1<8 && position[0]-1>=0) && (position[1]-2<8 && position[1]-2>=0)){
        moves.push([position[0]-1,position[1]-2]);
       }
   
  }

   moves.map((element)=>{
       if( (element[0]===NewPosition[0]) && (element[1]===NewPosition[1]) ){
        isTheMoveRight=true;
       }
   })

        return moves;
  }


  export default Verification;