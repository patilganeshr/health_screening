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
using System.Security.Cryptography;

namespace SOFARCH.HealthScreening.DataModel
{
    public class PurchaseBill
    {
        private readonly Database database;

        public PurchaseBill()
        {
            database = DBConnect.getDBConnection();
        }

        private Int32 AddPurchaseBill(Entities.PurchaseBill purchaseBill, DbTransaction dbTransaction)
        {
            var purchaseBillId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertPurchaseBill))
                {
                    database.AddInParameter(dbCommand, "@purchase_bill_id", DbType.Int32, purchaseBill.PurchaseBillId);
                    database.AddInParameter(dbCommand, "@purchase_bill_no", DbType.String, purchaseBill.PurchaseBillNo);
                    database.AddInParameter(dbCommand, "@purchase_bill_date", DbType.String, purchaseBill.PurchaseBillDate);
                    database.AddInParameter(dbCommand, "@vendor_id", DbType.Int32, purchaseBill.VendorId);
                    database.AddInParameter(dbCommand, "@purchase_bill_amount", DbType.Decimal, purchaseBill.PurchaseBillAmount);
                    database.AddInParameter(dbCommand, "@remarks", DbType.String, purchaseBill.Remarks);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, purchaseBill.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, purchaseBill.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    purchaseBillId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        purchaseBillId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            
            return purchaseBillId;
        }

