import type { NextPage } from "next";
import styled from "styled-components";
import React, { useReducer, useEffect, useState } from "react";
import Image from "next/image";
/*import { useAppSelector, useAppDispatch } from '../Redux/hooks'*/
import { clone, cloneDeep } from "lodash";
import Verification from "../Functions/Verification";
/*import { firstclickchange, secondclickchange,changeselected } from '../Redux/createreducer'*/
import br from '../../public/br.png';
import bh from '../../public/bh.png';
import bq from '../../public/bq.png';
import bk from '../../public/bk.png';
import bp from '../../public/bp.png';
import bb from '../../public/bb.png';
import wh from '../../public/wh.png';
import wr from '../../public/wr.png';
import wk from '../../public/wk.png';
import wb from '../../public/wb.png';
import wq from '../../public/wq.png';
import wp from '../../public/wp.png';
import Xhighlight from "../../public/highlighted.png";
import OnePiece from "../OnePiecetype";
import { color } from "@mui/system";
import king from "../Functions/Pieces/king";




//the check for check function returns true we need to fk it
//wtf

const Chessui  = styled.div`
  height:768px ;
  width: 768px;
  max-width: 100%;
  display: grid;
  border:3px solid white ;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);

  z-index: 4;
  /*transform: rotate(180deg);to play black*/

  @media (max-width: 720px) {
    height: 720px;
  }

  @media (max-width: 690px) {
    height: 690px;
  }
  @media (max-width: 670px) {
    height: auto;
  }
`;

interface returned{
  result:{
    ischecked:boolean,
    checkmate:boolean
  },

}

interface props{
  turn :(a: string) => void,
}

interface hidden{
  visible:string,
}
const Piece = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  z-index: 2;
  height: 88px;
  width: 88px;
  /*transform: rotate(180deg); to play black*/
`;

const Highlighted= styled.div`
position: absolute;
display: flex;
align-items: center;
justify-content: center;
background-image: url('../../public/highlighted.png');
cursor: pointer;
`

const CheckmateAnnouncement=styled.div<hidden>`
position: absolute;
display: flex;
align-items: center;
flex-direction: column;
height:768px ;
justify-content: center;
width: 768px;
max-width: 100%;
visibility: ${props => props.visible};
z-index: 100;
gap: 2rem;
`
const TheWinner=styled.div`
font-size: 3rem;
`
const PlayAgainButton=styled.div`
font-size: 2rem;
background-color: black;
color: white;
padding: 1rem 2rem;
border-radius:1rem;
cursor: pointer;
&:hover{
  color: black;
  background-color: white;
}
`

const Upgrade=styled.div<hidden>`
position: absolute;
display: flex;

flex-direction: column;
justify-content: center;
align-items: center;
height:768px ;
width: 768px;
max-width: 100%;

visibility: ${props => props.visible};
z-index: 100;
gap: 2rem;
`

const  Piecestochoosefrom=styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: fit-content;

`





