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
    public class PurchaseBillReturn
    {
        private readonly Database database;

        public PurchaseBillReturn()
        {
            database = DBConnect.getDBConnection();
        }

        private Int32 AddPurchaseBillReturn(Entities.PurchaseBillReturn purchaseBillReturn, DbTransaction dbTransaction)
        {
            var purchaseBillReturnId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertPurchaseBillReturn))
                {
                    database.AddInParameter(dbCommand, "@purchase_bill_return_id", DbType.Int32, purchaseBillReturn.PurchaseBillReturnId);
                    database.AddInParameter(dbCommand, "@purchase_bill_id", DbType.String, purchaseBillReturn.PurchaseBillId);
                    database.AddInParameter(dbCommand, "@purchase_bill_return_date", DbType.String, purchaseBillReturn.PurchaseBillReturnDate);
                    database.AddInParameter(dbCommand, "@remarks", DbType.String, purchaseBillReturn.Remarks);
                    database.AddInParameter(dbCommand, "@working_period_id", DbType.Int32, purchaseBillReturn.WorkingPeriodId);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, purchaseBillReturn.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, purchaseBillReturn.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    purchaseBillReturnId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        purchaseBillReturnId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return purchaseBillReturnId;
        }

        private bool DeletePurchaseBillReturn(Entities.PurchaseBillReturn purchaseBillReturn, DbTransaction dbTransaction)
        {
            var isDeleted = true;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeletePurchaseBillReturn))
                {
                    database.AddInParameter(dbCommand, "@purchase_bill_return_id", DbType.Int32, purchaseBillReturn.PurchaseBillReturnId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, purchaseBillReturn.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, purchaseBillReturn.DeletedByIP);

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
        public List<Entities.PurchaseBillReturn> GetPurchaseBillNos()
        {
            var purchaseBills = new List<Entities.PurchaseBillReturn>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetPurchaseBillNos))
                {
                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var purchaseBill = new Entities.PurchaseBillReturn
                            {
                                PurchaseBillId = DRE.GetNullableInt32(reader, "purchase_bill_id", 0),
                                PurchaseBillNo = DRE.GetNullableString(reader, "purchase_bill_no", null),
                                VendorName = DRE.GetNullableString(reader, "vendor_name", null)
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

        public Entities.PurchaseBillReturn GetPurchaseBillReturnDetailsByReturnId(Int32 purchaseBillReturnId)
        {
            var purchaseBillReturnInfo = new Entities.PurchaseBillReturn();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetPurchaseBillReturnDetailsByReturnId))
                {
                    database.AddInParameter(dbCommand, "@purchase_bill_return_id", DbType.Int32, purchaseBillReturnId);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var purchaseBillReturn = new Entities.PurchaseBillReturn()
                            {
                                PurchaseBillReturnId = DRE.GetNullableInt32(reader,"purchase_bill_return_id", null),
                                PurchaseBillId = DRE.GetNullableInt32(reader, "purchase_bill_id", 0),
                                PurchaseBillNo = DRE.GetNullableString(reader, "purchase_bill_no", null),
                                PurchaseBillDate = DRE.GetNullableString(reader, "purchase_bill_date", null),
                                VendorName = DRE.GetNullableString(reader, "vendor_name", null),
                                PurchaseBillReturnDate = DRE.GetNullableString(reader, "purchase_bill_return_date", null),
                                WorkingPeriodId = DRE.GetNullableInt32(reader, "working_period_id", null)
                            };

                            purchaseBillReturnInfo = purchaseBillReturn;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return purchaseBillReturnInfo;
        }

        public Entities.PurchaseBillReturn GetPurchaseBillInfoByPurchaseBillId(Int32 purchaseBillId)
        {
            var purchaseBillInfo = new Entities.PurchaseBillReturn();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetPurchaseBillInfoByPurchaseBillId))
                {
                    database.AddInParameter(dbCommand, "@purchase_bill_id", DbType.Int32, purchaseBillId);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var purchaseBillReturn = new Entities.PurchaseBillReturn()
                            {
                                PurchaseBillId = DRE.GetNullableInt32(reader, "purchase_bill_id", 0),
                                PurchaseBillNo = DRE.GetNullableString(reader, "purchase_bill_no", null),
                                PurchaseBillDate = DRE.GetNullableString(reader, "purchase_bill_date", null),
                                VendorName = DRE.GetNullableString(reader, "vendor_name", null)
                            };

                            purchaseBillInfo = purchaseBillReturn;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return purchaseBillInfo;
        }

        public List<Entities.PurchaseBillReturn> SearchPurchaseBillsReturnAll(Entities.PurchaseBillReturn purchaseBillReturn)
        {
            var purchaseBillReturns = new List<Entities.PurchaseBillReturn>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.SearchPurchaseBillsReturn))
                {
                    database.AddInParameter(dbCommand, "@purchase_bill_no", DbType.String, purchaseBillReturn.PurchaseBillNo);
                    database.AddInParameter(dbCommand, "@working_period_id", DbType.Int32, purchaseBillReturn.WorkingPeriodId);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var purchaseBillReturnItem = new PurchaseBillReturnItem();

                            var purchaseBillReturnInfo = new Entities.PurchaseBillReturn()
                            {
                                PurchaseBillReturnId = DRE.GetNullableInt32(reader, "purchase_bill_return_id", null),
                                PurchaseBillId = DRE.GetNullableInt32(reader, "purchase_bill_id", null),
                                PurchaseBillNo = DRE.GetNullableString(reader, "purchase_bill_no", null),
                                PurchaseBillDate = DRE.GetNullableString(reader, "purchase_bill_date", null),
                                VendorName = DRE.GetNullableString(reader, "vendor_name", null),
                                PurchaseBillReturnDate = DRE.GetNullableString(reader,"purchase_bill_return_date", null),
                                WorkingPeriodId = DRE.GetNullableInt32(reader, "working_period_id", null),
                                PurchaseBillReturnItems = purchaseBillReturnItem.GetPurchaseBillItemReturnDetailsByPurchaseBillReturnId(DRE.GetInt32(reader, "purchase_bill_return_id"))
                            };

                            purchaseBillReturns.Add(purchaseBillReturn);
                        }

                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return purchaseBillReturns;
        }

        public List<Entities.PurchaseBillReturnItem> GetPurchaseBillReturnItemDetailsByPurchaseBillId(Int32 purchaseBillId)
        {
            var purchaseBillItemReturn = new PurchaseBillReturnItem();

            return purchaseBillItemReturn.GetPurchaseBillReturnItemDetailsByPurchaseBillId(purchaseBillId);
        }

        private Int32 UpdatePurchaseBillReturn(Entities.PurchaseBillReturn purchaseBillReturn, DbTransaction dbTransaction)
        {
            var purchaseBillReturnId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdatePurchaseBillReturn))
                {
                    database.AddInParameter(dbCommand, "@purchase_bill_return_id", DbType.Int32, purchaseBillReturn.PurchaseBillReturnId);
                    database.AddInParameter(dbCommand, "@purchase_bill_return_date", DbType.String, purchaseBillReturn.PurchaseBillReturnDate);
                    database.AddInParameter(dbCommand, "@remarks", DbType.String, purchaseBillReturn.Remarks);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, purchaseBillReturn.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, purchaseBillReturn.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    purchaseBillReturnId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        purchaseBillReturnId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return purchaseBillReturnId;
        }

        public Int32 SavePurchaseBillReturn(Entities.PurchaseBillReturn purchaseBillReturn)
        {
            var purchaseBillReturnId = 0;

            var db = DBConnect.getDBConnection();

            using (DbConnection conn = db.CreateConnection())
            {
                conn.Open();

                using (DbTransaction transaction = conn.BeginTransaction())
                {
                    try
                    {
                        var purchaseBillItemReturnId = 0;

                        if (purchaseBillReturn != null)
                        {
                            if (purchaseBillReturn.PurchaseBillReturnId == null || purchaseBillReturn.PurchaseBillReturnId == 0)
                            {
                                purchaseBillReturnId = AddPurchaseBillReturn(purchaseBillReturn, transaction);
                            }
                            else
                            {
                                if (purchaseBillReturn.IsDeleted == true)
                                {
                                    var result = DeletePurchaseBillReturn(purchaseBillReturn, transaction);

                                    purchaseBillReturnId = Convert.ToInt32(purchaseBillReturn.PurchaseBillReturnId);
                                }
                                else
                                {
                                    if (purchaseBillReturn.ModifiedBy > 0 || purchaseBillReturn.ModifiedBy != null)
                                    {
                                        purchaseBillReturnId = UpdatePurchaseBillReturn(purchaseBillReturn, transaction);

                                        // If records failed to save
                                        if (purchaseBillReturnId < 0)
                                        {
                                            purchaseBillReturnId = -1;
                                        }
                                    }
                                }
                            }

                            if (purchaseBillReturnId > 0)
                            {
                                if (purchaseBillReturn.IsDeleted == true)
                                {
                                    PurchaseBillReturnItem dal = new PurchaseBillReturnItem();

                                    var result = dal.DeletePurchaseBillItemReturnByPurchaseBillReturnId(purchaseBillReturnId, (int)purchaseBillReturn.DeletedBy, purchaseBillReturn.DeletedByIP, transaction);

                                    if (result)
                                    {
                                        purchaseBillReturnId = 1;
                                    }
                                }

                                // Save Purchase Bill Items Return
                                if (purchaseBillReturn.PurchaseBillReturnItems != null)
                                {
                                    if (purchaseBillReturn.PurchaseBillReturnItems.Count > 0)
                                    {
                                        foreach (Entities.PurchaseBillReturnItem purchaseBillItemReturn in purchaseBillReturn.PurchaseBillReturnItems)
                                        {
                                            purchaseBillItemReturn.PurchaseBillReturnId = purchaseBillReturnId;

                                            PurchaseBillReturnItem dal = new PurchaseBillReturnItem();

                                            purchaseBillItemReturnId = dal.SavePurchaseBillItemReturn(purchaseBillItemReturn, transaction);

                                            // If records failed to save
                                            if (purchaseBillItemReturnId < 0)
                                            {
                                                purchaseBillReturnId = -1;
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (purchaseBillReturnId > 0)
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
                        purchaseBillReturnId = -1;
                        transaction.Rollback();
                        throw ex;
                    }
                    finally
                    {
                        db = null;
                    }
                }
            }

            return purchaseBillReturnId;
        }
    }
}
