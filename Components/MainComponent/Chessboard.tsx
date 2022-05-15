import type { NextPage } from "next";
import styled from "styled-components";
import React, { useReducer, useEffect, useState } from "react";
import Image from "next/image";
/*import { useAppSelector, useAppDispatch } from '../Redux/hooks'*/
import { store } from "../Redux/store";
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
    ischeckedevenafterdefense:boolean
  },

}


const Piece = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  z-index: 2;
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

interface props{
  turn :(a: string) => void,
}


const ChessGame: NextPage<props> = (props) => {
    const [BlackTurn,Setblackturn]=useState<Boolean>(false);
    const [WhiteTurn,Setwhiteturn]=useState<Boolean>(true);
    const [firstclick,setfirstclick]=useState<Boolean>(true);
    const [secondclick,setsecondclick]=useState<Boolean>(false);
    const [oldpieceposition,setoldposition]=useState<Array<number>>([]);
    const [Chessboard, setChessboard] = useState<Array<Array<OnePiece>>>([
    [
      { currentpiece: br, piecetype:"rook",type:"black",highlighted:false,  pos:[0,0]},
      { currentpiece: bh, piecetype:"horse",type:"black",highlighted:false,  pos:[0,1]},
      { currentpiece: bb, piecetype:"bishop",type:"black",highlighted:false,  pos:[0,2]},
      { currentpiece: bq, piecetype:"queen",type:"black",highlighted:false,  pos:[0,3]},
      { currentpiece: bk, piecetype:"king",type:"black",highlighted:false,  pos:[0,4]},
      { currentpiece: bb, piecetype:"bishop",type:"black",highlighted:false,  pos:[0,5]},
      { currentpiece: bh, piecetype:"horse",type:"black",highlighted:false,  pos:[0,6]},
      { currentpiece: br, piecetype:"rook",type:"black",highlighted:false,  pos:[0,7]},
    ],
    [
      { currentpiece: bp, piecetype:"pawn",type:"black",highlighted:false,  pos:[1,0] },
      { currentpiece: bp, piecetype:"pawn",type:"black",highlighted:false,  pos:[1,1] },
      { currentpiece: bp, piecetype:"pawn",type:"black",highlighted:false,  pos:[1,2] },
      { currentpiece: bp, piecetype:"pawn",type:"black",highlighted:false,  pos:[1,3]},
      { currentpiece: bp, piecetype:"pawn",type:"black",highlighted:false,  pos:[1,4]},
      { currentpiece: bp, piecetype:"pawn",type:"black",highlighted:false,  pos:[1,5] },
      { currentpiece: bp, piecetype:"pawn",type:"black",highlighted:false,  pos:[1,6] },
      { currentpiece: bp, piecetype:"pawn",type:"black",highlighted:false,  pos:[1,7]},
    ],
    [
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,  pos:[2,0]},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,  pos:[2,1]},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,  pos:[2,2]},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,  pos:[2,3]},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,  pos:[2,4]},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,  pos:[2,5] },
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,  pos:[2,6] },
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,  pos:[2,7] },
    ],
    [
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,  pos:[3,0]},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,  pos:[3,1]},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,  pos:[3,2]},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,  pos:[3,3]},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,  pos:[3,4]},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,  pos:[3,5]},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,  pos:[3,6]},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,  pos:[3,7]},
    ],
    [
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,  pos:[4,0]},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,  pos:[4,1]},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,  pos:[4,2]},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,  pos:[4,3]},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,  pos:[4,4]},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,  pos:[4,5]},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,  pos:[4,6]},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,  pos:[4,7]},
    ],
    [
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,  pos:[5,0]},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,  pos:[5,1]},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,  pos:[5,2]},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,  pos:[5,3]},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,  pos:[5,4]},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,   pos:[5,5]},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,  pos:[5,6]},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,  pos:[5,7]},
    ],
    [
      { currentpiece: wp, piecetype:"pawn",type:"white",highlighted:false,  pos:[6,0]},
      { currentpiece: wp, piecetype:"pawn",type:"white",highlighted:false,  pos:[6,1]},
      { currentpiece: wp, piecetype:"pawn",type:"white",highlighted:false,  pos:[6,2]},
      { currentpiece: wp, piecetype:"pawn",type:"white",highlighted:false,  pos:[6,3]},
      { currentpiece: wp, piecetype:"pawn",type:"white",highlighted:false,  pos:[6,4]},
      { currentpiece: wp, piecetype:"pawn",type:"white",highlighted:false,  pos:[6,5]},
      { currentpiece: wp, piecetype:"pawn",type:"white",highlighted:false,  pos:[6,6]},
      { currentpiece: wp, piecetype:"pawn",type:"white",highlighted:false,  pos:[6,7]},
    ],
    [
      { currentpiece: wr, piecetype:"rook",type:"white",highlighted:false,  pos:[7,0]},
      { currentpiece: wh, piecetype:"horse",type:"white",highlighted:false,  pos:[7,1]},
      { currentpiece: wb, piecetype:"bishop",type:"white",highlighted:false,  pos:[7,2]},
      { currentpiece: wq, piecetype:"queen",type:"white",highlighted:false,  pos:[7,3]},
      { currentpiece: wk, piecetype:"king",type:"white",highlighted:false,  pos:[7,4]},
      { currentpiece: wb, piecetype:"bishop",type:"white",highlighted:false,  pos:[7,5]},
      { currentpiece: wh, piecetype:"horse",type:"white",highlighted:false,  pos:[7,6]},
      { currentpiece: wr, piecetype:"rook",type:"white",highlighted:false,  pos:[7,7]},
      
    ],
  ]);



