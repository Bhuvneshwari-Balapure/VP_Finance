// src/routes/AppRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
// import Dashbord from '../Components/Dashbord/Dashbord';
import Composite from "../Components/Masters/Composite/Composite";
import Layout from "../Layout/Layout";
import DashboardCards from "../Components/Dashbord/DashboardCards";
import Area from "../Components/Masters/Leads/Area";
import City from "../Components/Masters/Leads/City";
import LeadOccupation from "../Components/Masters/Leads/LeadOccupation";
import LeadSource from "../Components/Masters/Leads/LeadSource";
import SubArea from "../Components/Masters/Leads/SubArea";
import MarketingTask from "../Components/Masters/Marketing/MarketingTask";
import ServicingTask from "../Components/Masters/Servicing/ServicingTask";

import CustomerDetail from "../Components/Customer/CustomerDetail";
import ImportLead from "../Components/Customer/ImportLead";
import EmployeeAddForm from "../Components/Employee/OfficeAdmin/EmployeeAddForm";
import CareerEnquiry from "../Components/Employee/OfficeAdmin/CareerEnquiry";
import ResumesShortlist from "../Components/Employee/OfficeAdmin/ResumesShortlist";
import SelectedInterviewTable from "../Components/Employee/OfficeAdmin/SelectedInterviewTable";
import JoiningData from "../Components/Employee/OfficeAdmin/JoiningData";
import SuspectLeadsTable from "../Components/Customer/SuspectLeadsTable";
import SuspectLeadTabs from "../Components/Customer/SuspectLeadTabs";
import FinancialProduct from "../Components/Offices/Financlal/FinancialProduct";
import CompanyTabs from "../Components/Offices/Financlal/CompanyTabs";
import RegistrarTabs from "../Components/Offices/Mutual Funds/Registrar/RegistrarTabs";
import LeadType from "../Components/Masters/Leads/LeadType";
import OccupationType from "../Components/Masters/Leads/OccupationType";
import AMCtabs from "../Components/Offices/Mutual Funds/AMC/AMCtabs";
import OfficeDiaryTabs from "../Components/Offices/OfficeRecord/Office Diary/OfficeDiaryTabs";
import OfficePurchase from "../Components/Offices/Other/OfficePurchase";
import ImpDocument from "../Components/Offices/Other/ImportantDocument/ImpDocument";
import Test from "../Components/Test";
import ProspectLeadTabs from "../Components/Customer/ProspectLeadTabs";
import ClientLeadTabs from "../Components/Customer/Client/ClientLeadTabs";
import AddClient from "../Components/Customer/Client/AddClient";
import KYCtabs from "../Components/Customer/KYC/KYCtabs";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/test" element={<Test />} />
        <Route index element={<DashboardCards />} />
        <Route path="/composite" element={<Composite />} />
        <Route path="/area" element={<Area />} />
        <Route path="/city" element={<City />} />
        <Route path="/lead-type" element={<LeadType />} />
        <Route path="/occupation-type" element={<OccupationType />} />
        <Route path="/lead-occupation" element={<LeadOccupation />} />
        <Route path="/lead-source" element={<LeadSource />} />
        <Route path="/sub-area" element={<SubArea />} />
        <Route path="/marketing-task" element={<MarketingTask />} />
        <Route path="/servicing-task" element={<ServicingTask />} />
        <Route path="/add-prospect-lead" element={<ProspectLeadTabs />} />
        {/* <Route path="/add-suspect-lead" element={<AddSuspect />} /> */}
        {/* <Route path="/display-suspect-lead" element={<SuspectLeadsTable />} /> */}
        <Route path="/add-suspect-lead" element={<SuspectLeadTabs />} />
        <Route path="/customer-detail" element={<CustomerDetail />} />
        <Route path="/client" element={<ClientLeadTabs />} />
        <Route path="/add-client" element={<AddClient />} />
        <Route path="/kyc" element={<KYCtabs />} />
        {/* <Route path="/client-form" element={<ClientFirstForm />} /> */}

        <Route path="/import-lead" element={<ImportLead />} />
        <Route path="/add-employee" element={<EmployeeAddForm />} />
        <Route path="/career-enquiry" element={<CareerEnquiry />} />
        <Route path="/resume-shortlist" element={<ResumesShortlist />} />
        <Route path="/interview-process" element={<SelectedInterviewTable />} />
        <Route path="/joining-data" element={<JoiningData />} />
        <Route path="/financial-product-list" element={<FinancialProduct />} />
        <Route path="/company-name" element={<CompanyTabs />} />
        <Route path="/mutual-fund/registrar" element={<RegistrarTabs />} />
        <Route path="/mutual-fund/amc" element={<AMCtabs />} />
        <Route path="/office-diary" element={<OfficeDiaryTabs />} />
        <Route path="/office-purchase" element={<OfficePurchase />} />
        <Route path="/important-documents" element={<ImpDocument />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
