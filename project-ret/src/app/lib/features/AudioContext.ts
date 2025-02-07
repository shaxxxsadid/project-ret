import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AudioContextType {
    volume: number;
}

const initialState: AudioContextType = {
    volume: 1,
};

const audioContextSlice = createSlice({
    name: "audioContext",
    initialState,
    reducers: {
        setVolume: (state, action: PayloadAction<number>) => {
            state.volume = action.payload;
        },
    },
});

export const { setVolume } = audioContextSlice.actions;
export default audioContextSlice.reducer; 