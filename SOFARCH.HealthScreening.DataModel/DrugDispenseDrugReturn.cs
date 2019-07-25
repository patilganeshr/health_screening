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
    public class DrugDispenseDrugReturn
    {
        private readonly Database database;

        public DrugDispenseDrugReturn()
        {
            database = DBConnect.getDBConnection();
        }

        private Int32 AddDrugDispenseDrugReturnDetails(Entities.DrugDispenseDrugReturn drugDispenseDrugReturn, DbTransaction dbTransaction)
        {
            var drugDispenseDrugReturnId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertDrugDispenseDrugsReturn))
                {
                    database.AddInParameter(dbCommand, "@drug_dispense_drug_return_id", DbType.Int32, drugDispenseDrugReturn.DrugDispenseDrugReturnId);
                    database.AddInParameter(dbCommand, "@drug_dispense_return_id", DbType.Int32, drugDispenseDrugReturn.DrugDispenseReturnId);
                    database.AddInParameter(dbCommand, "@drug_utilisation_id", DbType.Int32, drugDispenseDrugReturn.DrugUtilisationId);
                    database.AddInParameter(dbCommand, "@drug_id", DbType.Int32, drugDispenseDrugReturn.DrugId);
                    database.AddInParameter(dbCommand, "@return_qty", DbType.Decimal, drugDispenseDrugReturn.ReturnQty);
                    database.AddInParameter(dbCommand, "@rate", DbType.Decimal, drugDispenseDrugReturn.Rate);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, drugDispenseDrugReturn.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, drugDispenseDrugReturn.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    drugDispenseDrugReturnId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        drugDispenseDrugReturnId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return drugDispenseDrugReturnId;
        }

        private bool DeleteDrugDispenseDrugReturnDetails(Entities.DrugDispenseDrugReturn drugDispenseDrugReturn, DbTransaction dbTransaction)
        {
            bool IsDrugReturnDeleted = false;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeleteDrugDispenseDrugsReturn))
                {
                    database.AddInParameter(dbCommand, "@drug_dispense_drug_return_id", DbType.Int32, drugDispenseDrugReturn.DrugDispenseDrugReturnId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, drugDispenseDrugReturn.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, drugDispenseDrugReturn.DeletedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    var result = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        IsDrugReturnDeleted = Convert.ToBoolean(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return IsDrugReturnDeleted;
        }

        public bool DeleteDrugDispenseDrugReturnDetailsByDrugDispenseReturnId(Int32 drugDispenseReturnId, Int32 deletedBy, string deletedByIP, DbTransaction dbTransaction)
        {
            var isDeleted = false;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeleteDrugDispenseDrugReturnByDrugDispenseReturnId))
                {
                    database.AddInParameter(dbCommand, "@drug_dispense_return_id", DbType.Int32, drugDispenseReturnId);
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

        private Int32 UpdateDrugDispenseDrugReturnDetails(Entities.DrugDispenseDrugReturn drugDispenseDrugReturn, DbTransaction dbTransaction)
        {
            var drugDispenseDrugReturnId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdateDrugDispenseDrugsReturn))
                {
                    database.AddInParameter(dbCommand, "@drug_dispense_drug_return_id", DbType.Int32, drugDispenseDrugReturn.DrugDispenseDrugReturnId);
                    database.AddInParameter(dbCommand, "@drug_dispense_return_id", DbType.Int32, drugDispenseDrugReturn.DrugDispenseReturnId);
                    database.AddInParameter(dbCommand, "@drug_utilisation_id", DbType.Int32, drugDispenseDrugReturn.DrugUtilisationId);
                    database.AddInParameter(dbCommand, "@drug_id", DbType.Int32, drugDispenseDrugReturn.DrugId);
                    database.AddInParameter(dbCommand, "@return_qty", DbType.Decimal, drugDispenseDrugReturn.ReturnQty);
                    database.AddInParameter(dbCommand, "@rate", DbType.Decimal, drugDispenseDrugReturn.Rate);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, drugDispenseDrugReturn.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, drugDispenseDrugReturn.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    drugDispenseDrugReturnId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        drugDispenseDrugReturnId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return drugDispenseDrugReturnId;
        }

        public List<Entities.DrugDispenseDrugReturn> GetDrugDetailsByPatientId(Int32 patientId)
        {
            var drugs = new List<Entities.DrugDispenseDrugReturn>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetDrugDetailsByPatientId))
                {
                    database.AddInParameter(dbCommand, "@patient_id", DbType.Int32, patientId);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var drug = new Entities.DrugDispenseDrugReturn()
                            {
                                DrugId = DRE.GetNullableInt32(reader, "drug_id", null),
                                DrugCode = DRE.GetNullableInt32(reader, "drug_code", null),
                                DrugName = DRE.GetNullableString(reader, "drug_name", null)
                            };

                            drugs.Add(drug);
                        }
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return drugs;
        }

        public Entities.DrugDispenseDrugReturn GetDrugDetailsByDrugId(Int32 drugId)
        {
            var drugDetails = new Entities.DrugDispenseDrugReturn();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetDrugDetailsByDrugId))
                {
                    database.AddInParameter(dbCommand, "@drug_id", DbType.Int32, drugId);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var drugUtilisation = new Entities.DrugDispenseDrugReturn()
                            {
                                DrugUtilisationId = DRE.GetNullableInt32(reader, "drug_utilisation_id", null),
                                DrugDispenseId = DRE.GetNullableInt32(reader, "drug_dispense_id", null),
                                DrugId = DRE.GetNullableInt32(reader, "drug_id", null),
                                DrugCode = DRE.GetNullableInt32(reader, "drug_code", null),
                                DrugName = DRE.GetNullableString(reader, "drug_name", null),
                                DispenseQty = DRE.GetNullableDecimal(reader, "dispense_qty", null),
                                BalanceQty = DRE.GetNullableDecimal(reader, "balance_qty", null),
                                Rate = DRE.GetNullableDecimal(reader, "purchase_rate", null),
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

        public List<Entities.DrugDispenseDrugReturn> GetDrugDispenseDetailsByPatientIdAndDrugId(Int32 patientId, Int32 drugId)
        {
            var drugDispenses = new List<Entities.DrugDispenseDrugReturn>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetDrugDispenseDetailsByPatientIdAndDrugId))
                {
                    database.AddInParameter(dbCommand, "@patient_id", DbType.Int32, patientId);
                    database.AddInParameter(dbCommand, "@drug_id", DbType.Int32, drugId);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var drugReturn = new Entities.DrugDispenseDrugReturn()
                            {
                                DrugDispenseDrugReturnId = DRE.GetNullableInt32(reader, "drug_dispense_drug_return_id", null),
                                DrugDispenseReturnId = DRE.GetNullableInt32(reader, "drug_dispense_return_id", null),
                                DrugUtilisationId = DRE.GetNullableInt32(reader, "drug_utilisation_id", null),
                                DrugId = DRE.GetNullableInt32(reader, "drug_id", null),
                                DrugCode = DRE.GetNullableInt32(reader, "drug_code", null),
                                DrugName = DRE.GetNullableString(reader, "drug_name", null),
                                DispenseQty = DRE.GetNullableDecimal(reader, "dispense_qty", null),
                                ReturnQty = DRE.GetNullableDecimal(reader, "return_qty", null),
                                BalanceQty = DRE.GetNullableDecimal(reader, "balance_qty", null),
                                Rate = DRE.GetNullableDecimal(reader, "purchase_rate", null),
                                Amount = DRE.GetNullableDecimal(reader, "amount", null)
                            };

                            drugDispenses.Add(drugReturn);
                        }
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return drugDispenses;
        }

        public List<Entities.DrugDispenseDrugReturn> GetDrugDispenseDetailsByPatientId(Int32 patientId)
        {
            var drugDispenses = new List<Entities.DrugDispenseDrugReturn>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetDrugDispenseDetailsByPatientId))
                {
                    database.AddInParameter(dbCommand, "@patient_id", DbType.Int32, patientId);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var drugReturn = new Entities.DrugDispenseDrugReturn()
                            {
                                DrugDispenseDrugReturnId = DRE.GetNullableInt32(reader, "drug_dispense_drug_return_id", null),
                                DrugDispenseReturnId = DRE.GetNullableInt32(reader, "drug_dispense_return_id", null),
                                DrugUtilisationId = DRE.GetNullableInt32(reader, "drug_utilisation_id", null),
                                DrugDispenseId = DRE.GetNullableInt32(reader, "drug_dispense_id", null),
                                DrugDispenseNo = DRE.GetNullableInt32(reader, "drug_dispense_no", null),
                                DrugDispenseDate = DRE.GetNullableString(reader, "drug_dispense_date", null),
                                DrugId = DRE.GetNullableInt32(reader, "drug_id", null),
                                DrugCode = DRE.GetNullableInt32(reader, "drug_code", null),
                                DrugName = DRE.GetNullableString(reader, "drug_name", null),
                                DispenseQty = DRE.GetNullableDecimal(reader, "dispense_qty", null),
                                ReturnQty = DRE.GetNullableDecimal(reader, "return_qty", null),
                                BalanceQty = DRE.GetNullableDecimal(reader, "balance_qty", null),
                                Rate = DRE.GetNullableDecimal(reader, "purchase_rate", null),
                                Amount = DRE.GetNullableDecimal(reader, "amount", null)
                            };

                            drugDispenses.Add(drugReturn);
                        }
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return drugDispenses;
        }

        public List<Entities.DrugDispenseDrugReturn> GetDrugReturnDetailsByDrugDispenseReturnId(Int32 drugDispenseReturnId)
        {
            var drugDispenseDrugReturns = new List<Entities.DrugDispenseDrugReturn>() ;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetDrugDispenseDrugReturnDetailsByDrugDispenseReturnId))
                {
                    database.AddInParameter(dbCommand, "@drug_dispense_return_id", DbType.Int32, drugDispenseReturnId);

                    using(IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var drugReturn = new Entities.DrugDispenseDrugReturn()
                            {
                                DrugDispenseDrugReturnId = DRE.GetNullableInt32(reader, "drug_dispense_drug_return_id", null),
                                DrugDispenseReturnId = DRE.GetNullableInt32(reader, "drug_dispense_return_id", null),
                                DrugUtilisationId = DRE.GetNullableInt32(reader, "drug_utilisation_id", null),
                                DrugId  = DRE.GetNullableInt32(reader, "drug_id", null),
                                DrugCode = DRE.GetNullableInt32(reader, "drug_code", null),
                                DrugName = DRE.GetNullableString(reader, "drug_name", null),
                                DispenseQty = DRE.GetNullableDecimal(reader, "dispense_qty", null),
                                ReturnQty = DRE.GetNullableDecimal(reader, "return_qty", null),
                                BalanceQty = DRE.GetNullableDecimal(reader, "balance_qty", null),
                                Rate = DRE.GetNullableDecimal(reader, "purchase_rate", null),
                                Amount = DRE.GetNullableDecimal(reader, "amount", null)
                            };

                            drugDispenseDrugReturns.Add(drugReturn);
                        }
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return drugDispenseDrugReturns;
        }

        public Int32 SaveDrugDispenseDrugReturn(Entities.DrugDispenseDrugReturn drugDispenseDrugReturn, DbTransaction dbTransaction)
        {
            var drugDispenseDrugReturnId = 0;

            if (drugDispenseDrugReturn.DrugDispenseDrugReturnId == null || drugDispenseDrugReturn.DrugDispenseDrugReturnId == 0)
            {
                drugDispenseDrugReturnId = AddDrugDispenseDrugReturnDetails(drugDispenseDrugReturn, dbTransaction);
            }
            else if (drugDispenseDrugReturn.ModifiedBy != null || drugDispenseDrugReturn.ModifiedBy > 0)
            {
                drugDispenseDrugReturnId = UpdateDrugDispenseDrugReturnDetails(drugDispenseDrugReturn, dbTransaction);
            }
            else if (drugDispenseDrugReturn.IsDeleted == true)
            {
                var result = DeleteDrugDispenseDrugReturnDetails(drugDispenseDrugReturn, dbTransaction);

                if (result)
                {
                    drugDispenseDrugReturnId = (int)drugDispenseDrugReturn.DrugDispenseDrugReturnId;
                }
            }

            return drugDispenseDrugReturnId;
        }


    }
}
