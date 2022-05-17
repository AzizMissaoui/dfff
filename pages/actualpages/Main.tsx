import type { NextPage } from 'next'
import styled from 'styled-components';
import ChessBoard from '../../Components/MainComponent/Chessboard'
import Image from 'next/image';

import { Provider } from 'react-redux';
import { store } from '../../Components/Redux/store'
import { useEffect, useState } from 'react';



//ezzz
const Main=styled.div`
height: 100vh;
width: 100vw;
display: flex;
justify-content: center;
align-items: center;
background-color: black;
flex-direction: column;


`


const Wrapper=styled.div`
position: absolute;
height: 100vh;
width: 100vw;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`

const Header=styled.div`
display:flex;
justify-content: center;
align-items: center;
min-height: 10vh;
width: 100%;
height: fit-content;
color: #a78bfa;
font-size:3em;
flex-direction: column;

`


interface props{
  handler :(a: string) => void,
}


const MainPage: NextPage<props> = (props) => {

 const [whoisturn,setwhoisturn]=useState<string>("white");

 const arrayofrandoms=['p','h','k','r','b','q']

 const whoisturnhandler=(arg:string):void=>{
  setwhoisturn(arg);
 }

 useEffect(()=>{
   if (whoisturn==="white"){
    let newrandom=Math.ceil(Math.random()*6)-1;
    let letter=arrayofrandoms[newrandom];
    let word= "w"+letter;
    
     props.handler(word)}
   else if(whoisturn==="black"){
    let newrandom=Math.ceil(Math.random()*6)-1;
   let letter=arrayofrandoms[newrandom];
   let word= "b"+letter;

    props.handler(word)}
 },[whoisturn])
    return(
    
    <Main>
      <Header>
    
        <div>Turn : {whoisturn}   </div>
        </Header>
        
       <Wrapper>
         <Header></Header><Image src="/chessboard.svg" height={768} width={768} className="West" alt='What'></Image></Wrapper> 
        <ChessBoard turn={whoisturnhandler} />
       
    </Main>
  )
}

export default MainPage;
