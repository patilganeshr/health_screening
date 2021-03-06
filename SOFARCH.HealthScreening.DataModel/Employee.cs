﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.Common;

using Microsoft.Practices.EnterpriseLibrary.Common;
using Microsoft.Practices.EnterpriseLibrary.Data;
using DRE = DataRecordExtensions.DataRecordExtensions;

namespace SOFARCH.HealthScreening.DataModel
{
    public class Employee
    {
        private readonly Database database;

        public Employee()
        {
            database = DBConnect.getDBConnection();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>
        private Int32 AddEmployee(Entities.Employee employee)
        {
            var employeeId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertEmployee))
                {
                    database.AddInParameter(dbCommand, "@employee_id", DbType.Int32, employee.EmployeeId);
                    database.AddInParameter(dbCommand, "@title", DbType.String, employee.Title);
                    database.AddInParameter(dbCommand, "@first_name", DbType.String, employee.FirstName);
                    database.AddInParameter(dbCommand, "@middle_name", DbType.String, employee.MiddleName);
                    database.AddInParameter(dbCommand, "@last_name", DbType.String, employee.LastName);
                    database.AddInParameter(dbCommand, "@address", DbType.String, employee.Address);
                    database.AddInParameter(dbCommand, "@date_of_birth", DbType.String, employee.DateOfBirth);
                    database.AddInParameter(dbCommand, "@contact_no_1", DbType.String, employee.ContactNo1);
                    database.AddInParameter(dbCommand, "@contact_no_2", DbType.String, employee.ContactNo2);
                    database.AddInParameter(dbCommand, "@mobile_no_1", DbType.String, employee.MobileNo1);
                    database.AddInParameter(dbCommand, "@mobile_no_2", DbType.String, employee.MobileNo2);
                    database.AddInParameter(dbCommand, "@email_id", DbType.String, employee.EmailId);
                    database.AddInParameter(dbCommand, "@pan_no ", DbType.String, employee.PANNo);
                    database.AddInParameter(dbCommand, "@department", DbType.String, employee.Department);
                    database.AddInParameter(dbCommand, "@designation", DbType.String, employee.Designation);
                    database.AddInParameter(dbCommand, "@gender", DbType.String, employee.Gender);
                    database.AddInParameter(dbCommand, "@company_id", DbType.Int32, employee.CompanyId);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, employee.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, employee.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    employeeId = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        employeeId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return employeeId;
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>
        private bool DeleteEmployee(Entities.Employee employee)
        {
            bool isDeleted = false;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeleteEmployee))
                {
                    database.AddInParameter(dbCommand, "@employee_id", DbType.Int32, employee.EmployeeId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, employee.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, employee.DeletedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    var result = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        isDeleted = Convert.ToBoolean(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return isDeleted;
        }

        public bool IsEmployeeNameExists(Int32 companyId, string employeeName)
        {
            bool isEmployeeNameExists = false;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.CheckEmployeeNameIsExists))
                {
                    database.AddInParameter(dbCommand, "@company_id", DbType.Int32, companyId);
                    database.AddInParameter(dbCommand, "@employee_name", DbType.String, employeeName);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            isEmployeeNameExists = reader.GetBoolean(reader.GetOrdinal("is_employee_name_exists"));
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return isEmployeeNameExists;
        }

        private List<Entities.Employee> GetEmployees(IDataReader reader)
        {
            var employees = new List<Entities.Employee>();

            while (reader.Read())
            {
                var employee = new Entities.Employee
                {
                    EmployeeId = DRE.GetNullableInt32(reader, "employee_id", 0),
                    EmployeeCode = DRE.GetNullableString(reader, "employee_code", null),
                    Title = DRE.GetNullableString(reader, "title", null),
                    FirstName = DRE.GetNullableString(reader, "first_name", null),
                    MiddleName = DRE.GetNullableString(reader, "middle_name", null),
                    LastName = DRE.GetNullableString(reader, "last_name", null),
                    FullName = DRE.GetNullableString(reader, "full_name", null),
                    Address = DRE.GetNullableString(reader, "address", null),
                    Gender = DRE.GetNullableString(reader, "gender", null),
                    DateOfBirth = DRE.GetNullableString(reader, "date_of_birth", null),
                    ContactNos = DRE.GetNullableString(reader, "contact_nos", null),
                    ContactNo1 = DRE.GetNullableString(reader, "contact_no_1", null),
                    ContactNo2 = DRE.GetNullableString(reader, "contact_no_2", null),
                    MobileNo1 = DRE.GetNullableString(reader, "mobile_no_1", null),
                    MobileNo2 = DRE.GetNullableString(reader, "mobile_no_2", null),
                    EmailId = DRE.GetNullableString(reader, "email_id", null),
                    PANNo = DRE.GetNullableString(reader, "pan_no", null),
                    Department = DRE.GetNullableString(reader, "department", null),
                    Designation = DRE.GetNullableString(reader, "designation", null),
                    CompanyId = DRE.GetNullableInt32(reader, "company_id", null),
                    CompanyName = DRE.GetNullableString(reader, "company_name", null)
                };

                employees.Add(employee);
            }

            return employees;
        }


        /// <summary>
        /// /
        /// </summary>
        /// <returns></returns>
        public List<Entities.Employee> GetAllEmployees()
        {
            var employees = new List<Entities.Employee>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetListOfAllEmployeesByBranch))
                {
                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        employees = GetEmployees(reader);

                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return employees;
        }

        public List<Entities.Employee> SearchAllEmployees()
        {
            List<Entities.Employee> employees = new List<Entities.Employee>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.SearchAllEmployees))
                {
                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        employees = GetEmployees(reader);
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return employees;
        }


