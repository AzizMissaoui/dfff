import type { NextPage } from "next";
import styled from "styled-components";
import React, { ReactElement, useEffect, useState } from "react";


import { useAppSelector, useAppDispatch } from '../Redux/hooks'

import { decrement, increment } from '../Redux/createreducer'



type Move = string;
//wtf
type Big = Array<ReactElement>;
interface OnePiece {
  currentpiece: String;
  clearw: boolean;
  clearb: boolean;
}

const Chesboard = styled.div`
  height: 768px;
  width: 768px;
  max-width: 100%;
  
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
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
  const  [firstclick,setFirstclick]=useState<boolean>(true);
  const  [secondclick,setsecondclick]=useState<boolean>(false);

  const [Chessboard, setChessboard] = useState([
    [
      { currentpiece: "br", clearw: true, clearb: true , pos:1},
      { currentpiece: "bh", clearw: true, clearb: true , pos: 2},
      { currentpiece: "bb", clearw: true, clearb: true , pos: 3 },
      { currentpiece: "bq", clearw: true, clearb: true , pos: 4 },
      { currentpiece: "bk", clearw: true, clearb: true , pos: 5 },
      { currentpiece: "bb", clearw: true, clearb: true , pos: 6 },
      { currentpiece: "bh", clearw: true, clearb: true , pos: 7 },
      { currentpiece: "br", clearw: true, clearb: true , pos: 8},
    ],
    [
      { currentpiece: "bp", clearw: true, clearb: true , pos: 9 },
      { currentpiece: "bp", clearw: true, clearb: true , pos: 10 },
      { currentpiece: "bp", clearw: true, clearb: true , pos: 11 },
      { currentpiece: "bp", clearw: true, clearb: true , pos: 12 },
      { currentpiece: "bp", clearw: true, clearb: true , pos: 13 },
      { currentpiece: "bp", clearw: true, clearb: true , pos: 14 },
      { currentpiece: "bp", clearw: true, clearb: true , pos: 15 },
      { currentpiece: "bp", clearw: true, clearb: true , pos: 16},
    ],
    [
      { currentpiece: "none", clearw: true, clearb: true , pos: 17},
      { currentpiece: "none", clearw: true, clearb: true , pos: 18 },
      { currentpiece: "none", clearw: true, clearb: true , pos: 19 },
      { currentpiece: "none", clearw: true, clearb: true , pos: 20 },
      { currentpiece: "none", clearw: true, clearb: true , pos: 21},
      { currentpiece: "none", clearw: true, clearb: true , pos: 22 },
      { currentpiece: "none", clearw: true, clearb: true , pos: 23 },
      { currentpiece: "none", clearw: true, clearb: true , pos: 24 },
    ],
    [
      { currentpiece: "none", clearw: true, clearb: true , pos: 25},
      { currentpiece: "none", clearw: true, clearb: true , pos: 26},
      { currentpiece: "none", clearw: true, clearb: true , pos: 27},
      { currentpiece: "none", clearw: true, clearb: true , pos: 28},
      { currentpiece: "none", clearw: true, clearb: true , pos: 29},
      { currentpiece: "none", clearw: true, clearb: true , pos: 30},
      { currentpiece: "none", clearw: true, clearb: true , pos: 31},
      { currentpiece: "none", clearw: true, clearb: true , pos: 32},
    ],
    [
      { currentpiece: "none", clearw: true, clearb: true , pos: 33 },
      { currentpiece: "none", clearw: true, clearb: true , pos: 34},
      { currentpiece: "none", clearw: true, clearb: true , pos: 35},
      { currentpiece: "none", clearw: true, clearb: true , pos: 36},
      { currentpiece: "none", clearw: true, clearb: true , pos: 37},
      { currentpiece: "none", clearw: true, clearb: true , pos: 38},
      { currentpiece: "none", clearw: true, clearb: true , pos: 39},
      { currentpiece: "none", clearw: true, clearb: true , pos: 40},
    ],
    [
      { currentpiece: "none", clearw: true, clearb: true , pos: 41},
      { currentpiece: "none", clearw: true, clearb: true , pos: 42},
      { currentpiece: "none", clearw: true, clearb: true , pos: 43},
      { currentpiece: "none", clearw: true, clearb: true , pos: 44},
      { currentpiece: "none", clearw: true, clearb: true , pos: 45},
      { currentpiece: "none", clearw: true, clearb: true , pos: 46},
      { currentpiece: "none", clearw: true, clearb: true , pos: 47},
      { currentpiece: "none", clearw: true, clearb: true , pos: 48},
    ],
    [
      { currentpiece: "wp", clearw: true, clearb: true , pos: 49},
      { currentpiece: "wp", clearw: true, clearb: true , pos: 50},
      { currentpiece: "wp", clearw: true, clearb: true , pos: 51},
      { currentpiece: "wp", clearw: true, clearb: true , pos: 52},
      { currentpiece: "wp", clearw: true, clearb: true , pos: 53},
      { currentpiece: "wp", clearw: true, clearb: true , pos: 54},
      { currentpiece: "wp", clearw: true, clearb: true , pos: 55},
      { currentpiece: "wp", clearw: true, clearb: true , pos: 56},
    ],
    [
      { currentpiece: "wr", clearw: true, clearb: true , pos: 57},
      { currentpiece: "wr", clearw: true, clearb: true , pos: 58},
      { currentpiece: "wh", clearw: true, clearb: true , pos: 59},
      { currentpiece: "wb", clearw: true, clearb: true , pos: 60},
      { currentpiece: "wq", clearw: true, clearb: true , pos: 61},
      { currentpiece: "wk", clearw: true, clearb: true , pos: 62},
      { currentpiece: "wb", clearw: true, clearb: true , pos: 63},
      { currentpiece: "wh", clearw: true, clearb: true , pos: 64},
      
    ],
  ]);

  const count = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()



  const clickhandlermove=()=>{
    
   
    if(firstclick===true){
      setsecondclick(true);
      setFirstclick(false);
      console.log("first click worked ", "first click bool : ", firstclick ,"second click bool : ", secondclick  )
    }
    else if(secondclick===true){
      setsecondclick(false);
      setFirstclick(true);
      console.log("second clickui worked ", "first click bool : ", firstclick ,"second click bool : ", secondclick  )
    }
  } 


  const UpdateChessUI = (Move: Move) => {
    let dummyui: Big = [];
    Chessboard.forEach((row) => {
      row.forEach((piece) =>
        dummyui.push(
          <Piece className={piece.currentpiece} key={Math.random()*1051} onClick={clickhandlermove} style={{}} >
          </Piece> 
        )
      );
    });
  
    setChessUi(dummyui);
  };
  let dummyuii:Big=Chessui; 

  useEffect(() => {
    UpdateChessUI(" ");
   
    setTimeout(() => {
     setPiecetomove('rara')
     console.log("yes")

    }, 1000);
  },[]);

  return (<Chesboard onClick={()=>{   dispatch(increment())  }} > {Chessui}</Chesboard>);
};

export default ChessBoard;
