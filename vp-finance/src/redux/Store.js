import { configureStore } from "@reduxjs/toolkit";
import leadSourceReducer from "./feature/LeadSource/LeadSourceSlice";
import LeadOccupationReducer from "./feature/LeadOccupation/OccupationSlice";
import LeadAreaReducer from "./feature/LeadArea/AreaSlice";
import LeadSubAreaReducer from "./feature/LeadSubArea/SubAreaSlice";
import LeadCityReducer from "./feature/LeadCity/CitySlice";
export const store = configureStore({
  reducer: {
    leadsource: leadSourceReducer,
    leadOccupation: LeadOccupationReducer,
    leadArea: LeadAreaReducer,
    leadSubArea: LeadSubAreaReducer,
    leadcity: LeadCityReducer,
  },
});