        private bool DeletePurchaseBill(Entities.PurchaseBill purchaseBill, DbTransaction dbTransaction)
        {
            var isDeleted = true;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeletePurchaseBill))
                {
                    database.AddInParameter(dbCommand, "@purchase_bill_id", DbType.Int32, purchaseBill.PurchaseBillId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, purchaseBill.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, purchaseBill.DeletedByIP);

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

        public bool CheckPurchaseBillNoIsExists(Int32 vendorId, string purchaseBillNo)
        {
            var IsPurchaseBillNoExists = false;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.CheckPurchaseBillNoExists))
                {
                    database.AddInParameter(dbCommand, "@vendor_id", DbType.Int32, vendorId);
                    database.AddInParameter(dbCommand, "@purchase_bill_no", DbType.String, purchaseBillNo);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            IsPurchaseBillNoExists = reader.GetBoolean(reader.GetOrdinal("is_purchase_bill_no_exists"));
                        }
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return IsPurchaseBillNoExists;
        }

        public List<Entities.PurchaseBill> GetPurchaseBillIdAndPurcharseBillNo()
        {
            var purchaseBills = new List<Entities.PurchaseBill>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetPurchaseBillIdAndPurchaeBillNo))
                {
                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var purchaseBill = new Entities.PurchaseBill
                            {
                                PurchaseBillId = DRE.GetNullableInt32(reader, "purchase_bill_id", 0),
                                PurchaseBillNo = DRE.GetNullableString(reader, "purchase_bill_no", null)                                
                            };

                            purchaseBills.Add(purchaseBill);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return purchaseBills;
        }

        public List<Entities.PurchaseBill> SearchPurchaseBillsAll()
        {
            var purchaseBills = new List<Entities.PurchaseBill>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.SearchAllPurchaseBills))
                {
                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        purchaseBills = GetPurchaseBills(reader);
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        
            return purchaseBills;
        }

        public List<Entities.PurchaseBill> SearchPurchaseBillsByPurchaseBillNo(string purchaseBillNo)
        {
            var purchaseBills = new List<Entities.PurchaseBill>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.SearchPurchaseBillsByPurchaseBillNo))
                {
                    database.AddInParameter(dbCommand, "@purchase_bill_no", DbType.String, purchaseBillNo);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        purchaseBills = GetPurchaseBills(reader);   
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return purchaseBills;
        }

        private List<Entities.PurchaseBill> GetPurchaseBills(IDataReader reader)
        {
            var purchaseBills = new List<Entities.PurchaseBill>();

            while (reader.Read())
            {
                var purchaseBillItem = new PurchaseBillItem();

                var purchaseBill = new Entities.PurchaseBill
                {
                    PurchaseBillId = DRE.GetNullableInt32(reader, "purchase_bill_id", 0),
                    PurchaseBillNo = DRE.GetNullableString(reader, "purchase_bill_no", null),
                    PurchaseBillDate = DRE.GetNullableString(reader, "purchase_bill_date", null),
                    VendorId = DRE.GetNullableInt32(reader, "vendor_id", null),
                    VendorName = DRE.GetNullableString(reader, "vendor_name", null),
                    PurchaseBillAmount = DRE.GetNullableDecimal(reader, "purchase_bill_amount", 0),
                    AdjustedAmount = DRE.GetNullableDecimal(reader, "adjusted_amount", 0),
                    TotalBillQty = DRE.GetNullableDecimal(reader, "total_bill_qty", 0),
                    TotalBillAmount = DRE.GetNullableDecimal(reader, "total_bill_amount", 0),
                    Remarks = DRE.GetNullableString(reader, "remarks", null),
                    PurchaseBillItems = purchaseBillItem.GetPurchaseBillItemDetailsByPurchaseBillId(DRE.GetInt32(reader, "purchase_bill_id"))
                };

                purchaseBills.Add(purchaseBill);
            }

            return purchaseBills;
        }

        private Int32 UpdatePurchaseBill(Entities.PurchaseBill purchaseBill, DbTransaction dbTransaction)
        {
            var purchaseBillId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdatePurchaseBill))
                {
                    database.AddInParameter(dbCommand, "@purchase_bill_id", DbType.Int32, purchaseBill.PurchaseBillId);
                    database.AddInParameter(dbCommand, "@purchase_bill_no", DbType.String, purchaseBill.PurchaseBillNo);
                    database.AddInParameter(dbCommand, "@purchase_bill_date", DbType.String, purchaseBill.PurchaseBillDate);
                    database.AddInParameter(dbCommand, "@vendor_id", DbType.Int32, purchaseBill.VendorId);
                    database.AddInParameter(dbCommand, "@purchase_bill_amount", DbType.Decimal, purchaseBill.PurchaseBillAmount);
                    database.AddInParameter(dbCommand, "@remarks", DbType.String, purchaseBill.Remarks);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, purchaseBill.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, purchaseBill.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    purchaseBillId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        purchaseBillId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return purchaseBillId;
        }
        
        public Int32 SavePurchaseBill(Entities.PurchaseBill purchaseBill)
        {
            var purchaseBillId = 0;

            var db = DBConnect.getDBConnection();

            using (DbConnection conn = db.CreateConnection())
            {
                conn.Open();

                using (DbTransaction transaction = conn.BeginTransaction())
                {
                    try
                    {
                        var purchaseBillItemId = 0;
                        var purchaseBillChargeId = 0;
                        
                        if (purchaseBill != null)
                        {
                            if (purchaseBill.PurchaseBillId == null || purchaseBill.PurchaseBillId == 0)
                            {
                                purchaseBillId = AddPurchaseBill(purchaseBill, transaction);
                            }
                            else
                            {
                                if (purchaseBill.IsDeleted == true)
                                {
                                    var result = DeletePurchaseBill(purchaseBill, transaction);

                                    purchaseBillId = Convert.ToInt32(purchaseBill.PurchaseBillId);
                                }
                                else
                                {
                                    if (purchaseBill.ModifiedBy > 0 || purchaseBill.ModifiedBy != null)
                                    {
                                        purchaseBillId = UpdatePurchaseBill(purchaseBill, transaction);

                                        // If records failed to save
                                        if (purchaseBillId < 0)
                                        {
                                            purchaseBillId = -1;
                                        }
                                    }
                                }
                            }

                            if (purchaseBillId > 0)
                            {
                                if (purchaseBill.IsDeleted == true)
                                {
                                    PurchaseBillItem dal = new PurchaseBillItem();

                                    var result = dal.DeletePurchaseBillItemByPurchaseBillId(purchaseBillId, (int)purchaseBill.DeletedBy, purchaseBill.DeletedByIP, transaction);

                                    if (result)
                                    {
                                        purchaseBillId = 1;
                                    }
                                }

                                // Save Purchase Bill Items
                                if (purchaseBill.PurchaseBillItems != null)
                                {
                                    if (purchaseBill.PurchaseBillItems.Count > 0)
                                    {
                                        foreach (Entities.PurchaseBillItem purchaseBillItem in purchaseBill.PurchaseBillItems)
                                        {
                                            purchaseBillItem.PurchaseBillId = purchaseBillId;

                                            PurchaseBillItem dal = new PurchaseBillItem();

                                            purchaseBillItemId = dal.SavePurchaseBillItem(purchaseBillItem, transaction);

                                            // If records failed to save
                                            if (purchaseBillItemId < 0)
                                            {
                                                purchaseBillId = -1;
                                            }
                                        }
                                    }
                                }

                                if (purchaseBill.IsDeleted == true)
                                {
                                    PurchaseBillCharges dal = new PurchaseBillCharges();

                                    var result = dal.DeletePurchaseBillChargeByPurchaseBillId(purchaseBillId, (int)purchaseBill.DeletedBy, purchaseBill.DeletedByIP, transaction);

                                    if (result == true)
                                    {
                                        purchaseBillId = (int)purchaseBill.PurchaseBillId;
                                    }
                                }

                                // Save Purchase Bill Charges
                                if (purchaseBill.PurchaseBillCharges != null)
                                {
                                    if (purchaseBill.PurchaseBillCharges.Count > 0)
                                    {
                                        foreach (Entities.PurchaseBillCharge purchaseBillCharge in purchaseBill.PurchaseBillCharges)
                                        {
                                            purchaseBillCharge.PurchaseBillId = purchaseBillId;

                                            PurchaseBillCharges dal = new PurchaseBillCharges();

                                            purchaseBillChargeId = dal.SavePurchaseBillCharge(purchaseBillCharge, transaction);

                                            // If records failed to save
                                            if (purchaseBillChargeId < 0)
                                            {
                                                purchaseBillId = -1;
                                            }
                                        }
                                    }
                                }

                            }
                        }

                        if (purchaseBillId > 0)
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
                        purchaseBillId = -1;
                        transaction.Rollback();
                        throw ex;
                    }
                    finally
                    {
                        db = null;
                    }
                }
            }

            return purchaseBillId;
        }


    }
}
