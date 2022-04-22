import type { NextPage } from 'next'
import styled from 'styled-components';
import ChessBoard from '../Components/Chessboard';
import Image from 'next/image';

import { Provider } from 'react-redux';
import { store } from '../Redux/store';



import { useSelector, useDispatch } from 'react-redux'
//ezzz
const Main=styled.div`
height: 100vh;
width: 100vw;
display: flex;
justify-content: center;
align-items: center;
background-color: black;


`


const Wrapper=styled.div`
position: absolute;
height: 100vh;
width: 100vw;
display: flex;
justify-content: center;
align-items: center;
`


const AnotherWrapper=styled.div`
box-sizing:border-box;
display:inline-block;
overflow:hidden;
width:initial;
height:initial;
background:none;
opacity:1;
border:0;
margin:0;
padding:0;
position:relative;
max-width:100%;`

const MainPage: NextPage = () => {

 
    return(
      <Provider store={store}>
    <Main>
       <Wrapper><Image src="/chessboard.svg" height={768} width={768} className="West" alt='What'></Image></Wrapper> 
        <AnotherWrapper><ChessBoard /></AnotherWrapper>
    </Main></Provider>
  )
}

export default MainPage;
