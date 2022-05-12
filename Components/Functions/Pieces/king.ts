import OnePiece from "../../OnePiecetype";

const king=(team:string,position:Array<number>,NewPosition:Array<number>,board:Array<Array<OnePiece>>)=>{
    let moves=[]
    let blocked=false;
   
    if (position[0]+1<=7){

        //bottom
        if (board[position[0]+1][position[1]].type!==team){
            moves.push([position[0]+1,position[1]]);
        }
        //bottomleft
        if (position[1]-1>=0){
        if (board[position[0]+1][position[1]-1].type!==team){
            moves.push([position[0]+1,position[1]-1]);
        }}
        //bottomright
         if (position[1]+1<=7){
        if (board[position[0]+1][position[1]+1].type!==team){
            moves.push([position[0]+1,position[1]+1]);
        } }
    }
    //top
    if (position[0]-1>=0){
        //top
        if (board[position[0]-1][position[1]].type!==team){
            moves.push([position[0]-1,position[1]]);
        }
        //topleft
        if (position[1]-1>=0){
        if (board[position[0]-1][position[1]-1].type!==team){
            moves.push([position[0]-1,position[1]-1]);
        }}
        //topright
        if (position[1]+1<=7){
        if (board[position[0]-1][position[1]+1].type!==team){
            moves.push([position[0]-1,position[1]+1]);
        }}
    }

    if (position[1]+1<=7){
        //right
        if (board[position[0]][position[1]+1].type!==team){
            moves.push([position[0],position[1]+1]);
        }
        //rightbottom
        if (position[0]+1<=7){
        if (board[position[0]+1][position[1]+1].type!==team){
            moves.push([position[0]+1,position[1]+1]);
        }}
        //righttop
        if (position[0]-1>=0){
        if (board[position[0]-1][position[1]+1].type!==team){
            moves.push([position[0]-1,position[1]+1]);
        }}
    }


    if (position[1]-1>=0){
        //left
        if (board[position[0]][position[1]-1].type!==team){
            moves.push([position[0],position[1]-1]);
        }
        //leftbottom
        if (position[0]+1<=7){
        if (board[position[0]+1][position[1]-1].type!==team){
            moves.push([position[0]+1,position[1]-1]);
        }}
        //lefttop
        if (position[0]-1>=0){
        if (board[position[0]-1][position[1]-1].type!==team){
            moves.push([position[0]-1,position[1]-1]);
        }}
    }


    return moves;
}

export default king;