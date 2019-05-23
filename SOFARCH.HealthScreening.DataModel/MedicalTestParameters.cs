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
    public class MedicalTestParameters
    {
        private readonly Database database;

        public MedicalTestParameters()
        {
            database = DBConnect.getDBConnection();
        }

        private Int32 AddMedicalTestParameters(Entities.MedicalTestParameters medicalTestParameters, DbTransaction dbTransaction)
        {
            var medicalTestParameterId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertMedicalTestParameters))
                {
                    database.AddInParameter(dbCommand, "@medical_test_parameter_id", DbType.Int32, medicalTestParameters.MedicalTestParameterId);
                    database.AddInParameter(dbCommand, "@medical_test_id", DbType.Int32, medicalTestParameters.MedicalTestId);
                    database.AddInParameter(dbCommand, "@test_parameter_name", DbType.String, medicalTestParameters.TestParameterName);
                    database.AddInParameter(dbCommand, "@test_parameter_desc", DbType.String, medicalTestParameters.TestParameterDesc);
                    database.AddInParameter(dbCommand, "@test_parameter_sequence", DbType.Decimal, medicalTestParameters.TestParameterSequence);
                    database.AddInParameter(dbCommand, "@minimum_value", DbType.Decimal, medicalTestParameters.MinimumValue);
                    database.AddInParameter(dbCommand, "@maximum_value", DbType.Decimal, medicalTestParameters.MaximumValue);
                    database.AddInParameter(dbCommand, "@normal_value", DbType.Decimal, medicalTestParameters.NormalValue);
                    database.AddInParameter(dbCommand, "@unit_of_measurement_id", DbType.Int32, medicalTestParameters.UnitOfMeasurementId);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, medicalTestParameters.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, medicalTestParameters.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    medicalTestParameterId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        medicalTestParameterId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return medicalTestParameterId;
        }

        private bool DeleteMedicalTestParameters(Entities.MedicalTestParameters medicalTestParameters, DbTransaction dbTransaction)
        {
            var isDeleted = false;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeleteMedicalTestParameters))
                {
                    database.AddInParameter(dbCommand, "@medical_test_id", DbType.Int32, medicalTestParameters.MedicalTestParameterId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, medicalTestParameters.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, medicalTestParameters.DeletedByIP);

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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="medicalTestParameters"></param>
        /// <returns></returns>
        private Int32 UpdateMedicalTestParameters(Entities.MedicalTestParameters medicalTestParameters, DbTransaction dbTransaction)
        {
            var medicalTestParameterId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdateMedicalTestParameters))
                {
                    database.AddInParameter(dbCommand, "@medical_test_parameter_id", DbType.Int32, medicalTestParameters.MedicalTestParameterId);
                    database.AddInParameter(dbCommand, "@medical_test_id", DbType.Int32, medicalTestParameters.MedicalTestId);
                    database.AddInParameter(dbCommand, "@test_parameter_name", DbType.String, medicalTestParameters.TestParameterName);
                    database.AddInParameter(dbCommand, "@test_parameter_desc", DbType.String, medicalTestParameters.TestParameterDesc);
                    database.AddInParameter(dbCommand, "@test_parameter_sequence", DbType.Decimal, medicalTestParameters.TestParameterSequence);
                    database.AddInParameter(dbCommand, "@minimum_value", DbType.Decimal, medicalTestParameters.MinimumValue);
                    database.AddInParameter(dbCommand, "@maximum_value", DbType.Decimal, medicalTestParameters.MaximumValue);
                    database.AddInParameter(dbCommand, "@normal_value", DbType.Decimal, medicalTestParameters.NormalValue);
                    database.AddInParameter(dbCommand, "@unit_of_measurement_id", DbType.Int32, medicalTestParameters.UnitOfMeasurementId);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, medicalTestParameters.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, medicalTestParameters.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    medicalTestParameterId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        medicalTestParameterId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return medicalTestParameterId;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<Entities.MedicalTestParameters> GetMedicalTestParameterDetailsByTestId(Int32 medicalTestId)
        {
            var medicalTestParameters = new List<Entities.MedicalTestParameters>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetMedicalTestParametersByTestId))
                {
                    database.AddInParameter(dbCommand, "@medical_test_id", DbType.Int32, medicalTestId);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var medicalTestParameter = new Entities.MedicalTestParameters()
                            {
                                MedicalTestParameterId = DRE.GetNullableInt32(reader, "medical_test_parameter_id", null),
                                MedicalTestId = DRE.GetNullableInt32(reader, "medical_test_id", 0),
                                TestParameterName = DRE.GetNullableString(reader, "test_parameter_name", null),
                                TestParameterDesc = DRE.GetNullableString(reader, "test_parameter_desc", null),
                                TestParameterSequence = DRE.GetNullableDecimal(reader, "test_parameter_sequence", null),
                                MinimumValue = DRE.GetNullableDecimal(reader, "minimum_value", null),
                                MaximumValue = DRE.GetNullableDecimal(reader, "maximum_value", null),
                                NormalValue = DRE.GetNullableDecimal(reader, "normal_value", null),
                                UnitOfMeasurementId = DRE.GetNullableInt32(reader, "unit_of_measurement_id", null),
                                UnitCode = DRE.GetNullableString(reader, "unit_code", null)
                            };

                            medicalTestParameters.Add(medicalTestParameter);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return medicalTestParameters;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="medicalTest"></param>
        /// <returns></returns>
        public Int32 SaveMedicalTestParameters(Entities.MedicalTestParameters medicalTestParameters, DbTransaction dbTransaction)
        {
            var medicalTestParameterId = 0;

            if (medicalTestParameters.MedicalTestId == null || medicalTestParameters.MedicalTestParameterId == 0)
            {
                medicalTestParameterId = AddMedicalTestParameters(medicalTestParameters, dbTransaction);
            }
            else if (medicalTestParameters.ModifiedBy != null || medicalTestParameters.ModifiedBy > 0)
            {
                medicalTestParameterId = UpdateMedicalTestParameters(medicalTestParameters, dbTransaction);
            }
            else if (medicalTestParameters.IsDeleted == true)
            {
                var result = DeleteMedicalTestParameters(medicalTestParameters, dbTransaction);

                if (result)
                {
                    medicalTestParameterId = (int)medicalTestParameters.MedicalTestParameterId;
                }
            }

            return medicalTestParameterId;
        }
    

    }
}
