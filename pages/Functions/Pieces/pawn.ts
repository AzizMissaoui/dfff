
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
const pawn=(piecetype:string,team:string,position:Array<number>,NewPosition:Array<number>,board:Array<Array<OnePiece>>)=>{
    let moves:ArrayofNumbers=[]
    let blocked=false;
    if (team==="white"){
        if(position[1]+1<=7){
        if (board[position[0]-1][position[1]+1].type==="black"){
        moves.push([position[0]-1,position[1]+1]);
    }}
    if(position[1]-1>0){
    if (board[position[0]-1][position[1]-1].type==="black"){
        moves.push([position[0]-1,position[1]-1]);
    } }
    if (board[position[0]-1][position[1]].type==="none"){
        moves.push([position[0]-1,position[1]]);
    }
    if ((board[position[0]][position[1]].firstMove===false) ){
        if(board[position[0]-2][position[1]].type!=="white"){moves.push([position[0]-2,position[1]]);} 
    }}


    if (team==="black"){
        if(position[1]+1<=7){
        if (board[position[0]+1][position[1]+1].type=="white"){
        moves.push([position[0]+1,position[1]+1]);
    }}
    if(position[1]-1>=0){
    if (board[position[0]+1][position[1]-1].type==="white"){
        moves.push([position[0]+1,position[1]-1]);
    } }

    if (board[position[0]+1][position[1]].type==="none"){
        moves.push([position[0]+1,position[1]]);
    }
    if ((board[position[0]][position[1]].firstMove===false) ){
        if(board[position[0]+2][position[1]].type!=="black"){moves.push([position[0]+2,position[1]]);}
        
    }}
    

    return moves;
}

export default pawn;