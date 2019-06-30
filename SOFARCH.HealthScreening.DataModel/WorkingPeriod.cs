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
    public class WorkingPeriod
    {
        private readonly Database database;

        public WorkingPeriod()
        {
            database = DBConnect.getDBConnection();
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="workingPeriod"></param>
        /// <returns></returns>
        private Int32 AddWorkingPeriod(Entities.WorkingPeriod workingPeriod)
        {
            var workingPeriodId = 0;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertWorkingPeriod))
                {
                    database.AddInParameter(dbCommand, "@working_period_id", DbType.Int32, workingPeriod.WorkingPeriodId);
                    database.AddInParameter(dbCommand, "@start_date", DbType.String, workingPeriod.StartDate);
                    database.AddInParameter(dbCommand, "@end_date", DbType.String, workingPeriod.EndDate);
                    database.AddInParameter(dbCommand, "@financial_year", DbType.String, workingPeriod.FinancialYear);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, workingPeriod.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, workingPeriod.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    workingPeriodId = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        workingPeriodId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                dbCommand = null;
            }

            return workingPeriodId;
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="workingPeriod"></param>
        /// <returns></returns>
        public bool DeleteWorkingPeriod(Entities.WorkingPeriod workingPeriod)
        {
            bool isDeleted = false;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeleteWorkingPeriod))
                {
                    database.AddInParameter(dbCommand, "@working_period_id", DbType.Int32, workingPeriod.WorkingPeriodId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, workingPeriod.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, workingPeriod.DeletedByIP);

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
            finally
            {
                dbCommand = null;
            }

            return isDeleted;
        }

        /// <summary>
        ///
        /// </summary>
        /// <returns></returns>
        public List<Entities.WorkingPeriod> GetAllWorkingPeriods()
        {
            var workingPeriods = new List<Entities.WorkingPeriod>();

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetAllWorkingPeriods))
                {
                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var workingPeriod = new Entities.WorkingPeriod
                            {
                                WorkingPeriodId = DRE.GetNullableInt32(reader, "working_period_id", 0),
                                StartDate = DRE.GetNullableString(reader, "start_date", null),
                                EndDate = DRE.GetNullableString(reader, "end_date", null),
                                FinancialYear = DRE.GetNullableString(reader, "financial_year", null),
                                SrNo = DRE.GetNullableInt64(reader, "sr_no", null)
                            };

                            workingPeriods.Add(workingPeriod);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                dbCommand = null;
            }

            return workingPeriods;
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="workingPeriodId"></param>
        /// <returns></returns>
        public string GetFinancialYearById(Int32 workingPeriodId)
        {
            var financialYear = string.Empty;

            DbCommand dbCommand = null;

            using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetListOfFinancialYearsById))
            {
                database.AddInParameter(dbCommand, "@working_period_id", DbType.Int32, workingPeriodId);

                using (IDataReader reader = database.ExecuteReader(dbCommand))
                {
                    while (reader.Read())
                    {
                        financialYear = DRE.GetNullableString(reader, "financial_year", null);
                    }
                }
            }

            return financialYear;
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="workingPeriod"></param>
        /// <returns></returns>
        private Int32 UpdateWorkingPeriod(Entities.WorkingPeriod workingPeriod)
        {
            var workingPeriodId = 0;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdateWorkingPeriod))
                {
                    database.AddInParameter(dbCommand, "@working_period_id", DbType.Int32, workingPeriod.WorkingPeriodId);
                    database.AddInParameter(dbCommand, "@start_date", DbType.String, workingPeriod.StartDate);
                    database.AddInParameter(dbCommand, "@end_date", DbType.String, workingPeriod.EndDate);
                    database.AddInParameter(dbCommand, "@financial_year", DbType.String, workingPeriod.FinancialYear);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, workingPeriod.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, workingPeriod.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    workingPeriodId = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        workingPeriodId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                dbCommand = null;
            }

            return workingPeriodId;
        }

        public Int32 SaveWorkingPeriod(Entities.WorkingPeriod workingPeriod)
        {
            var workingPeriodId = 0;

            if (workingPeriod.WorkingPeriodId == null || workingPeriod.WorkingPeriodId == 0)
            {
                workingPeriodId = AddWorkingPeriod(workingPeriod);
            }
            else if (workingPeriod.ModifiedBy > 0)
            {
                workingPeriodId = UpdateWorkingPeriod(workingPeriod);
            }
            else if (workingPeriod.IsDeleted == true )
            {
                var result = DeleteWorkingPeriod(workingPeriod);
            }

            return workingPeriodId;
        }
    }
}
