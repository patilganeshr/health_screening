using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.DataModel
{
    public static class DBStoredProcedure
    {
        #region Company
        public static string InsertCompany { get { return "companies_insert_company"; } }

        public static string UpdateCompany { get { return "companies_update_company"; } }

        public static string DeleteCompany { get { return "companies_delete_company"; } }

        public static string SearchCompany { get { return "companies_search_company_by_name_or_code_or_short_name_or_gstin_no"; } }

        public static string GetAllCompanies { get { return "companies_get_all_companies"; } }

        public static string GetCompanyIdAndCompanyName { get { return "companies_get_company_id_and_company_name"; } }

        public static string GetCompanyDetailsById { get { return "companies_get_company_details_by_id"; } }

        public static string SearchCompanyByCode { get { return "companies_search_company_by_code"; } }

        public static string SearchCompaniesByName { get { return "companies_search_company_by_name"; } }

        public static string SearchCompaniesByShortName { get { return "companies_search_company_by_short_name"; } }

        public static string SearchCompaniesByCompanyCodeOrName { get { return "companies_search_companies_by_company_code_or_name"; } }

        #endregion

        #region Branch

        public static string InsertBranch { get { return "branches_insert_branch"; } }

        public static string UpdateBranch { get { return "branches_update_branch"; } }

        public static string DeleteBranch { get { return "branches_delete_branch"; } }

        public static string GetListOfAllBranchesByCompany { get { return "branches_get_list_of_all_branches_by_company"; } }

        public static string GetListOfAllBranches { get { return "branches_get_list_of_all_branches"; } }

        public static string GetBranchDetailsById { get { return "branches_get_branch_details_by_id"; } }

        #endregion

        #region Employees
        public static string InsertEmployee => "employees_insert_employee";

        public static string UpdateEmployee { get { return "employees_update_employee"; } }

        public static string DeleteEmployee { get { return "employees_delete_employee"; } }

        public static string GetListOfAllEmployeesByBranch { get { return "employees_get_list_of_all_employees_by_branch"; } }

        public static string CheckEmployeeNameIsExists { get { return "employees_check_employee_name_exists"; } }

        public static string CheckEmployeeCodeIsExists { get { return "employees_check_employee_codeexists"; } }

        public static string SearchEmployeeByBranchAndEmployeeName { get { return "employees_search_list_of_employees_by_branch_or_employee_name"; } }

        public static string SearchAllEmployees { get { return "employees_search_all_employees"; } }

        public static string GetEmployeeIdAndNameByEmployeeName { get { return "employees_search_employee_id_and_name_by_employee_name"; } }

        public static string GetEmployeeDetailsById { get { return "employees_get_employee_details_by_id"; } }

        #endregion

        #region Patients
        public static string InsertPatient => "patients_insert_patient";

        public static string UpdatePatient { get { return "patients_update_patient"; } }

        public static string DeletePatient { get { return "patients_delete_patient"; } }

        public static string CheckPatientNameIsExists { get { return "patients_check_patient_name_exists"; } }

        public static string CheckPatientCodeIsExists { get { return "patients_check_patient_codeexists"; } }

        public static string SearchPatients { get { return "patients_search_patients"; } }

        public static string GetPatientIdAndNameByPatientName { get { return "patients_search_patient_id_and_name_by_patient_name"; } }

        public static string GetPatientDetailsById { get { return "patients_get_patient_details_by_id"; } }

        #endregion

        #region Patients Personal History

        public static string InsertPatientPersonalHistory { get { return "patients_personal_history_insert_patient_personal_history"; } }

        public static string UpdatePatientPersonalHistory { get { return "patients_personal_history_update_patient_personal_history"; } }

        public static string DeletePatientPersonalHistory { get { return "patients_personal_history_insert_patient_personal_history"; } }

        public static string GetPatientPersonalHistoryDetailsByPatientId { get { return "patients_personal_history_get_patient_history_details_by_patient_id"; } }


        #endregion

        #region Patients Exercise History

        public static string InsertPatientExerciseHistory { get { return "patients_exercise_history_insert_patient_exercise_history"; } }

        public static string UpdatePatientExerciseHistory { get { return "patients_exercise_history_insert_patient_exercise_history"; } }

        public static string DeletePatientExerciseHistory { get { return "patients_exercise_history_insert_patient_exercise_history"; } }

        public static string GetPatientExerciseDetailsByPatientId { get { return "patients_exercise_history_get_exercise_details_by_patient_id"; } }

        #endregion

        #region Menus

        public static string GetListOfMenusByRole { get { return "menus_get_list_of_menus_by_role"; } }

        public static string GetListOfMenusByMenuGroup { get { return "menus_get_list_of_menus_by_menu_group"; } }

        #endregion

        #region MenusGroup

        public static string GetListOfMenusGroup { get { return "menus_group_get_list_of_menus_group"; } }

        #endregion

        #region Roles

        public static string InsertRole { get { return "roles_insert_role"; } }

        public static string UpdateRole { get { return "roles_update_role"; } }

        public static string DeleteRole { get { return "roles_delete_role"; } }

        public static string GetListOfAllRoles { get { return "roles_get_list_of_all_roles"; } }

        public static string GetRoleDetailsById { get { return "roles_get_role_details_by_id"; } }

        public static string GetRoleDetailsByName { get { return "roles_get_role_details_by_name"; } }

        #endregion

        #region Role Permissions

        public static string InsertRolePermission { get { return "role_permissions_insert_role_permissions"; } }

        public static string UpdateRolePermission { get { return "role_permissions_insert_role_permissions"; } }

        public static string DeleteRolePermission { get { return "role_permissions_insert_role_permissions"; } }

        public static string GetListOfPermissionsByRoleId { get { return "role_permissions_get_list_of_permissions_by_role_id"; } }

        public static string GetListOfPermissionsByRoleIdAndMenuGroupId { get { return "role_permissions_get_list_of_permissions_by_role_and_menu_group_id"; } }

        public static string GetPermissionDetailsByRoleAndMenuId { get { return "role_permissions_get_permission_details_by_role_and_menu_id"; } }

        #endregion

        #region Users

        public static string InsertUser { get { return "users_insert_user"; } }

        public static string UpdateUser { get { return "users_update_user"; } }

        public static string DeleteUser { get { return "users_delete_user"; } }

        public static string VerifyUser { get { return "users_verify_user"; } }

        public static string GetUserDetailsById { get { return "users_get_user_details_by_user_id"; } }

        public static string GetListOfAllUsers { get { return "users_get_list_of_all_users"; } }

        #endregion

        #region WorkingPeriod

        public static string InsertWorkingPeriod { get { return "usp_working_periods_insert_working_period"; } }

        public static string UpdateWorkingPeriod { get { return "usp_working_periods_update_working_period"; } }

        public static string DeleteWorkingPeriod { get { return "usp_working_periods_delete_working_period"; } }

        public static string GetAllWorkingPeriods { get { return "usp_working_periods_get_all_working_period"; } }

        public static string GetListOfFinancialYearsById { get { return "usp_working_periods_get_list_of_financial_years_by_id"; } }

        #endregion

        #region Country

        public static string GetListOfAllCountries { get { return "countries_get_list_of_all_countries"; } }

        #endregion

        #region States

        public static string GetListOfStatesByCountryId { get { return "states_get_list_of_states_by_country_id"; } }

        #endregion

        #region City

        public static string InsertCity { get { return "cities_insert_city"; } }

        public static string UpdateCity { get { return "cities_update_city"; } }

        public static string DeleteCity { get { return "cities_delete_city"; } }

        public static string GetListofCitiesByState { get { return "cities_get_list_of_cities_by_state"; } }

        public static string CheckCityNameIsExists { get { return "cities_check_city_name_is_exists"; } }

        #endregion

        #region Employer

        public static string InsertEmployer { get { return "employers_insert_employer"; } }

        public static string UpdateEmployer { get { return "employers_update_employer"; } }

        public static string DeleteEmployer { get { return "employers_delete_employer"; } }

        public static string GetAllEmployerIdAndName { get { return "employers_get_employer_id_and_name"; } }

        public static string GetEmployerIdAndNameByName { get { return "employers_get_employer_id_and_name_by_name"; } }

        public static string GetListOfAllEmployers { get { return "employers_get_list_of_all_employers"; } }

        public static string ViewListOfAllEmployers { get { return "employers_view_list_of_employers"; } }

        public static string SearchEmployerByName { get { return "employers_search_employer_by_name"; } }

        public static string GetEmployerDetailsById { get { return "employers_get_employer_details_by_id"; } }

        #endregion

        #region Units Of Measurement

        public static string InsertUnitsOfMeasurement { get { return "units_of_measurements_insert"; } }

        public static string UpdateUnitsOfMeasurement { get { return "units_of_measurements_update"; } }

        public static string DeleteUnitsOfMeasurement { get { return "units_of_measurements_delete"; } }

        public static string GetAllUnitsOfMeasurements { get { return "units_of_measurements_get_list_of_all_uom"; } }

        public static string GetAllUnitIdAndUnitCode { get { return "units_of_measurements_get_all_unit_id_and_unit_code"; } }

        #endregion

        #region Doctors

        public static string InsertDoctor { get { return "doctors_insert_doctor"; } }


        public static string UpdateDoctor { get { return "doctors_update_doctor"; } }


        public static string DeleteDoctor { get { return "doctors_delete_doctor"; } }

        public static string GetListOfAllDoctors { get { return "doctors_get_list_of_all_doctors"; } }

        public static string GetDoctorDetailsById { get { return "doctors_get_doctor_details_by_id"; } }

        #endregion

        #region Illness or Diseases

        public static string InsertIllnessOrDisease { get { return "illness_or_diseases_insert_illness_or_disease"; } }

        public static string UpldateIllnessOrDisease { get { return "illness_or_diseases_update_illness_or_disease"; } }

        public static string DeleteIllnessOrDisease { get { return "illness_or_diseases_delete_illness_or_disease"; } }

        public static string GetListOfAllIllnessOrDisease { get { return "illness_or_diseases_get_list_of_all_illness_or_disease"; } }

        #endregion

        #region Brands

        public static string InsertBrand { get { return "brands_insert_brand"; } }

        public static string UpdateBrand { get { return "brands_update_brand"; } }

        public static string DeleteBrand { get { return "brands_delete_brand"; } }

        public static string GetListOfAllBrands { get { return "brands_get_list_of_all_brand_names"; } }

        public static string GetBrandDetailsById { get { return "brands_get_brand_details_by_id"; } }

        public static string GetBrandDetailsByName { get { return "brands_get_brand_details_by_name"; } }

        #endregion

        #region Drug Groups

        public static string InsertDrugGroup { get { return "drug_groups_insert_drug_group"; } }

        public static string UpdateDrugGroup { get { return "drug_groups_update_drug_group"; } }

        public static string DeleteDrugGroup { get { return "drug_groups_delete_drug_group"; } }

        public static string GetDrugGroupIdAndGroupName { get { return "drug_groups_get_drug_group_id_and_group_name"; } }

        public static string GetDetailsOfDrugGroupById { get { return "drug_groups_get_details_of_drug_group_by_id"; } }

        public static string GetDetailsOfDrugGroupByName { get { return "drug_groups_get_details_of_drug_group_by_name"; } }

        public static string SearchAllDrugGroups { get { return "drug_groups_search_drug_group_all"; } }

        public static string SearchDrugGroupByName { get { return "drug_groups_search_drug_group_by_name"; } }

        #endregion

        #region Drug Routes

        public static string InsertDrugRoute { get { return "drug_routes_insert_drug_route"; } }

        public static string UpdateDrugRoute { get { return "drug_routes_update_drug_route"; } }

        public static string DeleteDrugRoute { get { return "drug_routes_delete_drug_route"; } }

        public static string GetAllDrugRouteIdAndRouteName { get { return "drug_routes_get_drug_route_id_and_route_name"; } }

        public static string GetDetailsOfDrugRouteById { get { return "drug_routes_get_details_of_drug_routes_by_id"; } }

        public static string GetDetailsOfDrugRouteByName { get { return "drug_routes_get_details_of_drug_routes_by_name"; } }

        public static string SearchDrugRouteAll { get { return "drug_routes_search_drug_route_all"; } }

        public static string SearchDrugRouteByRouteName { get { return "drug_routes_search_drug_route_by_route_name"; } }

        #endregion

        #region Drugs

        public static string InsertDrug { get { return "drugs_insert_drug"; } }

        public static string UpdateDrug { get { return "drugs_update_drug"; } }

        public static string DeleteDrug { get { return "drugs_delete_drug"; } }

        public static string GetDrugIdAndDrugName { get { return "drugs_get_drug_id_and_drug_name"; } }

        public static string GetDrugIdAndDrugNameByDrugName { get { return "drugs_get_drug_id_and_name_by_drug_name"; } }

        public static string SearchDrugIdAndGenericNameByName { get { return "drugs_search_drug_id_and_generic_name_by_name"; } }

        public static string GetDetailsOfDrugById { get { return "drugs_get_details_of_drug_by_id"; } }

        public static string SearchDrugsAll { get { return "drugs_search_drug_all"; } }

        public static string SearchDrugsByDrugCode { get { return "drugs_search_drug_by_drug_code"; } }

        public static string SearchDrugsByGenericName { get { return "drugs_search_drug_by_generic_name"; } }

        public static string SearchDrugsByDrugName { get { return "drugs_search_drug_by_drug_name"; } }

        public static string SearchDrugsByDrugGroupName { get { return "drugs_search_drug_by_drug_group_name"; } }

        public static string SearchDrugsByDrugGroupId { get { return "drugs_search_drug_by_drug_group_id"; } }

        public static String SearchDrugsByFilters { get { return "drugs_search_drugs_by_generic_name_or_drug_name_or_group_name_or_drug_code"; } }

        #endregion

        #region DrugFormulations

        public static string InsertDrugFormulation { get { return "drug_formulations_insert_drug_formulation"; } }

        public static string UpdateDrugFormulation { get { return "drug_formulations_update_drug_formulation"; } }

        public static string DeleteDrugFormulation { get { return "drug_formulations_delete_drug_formulation"; } }

        public static string GetDrugFormulationIdAndCode { get { return "drug_formulations_get_id_and_code"; } }

        #endregion


        #region Drugs Link With Drug Routes

        public static string InsertDrugLinkWithDrugRoute { get { return "drugs_link_with_drug_routes_insert_drug_link_with_drug_route"; } }

        public static string UpdateDrugLinkWithDrugRoute { get { return "drugs_link_with_drug_routes_update_drug_link_with_drug_route"; } }

        public static string DeleteDrugLinkWithDrugRoute { get { return "drugs_link_with_drug_routes_delete_drug_link_with_drug_route"; } }

        public static string DeleteDrugLinkWithDrugRouteByDrugId { get { return "drugs_link_with_drug_routes_delete_by_drug_id"; } }

        public static string GetDrugLinkByDrugId { get { return "drugs_link_with_drug_routes_get_drug_link_by_drug_id"; } }

        #endregion

        #region Locations

        public static string InsertLocation { get { return "locations_insert_location"; } }

        public static string UpdateLocation { get { return "locations_update_location"; } }

        public static string DeleteLocation { get { return "locations_delete_location"; } }

        public static string GetListOfAllLocations { get { return "locations_get_list_of_all_locations"; } }

        public static string GetListOfAllLocationsWithLocationType { get { return "locations_get_list_of_all_locations_with_location_type"; } }

        public static string GetLocationDetailsById { get { return "locations_get_location_details_by_id"; } }

        #endregion

        #region ModeOfPayments

        public static string GetListOfAllModeOfPayments { get { return "mode_of_payments_get_list_of_all_mode_of_payments"; } }

        #endregion

        #region Address Types

        public static string InsertAddressType { get { return "address_types_insert_address_type"; } }

        public static string UpdateAddressType { get { return "address_types_update_address_type"; } }

        public static string DeleteAddressType { get { return "address_types_delete_address_type"; } }

        public static string GetAllAddressTypes { get { return "address_types_get_all_address_type"; } }
        public static string GetAddressTypeDetailsById { get { return "address_types_get_type_details_by_id"; } }
        public static string GetAddressTypeDetailsByName { get { return "address_types_get_type_details_by_name"; } }


        #endregion

        #region  Client

        public static string DeleteClientById { get { return "client_addressess_delete_by_client_id"; } }
        public static string InsertClient { get { return "clients_insert_client"; } }
        public static string UpdateClient { get { return "clients_update_client"; } }
        public static string DeleteClient { get { return "clients_delete_client"; } }
        public static string GetAllClients { get { return "clients_get_all_clients"; } }
        public static string GetClientById { get { return "clients_get_client_by_id"; } }
        public static string GetClientByName { get { return "clients_get_client_by_name"; } }
        public static string CheckClientNameIsExists { get { return "clients_check_client_name_is_exists"; } }

        #endregion Client

        #region Client Type
        public static string InsertClientType { get { return "client_types_insert_client_type"; } }

        public static string UpdateClientType { get { return "client_types_update_client_type"; } }

        public static string DeleteClientType { get { return "client_types_delete_client_type"; } }

        public static string GetAllClientTypes { get { return "client_types_get_all_client_type"; } }

        public static string GetClientTypeById { get { return "client_types_get_client_type_by_id"; } }

        public static string GetClientTypeByName { get { return "clients_get_client_type_by_name"; } }

        #endregion Client Type

        #region Client Addresses

        public static string GetAllClientAddressess { get { return "client_addressess_get_all_client_addressess"; } }

        public static string GetAllAddressessByClientId { get { return "client_addressess_get_all_addressess_by_client_id"; } }

        public static string GetClientAddressNamesByClientTypeId { get { return "client_addressess_get_client_address_names_by_client_type_id"; } }

        public static string SearchClientAddressNameByClientAddressName { get { return "client_addressess_search_by_client_address_name"; } }

        public static string InsertClientAddress { get { return "client_addressess_insert_client_address"; } }

        public static string UpdateClientAddress { get { return "client_addressess_update_client_address"; } }

        public static string DeleteClientAddress { get { return "client_addressess_delete_client_address"; } }

        public static string GetAllClientAddressByClientId { get { return "client_addressess_get_all_client_addressess_by_client_id"; } }

        public static string GetClientAddressById { get { return "client_addressess_get_client_address_by_id"; } }

        public static string GetClientAddressByName { get { return "client_addressess_get_client_address_by_name"; } }

        public static string CheckClientAddressNameIsExists { get { return "client_addressess_check_client_addressee_name_is_exists"; } }

        #endregion

        #region Client Address Contacts

        public static string InsertClientAddressContact { get { return "client_address_contacts_insert_client_address_contact"; } }

        public static string UpdateClientAddressContact { get { return "client_address_contacts_update_client_address_contact"; } }

        public static string DeleteClientAddressContactByClientAddressId { get { return "client_address_contacts_delete_by_client_address_id"; } }

        public static string DeleteClientAddressContactByContactId { get { return "client_address_contacts_delete_by_contact_id"; } }

        public static string GetAllClientAddressContactsByClientAddressId { get { return "client_address_contacts_get_all_contacts_by_client_address_id"; } }

        public static string GetClientAddressContactById { get { return "client_address_contacts_get_contact_by_id"; } }

        #endregion

        #region Purchase Bill

        public static string InsertPurchaseBill { get { return "purchase_bills_insert_purchase_bill"; } }

        public static string UpdatePurchaseBill { get { return "purchase_bills_update_purchase_bill"; } }

        public static string DeletePurchaseBill { get { return "purchase_bills_delete_purchase_bill"; } }

        public static string CheckPurchaseBillNoExists { get { return "purchase_bills_check_purchase_bill_no_is_exists"; } }
        public static string GetPurchaseBillIdAndPurchaeBillNo { get { return "purchase_bills_get_purchase_bill_id_and_bill_no"; } }

        public static string GetPurchaseBillDetailsById { get { return "purchase_bills_get_bill_details_by_id"; } }

        public static string SearchAllPurchaseBills { get { return "purchase_bills_search_all"; } }

        public static string SearchPurchaseBillsByPurchaseBillNo { get { return "purchase_bills_search_bill_by_purchase_bill_no"; } }

        public static string SearchPurchaseBillByVendorId { get { return "purchase_bills_search_details_by_vendor_id"; } }

        #endregion

        #region Purchase Bill Items

        public static string InsertPurchaseBillItem { get { return "purchase_bill_items_insert_purchase_bill_item"; } }

        public static string UpdatePurchaseBillItem { get { return "purchase_bill_items_update_purchase_bill_item"; } }

        public static string DeletePurchaseBillItem { get { return "purchase_bill_items_delete_purchase_bill_item"; } }

        public static string DeletePurchaseBillItemsByPurchaseBillId { get { return "purchase_bill_items_delete_by_purchase_bill_id"; } }

        public static string GetPurchaseBillItemDetailsByPurchaseBillId { get { return "purchase_bill_items_get_item_details_by_purchase_bill_id"; } }

        #endregion

        #region Purchase Bill Charges

        public static string InsertPurchaseBillCharges { get { return "purchase_bill_charges_insert_purchase_bill_charge"; } }

        public static string UpdatePurchaseBillCharges { get { return "purchase_bill_charges_update_purchase_bill_charge"; } }

        public static string DeletePurchaseBillCharges { get { return "purchase_bill_charges_delete_purchase_bill_charge"; } }

        public static string DeletePurchaseBillChargesByPurchaseBillId { get { return "purchase_bill_charges_delete_by_purchase_bill_id"; } }

        public static string GetPurchaseBillChargeDetailsByPurchaseBillId { get { return "purchase_bill_charges_get_charge_details_by_purchase_bill_id"; } }

        #endregion

        #region Account Head

        public static string InsertAccountHead { get { return "account_heads_insert_account_head"; } }

        public static string UpdatetAccountHead { get { return "account_heads_update_account_head"; } }

        public static string DeleteAccountHead { get { return "account_heads_delete_account_head"; } }

        public static string GetAllAccountHeads { get { return "account_heads_get_all_account_head"; } }

        public static string GetAccountHeadById { get { return "account_heads_get_account_head_by_id"; } }

        public static string GetAccountHeadByName { get { return "account_heads_get_account_head_by_name"; } }

        public static string SearchAllAccountHeads { get { return "account_heads_search_all_account_head"; } }

        public static string SearchAccountHeadByName { get { return "account_heads_search_account_head_by_name"; } }

        #endregion

        #region Blood Group

        public static string GetAllBloodGroups { get { return "blood_groups_get_all"; } }

        #endregion

        #region Medical Test

        public static string InsertMedicalTest { get { return "medical_tests_insert_medical_test"; } }

        public static string UpdateMedicalTest { get { return "medical_tests_update_medical_test"; } }

        public static string DeleteMedicalTest { get { return "medical_tests_delete_medical_test"; } }

        public static string GetMedicalTestIdAndName { get { return "medical_tests_get_medical_test_id_and_test_name"; } }

        public static string SearchMedicalTestAll { get { return "medical_tests_search_medical_tests_all"; } }

        public static string SearchMedicalTestByName { get { return "medical_tests_search_medical_test_by_name"; } }

        #endregion

        #region Medical Test Parameters

        public static string InsertMedicalTestParameters { get { return "medical_test_parameters_insert_medical_test_parameter"; } }

        public static string UpdateMedicalTestParameters { get { return "medical_test_parameters_update_medical_test_parameter"; } }

        public static string DeleteMedicalTestParameters { get { return "medical_test_parameters_delete_medical_test_parameter"; } }

        public static string DeleteMedicalTestParametersByMedicalTestId { get { return "medical_test_parameters_delete_medical_test_parameter_by_medical_test_id"; } }

        public static string GetMedicalTestParametersByTestId { get { return "medical_test_parameters_get_test_parameter_details_by_test_id"; } }

        #endregion

        #region Pre Employment Details

        public static string InsertPreEmploymentDetails { get { return "pre_employment_details_insert_pre_employment_details"; } }

        public static string UpdatePreEmploymentDetails { get { return "pre_employment_details_update_pre_employment_details"; } }

        public static string DeletePreEmploymentDetails { get { return "pre_employment_details_delete_pre_employment_details"; } }

        public static string GetPreEmploymentPatientDetailsByPatientId { get { return "pre_employment_details_get_patient_details_by_patient_id"; } }

        public static string GetAllPreEmploymentDetails { get { return "pre_employment_details_get_all_pre_employment_details"; } }

        public static string SearchPreEmploymentDetails{ get { return "pre_employment_details_search_pre_employment_details"; } }


        #endregion


        #region Pre Employment Test Details

        public static string InsertPreEmploymentTestDetails { get { return "pre_employment_test_details_insert_pre_employment_test_details"; } }

        public static string UpdatePreEmploymentTestDetails { get { return "pre_employment_test_details_update_pre_employment_test_details"; } }

        public static string DeletePreEmploymentTestDetails { get { return "pre_employment_test_details_delete_pre_employment_test_details"; } }

        public static string GetPreEmploymentAllTestDetails { get { return "pre_employment_test_details_get_all_tests"; } }

        public static string GetPreEmploymentTestDetailsByPreEmploymentId { get { return "pre_employment_test_details_get_test_details_by_pre_employment_id"; } }

        #endregion


        #region Drug Dispense

        public static string InsertDrugDispense { get { return "drug_dispenses_insert_drug_dispense"; } }

        public static string UpdateDrugDispense { get { return "drug_dispenses_update_drug_dispense"; } }

        public static string DeleteDrugDispense { get { return "drug_dispenses_delete_drug_dispense"; } }

        public static string GetDrugDispenseDetailsById{ get { return "drug_dispenses_get_drug_dispense_details_by_id"; } }

        public static string SearchDrugDispense { get { return "drug_dispenses_search_drug_dispenses"; } }

        #endregion


        #region Drug Dispense Drug Utilisation
        public static string InsertDrugDispenseDrugUtilisation { get { return "drug_dispenses_drug_utilisation_insert_drug_utilisation"; } }

        public static string UpdateDrugDispenseDrugUtilisation { get { return "drug_dispenses_drug_utilisation_update_drug_utilisation"; } }

        public static string DeleteDrugDispenseDrugUtilisation { get { return "drug_dispenses_drug_utilisation_delete_drug_utilisation"; } }

        public static string GetDrugDispenseDrugUtilisationDetailsByDrugDispenseId { get { return "drug_dispenses_get_drug_dispense_details_by_id"; } }


        #endregion

    }

}