const ChessGame: NextPage<props> = (props) => {
    const [BlackTurn,Setblackturn]=useState<Boolean>(false);
    const [WhiteTurn,Setwhiteturn]=useState<Boolean>(true);
    const [firstclick,setfirstclick]=useState<Boolean>(true);
    const [secondclick,setsecondclick]=useState<Boolean>(false);
    const [oldpieceposition,setoldposition]=useState<Array<number>>([]);
    const [upgradeposition,setupgradeposition]=useState<Array<number>>([]);
    const [Chessboard, setChessboard] = useState<Array<Array<OnePiece>>>([
    [
      { gridImage: br, piecetype:"rook",type:"black",highlighted:false,  pos:[0,0]},
      { gridImage: bh, piecetype:"horse",type:"black",highlighted:false,  pos:[0,1]},
      { gridImage: bb, piecetype:"bishop",type:"black",highlighted:false,  pos:[0,2]},
      { gridImage: bq, piecetype:"queen",type:"black",highlighted:false,  pos:[0,3]},
      { gridImage: bk, piecetype:"king",type:"black",highlighted:false,  pos:[0,4]},
      { gridImage: bb, piecetype:"bishop",type:"black",highlighted:false,  pos:[0,5]},
      { gridImage: bh, piecetype:"horse",type:"black",highlighted:false,  pos:[0,6]},
      { gridImage: br, piecetype:"rook",type:"black",highlighted:false,  pos:[0,7]},
    ],
    [
      { gridImage: bp, piecetype:"pawn",type:"black",highlighted:false,  pos:[1,0] },
      { gridImage: bp, piecetype:"pawn",type:"black",highlighted:false,  pos:[1,1] },
      { gridImage: bp, piecetype:"pawn",type:"black",highlighted:false,  pos:[1,2] },
      { gridImage: bp, piecetype:"pawn",type:"black",highlighted:false,  pos:[1,3]},
      { gridImage: bp, piecetype:"pawn",type:"black",highlighted:false,  pos:[1,4]},
      { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[1,5] },
      { gridImage: bp, piecetype:"pawn",type:"black",highlighted:false,  pos:[1,6] },
      { gridImage: bp, piecetype:"pawn",type:"black",highlighted:false,  pos:[1,7]},
    ],
    [
      { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[2,0]},
      { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[2,1]},
      { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[2,2]},
      { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[2,3]},
      { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[2,4]},
      { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[2,5] },
      { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[2,6] },
      { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[2,7] },
    ],
    [
      { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[3,0]},
      { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[3,1]},
      { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[3,2]},
      { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[3,3]},
      { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[3,4]},
      { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[3,5]},
      { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[3,6]},
      { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[3,7]},
    ],
    [
      { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[4,0]},
      { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[4,1]},
      { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[4,2]},
      { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[4,3]},
      { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[4,4]},
      { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[4,5]},
      { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[4,6]},
      { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[4,7]},
    ],
    [
      { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[5,0]},
      { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[5,1]},
      { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[5,2]},
      { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[5,3]},
      { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[5,4]},
      { gridImage: "none", piecetype:"none",type:"none",highlighted:false,   pos:[5,5]},
      { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[5,6]},
      { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[5,7]},
    ],
    [
      { gridImage: wp, piecetype:"pawn",type:"white",highlighted:false,  pos:[6,0]},
      { gridImage: wp, piecetype:"pawn",type:"white",highlighted:false,  pos:[6,1]},
      { gridImage: wp, piecetype:"pawn",type:"white",highlighted:false,  pos:[6,2]},
      { gridImage: wp, piecetype:"pawn",type:"white",highlighted:false,  pos:[6,3]},
      { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[6,4]},
      { gridImage: wp, piecetype:"pawn",type:"white",highlighted:false,  pos:[6,5]},
      { gridImage: wp, piecetype:"pawn",type:"white",highlighted:false,  pos:[6,6]},
      { gridImage: wp, piecetype:"pawn",type:"white",highlighted:false,  pos:[6,7]},
    ],
    [
      { gridImage: wr, piecetype:"rook",type:"white",highlighted:false,  pos:[7,0]},
      { gridImage: wh, piecetype:"horse",type:"white",highlighted:false,  pos:[7,1]},
      { gridImage: wb, piecetype:"bishop",type:"white",highlighted:false,  pos:[7,2]},
      { gridImage: wq, piecetype:"queen",type:"white",highlighted:false,  pos:[7,3]},
      { gridImage: wk, piecetype:"king",type:"white",highlighted:false,  pos:[7,4]},
      { gridImage: wb, piecetype:"bishop",type:"white",highlighted:false,  pos:[7,5]},
      { gridImage: wh, piecetype:"horse",type:"white",highlighted:false,  pos:[7,6]},
      { gridImage: wr, piecetype:"rook",type:"white",highlighted:false,  pos:[7,7]},
      
    ],
  ]);

const [onpassantmove,setonpassantmove]=useState<Array<number>>([-1,-1]);
  
  const [visibilityannoncer,setvisibilityforcheckmateannouncer]=useState<string>('hidden');
  const [winner,setwinner]=useState<string>("none");
  const [upgradevisiblity,setupgradevisiblity]=useState<string>("hidden");

  const blackupgrade=[
    {gridimage:bq,piecetype:"queen"},
    {gridimage:bh,piecetype:"horse"},
    {gridimage:bb,piecetype:"bishop"},
    {gridimage:br,piecetype:"rook"},
  ];
  const whiteupgrade=[
    {gridimage:wq,piecetype:"queen"},
    {gridimage:wh,piecetype:"horse"},
    {gridimage:wb,piecetype:"bishop"},
    {gridimage:wr,piecetype:"rook"},
  ];


  const [upgradearray,setupgrade]=useState([
    {gridimage:wq,piecetype:"queen"},
    {gridimage:wh,piecetype:"horse"},
    {gridimage:wb,piecetype:"bishop"},
    {gridimage:wr,piecetype:"rook"},
  ]);
const isitchecked=(posofking:Array<number>,colortocheck:string,chessboardtouse:Array<Array<OnePiece>>)=>{

  let ischecked:boolean=false;
  let attackcheckmoves:Array<Array<number>>=[]
 

  chessboardtouse.forEach((element)=>{
      element.forEach((oneitem) =>{
        if("black"===colortocheck){
          if(oneitem.type==="white"){
        attackcheckmoves.push(...Verification(oneitem.piecetype,'white',oneitem.pos,[posofking[0],posofking[1]],chessboardtouse).moves);
      }}
        else if(colortocheck==="white"){
          if(oneitem.type==="black"){
            attackcheckmoves.push(...Verification(oneitem.piecetype,'black',oneitem.pos,[posofking[0],posofking[1]],chessboardtouse).moves);}
        }
      })
      });
      attackcheckmoves.forEach(pos =>{
        if (pos[0]===posofking[0] && pos[1]===posofking[1]){
          ischecked=true;
        }
      })

      console.log("is" , colortocheck,"checked" ,ischecked)

  return ischecked;
}

const checkmatechecker=(posofking:Array<number>,colortocheck:string,chessboardtouse:Array<Array<OnePiece>>)=>{
  let defensemoves:Array<Array<number>>=[];
  let kingmoves:Array<Array<number>>=[];
  let defensecandefend:Array<boolean>=[];
  let checkmate=false;

  //looping through the loop and checking defense moves and king moves for the color to check 
  chessboardtouse.forEach((element)=>{
      element.forEach((oneitem) =>{
        if("black"===colortocheck && oneitem.piecetype==="king" && oneitem.type==="black"){
            kingmoves.push(...Verification(oneitem.piecetype,'black',oneitem.pos,[posofking[0],posofking[1]],chessboardtouse).moves)
          }else if("white"===colortocheck && oneitem.piecetype==="king" && oneitem.type==="white"){
            kingmoves.push(...Verification(oneitem.piecetype,'white',oneitem.pos,[posofking[0],posofking[1]],chessboardtouse).moves)}
        if("black"===colortocheck && oneitem.piecetype!=="king"){
          if(oneitem.type==="black"){
        let verifciationresult=Verification(oneitem.piecetype,'black',oneitem.pos,[posofking[0],posofking[1]],chessboardtouse);
        defensemoves.push(...verifciationresult.moves);
      }
    }else if("white"===colortocheck){
      if(oneitem.type==="white" && oneitem.piecetype!=="king"){
        let verifciationresult=Verification(oneitem.piecetype,'white',oneitem.pos,[posofking[0],posofking[1]],chessboardtouse);
        defensemoves.push(...verifciationresult.moves);
      }
     
    }
      })});


//trying every move if it can remove the check or not 
      defensemoves.forEach(pos =>{
        let thisdefensemovecandefend=true;
        let ClonedBoard=cloneDeep(chessboardtouse);
        ClonedBoard[pos[0]][pos[1]].piecetype="pawn";
        ClonedBoard[pos[0]][pos[1]].type=colortocheck;
    
        ClonedBoard.forEach((element)=>{
          element.forEach((oneitem) =>{
            if("black"===colortocheck ){
              if(oneitem.type==="white"){
            let verifciationresult=Verification(oneitem.piecetype,'white',oneitem.pos,[posofking[0],posofking[1]],ClonedBoard);
            if(verifciationresult.isTheMoveRight===true){
              console.log(oneitem.piecetype);
              thisdefensemovecandefend=false;
            }
             
          }}
            else if(colortocheck==="white"){
              if(oneitem.type==="black"){
              let verifciationresult=Verification(oneitem.piecetype,'black',oneitem.pos,[posofking[0],posofking[1]],ClonedBoard);
              if(verifciationresult.isTheMoveRight===true){
                console.log(oneitem.piecetype) ;
                thisdefensemovecandefend=false;
              }}}})});
          defensecandefend.push(thisdefensemovecandefend);
       
        }
      );



// if there is one defense move (true) in the array  then no checkmate
      kingmoves.forEach(move=>{
        let ClonedBoard=cloneDeep(chessboardtouse);
        ClonedBoard[move[0]][move[1]].piecetype="king";
        ClonedBoard[move[0]][move[1]].type=colortocheck;
        ClonedBoard[posofking[0]][posofking[1]].piecetype="none";
        ClonedBoard[posofking[0]][posofking[1]].type="none";

        defensecandefend.push(!isitchecked(move,colortocheck,ClonedBoard));

      })

      if(colortocheck==="black"){
        console.log(defensemoves,colortocheck);
        console.log(defensecandefend,colortocheck);
        console.log(kingmoves,"kingmoves")
       }
       if(colortocheck==="white"){
        console.log(defensemoves,colortocheck);
        console.log(defensecandefend,colortocheck);
        console.log(kingmoves,"kingmoves")
       }
      if(defensemoves.length>0){
        checkmate=!defensecandefend.includes(true);
        
      }
return checkmate;
}

const clickhandlermove=(pos:Array<any>):void=>{
    if(firstclick===true){
        const verifciation=Verification(Chessboard[pos[0]][pos[1]].piecetype,Chessboard[pos[0]][pos[1]].type,[pos[0],pos[1]],[0,0],Chessboard);                                          
      if((Chessboard[pos[0]][pos[1]].type==="black" && BlackTurn===true) || (Chessboard[pos[0]][pos[1]].type==="white" && WhiteTurn===true)){
      if(Chessboard[pos[0]][pos[1]].gridImage!=="none"){
        let fakeboard=cloneDeep(Chessboard);
        verifciation.moves.forEach(element=>{
         fakeboard[element[0]][element[1]].highlighted=true;
       });
       
        setoldposition(pos);
        setfirstclick(false);
        setsecondclick(true);
       setChessboard(fakeboard);
      }  }
      }
       else if(secondclick===true){
        let fakeboard=cloneDeep(Chessboard);
        
        //highlight clean
        let whitekingposition:Array<number>=[];
        let blackkingposition:Array<number>=[];
        fakeboard.forEach(element=>{element.forEach((oneitem) =>{oneitem.highlighted=false;
       
          if (oneitem.type==="white" && oneitem.piecetype=="king"){
            whitekingposition=oneitem.pos;
          }
          else if (oneitem.type==="black" && oneitem.piecetype=="king" ){
            blackkingposition=oneitem.pos;
          }
      })});
        const piecetype=Chessboard[oldpieceposition[0]][oldpieceposition[1]].piecetype;
        const color=Chessboard[oldpieceposition[0]][oldpieceposition[1]].type;
        const verifciation=Verification(piecetype,color,oldpieceposition,[pos[0],pos[1]],Chessboard);

        if(piecetype==="pawn" && BlackTurn ===true && color === "black" ){
          const yes=Verification(piecetype,color,oldpieceposition,[pos[0],pos[1]],Chessboard);
          if (yes.isTheMoveRight && pos[0]===7){
            setupgradeposition([pos[0],pos[1]]);
            setupgrade(blackupgrade);
            setupgradevisiblity("visible");
          }} else if (piecetype==="pawn"  && WhiteTurn===true && color ==="white"){
            const yes=Verification(piecetype,color,oldpieceposition,[pos[0],pos[1]],Chessboard);
            if (yes.isTheMoveRight && pos[0]===0){
              setupgradeposition([pos[0],pos[1]]);
              setupgrade(whiteupgrade)
              setupgradevisiblity("visible");
            }

          }
        const preservedpiece={
          gridImage: fakeboard[pos[0]][pos[1]].gridImage,
          piecetype: fakeboard[pos[0]][pos[1]].piecetype,
          type: fakeboard[pos[0]][pos[1]].type,
        }
        //piece replace
       if(verifciation.isTheMoveRight===true ){
        fakeboard[pos[0]][pos[1]].gridImage=fakeboard[oldpieceposition[0]][oldpieceposition[1]].gridImage;
        fakeboard[pos[0]][pos[1]].piecetype=fakeboard[oldpieceposition[0]][oldpieceposition[1]].piecetype;
        fakeboard[pos[0]][pos[1]].type=fakeboard[oldpieceposition[0]][oldpieceposition[1]].type;
        fakeboard[oldpieceposition[0]][oldpieceposition[1]].gridImage="none"; 
        fakeboard[oldpieceposition[0]][oldpieceposition[1]].piecetype="none"; 
        fakeboard[oldpieceposition[0]][oldpieceposition[1]].type="none";
        if(piecetype=="king" && color==="white"){
          whitekingposition=[pos[0],pos[1]];
        }else if(piecetype=="king" && color==="black"){
          blackkingposition=[pos[0],pos[1]];}
        if(BlackTurn===true){
          const blackischecked=isitchecked(blackkingposition,"black",fakeboard);
          const whitecheckmate=checkmatechecker(whitekingposition,"white",fakeboard);
          if (whitecheckmate){
            setwinner("black");
          }
          if(blackischecked===true){
           fakeboard[oldpieceposition[0]][oldpieceposition[1]].gridImage= fakeboard[pos[0]][pos[1]].gridImage;
           fakeboard[oldpieceposition[0]][oldpieceposition[1]].piecetype=fakeboard[pos[0]][pos[1]].piecetype;
           fakeboard[oldpieceposition[0]][oldpieceposition[1]].type=fakeboard[pos[0]][pos[1]].type;
           fakeboard[pos[0]][pos[1]].gridImage=preservedpiece.gridImage; 
           fakeboard[pos[0]][pos[1]].piecetype=preservedpiece.piecetype; 
           fakeboard[pos[0]][pos[1]].type=preservedpiece.type;
          }else if (blackischecked===false){
            Setblackturn(false);
            Setwhiteturn(true);
            }

        }
        else if(WhiteTurn===true){
          const whiteischecked=isitchecked(whitekingposition,"white",fakeboard);
          const blackcheckmate=checkmatechecker(blackkingposition,"black",fakeboard);
          if (blackcheckmate){
            setwinner("white");
          }
          if(whiteischecked===true){
           fakeboard[oldpieceposition[0]][oldpieceposition[1]].gridImage= fakeboard[pos[0]][pos[1]].gridImage;
           fakeboard[oldpieceposition[0]][oldpieceposition[1]].piecetype=fakeboard[pos[0]][pos[1]].piecetype;
           fakeboard[oldpieceposition[0]][oldpieceposition[1]].type=fakeboard[pos[0]][pos[1]].type;
           fakeboard[pos[0]][pos[1]].gridImage="none"; 
           fakeboard[pos[0]][pos[1]].piecetype="none"; 
           fakeboard[pos[0]][pos[1]].type="none";
          }else if (whiteischecked===false){
            Setblackturn(true);
            Setwhiteturn(false);
          }
        }
      } 
      setonpassantmove([-1,-1]);


      if(Chessboard[oldpieceposition[0]][oldpieceposition[1]].piecetype==="pawn" &&  Chessboard[oldpieceposition[0]][oldpieceposition[1]].type==="white"
      && oldpieceposition[0]-pos[0]===2){
        setonpassantmove([pos[0],pos[1]]);
      }else if(Chessboard[oldpieceposition[0]][oldpieceposition[1]].piecetype==="pawn" &&  Chessboard[oldpieceposition[0]][oldpieceposition[1]].type==="white"
      && pos[0]-oldpieceposition[0]===2){
        setonpassantmove([pos[0],pos[1]]);
      }
      setChessboard(fakeboard);
      setfirstclick(true);
      setsecondclick(false);} } 

const PlayAgainHandler=()=>{
        setwinner("none");
        setvisibilityforcheckmateannouncer("hidden");
        setChessboard([
          [
            { gridImage: br, piecetype:"rook",type:"black",highlighted:false,  pos:[0,0]},
            { gridImage: bh, piecetype:"horse",type:"black",highlighted:false,  pos:[0,1]},
            { gridImage: bb, piecetype:"bishop",type:"black",highlighted:false,  pos:[0,2]},
            { gridImage: bq, piecetype:"queen",type:"black",highlighted:false,  pos:[0,3]},
            { gridImage: bk, piecetype:"king",type:"black",highlighted:false,  pos:[0,4]},
            { gridImage: bb, piecetype:"bishop",type:"black",highlighted:false,  pos:[0,5]},
            { gridImage: bh, piecetype:"horse",type:"black",highlighted:false,  pos:[0,6]},
            { gridImage: br, piecetype:"rook",type:"black",highlighted:false,  pos:[0,7]},
          ],
          [
            { gridImage: bp, piecetype:"pawn",type:"black",highlighted:false,  pos:[1,0] },
            { gridImage: bp, piecetype:"pawn",type:"black",highlighted:false,  pos:[1,1] },
            { gridImage: bp, piecetype:"pawn",type:"black",highlighted:false,  pos:[1,2] },
            { gridImage: bp, piecetype:"pawn",type:"black",highlighted:false,  pos:[1,3]},
            { gridImage: bp, piecetype:"pawn",type:"black",highlighted:false,  pos:[1,4]},
            { gridImage: bp, piecetype:"pawn",type:"black",highlighted:false,  pos:[1,5] },
            { gridImage: bp, piecetype:"pawn",type:"black",highlighted:false,  pos:[1,6] },
            { gridImage: bp, piecetype:"pawn",type:"black",highlighted:false,  pos:[1,7]},
          ],
          [
            { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[2,0]},
            { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[2,1]},
            { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[2,2]},
            { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[2,3]},
            { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[2,4]},
            { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[2,5] },
            { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[2,6] },
            { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[2,7] },
          ],
          [
            { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[3,0]},
            { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[3,1]},
            { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[3,2]},
            { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[3,3]},
            { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[3,4]},
            { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[3,5]},
            { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[3,6]},
            { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[3,7]},
          ],
          [
            { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[4,0]},
            { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[4,1]},
            { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[4,2]},
            { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[4,3]},
            { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[4,4]},
            { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[4,5]},
            { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[4,6]},
            { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[4,7]},
          ],
          [
            { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[5,0]},
            { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[5,1]},
            { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[5,2]},
            { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[5,3]},
            { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[5,4]},
            { gridImage: "none", piecetype:"none",type:"none",highlighted:false,   pos:[5,5]},
            { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[5,6]},
            { gridImage: "none", piecetype:"none",type:"none",highlighted:false,  pos:[5,7]},
          ],
          [
            { gridImage: wp, piecetype:"pawn",type:"white",highlighted:false,  pos:[6,0]},
            { gridImage: wp, piecetype:"pawn",type:"white",highlighted:false,  pos:[6,1]},
            { gridImage: wp, piecetype:"pawn",type:"white",highlighted:false,  pos:[6,2]},
            { gridImage: wp, piecetype:"pawn",type:"white",highlighted:false,  pos:[6,3]},
            { gridImage: wp, piecetype:"pawn",type:"white",highlighted:false,  pos:[6,4]},
            { gridImage: wp, piecetype:"pawn",type:"white",highlighted:false,  pos:[6,5]},
            { gridImage: wp, piecetype:"pawn",type:"white",highlighted:false,  pos:[6,6]},
            { gridImage: wp, piecetype:"pawn",type:"white",highlighted:false,  pos:[6,7]},
          ],
          [
            { gridImage: wr, piecetype:"rook",type:"white",highlighted:false,  pos:[7,0]},
            { gridImage: wh, piecetype:"horse",type:"white",highlighted:false,  pos:[7,1]},
            { gridImage: wb, piecetype:"bishop",type:"white",highlighted:false,  pos:[7,2]},
            { gridImage: wq, piecetype:"queen",type:"white",highlighted:false,  pos:[7,3]},
            { gridImage: wk, piecetype:"king",type:"white",highlighted:false,  pos:[7,4]},
            { gridImage: wb, piecetype:"bishop",type:"white",highlighted:false,  pos:[7,5]},
            { gridImage: wh, piecetype:"horse",type:"white",highlighted:false,  pos:[7,6]},
            { gridImage: wr, piecetype:"rook",type:"white",highlighted:false,  pos:[7,7]},
            
          ],
        ]);
        Setblackturn(false);
        Setwhiteturn(true);

      }



      const upgradehandler=(piecetype:string,image:any)=>{
        let chessboarde=cloneDeep(Chessboard);
        chessboarde[upgradeposition[0]][upgradeposition[1]].piecetype=piecetype ;
        chessboarde[upgradeposition[0]][upgradeposition[1]].gridImage=image ;
        setupgradevisiblity('hidden');
        setChessboard(chessboarde);
      }
/*eslint-disable */ 
      useEffect(
        ()=>{
          if(BlackTurn){props.turn("black");}
        else if(WhiteTurn){props.turn("white");}
        },[WhiteTurn,BlackTurn] 

      )

      useEffect(
        ()=>{
          if (winner!=="none"){
            setvisibilityforcheckmateannouncer("visible");
          } 
        },[winner]
      )

      useEffect(
        ()=>{

        },[]
      )
/*eslint-enable */


  return (<Chessui> {Chessboard.map((row) => { return(
    row.map((piece:OnePiece) =>{ 
    if (piece.gridImage=="none"){
      if(piece.highlighted){
      return(<Piece  key={Math.random()*100} onClick={()=>{clickhandlermove(piece.pos)}} data-piecepos={piece.pos}  draggable={true}> 
         <Highlighted><Image src={Xhighlight} alt="wr"  height={40} width={40}></Image>
        
        </Highlighted>
        </Piece>);}else{
          return(<Piece  key={Math.random()*100}  onClick={()=>{clickhandlermove(piece.pos)}}    data-piecepos={piece.pos}  draggable={true}  > 
          </Piece>);    }
    }
    else{
      if(piece.highlighted===true){
        return(<Piece  key={Math.random()*100}  onClick={()=>{clickhandlermove(piece.pos)}}   data-piecepos={piece.pos} style={{cursor:"pointer"}}draggable={true}  >
        <Image src={piece.gridImage} alt="wr"  height={88} width={88}></Image>
        <Highlighted><Image src={Xhighlight} alt="wr"  height={40} width={40}></Image></Highlighted>
      </Piece>);
      }else{
        return(<Piece   key={Math.random()*100}  onClick={()=>{clickhandlermove(piece.pos)}}   data-piecepos={piece.pos} style={{cursor:"pointer"}} draggable={true}  >
      <Image src={piece.gridImage} alt="wr"  height={88} width={88}></Image>
    </Piece> );
      }
      
        
      }}))
  })} 
  <CheckmateAnnouncement visible={visibilityannoncer}> 
  <TheWinner>The winner is {winner}</TheWinner>
  <PlayAgainButton onClick={()=>{PlayAgainHandler()}}>Go Again?</PlayAgainButton>
  
  </CheckmateAnnouncement>
  
    
  <Upgrade visible={upgradevisiblity}>
    <Piecestochoosefrom>
      {
       upgradearray.map((element)=>{
        return (<Piece key={Math.random()*100} onClick={()=>{upgradehandler(element.piecetype,element.gridimage)}}    style={{cursor:"pointer",border:"3px solid black"}} draggable={true}  >
        <Image src={element.gridimage} alt="wr"  height={88} width={88}></Image>
      </Piece>);
       })
      }
    </Piecestochoosefrom>
  </Upgrade>
  
  </Chessui>);
};

export default ChessGame;
