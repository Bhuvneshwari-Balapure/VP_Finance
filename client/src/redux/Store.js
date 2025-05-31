import { configureStore } from "@reduxjs/toolkit";

import leadSourceReducer from "./feature/LeadSource/LeadSourceSlice";
import LeadOccupationReducer from "./feature/LeadOccupation/OccupationSlice";

import LeadAreaReducer from "./feature/LeadArea/AreaSlice";
import LeadSubAreaReducer from "./feature/LeadSubArea/SubAreaSlice";
import LeadCityReducer from "./feature/LeadCity/CitySlice";
import compositeTaskReducer from "./feature/CompositeTask/CompositeSlice";
import MarketingTaskReducer from "./feature/MarketingTask/MarketingSlice";
import ServiceTaskReducer from "./feature/ServiceTask/ServiceSlice";
import FinancialProductReducer from "./feature/FinancialProduct/FinancialSlice";
import CompanyNameReducer from "./feature/ComapnyName/CompanySlice";
import SuspectLeadReducer from "./feature/SuspectLead/SuspectLeadSlice";
import ProspectLeadReducer from "./feature/ProspectLead/ProspectSlice";
import registrarReducer from "./feature/Registrar/RegistrarSlice";
import AMCReducer from "./feature/AMC/AMCSlice";
import LeadTypeReducer from "./feature/LeadType/LeadTypeSlice";
import OccupationTypeReducer from "./feature/OccupationType/OccupationSlice";
import officeDiaryReducer from "./feature/OfficeDiary/OfficeDiarySlice";
import officePurchaseReducer from "./feature/OfficePurchase/PurchaseSlice";
import importantDocumentsReducer from "./feature/ImpDocument/DocumentSlice";
import clientReducer from "./feature/ClientRedux/ClientSlice";
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
    financialProduct: FinancialProductReducer,
    CompanyName: CompanyNameReducer,
    suspectLead: SuspectLeadReducer,
    prospectLead: ProspectLeadReducer,

    registrar: registrarReducer,
    AMC: AMCReducer,
    LeadType: LeadTypeReducer,
    OccupationType: OccupationTypeReducer,
    officeDiary: officeDiaryReducer,
    officePurchase: officePurchaseReducer,
    importantDocuments: importantDocumentsReducer,
    client: clientReducer,
  },
});
