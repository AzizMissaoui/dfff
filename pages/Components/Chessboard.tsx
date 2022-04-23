import type { NextPage } from "next";
import styled from "styled-components";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from '../Redux/hooks'
import { store } from "../Redux/store";
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





type Move = string;
//wtf
type Big = Array<ReactElement>;
interface OnePiece {
  currentpiece: String;
  clearw: boolean;
  clearb: boolean;
}

const Chesboard = styled.div`
  height:768px ;
  width: 768px;
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);

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
`;

const ChessBoard: NextPage = () => {
  const [Chessui, setChessUi] = useState<Big>([]);
  const  [Piecetomove,setPiecetomove]=useState<string>("");
  const [Chessboard, setChessboard] = useState([
    [
      { currentpiece: br, clearw: true, clearb: true , pos:[0,0]},
      { currentpiece: bh, clearw: true, clearb: true , pos:[0,1]},
      { currentpiece: bb, clearw: true, clearb: true , pos:[0,2] },
      { currentpiece: bq, clearw: true, clearb: true , pos:[0,3] },
      { currentpiece: bk, clearw: true, clearb: true , pos:[0,4] },
      { currentpiece: bb, clearw: true, clearb: true , pos:[0,5] },
      { currentpiece: bh, clearw: true, clearb: true , pos:[0,6] },
      { currentpiece: br, clearw: true, clearb: true , pos:[0,7]},
    ],
    [
      { currentpiece: bp, clearw: true, clearb: true , pos:[1,0] },
      { currentpiece: bp, clearw: true, clearb: true , pos:[1,1], },
      { currentpiece: bp, clearw: true, clearb: true , pos:[1,2], },
      { currentpiece: bp, clearw: true, clearb: true , pos:[1,3], },
      { currentpiece: bp, clearw: true, clearb: true , pos:[1,4], },
      { currentpiece: bp, clearw: true, clearb: true , pos:[1,5], },
      { currentpiece: bp, clearw: true, clearb: true , pos:[1,6], },
      { currentpiece: bp, clearw: true, clearb: true , pos:[1,7],},
    ],
    [
      { currentpiece: "none", clearw: true, clearb: true , pos:[2,0],},
      { currentpiece: "none", clearw: true, clearb: true , pos:[2,1], },
      { currentpiece: "none", clearw: true, clearb: true , pos:[2,2], },
      { currentpiece: "none", clearw: true, clearb: true , pos:[2,3], },
      { currentpiece: "none", clearw: true, clearb: true , pos:[2,4],},
      { currentpiece: "none", clearw: true, clearb: true , pos:[2,5], },
      { currentpiece: "none", clearw: true, clearb: true , pos:[2,6], },
      { currentpiece: "none", clearw: true, clearb: true , pos:[2,7], },
    ],
    [
      { currentpiece: "none", clearw: true, clearb: true , pos:[3,0],},
      { currentpiece: "none", clearw: true, clearb: true , pos:[3,1],},
      { currentpiece: "none", clearw: true, clearb: true , pos:[3,2],},
      { currentpiece: "none", clearw: true, clearb: true , pos:[3,3],},
      { currentpiece: "none", clearw: true, clearb: true , pos:[3,4],},
      { currentpiece: "none", clearw: true, clearb: true , pos:[3,5],},
      { currentpiece: "none", clearw: true, clearb: true , pos:[3,6],},
      { currentpiece: "none", clearw: true, clearb: true , pos:[3,7],},
    ],
    [
      { currentpiece: "none", clearw: true, clearb: true , pos:[4,0], },
      { currentpiece: "none", clearw: true, clearb: true , pos:[4,1],},
      { currentpiece: "none", clearw: true, clearb: true , pos:[4,2],},
      { currentpiece: "none", clearw: true, clearb: true , pos:[4,3],},
      { currentpiece: "none", clearw: true, clearb: true , pos:[4,4],},
      { currentpiece: "none", clearw: true, clearb: true , pos:[4,5],},
      { currentpiece: "none", clearw: true, clearb: true , pos:[4,6],},
      { currentpiece: "none", clearw: true, clearb: true , pos:[4,7],},
    ],
    [
      { currentpiece: "none", clearw: true, clearb: true , pos:[5,0],},
      { currentpiece: "none", clearw: true, clearb: true , pos:[5,1],},
      { currentpiece: "none", clearw: true, clearb: true , pos:[5,2],},
      { currentpiece: "none", clearw: true, clearb: true , pos:[5,3],},
      { currentpiece: "none", clearw: true, clearb: true , pos:[5,4],},
      { currentpiece: "none", clearw: true, clearb: true , pos:[5,5],},
      { currentpiece: "none", clearw: true, clearb: true , pos:[5,6],},
      { currentpiece: "none", clearw: true, clearb: true , pos:[5,7],},
    ],
    [
      { currentpiece: wp, clearw: true, clearb: true , pos:[6,0],},
      { currentpiece: wp, clearw: true, clearb: true , pos:[6,1],},
      { currentpiece: wp, clearw: true, clearb: true , pos:[6,2],},
      { currentpiece: wp, clearw: true, clearb: true , pos:[6,3],},
      { currentpiece: wp, clearw: true, clearb: true , pos:[6,4],},
      { currentpiece: wp, clearw: true, clearb: true , pos:[6,5],},
      { currentpiece: wp, clearw: true, clearb: true , pos:[6,6],},
      { currentpiece: wp, clearw: true, clearb: true , pos:[6,7],},
    ],
    [
      { currentpiece: wr, clearw: true, clearb: true , pos:[7,0],},
      { currentpiece: wb, clearw: true, clearb: true , pos:[7,1],},
      { currentpiece: wh, clearw: true, clearb: true , pos:[7,2],},
      { currentpiece: wb, clearw: true, clearb: true , pos:[7,3],},
      { currentpiece: wq, clearw: true, clearb: true , pos:[7,4],},
      { currentpiece: wk, clearw: true, clearb: true , pos:[7,5],},
      { currentpiece: wb, clearw: true, clearb: true , pos:[7,6],},
      { currentpiece: wh, clearw: true, clearb: true , pos:[7,7],},
      
    ],
  ]);

  const count = useAppSelector(state => state.Switch)
  const dispatch = useAppDispatch()



  const clickhandlermove=(pos:Array<any>)=>{
    const state=store.getState();
    const firstclick=state.Switch.FirstClick;
    const secondclick=state.Switch.SecondClick; 
 


    if(firstclick===true){


      if(Chessboard[pos[0]][pos[1]].currentpiece!=="none"){
      dispatch(changeselected(pos));
      dispatch(firstclickchange())
      dispatch(secondclickchange())
      }

      }else if(secondclick===true){

        const state=store.getState();
        const fakeboard=Chessboard;
        

        fakeboard[pos[0]][pos[1]].currentpiece=fakeboard[state.Switch.SelecetedPiece[0]][state.Switch.SelecetedPiece[1]].currentpiece;

        setChessboard(fakeboard);
        console.log(Chessboard[pos[0]][pos[1]].currentpiece);
        dispatch(firstclickchange())
        dispatch(secondclickchange())
      }



   
    

    if (state)

 
  
  console.log(state.Switch)
  } 

 
  const UpdateChessUI = () => {
    let dummyui: Big = [];
    Chessboard.forEach((row) => {
      row.forEach((piece) =>{
      if (piece.currentpiece=="none"){
        dummyui.push(
          <Piece  key={Math.random()*100} onClick={()=>{clickhandlermove(piece.pos)}} data-piecepos={piece.pos} >
          
          </Piece> )
      }
      else{
        dummyui.push(
          <Piece  key={Math.random()*100} onClick={()=>{clickhandlermove(piece.pos)}} data-piecepos={piece.pos} style={{cursor:"pointer"}}  >
            <Image src={piece.currentpiece} alt="wr"  height={80} width={80}></Image>
          </Piece> 
        )}});
    });
  
    setChessUi(dummyui);
  };
  let dummyuii:Big=Chessui; 
  
  const memoizedCallback = useCallback(
    () => {
      UpdateChessUI();
    },
    [Chessboard],
  );
  useEffect(() => {
    UpdateChessUI();
    console.log("this  worked");
    //ets
  },[]);

  return (<Chesboard  > {Chessui}</Chesboard>);
};

export default ChessBoard;
