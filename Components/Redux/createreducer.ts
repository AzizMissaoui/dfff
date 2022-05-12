import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define a type for the slice state yes
interface SwitchState {
  FirstClick: boolean,
  SecondClick:boolean,
  SelecetedPiece:Array<number>
}

// Define the initial state using that type
const initialState: SwitchState = {
  FirstClick: true,
  SecondClick:false,
  SelecetedPiece:[]
}

export const SwitchStateSlice = createSlice({
  name: 'Switch',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    firstclickchange: state => {
      if(state.FirstClick===true){
        state.FirstClick=false;
      }else if(state.FirstClick===false){
        state.FirstClick=true;
      }
    },
    secondclickchange: state => {
      if(state.SecondClick===true){
        state.SecondClick=false;
      }else if(state.SecondClick===false){
        state.SecondClick=true;
      }
    },
    changeselected: (state,action:PayloadAction<Array<number>>) => {
      
   
        state.SelecetedPiece=action.payload;
      
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
   
  }
})

export const { changeselected,firstclickchange, secondclickchange } = SwitchStateSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.Switch


export default SwitchStateSlice.reducer
