import { configureStore } from "@reduxjs/toolkit";
import Reducers from "./reducers/reducers";
export default configureStore({
  reducer: { poultryhunter: Reducers },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
