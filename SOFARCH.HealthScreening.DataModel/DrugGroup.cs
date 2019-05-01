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
    public class DrugGroup
    {
        private readonly Database database;

        public DrugGroup()
        {
            database = DBConnect.getDBConnection();
        }

        /// <summary>
        /// Add DrugGroup names
        /// </summary>
        /// <param name="drugGroup"></param>
        /// <returns></returns>
        private Int32 AddDrugGroup(Entities.DrugGroup drugGroup)
        {
            var drugGroupId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertDrugGroup))
                {
                    database.AddInParameter(dbCommand, "@drug_group_id", DbType.Int32, drugGroup.DrugGroupId);
                    database.AddInParameter(dbCommand, "@group_name", DbType.String, drugGroup.GroupName);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, drugGroup.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, drugGroup.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    drugGroupId = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        drugGroupId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return drugGroupId;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="drugGroup"></param>
        /// <returns></returns>
        private bool DeleteDrugGroup(Entities.DrugGroup drugGroup)
        {
            var isDeleted = false;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeleteDrugGroup))
                {
                    database.AddInParameter(dbCommand, "@drug_group_id", DbType.Int32, drugGroup.DrugGroupId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, drugGroup.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, drugGroup.DeletedByIP);

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

            return isDeleted;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="drugGroup"></param>
        /// <returns></returns>
        private Int32 UpdateDrugGroup(Entities.DrugGroup drugGroup)
        {
            var drugGroupId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdateDrugGroup))
                {
                    database.AddInParameter(dbCommand, "@drug_group_id", DbType.Int32, drugGroup.DrugGroupId);
                    database.AddInParameter(dbCommand, "@group_name", DbType.String, drugGroup.GroupName);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, drugGroup.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, drugGroup.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    drugGroupId = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        drugGroupId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return drugGroupId;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<Entities.DrugGroup> GetDrugGroupIdAndGroupName()
        {
            var drugGroups = new List<Entities.DrugGroup>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetDrugGroupIdAndGroupName))
                {
                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var drugGroup = new Entities.DrugGroup
                            {
                                DrugGroupId = DRE.GetNullableInt32(reader, "drug_group_id", 0),
                                GroupName = DRE.GetNullableString(reader, "group_name", null)
                            };

                            drugGroups.Add(drugGroup);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return drugGroups;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="drugGroupId"></param>
        /// <returns></returns>
        public Entities.DrugGroup GetDrugGroupDetailsById(Int32 drugGroupId)
        {
            var drugGroupDetails = new Entities.DrugGroup();

            using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetDetailsOfDrugGroupById))
            {
                database.AddInParameter(dbCommand, "@drug_group_id", DbType.Int32, drugGroupId);

                using (IDataReader reader = database.ExecuteReader(dbCommand))
                {
                    while (reader.Read())
                    {
                        var drugGroup = new Entities.DrugGroup
                        {
                            DrugGroupId = DRE.GetNullableInt32(reader, "drug_group_id", 0),
                            GroupName = DRE.GetNullableString(reader, "group_name", null)                            
                        };

                        drugGroupDetails = drugGroup;
                    }
                }
            }

            return drugGroupDetails;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="drugGroupName"></param>
        /// <returns></returns>
        public Entities.DrugGroup GetDrugGroupDetailsByName(string drugGroupName)
        {
            var drugGroupDetails = new Entities.DrugGroup();
                       
            using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetDetailsOfDrugGroupByName))
            {
                database.AddInParameter(dbCommand, "@DrugGroup_name", DbType.String, drugGroupName);

                using (IDataReader reader = database.ExecuteReader(dbCommand))
                {
                    while (reader.Read())
                    {
                        var drugGruop = new Entities.DrugGroup
                        {
                            DrugGroupId = DRE.GetNullableInt32(reader, "drug_group_id", 0),
                            GroupName = DRE.GetNullableString(reader, "group_name", null)                            
                        };

                        drugGroupDetails = drugGruop;
                    }
                }
            }

            return drugGroupDetails;
        }

        public List<Entities.DrugGroup> SearchAllDrugGroups()
        {
            var drugGroups = new List<Entities.DrugGroup>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.SearchAllDrugGroups))
                {
                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var drugGroup = new Entities.DrugGroup
                            {
                                DrugGroupId = DRE.GetNullableInt32(reader, "drug_group_id", 0),
                                GroupName = DRE.GetNullableString(reader, "group_name", null)
                            };

                            drugGroups.Add(drugGroup);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return drugGroups;
        }

        public List<Entities.DrugGroup> SearchDrugGroupsByGroupName(string groupName)
        {
            var drugGroups = new List<Entities.DrugGroup>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.SearchDrugGroupByName))
                {
                    database.AddInParameter(dbCommand, "@group_name", DbType.String, groupName);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var drugGroup = new Entities.DrugGroup
                            {
                                DrugGroupId = DRE.GetNullableInt32(reader, "drug_group_id", 0),
                                GroupName = DRE.GetNullableString(reader, "group_name", null)
                            };

                            drugGroups.Add(drugGroup);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return drugGroups;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="drugGroup"></param>
        /// <returns></returns>
        public Int32 SaveDrugGroup(Entities.DrugGroup drugGroup)
        {
            var drugGroupId = 0;

            if (drugGroup.DrugGroupId == null || drugGroup.DrugGroupId == 0)
            {
                drugGroupId = AddDrugGroup(drugGroup);

                return drugGroupId;
            }
            else
            {
                if (drugGroup.IsDeleted == true)
                {
                    var result = DeleteDrugGroup(drugGroup);

                    if (result == true)
                    {
                        drugGroupId = 1;
                    }
                }
                else
                {
                    drugGroupId = UpdateDrugGroup(drugGroup);
                }
            }

            return drugGroupId;
            
        }
    }

}
