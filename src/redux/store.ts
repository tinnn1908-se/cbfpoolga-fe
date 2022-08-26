import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { combineReducers } from 'redux'
import { authSlice } from './slices/auth.slice'


const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const reducer = combineReducers({
    auth: authSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, reducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export default store;
// export selections

export const authSelector = (state: RootState) => state.auth