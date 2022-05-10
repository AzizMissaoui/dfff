import type { NextPage } from "next";
import styled from "styled-components";
import React, { ReactElement, useReducer, useEffect, useState } from "react";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from '../Redux/hooks'
import { store } from "../Redux/store";
import Verification from "../Functions/Verification";
import { firstclickchange, secondclickchange,changeselected } from '../Redux/createreducer'
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
import greenx from "../../public/highlighted.png";





type Move = "white" | "black" | "none";
//wtf
type Big = Array<ReactElement>;
interface OnePiece {
  currentpiece: string | any ;
  clearw: boolean;
  clearb: boolean;
  pos:Array<number>
  piecetype:string,
  highlighted:boolean,
  type:string,
  firstMove:boolean,
}


const Chessui  = styled.div`
  height:768px ;
  width: 768px;
  max-width: 100%;
  display: grid;
  border:3px solid white ;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  transform: rotate(180deg);

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




const Piece = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  z-index: 2;
  transform: rotate(180deg);
`;

const Highlighted= styled.div`
position: absolute;
display: flex;
align-items: center;
justify-content: center;
background-image: url('../../public/highlighted.png');
`


const ChessGame: NextPage = () => {
  

  const count = useAppSelector(state => state.Switch);
  const dispatch = useAppDispatch(); 


  const [oldpieceposition,setoldposition]=useState(0);
  const [Chessboard, setChessboard] = useState<Array<Array<OnePiece>>>([
    [
      { currentpiece: br, piecetype:"rook",type:"black",highlighted:false,clearw: true, clearb: true , pos:[0,0],firstMove:true,},
      { currentpiece: bh, piecetype:"horse",type:"black",highlighted:false,clearw: true, clearb: true , pos:[0,1],firstMove:true,},
      { currentpiece: bb, piecetype:"bishop",type:"black",highlighted:false,clearw: true, clearb: true , pos:[0,2], firstMove:true,},
      { currentpiece: bq, piecetype:"queen",type:"black",highlighted:false,clearw: true, clearb: true , pos:[0,3], firstMove:true,},
      { currentpiece: bk, piecetype:"king",type:"black",highlighted:false,clearw: true, clearb: true , pos:[0,4], firstMove:true,},
      { currentpiece: bb, piecetype:"bishop",type:"black",highlighted:false,clearw: true, clearb: true , pos:[0,5], firstMove:true,},
      { currentpiece: bh, piecetype:"horse",type:"black",highlighted:false,clearw: true, clearb: true , pos:[0,6], firstMove:true,},
      { currentpiece: br, piecetype:"rook",type:"black",highlighted:false,clearw: true, clearb: true , pos:[0,7],firstMove:true,},
    ],
    [
      { currentpiece: bp, piecetype:"pawn",type:"black",highlighted:false,clearw: true, clearb: true , pos:[1,0] ,firstMove:true,},
      { currentpiece: bp, piecetype:"pawn",type:"black",highlighted:false,clearw: true, clearb: true , pos:[1,1],firstMove:true, },
      { currentpiece: bp, piecetype:"pawn",type:"black",highlighted:false,clearw: true, clearb: true , pos:[1,2],firstMove:true, },
      { currentpiece: bp, piecetype:"pawn",type:"black",highlighted:false,clearw: true, clearb: true , pos:[1,3], firstMove:true,},
      { currentpiece: bp, piecetype:"pawn",type:"black",highlighted:false,clearw: true, clearb: true , pos:[1,4], firstMove:true,},
      { currentpiece: bp, piecetype:"pawn",type:"black",highlighted:false,clearw: true, clearb: true , pos:[1,5],firstMove:true, },
      { currentpiece: bp, piecetype:"pawn",type:"black",highlighted:false,clearw: true, clearb: true , pos:[1,6],firstMove:true, },
      { currentpiece: bp, piecetype:"pawn",type:"black",highlighted:false,clearw: true, clearb: true , pos:[1,7],firstMove:true,},
    ],
    [
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,clearw: true, clearb: true , pos:[2,0],firstMove:true,},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,clearw: true, clearb: true , pos:[2,1], firstMove:true,},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,clearw: true, clearb: true , pos:[2,2], firstMove:true,},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,clearw: true, clearb: true , pos:[2,3], firstMove:true,},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,clearw: true, clearb: true , pos:[2,4],firstMove:true,},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,clearw: true, clearb: true , pos:[2,5],firstMove:true, },
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,clearw: true, clearb: true , pos:[2,6],firstMove:true, },
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,clearw: true, clearb: true , pos:[2,7],firstMove:true, },
    ],
    [
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,clearw: true, clearb: true , pos:[3,0],firstMove:true,},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,clearw: true, clearb: true , pos:[3,1],firstMove:true,},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,clearw: true, clearb: true , pos:[3,2],firstMove:true,},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,clearw: true, clearb: true , pos:[3,3],firstMove:true,},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,clearw: true, clearb: true , pos:[3,4],firstMove:true,},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,clearw: true, clearb: true , pos:[3,5],firstMove:true,},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,clearw: true, clearb: true , pos:[3,6],firstMove:true,},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,clearw: true, clearb: true , pos:[3,7],firstMove:true,},
    ],
    [
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,clearw: true, clearb: true , pos:[4,0], firstMove:true,},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,clearw: true, clearb: true , pos:[4,1],firstMove:true,},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,clearw: true, clearb: true , pos:[4,2],firstMove:true,},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,clearw: true, clearb: true , pos:[4,3],firstMove:true,},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,clearw: true, clearb: true , pos:[4,4],firstMove:true,},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,clearw: true, clearb: true , pos:[4,5],firstMove:true,},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,clearw: true, clearb: true , pos:[4,6],firstMove:true,},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,clearw: true, clearb: true , pos:[4,7],firstMove:true,},
    ],
    [
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,clearw: true, clearb: true , pos:[5,0],firstMove:true,},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,clearw: true, clearb: true , pos:[5,1],firstMove:true,},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,clearw: true, clearb: true , pos:[5,2],firstMove:true,},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,clearw: true, clearb: true , pos:[5,3],firstMove:true,},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,clearw: true, clearb: true , pos:[5,4],firstMove:true,},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false, clearw: true, clearb: true , pos:[5,5],firstMove:true,},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,clearw: true, clearb: true , pos:[5,6],firstMove:true,},
      { currentpiece: "none", piecetype:"none",type:"none",highlighted:false,clearw: true, clearb: true , pos:[5,7],firstMove:true,},
    ],
    [
      { currentpiece: wp, piecetype:"pawn",type:"white",highlighted:false,clearw: true, clearb: true , pos:[6,0],firstMove:true,},
      { currentpiece: wp, piecetype:"pawn",type:"white",highlighted:false,clearw: true, clearb: true , pos:[6,1],firstMove:true,},
      { currentpiece: wp, piecetype:"pawn",type:"white",highlighted:false,clearw: true, clearb: true , pos:[6,2],firstMove:true,},
      { currentpiece: wp, piecetype:"pawn",type:"white",highlighted:false,clearw: true, clearb: true , pos:[6,3],firstMove:true,},
      { currentpiece: wp, piecetype:"pawn",type:"white",highlighted:false,clearw: true, clearb: true , pos:[6,4],firstMove:true,},
      { currentpiece: wp, piecetype:"pawn",type:"white",highlighted:false,clearw: true, clearb: true , pos:[6,5],firstMove:true,},
      { currentpiece: wp, piecetype:"pawn",type:"white",highlighted:false,clearw: true, clearb: true , pos:[6,6],firstMove:true,},
      { currentpiece: wp, piecetype:"pawn",type:"white",highlighted:false,clearw: true, clearb: true , pos:[6,7],firstMove:true,},
    ],
    [
      { currentpiece: wr, piecetype:"rook",type:"white",highlighted:false,clearw: true, clearb: true , pos:[7,0],firstMove:true,},
      { currentpiece: wh, piecetype:"horse",type:"white",highlighted:false,clearw: true, clearb: true , pos:[7,1],firstMove:true,},
      { currentpiece: wb, piecetype:"bishop",type:"white",highlighted:false,clearw: true, clearb: true , pos:[7,2],firstMove:true,},
      { currentpiece: wq, piecetype:"queen",type:"white",highlighted:false,clearw: true, clearb: true , pos:[7,3],firstMove:true,},
      { currentpiece: wk, piecetype:"king",type:"white",highlighted:false,clearw: true, clearb: true , pos:[7,4],firstMove:true,},
      { currentpiece: wb, piecetype:"bishop",type:"white",highlighted:false,clearw: true, clearb: true , pos:[7,5],firstMove:true,},
      { currentpiece: wh, piecetype:"horse",type:"white",highlighted:false,clearw: true, clearb: true , pos:[7,6],firstMove:true,},
      { currentpiece: wr, piecetype:"rook",type:"white",highlighted:false,clearw: true, clearb: true , pos:[7,7],firstMove:true,},
      
    ],
  ]);




  const clickhandlermove=(pos:Array<any>)=>{
    const state=store.getState();
    const firstclick=state.Switch.FirstClick;
    const secondclick=state.Switch.SecondClick; 
    
    if(firstclick===true){
      if(Chessboard[pos[0]][pos[1]].currentpiece!=="none"){
        const piecetype=Chessboard[pos[0]][pos[1]].piecetype;
        const color=Chessboard[pos[0]][pos[1]].type;
        const verifciation=Verification(piecetype,color,[pos[0],pos[1]],[0,6],Chessboard);
        let fakeboard=Chessboard;
        verifciation.moves.forEach(element=>{
         fakeboard[element[0]][element[1]].highlighted=true;
       })
        
      dispatch(changeselected(pos));
      dispatch(firstclickchange())
      dispatch(secondclickchange())
    
      
      }
      }else if(secondclick===true){
        const state=store.getState();
        let fakeboard=Chessboard;
        
        //highlight clean
        fakeboard.forEach(element=>{element.forEach(oneitem => oneitem.highlighted=false)});
        const piecetype=Chessboard[state.Switch.SelecetedPiece[0]][state.Switch.SelecetedPiece[1]].piecetype;
        const color=Chessboard[state.Switch.SelecetedPiece[0]][state.Switch.SelecetedPiece[1]].type;
        const verifciation=Verification(piecetype,color,state.Switch.SelecetedPiece,[pos[0],pos[1]],Chessboard);
        console.log(verifciation.isTheMoveRight);
        //piece replace
       if(verifciation.isTheMoveRight===true){
        fakeboard[pos[0]][pos[1]].currentpiece=fakeboard[state.Switch.SelecetedPiece[0]][state.Switch.SelecetedPiece[1]].currentpiece;
        fakeboard[pos[0]][pos[1]].piecetype=fakeboard[state.Switch.SelecetedPiece[0]][state.Switch.SelecetedPiece[1]].piecetype;
        fakeboard[pos[0]][pos[1]].type=fakeboard[state.Switch.SelecetedPiece[0]][state.Switch.SelecetedPiece[1]].type;
        fakeboard[state.Switch.SelecetedPiece[0]][state.Switch.SelecetedPiece[1]].currentpiece="none"; 
        fakeboard[state.Switch.SelecetedPiece[0]][state.Switch.SelecetedPiece[1]].piecetype="none"; 
        fakeboard[state.Switch.SelecetedPiece[0]][state.Switch.SelecetedPiece[1]].type="none";
        setChessboard(fakeboard);
      } 

        
        dispatch(firstclickchange())
        dispatch(secondclickchange())
      }
      


  } 



   
  
  


  return (<Chessui> {Chessboard.map((row) => { return(
    row.map((piece:OnePiece) =>{
    
    if (piece.currentpiece=="none"){
      if(piece.highlighted){
      return(<Piece  key={Math.random()*100} onClick={()=>{clickhandlermove(piece.pos)}} data-piecepos={piece.pos} > 
         <Image src={greenx} alt="wr"  height={40} width={40}></Image>
        </Piece>);}else{
          return(<Piece  key={Math.random()*100} onClick={()=>{clickhandlermove(piece.pos)}} data-piecepos={piece.pos} > 
          </Piece>);    }
    }
    else{
      if(piece.highlighted===true){
        return(<Piece  key={Math.random()*100} onClick={()=>{clickhandlermove(piece.pos)}} data-piecepos={piece.pos} style={{cursor:"pointer"}}  >
        <Image src={piece.currentpiece} alt="wr"  height={80} width={80}></Image>
        <Highlighted><Image src={greenx} alt="wr"  height={40} width={40}></Image></Highlighted>
        
      </Piece> );
      }else{
        return(<Piece   key={Math.random()*100} onClick={()=>{clickhandlermove(piece.pos)}} data-piecepos={piece.pos} style={{cursor:"pointer"}}  >
      <Image src={piece.currentpiece} alt="wr"  height={80} width={80}></Image>
    </Piece> );
      }
      
        
      }}))
  })} </Chessui>);
};

export default ChessGame;
