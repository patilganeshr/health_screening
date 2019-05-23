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
    public class EmployeeExerciseHistory
    {
        private readonly Database database;

        public EmployeeExerciseHistory()
        {
            database = DBConnect.getDBConnection();
        }

 
        /// <summary>
        /// 
        /// </summary>
        /// <param name="employeeExerciseHistory"></param>
        /// <returns></returns>
        private Int32 AddEmployeeExerciseHistory(Entities.EmployeeExerciseHistory employeeExerciseHistory, DbTransaction transaction)
        {
            var employeeExerciseHistoryId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertEmployeeExerciseHistory))
                {
                    database.AddInParameter(dbCommand, "@employee_exercise_history_id", DbType.Int32, employeeExerciseHistory.EmployeeExerciseHistoryId);
                    database.AddInParameter(dbCommand, "@employee_id", DbType.Int32, employeeExerciseHistory.EmployeeId);
                    database.AddInParameter(dbCommand, "@exercise_name", DbType.String, employeeExerciseHistory.ExerciseName);
                    database.AddInParameter(dbCommand, "@frequency", DbType.String, employeeExerciseHistory.Frequency);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, employeeExerciseHistory.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, employeeExerciseHistory.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    employeeExerciseHistoryId = database.ExecuteNonQuery(dbCommand, transaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        employeeExerciseHistoryId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
          
            return employeeExerciseHistoryId;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>
        public bool DeleteEmployeeExerciseHistory(Entities.EmployeeExerciseHistory employeeExerciseHistory, DbTransaction transaction)
        {
            bool isDeleted = false;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeleteEmployeeExerciseHistory))
                {
                    database.AddInParameter(dbCommand, "@employee_exercise_history_id", DbType.Int32, employeeExerciseHistory.EmployeeExerciseHistoryId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, employeeExerciseHistory.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, employeeExerciseHistory.DeletedByIP);

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
        /// <param name="BranchId"></param>
        /// <returns></returns>
        public List<Entities.EmployeeExerciseHistory> GetEmployeeExerciseHistoriesByEmployeeId(Int32 employeeId)
        {
            List<Entities.EmployeeExerciseHistory> employeeExercisesHistory = new List<Entities.EmployeeExerciseHistory>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetEmployeeExerciseDetailsByEmployeeId))
                {
                    database.AddInParameter(dbCommand, "@employee_id", DbType.Int32, employeeId);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            Entities.EmployeeExerciseHistory employeeExerciseHistory = new Entities.EmployeeExerciseHistory()
                            {
                                EmployeeExerciseHistoryId = DRE.GetNullableInt32(reader, "employee_exercise_history_id", 0),
                                EmployeeId = DRE.GetNullableInt32(reader, "employee_id", 0),
                                ExerciseName = DRE.GetNullableString(reader, "exercise_name", null),
                                Frequency = DRE.GetNullableString(reader, "frequency", null),
                                SrNo = DRE.GetNullableInt64(reader, "sr_no", null )
                            };

                            employeeExercisesHistory.Add(employeeExerciseHistory);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
           
            return employeeExercisesHistory;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>
        private Int32 UpdateEmployeeExerciseHistory(Entities.EmployeeExerciseHistory employeeExerciseHistory, DbTransaction transaction)
        {
            var employeeExerciseHistoryId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdateEmployeeExerciseHistory))
                {
                    database.AddInParameter(dbCommand, "@employee_exercise_history_id", DbType.Int32, employeeExerciseHistory.EmployeeExerciseHistoryId);
                    database.AddInParameter(dbCommand, "@employee_id", DbType.Int32, employeeExerciseHistory.EmployeeId);
                    database.AddInParameter(dbCommand, "@exercise_name", DbType.String, employeeExerciseHistory.ExerciseName);
                    database.AddInParameter(dbCommand, "@frequency", DbType.String, employeeExerciseHistory.Frequency);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, employeeExerciseHistory.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, employeeExerciseHistory.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    database.ExecuteNonQuery(dbCommand, transaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        employeeExerciseHistoryId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            
            return employeeExerciseHistoryId;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="employeeExerciseHistory"></param>
        /// <returns></returns>
        public Int32 SaveEmployeeExerciseHistory(Entities.EmployeeExerciseHistory employeeExerciseHistory, DbTransaction transaction)
        {
            var employeeExerciseHistoryId = 0;

            if (employeeExerciseHistory.EmployeeExerciseHistoryId == null || employeeExerciseHistory.EmployeeExerciseHistoryId == 0)
            {
                employeeExerciseHistoryId =  AddEmployeeExerciseHistory(employeeExerciseHistory, transaction);
            }
            else if (employeeExerciseHistory.ModifiedBy != null || employeeExerciseHistory.ModifiedBy > 0)
            {
                employeeExerciseHistoryId = UpdateEmployeeExerciseHistory(employeeExerciseHistory, transaction);
            }
            else if(employeeExerciseHistory.IsDeleted == true)
            {
                var result = DeleteEmployeeExerciseHistory(employeeExerciseHistory, transaction);

                if (result)
                {
                    employeeExerciseHistory.EmployeeExerciseHistoryId = (int) employeeExerciseHistory.EmployeeExerciseHistoryId;
                }
                else
                {
                     employeeExerciseHistoryId = -1;
                }
            }

            return employeeExerciseHistoryId;
        }




    }
}
