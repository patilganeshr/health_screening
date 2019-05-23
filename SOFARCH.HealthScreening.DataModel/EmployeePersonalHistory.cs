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
    public class EmployeePersonalHistory
    {
        private readonly Database database;

        public EmployeePersonalHistory()
        {
            database = DBConnect.getDBConnection();
        }

                /// <summary>
        /// 
        /// </summary>
        /// <param name="employeeExerciseHistory"></param>
        /// <returns></returns>
        private Int32 AddEmployeePersonalHistory(Entities.EmployeePersonalHistory employeePersonalHistory, DbTransaction transaction)
        {
            var employeePersonalHistoryId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertEmployeePersonalHistory))
                {
                    database.AddInParameter(dbCommand, "@employee_personal_history_id", DbType.Int32, employeePersonalHistory.EmployeePersonalHistoryId);
                    database.AddInParameter(dbCommand, "@employee_id", DbType.Int32, employeePersonalHistory.EmployeeId);
                    database.AddInParameter(dbCommand, "@marital_status", DbType.String, employeePersonalHistory.MaritalStatus);
                    database.AddInParameter(dbCommand, "no_of_sons", DbType.Int32, employeePersonalHistory.NoOfSons);
                    database.AddInParameter(dbCommand, "no_of_daughters", DbType.Int32, employeePersonalHistory.NoOfDaughters);
                    database.AddInParameter(dbCommand, "emp_height", DbType.Decimal, employeePersonalHistory.EmployeeHeight);
                    database.AddInParameter(dbCommand, "height_unit", DbType.String, employeePersonalHistory.HeightUnit);
                    database.AddInParameter(dbCommand, "emp_weight", DbType.Decimal, employeePersonalHistory.EmployeeWeight);
                    database.AddInParameter(dbCommand, "weight_unit", DbType.String, employeePersonalHistory.WeightUnit);
                    database.AddInParameter(dbCommand, "smoking", DbType.Boolean, employeePersonalHistory.IsSmoking);
                    database.AddInParameter(dbCommand, "alcohol", DbType.Boolean, employeePersonalHistory.IsAlcohol);
                    database.AddInParameter(dbCommand, "tobacco", DbType.Boolean, employeePersonalHistory.IsTobacco);
                    database.AddInParameter(dbCommand, "blood_group_id", DbType.Int32, employeePersonalHistory.BloodGroupId);
                    database.AddInParameter(dbCommand, "blood_group_factor_id", DbType.Int32, employeePersonalHistory.BloodGroupFactorId);
                    database.AddInParameter(dbCommand, "diet", DbType.String, employeePersonalHistory.Diet);
                    database.AddInParameter(dbCommand, "allergic_to", DbType.String, employeePersonalHistory.AllergicTo);
                    database.AddInParameter(dbCommand, "other_addictions", DbType.String, employeePersonalHistory.OtherAddictions);
                    database.AddInParameter(dbCommand, "present_illness", DbType.String, employeePersonalHistory.PresentIllness);
                    database.AddInParameter(dbCommand, "treatment", DbType.String, employeePersonalHistory.Treatment);
                    database.AddInParameter(dbCommand, "micturation", DbType.String, employeePersonalHistory.Micturation);
                    database.AddInParameter(dbCommand, "bowels", DbType.String, employeePersonalHistory.Bowels);
                    database.AddInParameter(dbCommand, "sleep", DbType.String, employeePersonalHistory.Sleep);
                    database.AddInParameter(dbCommand, "mc", DbType.String, employeePersonalHistory.MC);
                    database.AddInParameter(dbCommand, "past_history", DbType.String, employeePersonalHistory.PastHistory);
                    database.AddInParameter(dbCommand, "family_history", DbType.String, employeePersonalHistory.FamilyHistory);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, employeePersonalHistory.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, employeePersonalHistory.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    employeePersonalHistoryId = database.ExecuteNonQuery(dbCommand, transaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        employeePersonalHistoryId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
          
            return employeePersonalHistoryId;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>
        private bool DeleteEmployeePersonalHistory(Entities.EmployeePersonalHistory employeePersonalHistory, DbTransaction transaction)
        {
            bool isDeleted = false;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeleteEmployeePersonalHistory))
                {
                    database.AddInParameter(dbCommand, "@employee_personal_history_id", DbType.Int32, employeePersonalHistory.EmployeePersonalHistoryId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, employeePersonalHistory.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, employeePersonalHistory.DeletedByIP);

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
        public Entities.EmployeePersonalHistory GetEmployeePersonalHistoriesByEmployeeId(Int32 employeeId)
        {
            var employeePersonalHistoryInfo = new Entities.EmployeePersonalHistory();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetEmployeePersonalHistoryDetailsByEmployeeId))
                {
                    database.AddInParameter(dbCommand, "@employee_id", DbType.Int32, employeeId);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var employeePersonalHistory = new Entities.EmployeePersonalHistory()
                            {
                                EmployeePersonalHistoryId = DRE.GetNullableInt32(reader, "employee_personal_history_id", 0),
                                EmployeeId = DRE.GetNullableInt32(reader, "employee_id", 0),
                                MaritalStatus = DRE.GetNullableString(reader, "marital_status", null),
                                NoOfSons = DRE.GetNullableInt32(reader, "no_of_sons", 0),
                                NoOfDaughters = DRE.GetNullableInt32(reader, "no_of_daughters", 0),
                                EmployeeHeight = DRE.GetNullableDecimal(reader, "emp_height", null),
                                HeightUnit = DRE.GetNullableString(reader, "height_unit", null),
                                EmployeeWeight = DRE.GetNullableDecimal(reader, "emp_weight", null),
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

                            employeePersonalHistoryInfo = employeePersonalHistory;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
           
            return employeePersonalHistoryInfo;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>
        private Int32 UpdateEmployeePersonalHistory(Entities.EmployeePersonalHistory employeePersonalHistory, DbTransaction transaction)
        {
            var employeePersonalHistoryId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdateEmployeePersonalHistory))
                {
                    database.AddInParameter(dbCommand, "@employee_personal_history_id", DbType.Int32, employeePersonalHistory.EmployeePersonalHistoryId);
                    database.AddInParameter(dbCommand, "@employee_id", DbType.Int32, employeePersonalHistory.EmployeeId);
                    database.AddInParameter(dbCommand, "@marital_status", DbType.String, employeePersonalHistory.MaritalStatus);
                    database.AddInParameter(dbCommand, "no_of_sons", DbType.Int32, employeePersonalHistory.NoOfSons);
                    database.AddInParameter(dbCommand, "no_of_daughters", DbType.Int32, employeePersonalHistory.NoOfDaughters);
                    database.AddInParameter(dbCommand, "emp_height", DbType.Decimal, employeePersonalHistory.EmployeeHeight);
                    database.AddInParameter(dbCommand, "height_unit", DbType.String, employeePersonalHistory.HeightUnit);
                    database.AddInParameter(dbCommand, "emp_weight", DbType.Decimal, employeePersonalHistory.EmployeeWeight);
                    database.AddInParameter(dbCommand, "weight_unit", DbType.String, employeePersonalHistory.WeightUnit);
                    database.AddInParameter(dbCommand, "smoking", DbType.Boolean, employeePersonalHistory.IsSmoking);
                    database.AddInParameter(dbCommand, "alcohol", DbType.Boolean, employeePersonalHistory.IsAlcohol);
                    database.AddInParameter(dbCommand, "tobacco", DbType.Boolean, employeePersonalHistory.IsTobacco);
                    database.AddInParameter(dbCommand, "blood_group_id", DbType.Int32, employeePersonalHistory.BloodGroupId);
                    database.AddInParameter(dbCommand, "blood_group_factor_id", DbType.Int32, employeePersonalHistory.BloodGroupFactorId);
                    database.AddInParameter(dbCommand, "diet", DbType.String, employeePersonalHistory.Diet);
                    database.AddInParameter(dbCommand, "allergic_to", DbType.String, employeePersonalHistory.AllergicTo);
                    database.AddInParameter(dbCommand, "other_addictions", DbType.String, employeePersonalHistory.OtherAddictions);
                    database.AddInParameter(dbCommand, "present_illness", DbType.String, employeePersonalHistory.PresentIllness);
                    database.AddInParameter(dbCommand, "treatment", DbType.String, employeePersonalHistory.Treatment);
                    database.AddInParameter(dbCommand, "micturation", DbType.String, employeePersonalHistory.Micturation);
                    database.AddInParameter(dbCommand, "bowels", DbType.String, employeePersonalHistory.Bowels);
                    database.AddInParameter(dbCommand, "sleep", DbType.String, employeePersonalHistory.Sleep);
                    database.AddInParameter(dbCommand, "mc", DbType.String, employeePersonalHistory.MC);
                    database.AddInParameter(dbCommand, "past_history", DbType.String, employeePersonalHistory.PastHistory);
                    database.AddInParameter(dbCommand, "family_history", DbType.String, employeePersonalHistory.FamilyHistory);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, employeePersonalHistory.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, employeePersonalHistory.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    database.ExecuteNonQuery(dbCommand, transaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        employeePersonalHistoryId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            
            return employeePersonalHistoryId;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="employeePersonalHistory"></param>
        /// <returns></returns>
        public Int32 SaveEmployeePersonalHistory(Entities.EmployeePersonalHistory employeePersonalHistory, DbTransaction transaction)
        {
            var employeePersonalHistoryId = 0;

            if (employeePersonalHistory.EmployeePersonalHistoryId == null || employeePersonalHistory.EmployeePersonalHistoryId == 0)
            {
                employeePersonalHistoryId =  AddEmployeePersonalHistory(employeePersonalHistory, transaction);
            }
            else if (employeePersonalHistory.ModifiedBy != null || employeePersonalHistory.ModifiedBy > 0)
            {
                employeePersonalHistoryId = UpdateEmployeePersonalHistory(employeePersonalHistory, transaction);
            }
            else if(employeePersonalHistory.IsDeleted == true)
            {
                var result = DeleteEmployeePersonalHistory(employeePersonalHistory, transaction);

                if (result)
                {
                    employeePersonalHistoryId = (int)employeePersonalHistory.EmployeePersonalHistoryId;
                }
                else
                {
                     employeePersonalHistoryId = 1;
                }
            }

            return employeePersonalHistoryId;
        }


    }
}
