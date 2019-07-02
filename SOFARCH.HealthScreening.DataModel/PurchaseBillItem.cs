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
    public class PurchaseBillItem
    {
        private readonly Database database;

        public PurchaseBillItem()
        {
            database = DBConnect.getDBConnection();
        }

        private Int32 AddPurchaseBillItem(Entities.PurchaseBillItem purchaseBillItem, DbTransaction dbTransaction)
        {
            var purchaseBillItemId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertPurchaseBillItem))
                {
                    database.AddInParameter(dbCommand, "@purchase_bill_item_id", DbType.Int32, purchaseBillItem.PurchaseBillItemId);
                    database.AddInParameter(dbCommand, "@purchase_bill_id", DbType.Int32, purchaseBillItem.PurchaseBillId);
                    database.AddInParameter(dbCommand, "@drug_id", DbType.Int32, purchaseBillItem.DrugId);
                    database.AddInParameter(dbCommand, "@batch_no", DbType.String, purchaseBillItem.BatchNo);
                    database.AddInParameter(dbCommand, "@pack_1", DbType.Decimal, purchaseBillItem.Pack1);
                    database.AddInParameter(dbCommand, "@pack_2", DbType.Decimal, purchaseBillItem.Pack2);
                    database.AddInParameter(dbCommand, "@free_qty", DbType.Decimal, purchaseBillItem.FreeQty);
                    database.AddInParameter(dbCommand, "@rate_per_pack_1", DbType.Decimal, purchaseBillItem.RatePerPack1);
                    database.AddInParameter(dbCommand, "@expiry_date", DbType.String, purchaseBillItem.ExpiryDate);
                    database.AddInParameter(dbCommand, "@tax_percent", DbType.Decimal, purchaseBillItem.TaxPercent);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, purchaseBillItem.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, purchaseBillItem.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    purchaseBillItemId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        purchaseBillItemId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return purchaseBillItemId;
        }

        private bool DeletePurchaseBillItem(Entities.PurchaseBillItem purchaseBillItem, DbTransaction dbTransaction)
        {
            var isDeleted = true;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeletePurchaseBillItem))
                {
                    database.AddInParameter(dbCommand, "@purchase_bill_item_id", DbType.Int32, purchaseBillItem.PurchaseBillItemId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, purchaseBillItem.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, purchaseBillItem.DeletedByIP);

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

        public bool DeletePurchaseBillItemByPurchaseBillId(Int32 purchaseBillId, Int32 deletedBy, string deleteByIP, DbTransaction dbTransaction)
        {
            var isDeleted = true;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeletePurchaseBillItemsByPurchaseBillId))
                {
                    database.AddInParameter(dbCommand, "@purchase_bill_id", DbType.Int32, purchaseBillId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, deletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, deleteByIP);

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

        public List<Entities.PurchaseBillItem> GetPurchaseBillItemDetailsByPurchaseBillId(Int32 purchaseBillId)
        {
            var purchaseBillItems = new List<Entities.PurchaseBillItem>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetPurchaseBillItemDetailsByPurchaseBillId))
                {
                    database.AddInParameter(dbCommand, "@purchase_bill_id", DbType.Int32, purchaseBillId);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var purchaseBillItem = new Entities.PurchaseBillItem
                            {
                                PurchaseBillItemId = DRE.GetNullableInt32(reader, "purchase_bill_item_id", null),
                                PurchaseBillId = DRE.GetNullableInt32(reader, "purchase_bill_id", 0),
                                DrugId = DRE.GetNullableInt32(reader, "drug_id", null),
                                DrugCode = DRE.GetNullableInt32(reader, "drug_code", null),
                                DrugName = DRE.GetNullableString(reader, "drug_name", null),
                                GenericName = DRE.GetNullableString(reader, "generic_name", null ),
                                BatchNo = DRE.GetNullableString(reader, "batch_no", null),
                                Pack1 = DRE.GetNullableDecimal(reader, "pack_1", null),
                                Pack2 = DRE.GetNullableDecimal(reader, "pack_2", null),
                                FreeQty = DRE.GetNullableDecimal(reader, "free_qty", null),
                                RatePerPack1 = DRE.GetNullableDecimal(reader, "rate_per_pack_1", null),
                                ExpiryDate = DRE.GetNullableString(reader, "expiry_date", null),
                                TaxPercent = DRE.GetNullableDecimal(reader, "tax_percent", null),
                                TaxAmount = DRE.GetNullableDecimal(reader, "tax_amount", null),
                                ItemAmount = DRE.GetNullableDecimal(reader, "item_amount", null)
                            };

                            purchaseBillItems.Add(purchaseBillItem);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return purchaseBillItems;
        }

        private Int32 UpdatePurchaseBillItem(Entities.PurchaseBillItem purchaseBillItem, DbTransaction dbTransaction)
        {
            var purchaseBillItemId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdatePurchaseBillItem))
                {
                    database.AddInParameter(dbCommand, "@purchase_bill_item_id", DbType.Int32, purchaseBillItem.PurchaseBillItemId);
                    database.AddInParameter(dbCommand, "@purchase_bill_id", DbType.Int32, purchaseBillItem.PurchaseBillId);
                    database.AddInParameter(dbCommand, "@drug_id", DbType.Int32, purchaseBillItem.DrugId);
                    database.AddInParameter(dbCommand, "@batch_no", DbType.String, purchaseBillItem.BatchNo);
                    database.AddInParameter(dbCommand, "@pack_1", DbType.Decimal, purchaseBillItem.Pack1);
                    database.AddInParameter(dbCommand, "@pack_2", DbType.Decimal, purchaseBillItem.Pack2);
                    database.AddInParameter(dbCommand, "@free_qty", DbType.Decimal, purchaseBillItem.FreeQty);
                    database.AddInParameter(dbCommand, "@rate_per_pack_1", DbType.Decimal, purchaseBillItem.RatePerPack1);
                    database.AddInParameter(dbCommand, "@expiry_date", DbType.String, purchaseBillItem.ExpiryDate);
                    database.AddInParameter(dbCommand, "@tax_percent", DbType.Decimal, purchaseBillItem.TaxPercent);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, purchaseBillItem.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, purchaseBillItem.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    purchaseBillItemId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        purchaseBillItemId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return purchaseBillItemId;
        }

        public Int32 SavePurchaseBillItem(Entities.PurchaseBillItem purchaseBillItem, DbTransaction dbTransaction)
        {
            var purchaseBillItemId = 0;

            if (purchaseBillItem.PurchaseBillItemId == null || purchaseBillItem.PurchaseBillItemId == 0)
            {
                purchaseBillItemId = AddPurchaseBillItem(purchaseBillItem, dbTransaction);
            }
            else if (purchaseBillItem.IsDeleted == true)
            {
                var result = DeletePurchaseBillItem(purchaseBillItem, dbTransaction);

                if (result == true)
                {
                    purchaseBillItemId = (int)purchaseBillItem.PurchaseBillItemId;
                }
            }
            else if (purchaseBillItem.ModifiedBy > 0)
            {
                purchaseBillItemId= UpdatePurchaseBillItem(purchaseBillItem, dbTransaction);
            }

            return purchaseBillItemId;
        }

    }
}
