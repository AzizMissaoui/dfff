import OnePiece from "../../OnePiecetype";

const pawn=(team:string,position:Array<number>,NewPosition:Array<number>,board:Array<Array<OnePiece>>)=>{
    let moves=[]

    if (team==="white"){
        if(position[1]+1<=7){
            if(position[0]-1>=0){
        if (board[position[0]-1][position[1]+1].type==="black"){
        moves.push([position[0]-1,position[1]+1]);}
    }}
    if(position[1]-1>=0 &&   position[0]-1>=0){
    if (board[position[0]-1][position[1]-1].type==="black"){
        moves.push([position[0]-1,position[1]-1]);
    } }

    if(position[0]-1>=0){
    if (board[position[0]-1][position[1]].type==="none"){
        moves.push([position[0]-1,position[1]]);
    }}

    if ((position[0]===6)){
        if(board[position[0]-2][position[1]].type==="none" && board[position[0]-1][position[1]].type==="none"){
            moves.push([position[0]-2,position[1]]);} 
    }}


    if (team==="black"){
        if(position[1]+1<=7 && position[0]+1<=7){
        if (board[position[0]+1][position[1]+1].type=="white"){
        moves.push([position[0]+1,position[1]+1]);
    }}

    if(position[1]-1>=0){
        if(position[0]+1<=7){
             if (board[position[0]+1][position[1]-1].type==="white"){
        moves.push([position[0]+1,position[1]-1]);
    } }}

    if(position[0]+1<=7){
    if (board[position[0]+1][position[1]].type==="none"){
        moves.push([position[0]+1,position[1]]);
    }}


    if (position[0]===1 ){
        if(board[position[0]+2][position[1]].type==="none" && board[position[0]+1][position[1]].type==="none")
        {moves.push([position[0]+2,position[1]]);}   
    }}
    

    return moves;
}

export default pawn;