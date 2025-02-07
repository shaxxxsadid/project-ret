import { configureStore } from '@reduxjs/toolkit'
import volumeReducer from './features/AudioContext';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
        reducer: { 
            volume: volumeReducer, 
        }
    })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
