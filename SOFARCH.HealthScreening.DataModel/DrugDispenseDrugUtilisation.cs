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
    public class DrugDispenseDrugUtilisation
    {
        private readonly Database database;

        public DrugDispenseDrugUtilisation()
        {
            database = DBConnect.getDBConnection();
        }

        private Int32 AddDrugDispenseDrugUtilisationDetails(Entities.DrugDispenseDrugUtilisation drugDispenseDrugUtilisation, DbTransaction dbTransaction)
        {
            var drugDispenseDrugUtilisationId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertDrugDispenseDrugUtilisation))
                {
                    database.AddInParameter(dbCommand, "@drug_utilisation_id", DbType.Int32, drugDispenseDrugUtilisation.DrugUtilisationId);
                    database.AddInParameter(dbCommand, "@drug_dispense_id", DbType.Int32, drugDispenseDrugUtilisation.DrugDispenseId);
                    database.AddInParameter(dbCommand, "@drug_id", DbType.Int32, drugDispenseDrugUtilisation.DrugId);
                    database.AddInParameter(dbCommand, "@dispense_qty", DbType.Decimal, drugDispenseDrugUtilisation.DispenseQty);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, drugDispenseDrugUtilisation.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, drugDispenseDrugUtilisation.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    drugDispenseDrugUtilisationId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        drugDispenseDrugUtilisationId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return drugDispenseDrugUtilisationId;
        }

        private bool DeleteDrugDispenseDrugUtilisationDetails(Entities.DrugDispenseDrugUtilisation drugDispenseDrugUtilisation, DbTransaction dbTransaction)
        {
            bool IsDrugUtilisationDeleted = false;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeleteDrugDispenseDrugUtilisation))
                {
                    database.AddInParameter(dbCommand, "@drug_utilisation_id", DbType.Int32, drugDispenseDrugUtilisation.DrugUtilisationId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, drugDispenseDrugUtilisation.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, drugDispenseDrugUtilisation.DeletedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    var result = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        IsDrugUtilisationDeleted = Convert.ToBoolean(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return IsDrugUtilisationDeleted;
        }

        public bool DeleteDrugDispenseDrugUtilisationDetailsByDrugDispenseId(Int32 drugDispenseId, Int32 deletedBy, string deletedByIP, DbTransaction dbTransaction)
        {
            var isDeleted = false;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeleteDrugDispenseDrugUtilisationByDrugDispenseId))
                {
                    database.AddInParameter(dbCommand, "@drug_dispense_id", DbType.Int32, drugDispenseId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, deletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, deletedByIP);

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

        private Int32 UpdateDrugDispenseDrugUtilisationDetails(Entities.DrugDispenseDrugUtilisation drugDispenseDrugUtilisation, DbTransaction dbTransaction)
        {
            var drugDispenseDrugUtilisationId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdateDrugDispenseDrugUtilisation))
                {
                    database.AddInParameter(dbCommand, "@drug_utilisation_id", DbType.Int32, drugDispenseDrugUtilisation.DrugUtilisationId);
                    database.AddInParameter(dbCommand, "@drug_dispense_id", DbType.Int32, drugDispenseDrugUtilisation.DrugDispenseId);
                    database.AddInParameter(dbCommand, "@drug_id", DbType.Int32, drugDispenseDrugUtilisation.DrugId);
                    database.AddInParameter(dbCommand, "@dispense_qty", DbType.Decimal, drugDispenseDrugUtilisation.DispenseQty);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, drugDispenseDrugUtilisation.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, drugDispenseDrugUtilisation.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    drugDispenseDrugUtilisationId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        drugDispenseDrugUtilisationId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return drugDispenseDrugUtilisationId;
        }

        public Entities.DrugDispenseDrugUtilisation GetDrugDetailsByDrugId(Int32 drugId)
        {
            var drugDetails = new Entities.DrugDispenseDrugUtilisation();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetDrugDetailsByDrugId))
                {
                    database.AddInParameter(dbCommand, "@drug_id", DbType.Int32, drugId);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var drugUtilisation = new Entities.DrugDispenseDrugUtilisation()
                            {
                                DrugUtilisationId = DRE.GetNullableInt32(reader, "drug_utilisation_id", null),
                                DrugDispenseId = DRE.GetNullableInt32(reader, "drug_dispense_id", null),
                                DrugId = DRE.GetNullableInt32(reader, "drug_id", null),
                                DrugCode = DRE.GetNullableInt32(reader, "drug_code", null),
                                DrugName = DRE.GetNullableString(reader, "drug_name", null),
                                DispenseQty = DRE.GetNullableDecimal(reader, "dispense_qty", null),
                                BalanceQty = DRE.GetNullableDecimal(reader, "balance_qty", null),
                                PurchaseRate = DRE.GetNullableDecimal(reader, "purchase_rate", null),
                                Amount = DRE.GetNullableDecimal(reader, "amount", null)
                            };

                            drugDetails = drugUtilisation;
                        }
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return drugDetails;
        }

        public List<Entities.DrugDispenseDrugUtilisation> GetDrugUtilisationByDrugDispenseId(Int32 drugDispenseId)
        {
            var drugDispenseDrugUtilisations = new List<Entities.DrugDispenseDrugUtilisation>() ;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetDrugDispenseDrugUtilisationDetailsByDrugDispenseId))
                {
                    database.AddInParameter(dbCommand, "@drug_dispense_id", DbType.Int32, drugDispenseId);

                    using(IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var drugUtilisation = new Entities.DrugDispenseDrugUtilisation()
                            {
                                DrugUtilisationId = DRE.GetNullableInt32(reader, "drug_utilisation_id", null),
                                DrugDispenseId = DRE.GetNullableInt32(reader, "drug_dispense_id", null),
                                DrugId  = DRE.GetNullableInt32(reader, "drug_id", null),
                                DrugCode = DRE.GetNullableInt32(reader, "drug_code", null),
                                DrugName = DRE.GetNullableString(reader, "drug_name", null),
                                DispenseQty = DRE.GetNullableDecimal(reader, "dispense_qty", null),
                                BalanceQty = DRE.GetNullableDecimal(reader, "balance_qty", null),
                                PurchaseRate = DRE.GetNullableDecimal(reader, "purchase_rate", null),
                                Amount = DRE.GetNullableDecimal(reader, "amount", null)
                            };

                            drugDispenseDrugUtilisations.Add(drugUtilisation);
                        }
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return drugDispenseDrugUtilisations;
        }

        public Int32 SaveDrugDispenseDrugUtilisation(Entities.DrugDispenseDrugUtilisation drugDispenseDrugUtilisation, DbTransaction dbTransaction)
        {
            var drugUtilisationId = 0;

            if (drugDispenseDrugUtilisation.DrugUtilisationId == null || drugDispenseDrugUtilisation.DrugUtilisationId == 0)
            {
                drugUtilisationId = AddDrugDispenseDrugUtilisationDetails(drugDispenseDrugUtilisation, dbTransaction);
            }
            else if (drugDispenseDrugUtilisation.ModifiedBy != null || drugDispenseDrugUtilisation.ModifiedBy > 0)
            {
                drugUtilisationId = UpdateDrugDispenseDrugUtilisationDetails(drugDispenseDrugUtilisation, dbTransaction);
            }
            else if (drugDispenseDrugUtilisation.IsDeleted == true)
            {
                var result = DeleteDrugDispenseDrugUtilisationDetails(drugDispenseDrugUtilisation, dbTransaction);

                if (result)
                {
                    drugUtilisationId = (int)drugDispenseDrugUtilisation.DrugUtilisationId;
                }
            }

            return drugUtilisationId;
        }


    }
}
