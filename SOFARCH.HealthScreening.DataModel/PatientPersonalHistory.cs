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
using SOFARCH.HealthScreening.Entities;

namespace SOFARCH.HealthScreening.DataModel
{
    public class PatientPersonalHistory
    {
        private readonly Database database;

        public PatientPersonalHistory()
        {
            database = DBConnect.getDBConnection();
        }

                /// <summary>
        ///
        /// </summary>
        /// <param name="patientPersonalHistory"></param>
        /// <returns></returns>
        private Int32 AddPatientPersonalHistory(Entities.PatientPersonalHistory patientPersonalHistory, DbTransaction transaction)
        {
            var patientPersonalHistoryId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertPatientPersonalHistory))
                {
                    database.AddInParameter(dbCommand, "@patient_personal_history_id", DbType.Int32, patientPersonalHistory.PatientPersonalHistoryId);
                    database.AddInParameter(dbCommand, "@patient_id", DbType.Int32, patientPersonalHistory.PatientId);
                    database.AddInParameter(dbCommand, "@marital_status", DbType.String, patientPersonalHistory.MaritalStatus);
                    database.AddInParameter(dbCommand, "no_of_sons", DbType.Int32, patientPersonalHistory.NoOfSons);
                    database.AddInParameter(dbCommand, "no_of_daughters", DbType.Int32, patientPersonalHistory.NoOfDaughters);
                    database.AddInParameter(dbCommand, "emp_height", DbType.Decimal, patientPersonalHistory.PatientHeight);
                    database.AddInParameter(dbCommand, "height_unit", DbType.String, patientPersonalHistory.HeightUnit);
                    database.AddInParameter(dbCommand, "emp_weight", DbType.Decimal, patientPersonalHistory.PatientWeight);
                    database.AddInParameter(dbCommand, "weight_unit", DbType.String, patientPersonalHistory.WeightUnit);
                    database.AddInParameter(dbCommand, "smoking", DbType.String, patientPersonalHistory.Smoking);
                    database.AddInParameter(dbCommand, "alcohol", DbType.String, patientPersonalHistory.Alcohol);
                    database.AddInParameter(dbCommand, "tobacco", DbType.String, patientPersonalHistory.Tobacco);
                    database.AddInParameter(dbCommand, "blood_group_id", DbType.Int32, patientPersonalHistory.BloodGroupId);
                    database.AddInParameter(dbCommand, "blood_group_factor_id", DbType.Int32, patientPersonalHistory.BloodGroupFactorId);
                    database.AddInParameter(dbCommand, "diet", DbType.String, patientPersonalHistory.Diet);
                    database.AddInParameter(dbCommand, "allergic_to", DbType.String, patientPersonalHistory.AllergicTo);
                    database.AddInParameter(dbCommand, "other_addictions", DbType.String, patientPersonalHistory.OtherAddictions);
                    database.AddInParameter(dbCommand, "present_illness", DbType.String, patientPersonalHistory.PresentIllness);
                    database.AddInParameter(dbCommand, "treatment", DbType.String, patientPersonalHistory.Treatment);
                    database.AddInParameter(dbCommand, "micturation", DbType.String, patientPersonalHistory.Micturation);
                    database.AddInParameter(dbCommand, "bowels", DbType.String, patientPersonalHistory.Bowels);
                    database.AddInParameter(dbCommand, "sleep", DbType.String, patientPersonalHistory.Sleep);
                    database.AddInParameter(dbCommand, "mc", DbType.String, patientPersonalHistory.MC);
                    database.AddInParameter(dbCommand, "past_history", DbType.String, patientPersonalHistory.PastHistory);
                    database.AddInParameter(dbCommand, "family_history", DbType.String, patientPersonalHistory.FamilyHistory);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, patientPersonalHistory.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, patientPersonalHistory.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    patientPersonalHistoryId = database.ExecuteNonQuery(dbCommand, transaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        patientPersonalHistoryId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return patientPersonalHistoryId;
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="patientPersonalHistory"></param>
        /// <returns></returns>
        private bool DeletePatientPersonalHistory(Entities.PatientPersonalHistory patientPersonalHistory, DbTransaction transaction)
        {
            bool isDeleted = false;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeletePatientPersonalHistory))
                {
                    database.AddInParameter(dbCommand, "@patient_personal_history_id", DbType.Int32, patientPersonalHistory.PatientPersonalHistoryId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, patientPersonalHistory.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, patientPersonalHistory.DeletedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    database.ExecuteNonQuery(dbCommand, transaction);

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
        /// <param name="BranchId"></param>
        /// <returns></returns>
        public Entities.PatientPersonalHistory GetPatientPersonalHistoriesByPatientId(Int32 patientId)
        {
            var patientPersonalHistoryInfo = new Entities.PatientPersonalHistory();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetPatientPersonalHistoryDetailsByPatientId))
                {
                    database.AddInParameter(dbCommand, "@patient_id", DbType.Int32, patientId);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var patientPersonalHistory = new Entities.PatientPersonalHistory()
                            {
                                PatientPersonalHistoryId = DRE.GetNullableInt32(reader, "patient_personal_history_id", 0),
                                PatientId = DRE.GetNullableInt32(reader, "patient_id", 0),
                                MaritalStatus = DRE.GetNullableString(reader, "marital_status", null),
                                NoOfSons = DRE.GetNullableInt32(reader, "no_of_sons", 0),
                                NoOfDaughters = DRE.GetNullableInt32(reader, "no_of_daughters", 0),
                                PatientHeight = DRE.GetNullableDecimal(reader, "emp_height", null),
                                HeightUnit = DRE.GetNullableString(reader, "height_unit", null),
                                PatientWeight = DRE.GetNullableDecimal(reader, "emp_weight", null),
                                WeightUnit = DRE.GetNullableString(reader, "weight_unit", null),
                                Smoking = DRE.GetNullableString(reader, "smoking", null),
                                Alcohol = DRE.GetNullableString(reader, "alcohol", null),
                                Tobacco = DRE.GetNullableString(reader, "tobacco", null),
                                BloodGroupId = DRE.GetNullableInt32(reader, "blood_group_id", null),
                                BloodGroupFactorId = DRE.GetNullableInt32(reader, "blood_group_factor_id", null),
                                Diet = DRE.GetNullableString(reader, "diet", null),
                                AllergicTo = DRE.GetNullableString(reader, "allergic_to", null),
                                OtherAddictions = DRE.GetNullableString(reader, "other_addictions", null),
                                PresentIllness = DRE.GetNullableString(reader, "present_illness", null),
                                Treatment = DRE.GetNullableString(reader, "treatment", null),
                                Micturation = DRE.GetNullableString(reader, "micturation", null),
                                Bowels = DRE.GetNullableString(reader, "bowels", null),
                                Sleep = DRE.GetNullableString(reader, "sleep", null),
                                MC = DRE.GetNullableString(reader, "mc", null),
                                PastHistory = DRE.GetNullableString(reader, "past_history", null),
                                FamilyHistory = DRE.GetNullableString(reader, "family_history", null)

                            };

                            patientPersonalHistoryInfo = patientPersonalHistory;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return patientPersonalHistoryInfo;
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="patientPersonalHistory"></param>
        /// <returns></returns>
        private Int32 UpdatePatientPersonalHistory(Entities.PatientPersonalHistory patientPersonalHistory, DbTransaction transaction)
        {
            var patientPersonalHistoryId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdatePatientPersonalHistory))
                {
                    database.AddInParameter(dbCommand, "@patient_personal_history_id", DbType.Int32, patientPersonalHistory.PatientPersonalHistoryId);
                    database.AddInParameter(dbCommand, "@patient_id", DbType.Int32, patientPersonalHistory.PatientId);
                    database.AddInParameter(dbCommand, "@marital_status", DbType.String, patientPersonalHistory.MaritalStatus);
                    database.AddInParameter(dbCommand, "no_of_sons", DbType.Int32, patientPersonalHistory.NoOfSons);
                    database.AddInParameter(dbCommand, "no_of_daughters", DbType.Int32, patientPersonalHistory.NoOfDaughters);
                    database.AddInParameter(dbCommand, "emp_height", DbType.Decimal, patientPersonalHistory.PatientHeight);
                    database.AddInParameter(dbCommand, "height_unit", DbType.String, patientPersonalHistory.HeightUnit);
                    database.AddInParameter(dbCommand, "emp_weight", DbType.Decimal, patientPersonalHistory.PatientWeight);
                    database.AddInParameter(dbCommand, "weight_unit", DbType.String, patientPersonalHistory.WeightUnit);
                    database.AddInParameter(dbCommand, "smoking", DbType.String, patientPersonalHistory.Smoking);
                    database.AddInParameter(dbCommand, "alcohol", DbType.String, patientPersonalHistory.Alcohol);
                    database.AddInParameter(dbCommand, "tobacco", DbType.String, patientPersonalHistory.Tobacco);
                    database.AddInParameter(dbCommand, "blood_group_id", DbType.Int32, patientPersonalHistory.BloodGroupId);
                    database.AddInParameter(dbCommand, "blood_group_factor_id", DbType.Int32, patientPersonalHistory.BloodGroupFactorId);
                    database.AddInParameter(dbCommand, "diet", DbType.String, patientPersonalHistory.Diet);
                    database.AddInParameter(dbCommand, "allergic_to", DbType.String, patientPersonalHistory.AllergicTo);
                    database.AddInParameter(dbCommand, "other_addictions", DbType.String, patientPersonalHistory.OtherAddictions);
                    database.AddInParameter(dbCommand, "present_illness", DbType.String, patientPersonalHistory.PresentIllness);
                    database.AddInParameter(dbCommand, "treatment", DbType.String, patientPersonalHistory.Treatment);
                    database.AddInParameter(dbCommand, "micturation", DbType.String, patientPersonalHistory.Micturation);
                    database.AddInParameter(dbCommand, "bowels", DbType.String, patientPersonalHistory.Bowels);
                    database.AddInParameter(dbCommand, "sleep", DbType.String, patientPersonalHistory.Sleep);
                    database.AddInParameter(dbCommand, "mc", DbType.String, patientPersonalHistory.MC);
                    database.AddInParameter(dbCommand, "past_history", DbType.String, patientPersonalHistory.PastHistory);
                    database.AddInParameter(dbCommand, "family_history", DbType.String, patientPersonalHistory.FamilyHistory);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, patientPersonalHistory.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, patientPersonalHistory.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    database.ExecuteNonQuery(dbCommand, transaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        patientPersonalHistoryId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return patientPersonalHistoryId;
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="patientPersonalHistory"></param>
        /// <returns></returns>
        public Int32 SavePatientPersonalHistory(Entities.PatientPersonalHistory patientPersonalHistory, DbTransaction transaction)
        {
            var patientPersonalHistoryId = 0;

            if (patientPersonalHistory.PatientPersonalHistoryId == null || patientPersonalHistory.PatientPersonalHistoryId == 0)
            {
                patientPersonalHistoryId =  AddPatientPersonalHistory(patientPersonalHistory, transaction);
            }
            else if (patientPersonalHistory.ModifiedBy != null || patientPersonalHistory.ModifiedBy > 0)
            {
                patientPersonalHistoryId = UpdatePatientPersonalHistory(patientPersonalHistory, transaction);
            }
            else if(patientPersonalHistory.IsDeleted == true)
            {
                var result = DeletePatientPersonalHistory(patientPersonalHistory, transaction);

                if (result)
                {
                    patientPersonalHistoryId = (int)patientPersonalHistory.PatientPersonalHistoryId;
                }
                else
                {
                     patientPersonalHistoryId = 1;
                }
            }

            return patientPersonalHistoryId;
        }


    }
}
