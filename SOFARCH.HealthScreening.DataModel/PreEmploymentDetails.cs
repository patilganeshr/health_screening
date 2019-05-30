using System;
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
    public class PreEmploymentDetails
    {
        private readonly Database database;

        public PreEmploymentDetails()
        {
            database = DBConnect.getDBConnection();
        }

        private Int32 AddPreEmploymentDetails(Entities.PreEmploymentDetails preEmploymentDetails, DbTransaction dbTransaction)
        {
            var preEmploymentId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertPreEmploymentDetails))
                {
                    database.AddInParameter(dbCommand, "@pre_employment_id", DbType.Int32, preEmploymentDetails.PreEmploymentId);
                    database.AddInParameter(dbCommand, "@employee_id", DbType.Int32, preEmploymentDetails.EmployeeId);
                    database.AddInParameter(dbCommand, "@doc_no", DbType.String, preEmploymentDetails.DocNo);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, preEmploymentDetails.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, preEmploymentDetails.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    preEmploymentId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        preEmploymentId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return preEmploymentId;
        }

        private bool DeletePreEmploymentDetails(Entities.PreEmploymentDetails preEmploymentDetails, DbTransaction dbTransaction)
        {
            bool isDeleted = false;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeletePreEmploymentDetails))
                {
                    database.AddInParameter(dbCommand, "@pre_employment_id", DbType.Int32, preEmploymentDetails.PreEmploymentId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, preEmploymentDetails.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, preEmploymentDetails.DeletedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    var result = database.ExecuteNonQuery(dbCommand, dbTransaction);

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

        private Int32 UpdatePreEmploymentDetails(Entities.PreEmploymentDetails preEmploymentDetails, DbTransaction dbTransaction)
        {
            var preEmploymentId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdatePreEmploymentDetails))
                {
                    database.AddInParameter(dbCommand, "@pre_employment_id", DbType.Int32, preEmploymentDetails.PreEmploymentId);
                    database.AddInParameter(dbCommand, "@employee_id", DbType.Int32, preEmploymentDetails.EmployeeId);
                    database.AddInParameter(dbCommand, "@doc_no", DbType.String, preEmploymentDetails.DocNo);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, preEmploymentDetails.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, preEmploymentDetails.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    preEmploymentId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        preEmploymentId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return preEmploymentId;
        }

        public Entities.PreEmploymentDetails GetEmployeeDetails(Int32 employeeId)
        {
            var employeeDetails = new Entities.PreEmploymentDetails();

            using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetPreEmploymentEmployeeDetailsByEmployeeId))
            {
                database.AddInParameter(dbCommand, "@employee_id", DbType.Int32, employeeId);

                using (IDataReader reader = database.ExecuteReader(dbCommand))
                {
                    while (reader.Read())
                    {
                        var preEmploymentTestDetails = new DataModel.PreEmploymentTestDetails();

                        var employee = new Entities.PreEmploymentDetails()
                        {
                            PreEmploymentId = DRE.GetNullableInt32(reader, "pre_employment_id", 0),
                            EmployeeId = DRE.GetNullableInt32(reader, "employee_id", null),
                            EmployeeCode = DRE.GetNullableString(reader, "employee_code", null),
                            EmployeeFullName = DRE.GetNullableString(reader, "full_name", null),
                            Gender = DRE.GetNullableString(reader, "gender", null),
                            Age = DRE.GetNullableInt32(reader, "age", null),
                            MaritalStatus = DRE.GetNullableString(reader, "marital_status", null),
                            NoOfSons = DRE.GetNullableInt32(reader, "no_of_sons", null),
                            NoOfDaughters = DRE.GetNullableInt32(reader, "no_of_daughters", null),
                            CompanyId = DRE.GetNullableInt32(reader, "company_id", null),
                            CompanyCode = DRE.GetNullableString(reader, "company_code", null),
                            CompanyName = DRE.GetNullableString(reader, "company_name", null),
                            Designation = DRE.GetNullableString(reader, "designation", null),
                            AllergicTo = DRE.GetNullableString(reader, "allergic_to", null),
                            Micturation = DRE.GetNullableString(reader, "micturation", null),
                            Bowels = DRE.GetNullableString(reader, "bowels", null),
                            Sleep = DRE.GetNullableString(reader, "sleep", null),
                            Alcohol = DRE.GetNullableString(reader, "alcohol", null),
                            Smoking = DRE.GetNullableString(reader, "smoking", null),
                            MC = DRE.GetNullableString(reader, "mc", null),
                            FamilyHistory = DRE.GetNullableString(reader, "family_history", null),
                            PreEmploymentTestDetails = preEmploymentTestDetails.GetAllTestDetails() 
                        };

                        employeeDetails = employee;
                    }
                }
            }

            return employeeDetails;
        }

        public List<Entities.PreEmploymentDetails> GetAllPreEmploymentDetails()
        {
            var preEmploymentDetails = new List<Entities.PreEmploymentDetails>();

            using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetAllPreEmploymentDetails))
            {
                using (IDataReader reader = database.ExecuteReader(dbCommand))
                {
                    while (reader.Read())
                    {
                        var preEmploymentTestDetails = new DataModel.PreEmploymentTestDetails();

                        var preEmployment = new Entities.PreEmploymentDetails()
                        {
                            PreEmploymentId = DRE.GetNullableInt32(reader, "pre_employment_id", 0),
                            DocNo = DRE.GetNullableString(reader, "doc_no", null),
                            EmployeeId = DRE.GetNullableInt32(reader, "employee_id", null),
                            EmployeeCode = DRE.GetNullableString(reader, "employee_code", null),
                            EmployeeFullName = DRE.GetNullableString(reader, "full_name", null),
                            Gender = DRE.GetNullableString(reader, "gender", null),
                            Age = DRE.GetNullableInt32(reader, "age", null),
                            MaritalStatus = DRE.GetNullableString(reader, "marital_status", null),
                            NoOfSons = DRE.GetNullableInt32(reader, "no_of_sons", null),
                            NoOfDaughters = DRE.GetNullableInt32(reader, "no_of_daughters", null),
                            CompanyId = DRE.GetNullableInt32(reader, "company_id", null),
                            CompanyCode = DRE.GetNullableString(reader, "company_code", null),
                            CompanyName = DRE.GetNullableString(reader, "company_name", null),
                            Designation = DRE.GetNullableString(reader, "designation", null),
                            AllergicTo = DRE.GetNullableString(reader, "allergic_to", null),
                            Micturation = DRE.GetNullableString(reader, "micturation", null),
                            Bowels = DRE.GetNullableString(reader, "bowels", null),
                            Sleep = DRE.GetNullableString(reader, "sleep", null),
                            Alcohol = DRE.GetNullableString(reader, "alcohol", null),
                            Smoking = DRE.GetNullableString(reader, "smoking", null),
                            MC = DRE.GetNullableString(reader, "mc", null),
                            FamilyHistory = DRE.GetNullableString(reader, "family_history", null),
                            PreEmploymentTestDetails = preEmploymentTestDetails.GetPreEmploymentTestDetailsByPreEmploymentId(DRE.GetInt32(reader, "pre_employment_id"))
                        };

                        preEmploymentDetails.Add(preEmployment);
                    }
                }
            }

            return preEmploymentDetails;
        }

        public Int32 SavePreEmploymentDetails(Entities.PreEmploymentDetails preEmploymentDetails)
        {
            var preEmploymentId = 0;

            var db = DBConnect.getDBConnection();

            using (DbConnection conn = db.CreateConnection())
            {
                conn.Open();

                using (DbTransaction dbTransaction = conn.BeginTransaction())
                {
                    try
                    {
                        var preEmploymentTestId = 0;

                        if (preEmploymentDetails != null)
                        {
                            if (preEmploymentDetails.PreEmploymentId == null || preEmploymentDetails.PreEmploymentId == 0)
                            {
                                preEmploymentId = AddPreEmploymentDetails(preEmploymentDetails, dbTransaction);
                            }
                            else if (preEmploymentDetails.ModifiedBy != null || preEmploymentDetails.ModifiedBy > 0)
                            {
                                preEmploymentId = UpdatePreEmploymentDetails(preEmploymentDetails, dbTransaction);
                            }
                            else if (preEmploymentDetails.IsDeleted == true)
                            {
                                var result = DeletePreEmploymentDetails(preEmploymentDetails, dbTransaction);

                                if (result)
                                {
                                    preEmploymentId = (int)preEmploymentDetails.PreEmploymentId;
                                }
                                else
                                {
                                    preEmploymentId = -1;
                                }
                            }

                            if (preEmploymentId > 0)
                            {
                                if (preEmploymentDetails.IsDeleted == true)
                                {
                                    PreEmploymentTestDetails preEmploymentTestDetailsDB = new PreEmploymentTestDetails();

                                    var result = preEmploymentTestDetailsDB.DeletePreEmploymentTestDetails((int)preEmploymentDetails.PreEmploymentId, (int)preEmploymentDetails.DeletedBy, preEmploymentDetails.DeletedByIP, dbTransaction);

                                    if (result)
                                    {
                                        preEmploymentTestId = (int)preEmploymentDetails.PreEmploymentId;
                                    }
                                }

                                if (preEmploymentDetails.PreEmploymentTestDetails != null)
                                {
                                    if (preEmploymentDetails.PreEmploymentTestDetails.Count > 0)
                                    {
                                        foreach (Entities.PreEmploymentTestDetails preEmploymentTestDetails in preEmploymentDetails.PreEmploymentTestDetails)
                                        {
                                            PreEmploymentTestDetails preEmploymentTestDetailsDB = new PreEmploymentTestDetails();

                                            preEmploymentTestDetails.PreEmploymentId = preEmploymentId;

                                            preEmploymentTestId = preEmploymentTestDetailsDB.SavePreEmploymentDetails(preEmploymentTestDetails, dbTransaction);

                                            if (preEmploymentTestId < 0)
                                            {
                                                preEmploymentTestId = -1;
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (preEmploymentTestId > 0)
                        {
                            dbTransaction.Commit();
                        }
                        else
                        {
                            dbTransaction.Rollback();
                        }
                    }
                    catch (Exception ex)
                    {
                        preEmploymentId = -1;
                        dbTransaction.Rollback();
                        throw ex;
                    }
                }

                return preEmploymentId;
            }
        }

    }


}
