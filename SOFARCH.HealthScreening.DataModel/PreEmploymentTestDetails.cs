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
    public class PreEmploymentTestDetails
    {
        private readonly Database database;

        public PreEmploymentTestDetails()
        {
            database = DBConnect.getDBConnection();
        }

        private Int32 AddPreEmploymentTestDetails(Entities.PreEmploymentTestDetails preEmploymentTestDetails, DbTransaction dbTransaction)
        {
            var preEmploymentTestId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertPreEmploymentTestDetails))
                {
                    database.AddInParameter(dbCommand, "@pre_employment_test_id", DbType.Int32, preEmploymentTestDetails.PreEmploymentTestId);
                    database.AddInParameter(dbCommand, "@pre_employment_id", DbType.Int32, preEmploymentTestDetails.PreEmploymentId);
                    database.AddInParameter(dbCommand, "@medical_test_id", DbType.Int32, preEmploymentTestDetails.MedicalTestId);
                    database.AddInParameter(dbCommand, "@medical_test_parameter_id", DbType.Int32, preEmploymentTestDetails.MedicalTestParameterId);
                    database.AddInParameter(dbCommand, "@test_value", DbType.String, preEmploymentTestDetails.TestValue);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, preEmploymentTestDetails.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, preEmploymentTestDetails.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    preEmploymentTestId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        preEmploymentTestId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return preEmploymentTestId;
        }

        private bool DeletePreEmploymentTestDetails(Entities.PreEmploymentTestDetails preEmploymentTestDetails, DbTransaction dbTransaction)
        {
            bool isDeleted = false;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeletePreEmploymentTestDetails))
                {
                    database.AddInParameter(dbCommand, "@pre_employment_test_id", DbType.Int32, preEmploymentTestDetails.PreEmploymentTestId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, preEmploymentTestDetails.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, preEmploymentTestDetails.DeletedByIP);

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

        public bool DeletePreEmploymentTestDetails(Int32 preEmploymentId, Int32 deletedBy, string deletedByIP, DbTransaction dbTransaction)
        {
            var isDeleted = false;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeletePreEmploymentTestDetails))
                {
                    database.AddInParameter(dbCommand, "@pre_employment_id", DbType.Int32, preEmploymentId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, deletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, deletedByIP);

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

        private Int32 UpdatePreEmploymentTestDetails(Entities.PreEmploymentTestDetails preEmploymentTestDetails, DbTransaction dbTransaction)
        {
            var preEmploymentTestId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdatePreEmploymentTestDetails))
                {
                    database.AddInParameter(dbCommand, "@pre_employment_test_id", DbType.Int32, preEmploymentTestDetails.PreEmploymentTestId);
                    database.AddInParameter(dbCommand, "@pre_employment_id", DbType.Int32, preEmploymentTestDetails.PreEmploymentId);
                    database.AddInParameter(dbCommand, "@medical_test_id", DbType.Int32, preEmploymentTestDetails.MedicalTestId);
                    database.AddInParameter(dbCommand, "@medical_test_parameter_id", DbType.Int32, preEmploymentTestDetails.MedicalTestParameterId);
                    database.AddInParameter(dbCommand, "@test_value", DbType.String, preEmploymentTestDetails.TestValue);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, preEmploymentTestDetails.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, preEmploymentTestDetails.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    preEmploymentTestId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        preEmploymentTestId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return preEmploymentTestId;
        }

        public List<Entities.PreEmploymentTestDetails> GetAllTestDetails()
        {
            var testDetails = new List<Entities.PreEmploymentTestDetails>();

            using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetPreEmploymentAllTestDetails))
            {
                using (IDataReader reader = database.ExecuteReader(dbCommand))
                {
                    while (reader.Read())
                    {
                        var employmentTestDetails = new Entities.PreEmploymentTestDetails()
                        {
                            PreEmploymentTestId = DRE.GetNullableInt32(reader, "pre_employment_test_id", 0),
                            PreEmploymentId = DRE.GetNullableInt32(reader, "pre_employment_id", 0),
                            MedicalTestId = DRE.GetNullableInt32(reader, "medical_test_id", null),
                            MedicalTestParameterId = DRE.GetNullableInt32(reader, "medical_test_parameter_id", null),
                            TestName = DRE.GetNullableString(reader, "test_name", null),
                            TestValue = DRE.GetNullableString(reader, "test_value", null),
                            IsParameters = DRE.GetNullableBoolean(reader, "is_parameters", null),
                            IsTestGeneral = DRE.GetNullableBoolean(reader, "is_test_general", null)
                        };

                        testDetails.Add(employmentTestDetails);
                    }
                }
            }

            return testDetails;
        }

        public List<Entities.PreEmploymentTestDetails> GetPreEmploymentTestDetailsByPreEmploymentId(Int32 preEmploymentId)
        {
            var testDetails = new List<Entities.PreEmploymentTestDetails>();

            using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetPreEmploymentTestDetailsByPreEmploymentId))
            {
                database.AddInParameter(dbCommand, "@pre_employment_id", DbType.Int32, preEmploymentId);

                using (IDataReader reader = database.ExecuteReader(dbCommand))
                {
                    while (reader.Read())
                    {
                        var employmentTestDetails = new Entities.PreEmploymentTestDetails()
                        {
                            PreEmploymentTestId = DRE.GetNullableInt32(reader, "pre_employment_test_id", 0),
                            PreEmploymentId = DRE.GetNullableInt32(reader, "pre_employment_id", 0),
                            MedicalTestId = DRE.GetNullableInt32(reader, "medical_test_id", null),
                            MedicalTestParameterId = DRE.GetNullableInt32(reader, "medical_test_parameter_id", null),
                            TestName = DRE.GetNullableString(reader, "test_name", null),
                            TestValue = DRE.GetNullableString(reader, "test_value", null),
                            IsParameters = DRE.GetNullableBoolean(reader, "is_parameters", null),
                            IsTestGeneral = DRE.GetNullableBoolean(reader, "is_test_general", null)                            
                        };

                        testDetails.Add(employmentTestDetails);
                    }
                }
            }

            return testDetails;
        }

        public Int32 SavePreEmploymentDetails(Entities.PreEmploymentTestDetails preEmploymentTestDetails, DbTransaction dbTransaction)
        {
            var preEmploymentTestParameterId = 0;

            if (preEmploymentTestDetails.PreEmploymentTestId == null || preEmploymentTestDetails.PreEmploymentTestId == 0)
            {
                preEmploymentTestParameterId = AddPreEmploymentTestDetails(preEmploymentTestDetails, dbTransaction);
            }
            else if (preEmploymentTestDetails.ModifiedBy != null || preEmploymentTestDetails.ModifiedBy > 0)
            {
                preEmploymentTestParameterId = UpdatePreEmploymentTestDetails(preEmploymentTestDetails, dbTransaction);
            }
            else if (preEmploymentTestDetails.IsDeleted == true)
            {
                var result = DeletePreEmploymentTestDetails(preEmploymentTestDetails, dbTransaction);

                if (result)
                {
                    preEmploymentTestParameterId = (int)preEmploymentTestDetails.PreEmploymentTestId;
                }
            }

            return preEmploymentTestParameterId;
        }

    }
}
