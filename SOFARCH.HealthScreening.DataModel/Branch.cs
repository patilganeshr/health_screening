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
    public class Branch
    {
        private readonly Database database;

        public Branch()
        {
            database = DBConnect.getDBConnection();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<Entities.Branch> GetAllBranchNames()
        {
            var branches = new List<Entities.Branch>();

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetListOfAllBranches))
                {
                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var branch = new Entities.Branch
                            {
                                BranchId = DRE.GetNullableInt32(reader, "branch_id", 0),
                                BranchName = DRE.GetNullableString(reader, "branch_name", null),
                                guid = DRE.GetNullableGuid(reader, "row_guid", null),
                                SrNo = DRE.GetNullableInt64(reader, "sr_no", null)
                            };

                            branches.Add(branch);
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

            return branches;
        }

        public List<Entities.Branch> GetAllBranchNamesByCompany(Int32 companyId)
        {
            var branches = new List<Entities.Branch>();

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetListOfAllBranchesByCompany))
                {
                    database.AddInParameter(dbCommand, "@company_id", DbType.Int32, companyId);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var branch = new Entities.Branch
                            {
                                BranchId = DRE.GetNullableInt32(reader, "branch_id", 0),
                                BranchName = DRE.GetNullableString(reader, "branch_name", null)
                            };

                            branches.Add(branch);
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

            return branches;
        }
    }
}
