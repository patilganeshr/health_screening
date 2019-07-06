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
                    database.AddInParameter(dbCommand, "@patient_id", DbType.Int32, preEmploymentDetails.PatientId);
                    database.AddInParameter(dbCommand, "@pre_employment_or_health_check_up", DbType.String, preEmploymentDetails.PreEmploymentOrHealthCheckup);
                    database.AddInParameter(dbCommand, "@consult_date", DbType.String, preEmploymentDetails.ConsultDate);
                    database.AddInParameter(dbCommand, "@marital_status", DbType.String, preEmploymentDetails.MaritalStatus);
                    database.AddInParameter(dbCommand, "@no_of_sons", DbType.Int32, preEmploymentDetails.NoOfSons);
                    database.AddInParameter(dbCommand, "@no_of_daughters", DbType.Int32, preEmploymentDetails.NoOfDaughters);
                    database.AddInParameter(dbCommand, "@designation", DbType.String, preEmploymentDetails.Designation);
                    database.AddInParameter(dbCommand, "@identification_mark", DbType.String, preEmploymentDetails.IdentificationMark);
                    database.AddInParameter(dbCommand, "@allergic_to", DbType.String, preEmploymentDetails.AllergicTo);
                    database.AddInParameter(dbCommand, "@micturation", DbType.String, preEmploymentDetails.Micturation);
                    database.AddInParameter(dbCommand, "@bowels", DbType.String, preEmploymentDetails.Bowels);
                    database.AddInParameter(dbCommand, "@sleep", DbType.String, preEmploymentDetails.Sleep);
                    database.AddInParameter(dbCommand, "@smoking", DbType.String, preEmploymentDetails.Smoking);
                    database.AddInParameter(dbCommand, "@alcohol", DbType.String, preEmploymentDetails.Alcohol);
                    database.AddInParameter(dbCommand, "@mc", DbType.String, preEmploymentDetails.MC);
                    database.AddInParameter(dbCommand, "@past_history", DbType.String, preEmploymentDetails.PastHistory);
                    database.AddInParameter(dbCommand, "@family_history", DbType.String, preEmploymentDetails.FamilyHistory);
                    database.AddInParameter(dbCommand, "@working_period_id", DbType.Int32, preEmploymentDetails.WorkingPeriodId);
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
                    database.AddInParameter(dbCommand, "@patient_id", DbType.Int32, preEmploymentDetails.PatientId);
                    database.AddInParameter(dbCommand, "@pre_employment_or_health_check_up", DbType.String, preEmploymentDetails.PreEmploymentOrHealthCheckup);
                    database.AddInParameter(dbCommand, "@consult_date", DbType.String, preEmploymentDetails.ConsultDate);
                    database.AddInParameter(dbCommand, "@marital_status", DbType.String, preEmploymentDetails.MaritalStatus);
                    database.AddInParameter(dbCommand, "@no_of_sons", DbType.Int32, preEmploymentDetails.NoOfSons);
                    database.AddInParameter(dbCommand, "@no_of_daughters", DbType.Int32, preEmploymentDetails.NoOfDaughters);
                    database.AddInParameter(dbCommand, "@designation", DbType.String, preEmploymentDetails.Designation);
                    database.AddInParameter(dbCommand, "@identification_mark", DbType.String, preEmploymentDetails.IdentificationMark);
                    database.AddInParameter(dbCommand, "@allergic_to", DbType.String, preEmploymentDetails.AllergicTo);
                    database.AddInParameter(dbCommand, "@micturation", DbType.String, preEmploymentDetails.Micturation);
                    database.AddInParameter(dbCommand, "@bowels", DbType.String, preEmploymentDetails.Bowels);
                    database.AddInParameter(dbCommand, "@sleep", DbType.String, preEmploymentDetails.Sleep);
                    database.AddInParameter(dbCommand, "@smoking", DbType.String, preEmploymentDetails.Smoking);
                    database.AddInParameter(dbCommand, "@alcohol", DbType.String, preEmploymentDetails.Alcohol);
                    database.AddInParameter(dbCommand, "@mc", DbType.String, preEmploymentDetails.MC);
                    database.AddInParameter(dbCommand, "@past_history", DbType.String, preEmploymentDetails.PastHistory);
                    database.AddInParameter(dbCommand, "@family_history", DbType.String, preEmploymentDetails.FamilyHistory);
                    database.AddInParameter(dbCommand, "@working_period_id", DbType.Int32, preEmploymentDetails.WorkingPeriodId);
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

        public Entities.PreEmploymentDetails GetPatientAndTestDetails(Int32 patientId)
        {
            var patientAndTestDetails = new Entities.PreEmploymentDetails();

            using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetPreEmploymentPatientDetailsByPatientId))
            {
                database.AddInParameter(dbCommand, "@patient_id", DbType.Int32, patientId);

                using (IDataReader reader = database.ExecuteReader(dbCommand))
                {
                    while (reader.Read())
                    {
                        var preEmploymentTestDetails = new DataModel.PreEmploymentTestDetails();

                        var preEmployment = new Entities.PreEmploymentDetails()
                        {
                            PreEmploymentId = DRE.GetNullableInt32(reader, "pre_employment_id", 0),
                            PatientId = DRE.GetNullableInt32(reader, "patient_id", null),
                            PatientCode = DRE.GetNullableInt32(reader, "patient_code", null),
                            PatientFullName = DRE.GetNullableString(reader, "full_name", null),
                            Gender = DRE.GetNullableString(reader, "gender", null),
                            Age = DRE.GetNullableInt32(reader, "age", null),
                            ConsultDate = DRE.GetNullableString(reader, "consult_date", null),
                            MaritalStatus = DRE.GetNullableString(reader, "marital_status", null),
                            NoOfSons = DRE.GetNullableInt32(reader, "no_of_sons", null),
                            NoOfDaughters = DRE.GetNullableInt32(reader, "no_of_daughters", null),
                            EmployerId = DRE.GetNullableInt32(reader, "employer_id", null),
                            EmployerCode = DRE.GetNullableInt32(reader, "employer_code", null),
                            EmployerName = DRE.GetNullableString(reader, "employer_name", null),
                            Designation = DRE.GetNullableString(reader, "designation", null),
                            IdentificationMark = DRE.GetNullableString(reader,"identification_mark", null),
                            AllergicTo = DRE.GetNullableString(reader, "allergic_to", null),
                            Micturation = DRE.GetNullableString(reader, "micturation", null),
                            Bowels = DRE.GetNullableString(reader, "bowels", null),
                            Sleep = DRE.GetNullableString(reader, "sleep", null),
                            Alcohol = DRE.GetNullableString(reader, "alcohol", null),
                            Smoking = DRE.GetNullableString(reader, "smoking", null),
                            MC = DRE.GetNullableString(reader, "mc", null),
                            PastHistory = DRE.GetNullableString(reader, "past_history", null),
                            FamilyHistory = DRE.GetNullableString(reader, "family_history", null),
                            WorkingPeriodId = DRE.GetNullableInt32(reader, "working_period_id", null),
                            FinancialYear = DRE.GetNullableString(reader, "financial_year", null),
                            PreEmploymentTestDetails = preEmploymentTestDetails.GetAllTestDetails()
                        };

                        patientAndTestDetails = preEmployment;
                    }
                }
            }

            return patientAndTestDetails;
        }

        public List<Entities.PreEmploymentDetails> GetAllPreEmploymentDetails(string preEmploymentOrHealthCheckup)
        {
            var preEmploymentDetails = new List<Entities.PreEmploymentDetails>();

            using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetAllPreEmploymentDetails))
            {
                database.AddInParameter(dbCommand, "@pre_employment_or_health_checkup", DbType.String, preEmploymentOrHealthCheckup);

                using (IDataReader reader = database.ExecuteReader(dbCommand))
                {
                    while (reader.Read())
                    {
                        var preEmploymentTestDetails = new DataModel.PreEmploymentTestDetails();

                        var preEmployment = new Entities.PreEmploymentDetails()
                        {
                            PreEmploymentId = DRE.GetNullableInt32(reader, "pre_employment_id", 0),
                            PreEmploymentCodeNo = DRE.GetNullableInt32(reader, "pre_employment_code_no", null),
                            PreEmploymentOrHealthCheckup = DRE.GetNullableString(reader, "pre_employment_or_health_checkup", null),
                            PatientId = DRE.GetNullableInt32(reader, "patient_id", null),
                            PatientCode = DRE.GetNullableInt32(reader, "patient_code", null),
                            PatientFullName = DRE.GetNullableString(reader, "full_name", null),
                            Gender = DRE.GetNullableString(reader, "gender", null),
                            Age = DRE.GetNullableInt32(reader, "age", null),
                            ConsultDate = DRE.GetNullableString(reader, "consult_date", null),
                            MaritalStatus = DRE.GetNullableString(reader, "marital_status", null),
                            NoOfSons = DRE.GetNullableInt32(reader, "no_of_sons", null),
                            NoOfDaughters = DRE.GetNullableInt32(reader, "no_of_daughters", null),
                            EmployerId = DRE.GetNullableInt32(reader, "employer_id", null),
                            EmployerCode = DRE.GetNullableInt32(reader, "employer_code", null),
                            EmployerName = DRE.GetNullableString(reader, "employer_name", null),
                            Designation = DRE.GetNullableString(reader, "designation", null),
                            IdentificationMark = DRE.GetNullableString(reader, "identification_mark", null),
                            AllergicTo = DRE.GetNullableString(reader, "allergic_to", null),
                            Micturation = DRE.GetNullableString(reader, "micturation", null),
                            Bowels = DRE.GetNullableString(reader, "bowels", null),
                            Sleep = DRE.GetNullableString(reader, "sleep", null),
                            Alcohol = DRE.GetNullableString(reader, "alcohol", null),
                            Smoking = DRE.GetNullableString(reader, "smoking", null),
                            MC = DRE.GetNullableString(reader, "mc", null),
                            PastHistory = DRE.GetNullableString(reader, "past_history", null),
                            FamilyHistory = DRE.GetNullableString(reader, "family_history", null),
                            WorkingPeriodId = DRE.GetNullableInt32(reader, "working_period_id", null),
                            FinancialYear = DRE.GetNullableString(reader, "financial_year", null),
                            PreEmploymentTestDetails = preEmploymentTestDetails.GetPreEmploymentTestDetailsByPreEmploymentId(DRE.GetInt32(reader, "pre_employment_id"))
                        };

                        preEmploymentDetails.Add(preEmployment);
                    }
                }
            }

            return preEmploymentDetails;
        }

        public List<Entities.PreEmploymentDetails> SearchPreEmploymentDetails(Entities.PreEmploymentDetails preEmploymentDetails)
        {
            var preEmploymentDetailsList = new List<Entities.PreEmploymentDetails>();

            using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.SearchPreEmploymentDetails))
            {
                database.AddInParameter(dbCommand, "@pre_employment_or_health_checkup", DbType.String, preEmploymentDetails.PreEmploymentOrHealthCheckup);
                database.AddInParameter(dbCommand, "@full_name", DbType.String, preEmploymentDetails.PatientFullName);
                database.AddInParameter(dbCommand, "@employer_name", DbType.String, preEmploymentDetails.EmployerName);
                database.AddInParameter(dbCommand, "@patient_code", DbType.Int32, preEmploymentDetails.PatientCode);

                using (IDataReader reader = database.ExecuteReader(dbCommand))
                {
                    while (reader.Read())
                    {
                        var preEmploymentTestDetails = new DataModel.PreEmploymentTestDetails();

                        var preEmployment = new Entities.PreEmploymentDetails()
                        {
                            PreEmploymentId = DRE.GetNullableInt32(reader, "pre_employment_id", 0),
                            PreEmploymentCodeNo = DRE.GetNullableInt32(reader, "pre_employment_code_no", null),
                            PreEmploymentOrHealthCheckup =DRE.GetNullableString(reader, "pre_employment_or_health_checkup", null),
                            PatientId = DRE.GetNullableInt32(reader, "patient_id", null),
                            PatientCode = DRE.GetNullableInt32(reader, "patient_code", null),
                            PatientFullName = DRE.GetNullableString(reader, "full_name", null),
                            Gender = DRE.GetNullableString(reader, "gender", null),
                            Age = DRE.GetNullableInt32(reader, "age", null),
                            ConsultDate =DRE.GetNullableString(reader, "consult_date", null),
                            MaritalStatus = DRE.GetNullableString(reader, "marital_status", null),
                            NoOfSons = DRE.GetNullableInt32(reader, "no_of_sons", null),
                            NoOfDaughters = DRE.GetNullableInt32(reader, "no_of_daughters", null),
                            EmployerId = DRE.GetNullableInt32(reader, "employer_id", null),
                            EmployerCode = DRE.GetNullableInt32(reader, "employer_code", null),
                            EmployerName = DRE.GetNullableString(reader, "employer_name", null),
                            Designation = DRE.GetNullableString(reader, "designation", null),
                            IdentificationMark = DRE.GetNullableString(reader, "identification_mark", null),
                            AllergicTo = DRE.GetNullableString(reader, "allergic_to", null),
                            Micturation = DRE.GetNullableString(reader, "micturation", null),
                            Bowels = DRE.GetNullableString(reader, "bowels", null),
                            Sleep = DRE.GetNullableString(reader, "sleep", null),
                            Alcohol = DRE.GetNullableString(reader, "alcohol", null),
                            Smoking = DRE.GetNullableString(reader, "smoking", null),
                            MC = DRE.GetNullableString(reader, "mc", null),
                            PastHistory = DRE.GetNullableString(reader, "past_history", null),
                            FamilyHistory = DRE.GetNullableString(reader, "family_history", null),
                            WorkingPeriodId = DRE.GetNullableInt32(reader, "working_period_id", null),
                            FinancialYear = DRE.GetNullableString(reader, "financial_year", null),
                            PreEmploymentTestDetails = preEmploymentTestDetails.GetPreEmploymentTestDetailsByPreEmploymentId(DRE.GetInt32(reader, "pre_employment_id"))
                        };

                        preEmploymentDetailsList.Add(preEmployment);
                    }
                }
            }

            return preEmploymentDetailsList;
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
