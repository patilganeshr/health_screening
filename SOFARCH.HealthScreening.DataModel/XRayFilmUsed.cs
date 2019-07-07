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
    public class XRayFilmUsed
    {
        private readonly Database database;

        public XRayFilmUsed()
        {
            database = DBConnect.getDBConnection();
        }

        private Int32 AddXRayFilmUsedDetails(Entities.XRayFilmUsed xRayFilmUsed, DbTransaction dbTransaction)
        {
            var XRayFilmUsedId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertXRayFilmsUsed))
                {
                    database.AddInParameter(dbCommand, "@xray_film_used_id", DbType.Int32, xRayFilmUsed.XRayFilmUsedId);
                    database.AddInParameter(dbCommand, "@xray_issue_id", DbType.Int32, xRayFilmUsed.XRayIssueId);
                    database.AddInParameter(dbCommand, "@drug_id", DbType.Int32, xRayFilmUsed.DrugId);
                    database.AddInParameter(dbCommand, "@dispense_qty", DbType.Decimal, xRayFilmUsed.DispenseQty);
                    database.AddInParameter(dbCommand, "@rate", DbType.Decimal, xRayFilmUsed.PurchaseRate);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, xRayFilmUsed.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, xRayFilmUsed.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    XRayFilmUsedId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        XRayFilmUsedId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return XRayFilmUsedId;
        }

        private bool DeleteXRayFilmUsedDetails(Entities.XRayFilmUsed xRayFilmUsed, DbTransaction dbTransaction)
        {
            bool IsXRayFilmUsedDeleted = false;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeleteXRayFilmsUsed))
                {
                    database.AddInParameter(dbCommand, "@xray_film_used_id", DbType.Int32, xRayFilmUsed.XRayFilmUsedId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, xRayFilmUsed.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, xRayFilmUsed.DeletedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    var result = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        IsXRayFilmUsedDeleted = Convert.ToBoolean(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return IsXRayFilmUsedDeleted;
        }

        public bool DeleteXRayFilmUsedDetailsByXRayIssueId(Int32 xrayIssueId, Int32 deletedBy, string deletedByIP, DbTransaction dbTransaction)
        {
            var isDeleted = false;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeleteXRayFilmsUsedByXRayIssueId))
                {
                    database.AddInParameter(dbCommand, "@xray_issue_id", DbType.Int32, xrayIssueId);
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

        private Int32 UpdateXRayFilmUsedDetails(Entities.XRayFilmUsed xRayFilmUsed, DbTransaction dbTransaction)
        {
            var xrayFilmUsedId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdateXRayFilmsUsed))
                {
                    database.AddInParameter(dbCommand, "@xray_film_used_id", DbType.Int32, xRayFilmUsed.XRayFilmUsedId);
                    database.AddInParameter(dbCommand, "@xray_issue_id", DbType.Int32, xRayFilmUsed.XRayIssueId);
                    database.AddInParameter(dbCommand, "@drug_id", DbType.Int32, xRayFilmUsed.DrugId);
                    database.AddInParameter(dbCommand, "@dispense_qty", DbType.Decimal, xRayFilmUsed.DispenseQty);
                    database.AddInParameter(dbCommand, "@rate", DbType.Decimal, xRayFilmUsed.PurchaseRate);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, xRayFilmUsed.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, xRayFilmUsed.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    xrayFilmUsedId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        xrayFilmUsedId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return xrayFilmUsedId;
        }

        public Entities.XRayFilmUsed GetFilmDetailsByDrugId(Int32 drugId)
        {
            var filmDetails = new Entities.XRayFilmUsed();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetXRayFilmsUsedDetailsByDrugId))
                {
                    database.AddInParameter(dbCommand, "@drug_id", DbType.Int32, drugId);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var xRayFilmUsed = new Entities.XRayFilmUsed()
                            {
                                XRayFilmUsedId = DRE.GetNullableInt32(reader, "xray_film_used_id", null),
                                XRayIssueId = DRE.GetNullableInt32(reader, "xray_issue_id", null),
                                DrugId = DRE.GetNullableInt32(reader, "drug_id", null),
                                DrugCode = DRE.GetNullableInt32(reader, "drug_code", null),
                                DrugName = DRE.GetNullableString(reader, "drug_name", null),
                                DispenseQty = DRE.GetNullableDecimal(reader, "dispense_qty", null),
                                BalanceQty = DRE.GetNullableDecimal(reader, "balance_qty", null),
                                PurchaseRate = DRE.GetNullableDecimal(reader, "purchase_rate", null),
                                Amount = DRE.GetNullableDecimal(reader, "amount", null)
                            };

                            filmDetails = xRayFilmUsed;
                        }
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return filmDetails;
        }

        public List<Entities.XRayFilmUsed> GetFilmUsedDetailsByXRayIssueId(Int32 xrayIssueId)
        {
            var xRayFilmsUsed = new List<Entities.XRayFilmUsed>() ;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetXRayFilmsUsedDetailsByXRayIssueId))
                {
                    database.AddInParameter(dbCommand, "@xray_issue_id", DbType.Int32, xrayIssueId);

                    using(IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var xRayFilmUsed = new Entities.XRayFilmUsed()
                            {
                                XRayFilmUsedId = DRE.GetNullableInt32(reader, "xray_film_used_id", null),
                                XRayIssueId = DRE.GetNullableInt32(reader, "xray_issue_id", null),
                                DrugId  = DRE.GetNullableInt32(reader, "drug_id", null),
                                DrugCode = DRE.GetNullableInt32(reader, "drug_code", null),
                                DrugName = DRE.GetNullableString(reader, "drug_name", null),
                                DispenseQty = DRE.GetNullableDecimal(reader, "dispense_qty", null),
                                BalanceQty = DRE.GetNullableDecimal(reader, "balance_qty", null),
                                PurchaseRate = DRE.GetNullableDecimal(reader, "purchase_rate", null),
                                Amount = DRE.GetNullableDecimal(reader, "amount", null)
                            };

                            xRayFilmsUsed.Add(xRayFilmUsed);
                        }
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return xRayFilmsUsed;
        }

        public Int32 SaveXRayFilmUsed(Entities.XRayFilmUsed xRayFilmUsed, DbTransaction dbTransaction)
        {
            var xrayFilmUsedId = 0;

            if (xRayFilmUsed.XRayFilmUsedId == null || xRayFilmUsed.XRayFilmUsedId== 0)
            {
                xrayFilmUsedId = AddXRayFilmUsedDetails(xRayFilmUsed, dbTransaction);
            }
            else if (xRayFilmUsed.ModifiedBy != null || xRayFilmUsed.ModifiedBy > 0)
            {
                xrayFilmUsedId = UpdateXRayFilmUsedDetails(xRayFilmUsed, dbTransaction);
            }
            else if (xRayFilmUsed.IsDeleted == true)
            {
                var result = DeleteXRayFilmUsedDetails(xRayFilmUsed, dbTransaction);

                if (result)
                {
                    xrayFilmUsedId = (int)xRayFilmUsed.XRayFilmUsedId;
                }
            }

            return xrayFilmUsedId;
        }


    }
}
