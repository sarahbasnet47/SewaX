import { configureStore } from "@reduxjs/toolkit";

import { indexSlice } from "./features/indexSlice";
import { servicesSlice } from "./features/ServiceSlice";
import { vendorSlice } from "./features/VendorSlice";
import { vendorserviceSlice } from "./features/VendorserviceSlice";
import { orderSlice } from "./features/orderslice";
import { PostSlice } from "./features/Postslice";
import { ContactSlice } from "./features/contactslice";

const store = configureStore({
  reducer: {
    [indexSlice.reducerPath]: indexSlice.reducer,
    [servicesSlice.reducerPath]: servicesSlice.reducer,
    [vendorSlice.reducerPath]: vendorSlice.reducer,
    [vendorserviceSlice.reducerPath]: vendorserviceSlice.reducer,
    [orderSlice.reducerPath]: orderSlice.reducer,
    [PostSlice.reducerPath]: PostSlice.reducer,
    [ContactSlice.reducerPath]: ContactSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(indexSlice.middleware)
      .concat(servicesSlice.middleware)
      .concat(vendorSlice.middleware)
      .concat(vendorserviceSlice.middleware)
      .concat(orderSlice.middleware)
      .concat(PostSlice.middleware)
      .concat(ContactSlice.middleware),
});

export default store;
