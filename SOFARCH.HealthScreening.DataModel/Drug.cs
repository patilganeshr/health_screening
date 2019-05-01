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
    public class Drug
    {
        private readonly Database database;

        public Drug()
        {
            database = DBConnect.getDBConnection();
        }

        /// <summary>
        /// Add DrugGroup names
        /// </summary>
        /// <param name="drug"></param>
        /// <returns></returns>
        private Int32 AddDrug(Entities.Drug drug, DbTransaction dbTransaction)
        {
            var drugId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertDrug))
                {
                    database.AddInParameter(dbCommand, "@drug_id", DbType.Int32, drug.DrugId);
                    database.AddInParameter(dbCommand, "@drug_code", DbType.String, drug.DrugCode);
                    database.AddInParameter(dbCommand, "@generic_name", DbType.String, drug.GenericName);
                    database.AddInParameter(dbCommand, "@drug_group_id", DbType.Int32, drug.DrugGroupId);
                    database.AddInParameter(dbCommand, "@brand_id", DbType.Int32, drug.BrandId);
                    database.AddInParameter(dbCommand, "@formulation", DbType.String, drug.Formulation);
                    database.AddInParameter(dbCommand, "@strength", DbType.String, drug.Strength);
                    database.AddInParameter(dbCommand, "@unit", DbType.String, drug.Unit);
                    database.AddInParameter(dbCommand, "@adverse_effects", DbType.String, drug.AdverseEffects);
                    database.AddInParameter(dbCommand, "@precautions", DbType.String, drug.Precautions);
                    database.AddInParameter(dbCommand, "@remarks", DbType.String, drug.Remarks);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, drug.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, drug.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    drugId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        drugId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            
            return drugId;
        }

        private bool DeleteDrug(Entities.Drug drug, DbTransaction dbTransaction)
        {
            var isDeleted = true;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeleteDrug))
                {
                    database.AddInParameter(dbCommand, "@drug_id", DbType.Int32, drug.DrugId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, drug.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, drug.DeletedByIP);

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

        public List<Entities.Drug> GetListOfAllDrugs()
        {
            var drugs = new List<Entities.Drug>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetListOfAllDrugs))
                {
                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var drug = new Entities.Drug
                            {
                                DrugId = DRE.GetNullableInt32(reader, "drug_id", 0),
                                GenericName = DRE.GetNullableString(reader, "generic_name", null)                                
                            };

                            drugs.Add(drug);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return drugs;
        }

        public List<Entities.Drug> SearchDrugsAll()
        {
            var drugs = new List<Entities.Drug>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.SearchDrugsAll))
                {
                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var drugLinkWithDrugRoutes = new DrugsLinkWithDrugRoute();

                            var drug = new Entities.Drug
                            {
                                DrugId = DRE.GetNullableInt32(reader, "drug_id", 0),
                                DrugCode = DRE.GetNullableString(reader, "drug_code", null),
                                GenericName = DRE.GetNullableString(reader, "generic_name", null),
                                DrugGroupId = DRE.GetNullableInt32(reader, "drug_group_id", null),
                                BrandId = DRE.GetNullableInt32(reader, "brand_id", null),
                                Formulation = DRE.GetNullableString(reader, "formulation", null),
                                Strength = DRE.GetNullableString(reader, "strength", null),
                                Unit = DRE.GetNullableString(reader, "unit", null),
                                AdverseEffects = DRE.GetNullableString(reader, "adverse_effects", null),
                                Precautions = DRE.GetNullableString(reader, "precautions", null),
                                Remarks = DRE.GetNullableString(reader, "remarks", null),
                                DrugLinkWithDrugRoutes = drugLinkWithDrugRoutes.GetDrugLinkByDrugId(DRE.GetNullableInt32(reader, "drug_id", 0))
                            };

                            drugs.Add(drug);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        
            return drugs;
        }

        private Int32 UpdateDrug(Entities.Drug drug, DbTransaction dbTransaction)
        {
            var drugId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdateDrug))
                {
                    database.AddInParameter(dbCommand, "@drug_id", DbType.Int32, drug.DrugId);
                    database.AddInParameter(dbCommand, "@drug_code", DbType.String, drug.DrugCode);
                    database.AddInParameter(dbCommand, "@generic_name", DbType.String, drug.GenericName);
                    database.AddInParameter(dbCommand, "@drug_group_id", DbType.Int32, drug.DrugGroupId);
                    database.AddInParameter(dbCommand, "@brand_id", DbType.Int32, drug.BrandId);
                    database.AddInParameter(dbCommand, "@formulation", DbType.String, drug.Formulation);
                    database.AddInParameter(dbCommand, "@strength", DbType.String, drug.Strength);
                    database.AddInParameter(dbCommand, "@unit", DbType.String, drug.Unit);
                    database.AddInParameter(dbCommand, "@adverse_effects", DbType.String, drug.AdverseEffects);
                    database.AddInParameter(dbCommand, "@precautions", DbType.String, drug.Precautions);
                    database.AddInParameter(dbCommand, "@remarks", DbType.String, drug.Remarks);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, drug.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, drug.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    drugId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        drugId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return drugId;
        }


        public Int32 SaveDrug(Entities.Drug drug)
        {
            var drugId = 0;

            var db = DBConnect.getDBConnection();

            using (DbConnection conn = db.CreateConnection())
            {
                conn.Open();

                using (DbTransaction transaction = conn.BeginTransaction())
                {
                    try
                    {
                        var drugRouteLinkId = 0;
                        
                        if (drug != null)
                        {
                            if (drug.DrugId == null || drug.DrugId == 0)
                            {
                                drugId = AddDrug(drug, transaction);
                            }
                            else
                            {
                                if (drug.IsDeleted == true)
                                {
                                    var result = DeleteDrug(drug, transaction);

                                    drugId = Convert.ToInt32(drug.DrugId);
                                }
                                else
                                {
                                    if (drug.ModifiedBy > 0 || drug.ModifiedBy != null)
                                    {
                                        drugId = UpdateDrug(drug, transaction);

                                        // If records failed to save
                                        if (drugId < 0)
                                        {
                                            drugId = -1;
                                        }
                                    }
                                }
                            }

                            if (drugId > 0)
                            {
                                if (drug.IsDeleted == true)
                                {
                                    DrugsLinkWithDrugRoute dal = new DrugsLinkWithDrugRoute();

                                    var result = dal.DeleteDrugRoutesLinkByDrugId(drugId, (int)drug.DeletedBy, drug.DeletedByIP, transaction);

                                    if (result == true)
                                    {
                                        drugId = 1;
                                    }
                                }

                                // Save Drugs Link with Drug Route
                                if (drug.DrugLinkWithDrugRoutes != null)
                                {
                                    if (drug.DrugLinkWithDrugRoutes.Count > 0)
                                    {
                                        foreach (Entities.DrugLinkWithDrugRoutes drugLinkRoute in drug.DrugLinkWithDrugRoutes)
                                        {
                                            drugLinkRoute.DrugId = drugId;

                                            DrugsLinkWithDrugRoute dal = new DrugsLinkWithDrugRoute();

                                            drugRouteLinkId = dal.SaveDrugLinkWithDrugRoute(drugLinkRoute, transaction);

                                            // If records failed to save
                                            if (drugRouteLinkId < 0)
                                            {
                                                drugId = -1;
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (drugId > 0)
                        {
                            transaction.Commit();
                        }
                        else
                        {
                            transaction.Rollback();
                        }
                    }
                    catch (Exception ex)
                    {
                        drugId = -1;
                        transaction.Rollback();
                        throw ex;
                    }
                    finally
                    {
                        db = null;
                    }
                }
            }

            return drugId;
        }


    }
}
