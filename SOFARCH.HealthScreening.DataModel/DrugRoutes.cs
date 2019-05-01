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
    public class DrugRoutes
    {
        private readonly Database database;

        public DrugRoutes()
        {
            database = DBConnect.getDBConnection();
        }

        /// <summary>
        /// Add DrugGroup names
        /// </summary>
        /// <param name="drugRoutes"></param>
        /// <returns></returns>
        private Int32 AddDrugRoute(Entities.DrugRoutes drugRoute)
        {
            var drugRouteId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertDrugRoute))
                {
                    database.AddInParameter(dbCommand, "@drug_route_id", DbType.Int32, drugRoute.DrugRouteId);
                    database.AddInParameter(dbCommand, "@route_name", DbType.String, drugRoute.RouteName);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, drugRoute.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, drugRoute.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    drugRouteId = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        drugRouteId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return drugRouteId;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="drugGroup"></param>
        /// <returns></returns>
        private bool DeleteDrugRoute(Entities.DrugRoutes drugRoute)
        {
            var isDeleted = false;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeleteDrugRoute))
                {
                    database.AddInParameter(dbCommand, "@drug_route_id", DbType.Int32, drugRoute.DrugRouteId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, drugRoute.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, drugRoute.DeletedByIP);

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
        private Int32 UpdateDrugRoute(Entities.DrugRoutes drugRoute)
        {
            var drugRouteId= 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdateDrugRoute))
                {
                    database.AddInParameter(dbCommand, "@drug_route_id", DbType.Int32, drugRoute.DrugRouteId);
                    database.AddInParameter(dbCommand, "@route_name", DbType.String, drugRoute.RouteName);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, drugRoute.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, drugRoute.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    drugRouteId = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        drugRouteId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            
            return drugRouteId;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<Entities.DrugRoutes> GetAllDrugRouteIdAndRouteName()
        {
            var drugRoutes = new List<Entities.DrugRoutes>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetAllDrugRouteIdAndRouteName))
                {
                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var drugRoute = new Entities.DrugRoutes
                            {
                                DrugRouteId = DRE.GetNullableInt32(reader, "drug_route_id", 0),
                                RouteName = DRE.GetNullableString(reader, "route_name", null)
                            };

                            drugRoutes.Add(drugRoute);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            
            return drugRoutes;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="drugRouteId"></param>
        /// <returns></returns>
        public Entities.DrugRoutes GetDrugRouteDetailsById(Int32 drugRouteId)
        {
            var drugRouteDetails = new Entities.DrugRoutes();

            using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetDetailsOfDrugRouteById))
            {
                database.AddInParameter(dbCommand, "@drug_route_id", DbType.Int32, drugRouteId);

                using (IDataReader reader = database.ExecuteReader(dbCommand))
                {
                    while (reader.Read())
                    {
                        var drugRoute = new Entities.DrugRoutes
                        {
                            DrugRouteId = DRE.GetNullableInt32(reader, "drug_route_id", 0),
                            RouteName = DRE.GetNullableString(reader, "route_name", null)                            
                        };

                        drugRouteDetails = drugRoute;
                    }
                }
            }

            return drugRouteDetails;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="drugRouteName"></param>
        /// <returns></returns>
        public Entities.DrugRoutes GetDrugRouteDetailsByName(string drugRouteName)
        {
            var drugRouteDetails = new Entities.DrugRoutes();

            using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetDetailsOfDrugRouteByName))
            {
                database.AddInParameter(dbCommand, "@drug_route_name", DbType.String, drugRouteName);

                using (IDataReader reader = database.ExecuteReader(dbCommand))
                {
                    while (reader.Read())
                    {
                        var drugRoute = new Entities.DrugRoutes
                        {
                            DrugRouteId = DRE.GetNullableInt32(reader, "drug_route_id", 0),
                            RouteName = DRE.GetNullableString(reader, "route_name", null)                            
                        };

                        drugRouteDetails = drugRoute;
                    }
                }
            }

            return drugRouteDetails;
        }

        public List<Entities.DrugRoutes> SearchAllDrugRoutes()
        {
            var drugRoutes = new List<Entities.DrugRoutes>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.SearchDrugRouteAll))
                {
                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var drugRoute = new Entities.DrugRoutes
                            {
                                DrugRouteId = DRE.GetNullableInt32(reader, "drug_route_id", 0),
                                RouteName = DRE.GetNullableString(reader, "route_name", null)
                            };

                            drugRoutes.Add(drugRoute);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            
            return drugRoutes;
        }

        public List<Entities.DrugRoutes> SearchDrugRoutesByRouteName(string routeName)
        {
            var drugRoutes = new List<Entities.DrugRoutes>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetAllDrugRouteIdAndRouteName))
                {
                    database.AddInParameter(dbCommand, "@route_name", DbType.String, routeName);
                    
                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var drugRoute = new Entities.DrugRoutes
                            {
                                DrugRouteId = DRE.GetNullableInt32(reader, "drug_route_id", 0),
                                RouteName = DRE.GetNullableString(reader, "route_name", null)
                            };

                            drugRoutes.Add(drugRoute);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            
            return drugRoutes;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="drugRoute"></param>
        /// <returns></returns>
        public Int32 SaveDrugRoute(Entities.DrugRoutes drugRoute)
        {
            var drugRouteId= 0;

            if (drugRoute.DrugRouteId == null || drugRoute.DrugRouteId == 0)
            {
                drugRouteId = AddDrugRoute(drugRoute);

                return drugRouteId;
            }
            else
            {
                if (drugRoute.IsDeleted == true)
                {
                    var result = DeleteDrugRoute(drugRoute);

                    if (result == true)
                    {
                        drugRouteId = 1;
                    }
                }
                else
                {
                    drugRouteId = UpdateDrugRoute(drugRoute);
                }
            }

            return drugRouteId;
            
        }
    }
}
