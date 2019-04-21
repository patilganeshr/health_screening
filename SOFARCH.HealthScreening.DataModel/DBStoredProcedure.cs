using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.DataModel
{
    public static class DBStoredProcedure
    {
        #region Company
        public static string InsertCompany { get { return "companies_insert_company"; } }

        public static string UpdateCompany { get { return "companies_insert_company"; } }

        public static string DeleteCompany { get { return "companies_insert_company"; } }

        public static string GetListOfAllCompanies { get { return "companies_get_list_of_all_companies"; } }

        public static string GetCompanyDetailsById { get { return "companies_get_company_details_by_id"; } }

        #endregion

        #region Branch
        
        public static string InsertBranch { get { return "branches_insert_branch"; } }

        public static string UpdateBranch { get { return "branches_update_branch"; } }

        public static string DeleteBranch { get { return "branches_delete_branch"; } }

        public static string GetListOfAllBranchesByCompany { get { return "branches_get_list_of_all_branches_by_company"; } }

        public static string GetListOfAllBranches { get { return "branches_get_list_of_all_branches"; } }

        public static string GetBranchDetailsById { get { return "branches_get_branch_details_by_id"; } }

        #endregion

        #region Branch Employees
        public static string InsertEmployee => "employees_insert_employee";

        public static string UpdateEmployee { get { return "employees_update_employee"; } }

        public static string DeleteEmployee { get { return "employees_delete_employee"; } }

        public static string GetListOfAllEmployeesByBranch { get { return "employees_get_list_of_all_employees_by_branch"; } }

        public static string GetEmployeeDetailsById { get { return "employees_get_employee_details_by_id"; } }
        
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

        public static string GetListOfAllEmployers { get { return "employers_get_list_of_all_employers"; } }

        public static string GetEmployerDetailsById { get { return "employers_get_employer_details_by_id"; } }

        #endregion

        #region Units Of Measurement

        public static string InsertUnitsOfMeasurement { get { return "units_of_measurements_insert"; } }

        public static string UpdateUnitsOfMeasurement { get { return "units_of_measurements_update"; } }

        public static string DeleteUnitsOfMeasurement { get { return "units_of_measurements_delete"; } }

        public static string GetListOfAllUnitsOfMeasurements { get { return "units_of_measurements_get_list_of_all_uom"; } }

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

        #region Medical Tests
        
        public static string InsertMedicalTest { get { return "medical_tests_insert_medical_test"; } }
        
        public static string UpdateMedicalTest { get { return "medical_tests_update_medical_test"; } }

        public static string DeleteMedicalTest { get { return "medical_tests_delete_medical_test"; } }

        public static string GetListOfAllMedicalTests { get { return "medical_tests_get_list_of_all_medical_tests"; } }


        #endregion

        #region Brands

        public static string InsertBrand { get { return "brands_insert_brand"; } }
        
        public static string UpdateBrand { get { return "brands_update_brand"; } }
        
        public static string DeleteBrand { get { return "brands_delete_brand"; } }

        public static string GetListOfAllBrands { get { return "brands_get_list_of_all_brand_names"; } }
        
        public static string GetBrandDetailsById { get { return "brands_get_brand_details_by_id"; } }

        public static string GetBrandDetailsByName { get { return "brands_get_brand_details_by_name"; } }

        #endregion

        #region Item

        #endregion

        #region ItemCategory

        public static string InsertItemCategory { get { return "usp_item_categories_insert_item_category"; } }

        public static string UpdateItemCategory { get { return "usp_item_categories_update_item_category"; } }

        public static string DeleteItemCategory { get { return "usp_item_categories_delete_item_category"; } }

        public static string GetListOfAllItemCategories { get { return "usp_item_categories_get_list_of_all_item_categories"; } }

        public static string GetItemCategoryDetailsByName { get { return "usp_item_categories_get_item_category_details_by_name"; } }

        public static string GetItemCategoryDetailsById { get { return "usp_item_categories_get_item_category_details_by_id"; } }

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

        #region Patients

        public static string InsertPatient { get { return "patients_insert_patient"; } }

        public static string UpdatePatient { get { return "patients_update_patient"; } }

        public static string DeletePatient { get { return "patients_delete_patient"; } }

        public static string GetListOfAllPatients { get { return "patients_get_list_of_all_patients"; } }

        public static string GetListOfAllPatientsByEmployer { get { return "patients_get_list_of_all_patients_by_employer"; } }

        #endregion

        #region Patient Personal History
        
        public static string InsertPatientPersonalHistory { get { return "patients_personal_history_insert_patient_personal_history"; } }

        public static string UpdatePatientPersonalHistory { get { return "patients_personal_history_update_patient_personal_history"; } }

        public static string DeletePatientPersonalHistory { get { return "patients_personal_history_delete_patient_personal_history"; } }

        public static string GetPatientPersonalHistoryDetailsById { get { return "patients_personal_history_get_personal_history_details_by_id"; } }

        #endregion


        #region Patient Past and Present Illness
        public static string InsertPatientPastAndPresentIllness { get { return "patients_past_and_present_illness_insert"; } }

        public static string UpdatePatientPastAndPresentIllness { get { return "patients_past_and_present_illness_update"; } }

        public static string DeletePatientPastAndPresentIllness { get { return "patients_past_and_present_illness_delete"; } }

        public static string GetPatientPastAndPresentIllnessById { get { return "patients_past_and_present_illness_get_details_by_id"; } }

        #endregion

    }

}