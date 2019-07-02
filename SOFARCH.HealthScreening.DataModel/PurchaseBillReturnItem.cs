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
  public  class PurchaseBillReturnItem
    {
        private readonly Database database;

        public PurchaseBillReturnItem()
        {
            database = DBConnect.getDBConnection();
        }

        private Int32 AddPurchaseBillItemReturn(Entities.PurchaseBillReturnItem purchaseBillReturnItem, DbTransaction dbTransaction)
        {
            var purchaseBillItemReturnId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertPurchaseBillItemReturn))
                {
                    database.AddInParameter(dbCommand, "@purchase_bill_item_return_id", DbType.Int32, purchaseBillReturnItem.PurchaseBillItemReturnId);
                    database.AddInParameter(dbCommand, "@purchase_bill_return_id", DbType.Int32, purchaseBillReturnItem.PurchaseBillReturnId);
                    database.AddInParameter(dbCommand, "@purchase_bill_item_id", DbType.Int32, purchaseBillReturnItem.PurchaseBillItemId);
                    database.AddInParameter(dbCommand, "@drug_id", DbType.Int32, purchaseBillReturnItem.DrugId);
                    database.AddInParameter(dbCommand, "@return_qty", DbType.Decimal, purchaseBillReturnItem.ReturnQty);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, purchaseBillReturnItem.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, purchaseBillReturnItem.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    purchaseBillItemReturnId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        purchaseBillItemReturnId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return purchaseBillItemReturnId;
        }

        private bool DeletePurchaseBillItemReturn(Entities.PurchaseBillReturnItem purchaseBillReturnItem, DbTransaction dbTransaction)
        {
            var isDeleted = true;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeletePurchaseBillItemReturn))
                {
                    database.AddInParameter(dbCommand, "@purchase_bill_item_return_id", DbType.Int32, purchaseBillReturnItem.PurchaseBillItemReturnId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, purchaseBillReturnItem.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, purchaseBillReturnItem.DeletedByIP);

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

        public bool DeletePurchaseBillItemReturnByPurchaseBillReturnId(Int32 purchaseBillReturnId, Int32 deletedBy, string deleteByIP, DbTransaction dbTransaction)
        {
            var isDeleted = true;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeletePurchaseBillItemsReturnByReturnId))
                {
                    database.AddInParameter(dbCommand, "@purchase_bill_return_id", DbType.Int32, purchaseBillReturnId);
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

        public List<Entities.PurchaseBillReturnItem> GetPurchaseBillReturnItemDetailsByPurchaseBillId(Int32 purchaseBillId)
        {
            var purchaseBillItemsReturn = new List<Entities.PurchaseBillReturnItem>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetPurchaseBillItemReturnDetailsByPurchaseBillId))
                {
                    database.AddInParameter(dbCommand, "@purchase_bill_id", DbType.Int32, purchaseBillId);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var purchaseBillItemReturn = new Entities.PurchaseBillReturnItem
                            {
                                PurchaseBillItemReturnId = DRE.GetNullableInt32(reader, "purchase_bill_item_return_id", null),
                                PurchaseBillItemId = DRE.GetNullableInt32(reader, "purchase_bill_item_id", null),
                                PurchaseBillId = DRE.GetNullableInt32(reader, "purchase_bill_id", 0),
                                DrugId = DRE.GetNullableInt32(reader, "drug_id", null),
                                DrugCode = DRE.GetNullableInt32(reader, "drug_code", null),
                                DrugName = DRE.GetNullableString(reader, "drug_name", null),
                                PurchaseQty = DRE.GetNullableDecimal(reader, "purchase_qty", null),
                                ReturnQty = DRE.GetNullableDecimal(reader, "purchase_qty", null)
                            };

                            purchaseBillItemsReturn.Add(purchaseBillItemReturn);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return purchaseBillItemsReturn;
        }

        public List<Entities.PurchaseBillReturnItem> GetPurchaseBillItemReturnDetailsByPurchaseBillReturnId(Int32 purchaseBillReturnId)
        {
            var purchaseBillItemsReturn = new List<Entities.PurchaseBillReturnItem>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetPurchaseBillItemReturnDetailsByReturnId))
                {
                    database.AddInParameter(dbCommand, "@purchase_bill_return_id", DbType.Int32, purchaseBillReturnId);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var purchaseBillItemReturn = new Entities.PurchaseBillReturnItem
                            {
                                PurchaseBillItemReturnId = DRE.GetNullableInt32(reader,"purchase_bill_item_return_id", null),
                                PurchaseBillItemId = DRE.GetNullableInt32(reader, "purchase_bill_item_id", null),
                                PurchaseBillId = DRE.GetNullableInt32(reader, "purchase_bill_id", 0),
                                DrugId = DRE.GetNullableInt32(reader, "drug_id", null),
                                DrugCode = DRE.GetNullableInt32(reader, "drug_code", null),
                                DrugName = DRE.GetNullableString(reader, "drug_name", null),
                                PurchaseQty = DRE.GetNullableDecimal(reader, "free_qty", null),
                                ReturnQty = DRE.GetNullableDecimal(reader, "rate_per_pack_1", null)
                            };

                            purchaseBillItemsReturn.Add(purchaseBillItemReturn);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return purchaseBillItemsReturn;
        }

        private Int32 UpdatePurchaseBillItemReturn(Entities.PurchaseBillReturnItem purchaseBillReturnItem, DbTransaction dbTransaction)
        {
            var purchaseBillReturnItemId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdatePurchaseBillItemReturn))
                {
                    database.AddInParameter(dbCommand, "@purchase_bill_item_return_id", DbType.Int32, purchaseBillReturnItem.PurchaseBillItemReturnId);
                    database.AddInParameter(dbCommand, "@drug_id", DbType.Int32, purchaseBillReturnItem.DrugId);
                    database.AddInParameter(dbCommand, "@return_qty", DbType.Decimal, purchaseBillReturnItem.ReturnQty);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, purchaseBillReturnItem.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, purchaseBillReturnItem.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    purchaseBillReturnItemId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        purchaseBillReturnItemId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return purchaseBillReturnItemId;
        }

        public Int32 SavePurchaseBillItemReturn(Entities.PurchaseBillReturnItem purchaseBillReturnItem, DbTransaction dbTransaction)
        {
            var purchaseBillItemReturnId = 0;

            if (purchaseBillReturnItem.PurchaseBillItemReturnId == null || purchaseBillReturnItem.PurchaseBillItemReturnId == 0)
            {
                purchaseBillItemReturnId = AddPurchaseBillItemReturn(purchaseBillReturnItem, dbTransaction);
            }
            else if (purchaseBillReturnItem.IsDeleted == true)
            {
                var result = DeletePurchaseBillItemReturn(purchaseBillReturnItem, dbTransaction);

                if (result == true)
                {
                    purchaseBillItemReturnId = (int)purchaseBillReturnItem.PurchaseBillItemReturnId;
                }
            }
            else if (purchaseBillReturnItem.ModifiedBy > 0)
            {
                purchaseBillItemReturnId = UpdatePurchaseBillItemReturn(purchaseBillReturnItem, dbTransaction);
            }

            return purchaseBillItemReturnId;
        }


    }
}
