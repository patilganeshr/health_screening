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
    public class PatientExerciseHistory
    {
        private readonly Database database;

        public PatientExerciseHistory()
        {
            database = DBConnect.getDBConnection();
        }

 
        /// <summary>
        /// 
        /// </summary>
        /// <param name="employeeExerciseHistory"></param>
        /// <returns></returns>
        private Int32 AddPatientExerciseHistory(Entities.PatientExerciseHistory patientExerciseHistory, DbTransaction transaction)
        {
            var patientExerciseHistoryId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertPatientExerciseHistory))
                {
                    database.AddInParameter(dbCommand, "@patient_exercise_history_id", DbType.Int32, patientExerciseHistory.PatientExerciseHistoryId);
                    database.AddInParameter(dbCommand, "@patient_id", DbType.Int32, patientExerciseHistory.PatientId);
                    database.AddInParameter(dbCommand, "@exercise_name", DbType.String, patientExerciseHistory.ExerciseName);
                    database.AddInParameter(dbCommand, "@frequency", DbType.String, patientExerciseHistory.Frequency);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, patientExerciseHistory.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, patientExerciseHistory.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    patientExerciseHistoryId = database.ExecuteNonQuery(dbCommand, transaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        patientExerciseHistoryId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
          
            return patientExerciseHistoryId;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="patientExerciseHistory"></param>
        /// <returns></returns>
        public bool DeletePatientExerciseHistory(Entities.PatientExerciseHistory patientExerciseHistory, DbTransaction transaction)
        {
            bool isDeleted = false;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeletePatientExerciseHistory))
                {
                    database.AddInParameter(dbCommand, "@patient_exercise_history_id", DbType.Int32, patientExerciseHistory.PatientExerciseHistoryId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, patientExerciseHistory.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, patientExerciseHistory.DeletedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    var result = database.ExecuteNonQuery(dbCommand, transaction);

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
        /// <param name="patientId"></param>
        /// <returns></returns>
        public List<Entities.PatientExerciseHistory> GetPatientExerciseHistoriesByPatientId(Int32 patientId)
        {
            List<Entities.PatientExerciseHistory> patientExercisesHistory = new List<Entities.PatientExerciseHistory>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetPatientExerciseDetailsByPatientId))
                {
                    database.AddInParameter(dbCommand, "@patient_id", DbType.Int32, patientId);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            Entities.PatientExerciseHistory patientExerciseHistory = new Entities.PatientExerciseHistory()
                            {
                                PatientExerciseHistoryId = DRE.GetNullableInt32(reader, "patient_exercise_history_id", 0),
                                PatientId = DRE.GetNullableInt32(reader, "patient_id", 0),
                                ExerciseName = DRE.GetNullableString(reader, "exercise_name", null),
                                Frequency = DRE.GetNullableString(reader, "frequency", null),
                                SrNo = DRE.GetNullableInt64(reader, "sr_no", null )
                            };

                            patientExercisesHistory.Add(patientExerciseHistory);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
           
            return patientExercisesHistory;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="patientExerciseHistory"></param>
        /// <returns></returns>
        private Int32 UpdatePatientExerciseHistory(Entities.PatientExerciseHistory patientExerciseHistory, DbTransaction transaction)
        {
            var patientExerciseHistoryId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdatePatientExerciseHistory))
                {
                    database.AddInParameter(dbCommand, "@patient_exercise_history_id", DbType.Int32, patientExerciseHistory.PatientExerciseHistoryId);
                    database.AddInParameter(dbCommand, "@patient_id", DbType.Int32, patientExerciseHistory.PatientId);
                    database.AddInParameter(dbCommand, "@exercise_name", DbType.String, patientExerciseHistory.ExerciseName);
                    database.AddInParameter(dbCommand, "@frequency", DbType.String, patientExerciseHistory.Frequency);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, patientExerciseHistory.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, patientExerciseHistory.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    database.ExecuteNonQuery(dbCommand, transaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        patientExerciseHistoryId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            
            return patientExerciseHistoryId;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="patientExerciseHistory"></param>
        /// <returns></returns>
        public Int32 SavePatientExerciseHistory(Entities.PatientExerciseHistory patientExerciseHistory, DbTransaction transaction)
        {
            var patientExerciseHistoryId = 0;

            if (patientExerciseHistory.PatientExerciseHistoryId == null || patientExerciseHistory.PatientExerciseHistoryId == 0)
            {
                patientExerciseHistoryId =  AddPatientExerciseHistory(patientExerciseHistory, transaction);
            }
            else if (patientExerciseHistory.ModifiedBy != null || patientExerciseHistory.ModifiedBy > 0)
            {
                patientExerciseHistoryId = UpdatePatientExerciseHistory(patientExerciseHistory, transaction);
            }
            else if(patientExerciseHistory.IsDeleted == true)
            {
                var result = DeletePatientExerciseHistory(patientExerciseHistory, transaction);

                if (result)
                {
                    patientExerciseHistory.PatientExerciseHistoryId = (int) patientExerciseHistory.PatientExerciseHistoryId;
                }
                else
                {
                     patientExerciseHistoryId = -1;
                }
            }

            return patientExerciseHistoryId;
        }




    }
}
