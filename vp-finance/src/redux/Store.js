import { configureStore } from "@reduxjs/toolkit";
import leadSourceReducer from "./feature/LeadSource/LeadSourceSlice";
import LeadOccupationReducer from "./feature/LeadOccupation/OccupationSlice";
import LeadAreaReducer from "./feature/LeadArea/AreaSlice";
import LeadSubAreaReducer from "./feature/LeadSubArea/SubAreaSlice";
import LeadCityReducer from "./feature/LeadCity/CitySlice";
import compositeReducer from "./feature/CompositeTask/CompositeSlice"
export const store = configureStore({
  reducer: {
    leadsource: leadSourceReducer,
    leadOccupation: LeadOccupationReducer,
    leadArea: LeadAreaReducer,
    leadSubArea: LeadSubAreaReducer,
    leadcity: LeadCityReducer,
    composite: compositeReducer,
  },
});
