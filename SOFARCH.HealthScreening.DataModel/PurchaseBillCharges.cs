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
    public class PurchaseBillCharges
    {
        private readonly Database database;

        public PurchaseBillCharges()
        {
            database = DBConnect.getDBConnection();
        }

        private Int32 AddPurchaseBillCharges(Entities.PurchaseBillCharge purchaseBillCharge, DbTransaction dbTransaction)
        {
            var purchaseBillChargeId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertPurchaseBillCharges))
                {
                    database.AddInParameter(dbCommand, "@purchase_bill_charge_id", DbType.Int32, purchaseBillCharge.PurchaseBillChargeId);
                    database.AddInParameter(dbCommand, "@purchase_bill_id", DbType.Int32, purchaseBillCharge.PurchaseBillId);
                    database.AddInParameter(dbCommand, "@charge_id", DbType.Int32, purchaseBillCharge.ChargeId);
                    database.AddInParameter(dbCommand, "@charge_amount", DbType.Decimal, purchaseBillCharge.ChargeAmount);
                    database.AddInParameter(dbCommand, "@tax_percent", DbType.Decimal, purchaseBillCharge.TaxPercent);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, purchaseBillCharge.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, purchaseBillCharge.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    purchaseBillChargeId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        purchaseBillChargeId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return purchaseBillChargeId;
        }

        private bool DeletePurchaseBillCharge(Entities.PurchaseBillCharge purchaseBillCharge, DbTransaction dbTransaction)
        {
            var isDeleted = true;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeletePurchaseBillCharges))
                {
                    database.AddInParameter(dbCommand, "@purchase_bill_charge_id", DbType.Int32, purchaseBillCharge.PurchaseBillId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, purchaseBillCharge.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, purchaseBillCharge.DeletedByIP);

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

        public bool DeletePurchaseBillChargeByPurchaseBillId(Int32 purchaseBillId, Int32 deletedBy, string deleteByIP, DbTransaction dbTransaction)
        {
            var isDeleted = true;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeletePurchaseBillChargesByPurchaseBillId))
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

        public List<Entities.PurchaseBillCharge> GetPurchaseBillChargesDetailsByPurchaseBillId(Int32 purchaseBillId)
        {
            var purchaseBillCharges = new List<Entities.PurchaseBillCharge>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetPurchaseBillChargeDetailsByPurchaseBillId))
                {
                    database.AddInParameter(dbCommand, "@purchase_bill_id", DbType.Int32, purchaseBillId);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var purchaseBillCharge = new Entities.PurchaseBillCharge
                            {
                                PurchaseBillChargeId = DRE.GetNullableInt32(reader, "purchase_bill_charge_id", null),
                                PurchaseBillId = DRE.GetNullableInt32(reader, "purchase_bill_id", 0),
                                ChargeId = DRE.GetNullableInt32(reader, "charge_id", null),
                                ChargeAmount = DRE.GetNullableDecimal(reader, "charge_amount", null),
                                TaxPercent = DRE.GetNullableDecimal(reader, "tax_percent", null)
                            };

                            purchaseBillCharges.Add(purchaseBillCharge);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return purchaseBillCharges;
        }

        private Int32 UpdatePurchaseBillCharge(Entities.PurchaseBillCharge purchaseBillCharge, DbTransaction dbTransaction)
        {
            var purchaseBillChargeId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdatePurchaseBillCharges))
                {
                    database.AddInParameter(dbCommand, "@purchase_bill_charge_id", DbType.Int32, purchaseBillCharge.PurchaseBillChargeId);
                    database.AddInParameter(dbCommand, "@purchase_bill_id", DbType.Int32, purchaseBillCharge.PurchaseBillId);
                    database.AddInParameter(dbCommand, "@charge_id", DbType.Int32, purchaseBillCharge.ChargeId);
                    database.AddInParameter(dbCommand, "@charge_amount", DbType.String, purchaseBillCharge.ChargeAmount);
                    database.AddInParameter(dbCommand, "@tax_percent", DbType.Decimal, purchaseBillCharge.TaxPercent);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, purchaseBillCharge.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, purchaseBillCharge.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    purchaseBillChargeId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        purchaseBillChargeId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return purchaseBillChargeId;
        }

        public Int32 SavePurchaseBillCharge(Entities.PurchaseBillCharge purchaseBillCharge, DbTransaction dbTransaction)
        {
            var purchaseBillChargeId = 0;

            if (purchaseBillCharge.PurchaseBillChargeId == null || purchaseBillCharge.PurchaseBillChargeId == 0)
            {
                purchaseBillChargeId = AddPurchaseBillCharges(purchaseBillCharge, dbTransaction);
            }
            else if (purchaseBillCharge.IsDeleted == true)
            {
                var result = DeletePurchaseBillCharge(purchaseBillCharge, dbTransaction);

                if (result == true)
                {
                    purchaseBillChargeId = (int)purchaseBillCharge.PurchaseBillChargeId;
                }
            }
            else if (purchaseBillCharge.ModifiedBy > 0)
            {
                purchaseBillChargeId = UpdatePurchaseBillCharge(purchaseBillCharge, dbTransaction);
            }

            return purchaseBillChargeId;
        }


    }
}