const checkforcheckormate=(posofking:Array<number>,colortocheck:string,chessboardtouse:Array<Array<OnePiece>>)=>{

  let ischecked:boolean=false;
  let allmoves:Array<Array<number>>=[]
  let defensemoves:Array<Array<number>>=[]

  chessboardtouse.forEach((element)=>{
      element.forEach((oneitem) =>{
        if("black"===colortocheck ){
          if(oneitem.type==="white"){
        allmoves.push(...Verification(oneitem.piecetype,'white',oneitem.pos,[posofking[0],posofking[1]],chessboardtouse).moves);}
        if(oneitem.type==="black" && oneitem.piecetype!=="king"){
            defensemoves.push(...Verification(oneitem.piecetype,'white',oneitem.pos,[0,0],chessboardtouse).moves);}
            }
        else if(colortocheck==="white"){
          if(oneitem.type==="black"){
          allmoves.push(...Verification(oneitem.piecetype,'black',oneitem.pos,[posofking[0],posofking[1]],chessboardtouse).moves);}
          else if(oneitem.type==="white" && oneitem.piecetype!=="king"){
            defensemoves.push(...Verification(oneitem.piecetype,'white',oneitem.pos,[0,0],chessboardtouse).moves )   ;
          }
        }
      })
      });


      allmoves.forEach(pos => {
        if ((pos[0]===posofking[0]) && (pos[1]===posofking[1])){
          console.log("we got a check")
          ischecked=true;
        }
      });
      let ischeckedevenafterdefense=false;
   if(ischecked!==false){
     console.log(ischecked);
    let stillarray:Array<Array<number>>=[];
    defensemoves.forEach(pos =>{
      let newarray=Object.assign({},chessboardtouse);
      let propertyValues = Object.values(newarray);
      propertyValues.forEach((element)=>{
        element.forEach((oneitem) =>{
          if("black"===colortocheck ){
            if(oneitem.type==="white"){
          let verifciationresult=Verification(oneitem.piecetype,'white',oneitem.pos,[posofking[0],posofking[1]],chessboardtouse);
          stillarray.push(...verifciationresult.moves);}}
          else if(colortocheck==="white"){
            if(oneitem.type==="black"){
            let verifciationresult=Verification(oneitem.piecetype,'black',oneitem.pos,[posofking[0],posofking[1]],chessboardtouse);
            stillarray.push(...verifciationresult.moves);}
          }
        })
        });
        stillarray.forEach(pos => {
          if ((pos[0]===posofking[0]) && (pos[1]===posofking[1])){
            ischeckedevenafterdefense=true;
          }
        });
      }
    );}
    console.log("its a checkmate  :  ", ischeckedevenafterdefense);


      return {ischecked,ischeckedevenafterdefense};
}





  const clickhandlermove=(pos:Array<any>):void=>{

    if(firstclick===true){
        const verifciation=Verification(Chessboard[pos[0]][pos[1]].piecetype,Chessboard[pos[0]][pos[1]].type,[pos[0],pos[1]],[0,0],Chessboard);                                          
      if((Chessboard[pos[0]][pos[1]].type==="black" && BlackTurn===true) || (Chessboard[pos[0]][pos[1]].type==="white" && WhiteTurn===true)){
      if(Chessboard[pos[0]][pos[1]].currentpiece!=="none"){
        let fakeboard=Object.assign({},Chessboard);
        
        verifciation.moves.forEach(element=>{
         fakeboard[element[0]][element[1]].highlighted=true;
       });
       
        setoldposition(pos);
        setfirstclick(false);
        setsecondclick(true);}  }
      }
      


      
      else if(secondclick===true){
        let fakeboard=Chessboard;
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
        const preservedpiece={
          currentpiece: fakeboard[pos[0]][pos[1]].currentpiece,
          piecetype: fakeboard[pos[0]][pos[1]].piecetype,
          type: fakeboard[pos[0]][pos[1]].type,
        }
        //piece replace
       if(verifciation.isTheMoveRight===true ){
        fakeboard[pos[0]][pos[1]].currentpiece=fakeboard[oldpieceposition[0]][oldpieceposition[1]].currentpiece;
        fakeboard[pos[0]][pos[1]].piecetype=fakeboard[oldpieceposition[0]][oldpieceposition[1]].piecetype;
        fakeboard[pos[0]][pos[1]].type=fakeboard[oldpieceposition[0]][oldpieceposition[1]].type;
        fakeboard[oldpieceposition[0]][oldpieceposition[1]].currentpiece="none"; 
        fakeboard[oldpieceposition[0]][oldpieceposition[1]].piecetype="none"; 
        fakeboard[oldpieceposition[0]][oldpieceposition[1]].type="none";
        if(piecetype=="king" && color==="white"){
          whitekingposition=[pos[0],pos[1]];
        }else if(piecetype=="king" && color==="black"){
          blackkingposition=[pos[0],pos[1]];}
        if(BlackTurn===true){
          const result=checkforcheckormate(blackkingposition,"black",fakeboard);
          if(result.ischecked===true){
           fakeboard[oldpieceposition[0]][oldpieceposition[1]].currentpiece= fakeboard[pos[0]][pos[1]].currentpiece;
           fakeboard[oldpieceposition[0]][oldpieceposition[1]].piecetype=fakeboard[pos[0]][pos[1]].piecetype;
           fakeboard[oldpieceposition[0]][oldpieceposition[1]].type=fakeboard[pos[0]][pos[1]].type;
           fakeboard[pos[0]][pos[1]].currentpiece=preservedpiece.currentpiece; 
           fakeboard[pos[0]][pos[1]].piecetype=preservedpiece.piecetype; 
           fakeboard[pos[0]][pos[1]].type=preservedpiece.type;
          }else if (result.ischecked===false){
            Setblackturn(false);
            Setwhiteturn(true);
            }
          
        }
        else if(WhiteTurn===true){
          const resultwhite=checkforcheckormate(whitekingposition,"white",fakeboard);
          const resultblack=checkforcheckormate(blackkingposition,"black",fakeboard);
          if(resultwhite.ischecked===true){
           fakeboard[oldpieceposition[0]][oldpieceposition[1]].currentpiece= fakeboard[pos[0]][pos[1]].currentpiece;
           fakeboard[oldpieceposition[0]][oldpieceposition[1]].piecetype=fakeboard[pos[0]][pos[1]].piecetype;
           fakeboard[oldpieceposition[0]][oldpieceposition[1]].type=fakeboard[pos[0]][pos[1]].type;
           fakeboard[pos[0]][pos[1]].currentpiece="none"; 
           fakeboard[pos[0]][pos[1]].piecetype="none"; 
           fakeboard[pos[0]][pos[1]].type="none";
          }else if (resultwhite.ischecked===false){
            Setblackturn(true);
            Setwhiteturn(false);
          }
        }
      } 
      setChessboard(fakeboard);
      setfirstclick(true);
      setsecondclick(false);} } 


      useEffect(
        ()=>{
          if(BlackTurn){props.turn("black");console.log("changed to black")}
        else if(WhiteTurn){props.turn("white");console.log("changed to white")}
        },[WhiteTurn,BlackTurn]
      )


  return (<Chessui> {Chessboard.map((row) => { return(
    row.map((piece:OnePiece) =>{ 
    if (piece.currentpiece=="none"){
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
        <Image src={piece.currentpiece} alt="wr"  height={88} width={88}></Image>
        <Highlighted><Image src={Xhighlight} alt="wr"  height={40} width={40}></Image></Highlighted>
      </Piece>);
      }else{
        return(<Piece   key={Math.random()*100}  onClick={()=>{clickhandlermove(piece.pos)}}   data-piecepos={piece.pos} style={{cursor:"pointer"}} draggable={true}  >
      <Image src={piece.currentpiece} alt="wr"  height={88} width={88}></Image>
    </Piece> );
      }
      
        
      }}))
  })} </Chessui>);
};

export default ChessGame;
