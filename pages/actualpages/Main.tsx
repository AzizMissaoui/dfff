import type { NextPage } from 'next'
import styled from 'styled-components';
import ChessBoard from '../Components/Chessboard';
import Image from 'next/image';

import { Provider } from 'react-redux';
import { store } from '../Redux/store';



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
min-height: 15vh;
width: 100%;
height: fit-content;
color: #a78bfa;
font-size:3em;
transform: rotate(180deg);
`




const MainPage: NextPage = () => {

 
    return(
      <Provider store={store}>
    <Main>
      <Header>ssehC</Header>
         
       <Wrapper>   <Header></Header><Image src="/chessboard.svg" height={768} width={768} className="West" alt='What'></Image></Wrapper> 
        <ChessBoard/>
       
    </Main></Provider>
  )
}

export default MainPage;
