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
    public class DrugsLinkWithDrugRoute
    {
        private readonly Database database;

        public DrugsLinkWithDrugRoute()
        {
            database = DBConnect.getDBConnection();
        }

        private Int32 AddDrugLinkWithDrugRoute(Entities.DrugLinkWithDrugRoutes drugLinkWithDrugRoute, DbTransaction dbTransaction)
        {
            var drugRouteLinkId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertDrugLinkWithDrugRoute))
                {
                    database.AddInParameter(dbCommand, "@drug_route_link_id", DbType.Int32, drugLinkWithDrugRoute.DrugRouteLinkId);
                    database.AddInParameter(dbCommand, "@drug_id", DbType.Int32, drugLinkWithDrugRoute.DrugId);
                    database.AddInParameter(dbCommand, "@drug_route_id", DbType.Int32, drugLinkWithDrugRoute.DrugRouteId);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, drugLinkWithDrugRoute.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, drugLinkWithDrugRoute.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    drugRouteLinkId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        drugRouteLinkId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            
            return drugRouteLinkId;
        }

        private bool DeleteDrugLinkWithDrugRoute(Entities.DrugLinkWithDrugRoutes drugLinkWithDrugRoute, DbTransaction dbTransaction)
        {
            var IsDeleted = true;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeleteDrugLinkWithDrugRoute))
                {
                    database.AddInParameter(dbCommand, "@drug_route_link_id", DbType.Int32, drugLinkWithDrugRoute.DrugRouteLinkId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, drugLinkWithDrugRoute.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, drugLinkWithDrugRoute.DeletedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    var result = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        IsDeleted = Convert.ToBoolean(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return IsDeleted;
        }

        public List<Entities.DrugLinkWithDrugRoutes> GetDrugLinkByDrugId(Int32? drugId = null)
        {
            var drugsLink = new List<Entities.DrugLinkWithDrugRoutes>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetDrugLinkByDrugId))
                {
                    database.AddInParameter(dbCommand, "@drug_id", DbType.Int32, drugId);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var drugLink = new Entities.DrugLinkWithDrugRoutes
                            {
                                DrugRouteLinkId = DRE.GetNullableInt32(reader, "drug_route_link_id", null),
                                DrugId = DRE.GetNullableInt32(reader, "drug_id", 0),
                                DrugRouteId = DRE.GetNullableInt32(reader, "drug_route_id", null),
                                RouteName = DRE.GetNullableString(reader, "route_name", null)
                            };

                            drugsLink.Add(drugLink);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return drugsLink;
        }
        private Int32 UpdateDrugLinkWithDrugRoute(Entities.DrugLinkWithDrugRoutes drugLinkWithDrugRoute, DbTransaction dbTransaction)
        {
            var drugRouteLinkId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdateDrugLinkWithDrugRoute))
                {
                    database.AddInParameter(dbCommand, "@drug_route_link_id", DbType.Int32, drugLinkWithDrugRoute.DrugRouteLinkId);
                    database.AddInParameter(dbCommand, "@drug_id", DbType.Int32, drugLinkWithDrugRoute.DrugId);
                    database.AddInParameter(dbCommand, "@drug_route_id", DbType.Int32, drugLinkWithDrugRoute.DrugRouteId);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, drugLinkWithDrugRoute.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, drugLinkWithDrugRoute.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    drugRouteLinkId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        drugRouteLinkId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return drugRouteLinkId;
        }

        public bool DeleteDrugRoutesLinkByDrugId(Int32 drugId, Int32 deletedBy, string deletedByIP, DbTransaction dbTransaction)
        {
            var IsDeleted = true;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeleteDrugLinkWithDrugRouteByDrugId))
                {
                    database.AddInParameter(dbCommand, "@drug_id", DbType.Int32, drugId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, deletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, deletedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    var result = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        IsDeleted = Convert.ToBoolean(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return IsDeleted;
        }

        public Int32 SaveDrugLinkWithDrugRoute(Entities.DrugLinkWithDrugRoutes drugLinkWithDrugRoute, DbTransaction dbTransaction)
        {
            var drugRouteLinkId = 0;

            if (drugLinkWithDrugRoute.DrugRouteLinkId == null || drugLinkWithDrugRoute.DrugRouteLinkId == 0)
            {
                drugRouteLinkId = AddDrugLinkWithDrugRoute(drugLinkWithDrugRoute, dbTransaction);
            }
            else if (drugLinkWithDrugRoute.IsDeleted == true)
            {
                var result = DeleteDrugLinkWithDrugRoute(drugLinkWithDrugRoute, dbTransaction);

                if (result == true)
                {
                    drugRouteLinkId = (int)drugLinkWithDrugRoute.DrugRouteLinkId;
                }
            }
            else if (drugLinkWithDrugRoute.ModifiedBy > 0)
            {
                drugRouteLinkId = UpdateDrugLinkWithDrugRoute(drugLinkWithDrugRoute, dbTransaction);
            }

            return drugRouteLinkId;
        }
    }
}
