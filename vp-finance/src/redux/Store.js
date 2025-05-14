import { configureStore } from "@reduxjs/toolkit";
import leadSourceReducer from "./feature/LeadSource/LeadSourceSlice";
import LeadOccupationReducer from "./feature/LeadOccupation/OccupationSlice";
import LeadAreaReducer from "./feature/LeadArea/AreaSlice";
import LeadSubAreaReducer from "./feature/LeadSubArea/SubAreaSlice";
import LeadCityReducer from "./feature/LeadCity/CitySlice";
import compositeTaskReducer from "./feature/CompositeTask/CompositeSlice";
import MarketingTaskReducer from "./feature/MarketingTask/MarketingSlice";
import ServiceTaskReducer from "./feature/ServiceTask/ServiceSlice";
export const store = configureStore({
  reducer: {
    leadsource: leadSourceReducer,
    leadOccupation: LeadOccupationReducer,
    leadArea: LeadAreaReducer,
    leadSubArea: LeadSubAreaReducer,
    leadcity: LeadCityReducer,
    compositeTask: compositeTaskReducer,
    MarketingTask: MarketingTaskReducer,
    ServiceTask: ServiceTaskReducer,
  },
});
