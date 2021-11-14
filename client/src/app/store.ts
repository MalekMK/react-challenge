import {
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";
import { all } from "typed-redux-saga";
import createSagaMiddleware from "redux-saga";
import { eventSaga } from "../features/event/eventSaga";
import { eventSlice } from "../features/event/eventSlice";

const rootReducers = combineReducers({
  events: eventSlice.reducer,
});

const rootSagas = function* rootSaga() {
  yield all([eventSaga.saga()]);
};

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducers,
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(rootSagas);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;