        public List<Entities.Employee> GetEmployeeIdAndNameByEmployeeName(string employeeName)
        {
            List<Entities.Employee> employees = new List<Entities.Employee>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetEmployeeIdAndNameByEmployeeName))
                {
                    database.AddInParameter(dbCommand, "@employee_name", DbType.String, employeeName);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        var employee = new Entities.Employee()
                        {
                            EmployeeId = DRE.GetNullableInt32(reader, "@employee_id", null),
                            EmployeeCode = DRE.GetNullableString(reader, "@employee_code", null),
                            CompanyName = DRE.GetNullableString(reader, "@company_name", null),
                            FullName = DRE.GetNullableString(reader, "@full_name", null)
                        };

                        employees.Add(employee);
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return employees;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="employeeId"></param>
        /// <returns></returns>
        public Entities.Employee GetEmployeeDetailsById(Int32 employeeId)
        {
            var employee = new Entities.Employee();

            using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetEmployeeDetailsById)) {

                database.AddInParameter(dbCommand, "@employee_id", DbType.Int32, employeeId);

                using (IDataReader reader = database.ExecuteReader(dbCommand))
                {
                    while (reader.Read())
                    {
                        var _employee = new Entities.Employee
                        {
                            EmployeeId = DRE.GetNullableInt32(reader, "employee_id", 0),
                            EmployeeCode = DRE.GetNullableString(reader, "employee_code", null),
                            Title = DRE.GetNullableString(reader, "title", null),
                            FirstName = DRE.GetNullableString(reader, "first_name", null),
                            MiddleName = DRE.GetNullableString(reader, "middle_name", null),
                            LastName = DRE.GetNullableString(reader, "last_name", null),
                            FullName = DRE.GetNullableString(reader, "full_name", null),
                            Gender = DRE.GetNullableString(reader, "gender", null),
                            Address = DRE.GetNullableString(reader, "address", null),
                            DateOfBirth = DRE.GetNullableString(reader, "date_of_birth", null),
                            ContactNo1 = DRE.GetNullableString(reader, "contact_no_1", null),
                            ContactNo2 = DRE.GetNullableString(reader, "contact_no_2", null),
                            MobileNo1 = DRE.GetNullableString(reader, "mobile_no_1", null),
                            MobileNo2 = DRE.GetNullableString(reader, "mobile_no_2", null),
                            EmailId = DRE.GetNullableString(reader, "email_id", null),
                            PANNo = DRE.GetNullableString(reader, "pan_no", null),
                            Department = DRE.GetNullableString(reader, "department", null),
                            Designation = DRE.GetNullableString(reader, "designation", null),
                            CompanyId = DRE.GetNullableInt32(reader, "company_id", null),
                            CompanyName = DRE.GetNullableString(reader, "company_name", null)
                        };

                        employee = _employee;
                    }
                }
            }

            return employee;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>
        private Int32 UpdateEmployee(Entities.Employee employee)
        {
            var employeeId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdateEmployee))
                {
                    database.AddInParameter(dbCommand, "@employee_id", DbType.Int32, employee.EmployeeId);
                    database.AddInParameter(dbCommand, "@employee_code", DbType.String, employee.EmployeeCode);
                    database.AddInParameter(dbCommand, "@title", DbType.String, employee.Title);
                    database.AddInParameter(dbCommand, "@first_name", DbType.String, employee.FirstName);
                    database.AddInParameter(dbCommand, "@middle_name", DbType.String, employee.MiddleName);
                    database.AddInParameter(dbCommand, "@last_name", DbType.String, employee.LastName);
                    database.AddInParameter(dbCommand, "@address", DbType.String, employee.Address);
                    database.AddInParameter(dbCommand, "@date_of_birth", DbType.String, employee.DateOfBirth);
                    database.AddInParameter(dbCommand, "@contact_no_1", DbType.String, employee.ContactNo1);
                    database.AddInParameter(dbCommand, "@contact_no_2", DbType.String, employee.ContactNo2);
                    database.AddInParameter(dbCommand, "@mobile_no_1", DbType.String, employee.MobileNo1);
                    database.AddInParameter(dbCommand, "@mobile_no_2", DbType.String, employee.MobileNo2);
                    database.AddInParameter(dbCommand, "@email_id", DbType.String, employee.EmailId);
                    database.AddInParameter(dbCommand, "@pan_no ", DbType.String, employee.PANNo);
                    database.AddInParameter(dbCommand, "@department", DbType.String, employee.Department);
                    database.AddInParameter(dbCommand, "@designation", DbType.String, employee.Designation);
                    database.AddInParameter(dbCommand, "@gender", DbType.String, employee.Gender);
                    database.AddInParameter(dbCommand, "@company_id", DbType.Int32, employee.CompanyId);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, employee.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, employee.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    employeeId = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        employeeId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return employeeId;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>
        public Int32 SaveEmployee(Entities.Employee employee)
        {
            var employeeId = 0;

            if (employee.EmployeeId == null || employee.EmployeeId == 0)
            {
                employeeId = AddEmployee(employee);
            }
            else if (employee.ModifiedBy != null || employee.ModifiedBy > 0)
            {
                employeeId = UpdateEmployee(employee);
            }
            else if (employee.IsDeleted == true)
            {
                var result = DeleteEmployee(employee);

                if (result)
                {
                    employeeId = (int)employee.EmployeeId;
                }
                else
                {
                    employeeId = 1;
                }
            }

            return employeeId;
        }

    }
}
