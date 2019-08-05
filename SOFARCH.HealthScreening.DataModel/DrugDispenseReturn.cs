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
    public class DrugDispenseReturn
    {
        private readonly Database database;

        public DrugDispenseReturn()
        {
            database = DBConnect.getDBConnection();
        }

        private Int32 AddDrugDispenseReturnDetails(Entities.DrugDispenseReturn drugDispenseReturn, DbTransaction dbTransaction)
        {
            var drugDispenseReturnId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertDrugDispenseReturn))
                {
                    database.AddInParameter(dbCommand, "@drug_dispense_return_id", DbType.Int32, drugDispenseReturn.DrugDispenseReturnId);
                    database.AddInParameter(dbCommand, "@drug_dispense_id", DbType.Int32, drugDispenseReturn.DrugDispenseId);
                    database.AddInParameter(dbCommand, "@patient_id", DbType.Int32, drugDispenseReturn.PatientId);
                    database.AddInParameter(dbCommand, "@drug_return_date", DbType.String, drugDispenseReturn.DrugReturnDate);
                    database.AddInParameter(dbCommand, "@working_period_id", DbType.Int32, drugDispenseReturn.WorkingPeriodId);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, drugDispenseReturn.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, drugDispenseReturn.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    drugDispenseReturnId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        drugDispenseReturnId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return drugDispenseReturnId;
        }

        private bool DeleteDrugDispenseReturnDetails(Entities.DrugDispenseReturn drugDispenseReturn, DbTransaction dbTransaction)
        {
            var IsDrugDispenseReturnDeleted = false;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeleteDrugDispenseReturn))
                {
                    database.AddInParameter(dbCommand, "@drug_dispense_return_id", DbType.Int32, drugDispenseReturn.DrugDispenseReturnId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, drugDispenseReturn.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, drugDispenseReturn.DeletedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    var result = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        IsDrugDispenseReturnDeleted = Convert.ToBoolean(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return IsDrugDispenseReturnDeleted;
        }
        public bool DeleteDrugDispenseDrugReturnDetailsByDrugReturnId(Int32 drugDispenseReturnId, Int32 deletedBy, string deletedByIP, DbTransaction dbTransaction)
        {
            var isDeleted = false;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeleteDrugDispenseDrugUtilisationByDrugDispenseId))
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


        private Int32 UpdateDrugDispenseReturnDetails(Entities.DrugDispenseReturn drugDispenseReturn, DbTransaction dbTransaction)
        {
            var drugDispenseReturnId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdateDrugDispenseReturn))
                {
                    database.AddInParameter(dbCommand, "@drug_dispense_return_id", DbType.Int32, drugDispenseReturn.DrugDispenseReturnId);
                    database.AddInParameter(dbCommand, "@drug_dispense_id", DbType.Int32, drugDispenseReturn.DrugDispenseId);
                    database.AddInParameter(dbCommand, "@patient_id", DbType.Int32, drugDispenseReturn.PatientId);
                    database.AddInParameter(dbCommand, "@drug_return_date", DbType.String, drugDispenseReturn.DrugReturnDate);
                    database.AddInParameter(dbCommand, "@working_period_id", DbType.Int32, drugDispenseReturn.WorkingPeriodId);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, drugDispenseReturn.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, drugDispenseReturn.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    drugDispenseReturnId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        drugDispenseReturnId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return drugDispenseReturnId;
        }

        public List<Entities.DrugDispenseReturn> SearchDrguDispenseReturn(Entities.DrugDispenseReturn drugDispenseReturn)
        {
            var drugDispenseReturns = new List<Entities.DrugDispenseReturn>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.SearchDrugDispenseReturn))
                {
                    database.AddInParameter(dbCommand, "@financial_year", DbType.String, drugDispenseReturn.FinancialYear);
                    database.AddInParameter(dbCommand, "@first_name", DbType.String, drugDispenseReturn.FirstName);
                    database.AddInParameter(dbCommand, "@last_name", DbType.String, drugDispenseReturn.LastName);
                    database.AddInParameter(dbCommand, "@drug_return_from_date", DbType.String, drugDispenseReturn.DrugReturnFromDate);
                    database.AddInParameter(dbCommand, "@drug_return_to_date", DbType.String, drugDispenseReturn.DrugReturnToDate);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var drugReturn = new DataModel.DrugDispenseDrugReturn();

                            var drugDispenseDetails = new Entities.DrugDispenseReturn()
                            {
                                DrugDispenseReturnId = DRE.GetNullableInt32(reader, "drug_dispense_return_id", null),
                                DrugDispenseId = DRE.GetNullableInt32(reader, "drug_dispense_id", 0),
                                DrugReturnNo = DRE.GetNullableInt32(reader, "drug_return_no", null),
                                DrugReturnDate = DRE.GetNullableString(reader, "drug_return_date", null),
                                PatientId = DRE.GetNullableInt32(reader, "patient_id", null),
                                PatientCode = DRE.GetNullableInt32(reader, "patient_code", null),
                                PatientName = DRE.GetNullableString(reader, "full_name", null),
                                EmployerCode = DRE.GetNullableInt32(reader, "employer_code", null),
                                EmployerName = DRE.GetNullableString(reader, "employer_name", null),
                                WorkingPeriodId = DRE.GetNullableInt32(reader, "working_period_id", null),
                                FinancialYear = DRE.GetNullableString(reader, "financial_year", null),
                                DrugDispenseDrugReturns = drugReturn.GetDrugReturnDetailsByDrugDispenseReturnId(DRE.GetInt32(reader, "drug_dispense_return_id"))
                            };

                            drugDispenseReturns.Add(drugDispenseDetails);
                        }
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return drugDispenseReturns;
        }

        public List<Entities.DrugDispenseDrugReturn> GetDrugDetailsByPatientId(Int32 patientId)
        {
            var drugDetails = new DrugDispenseDrugReturn();

            return drugDetails.GetDrugDetailsByPatientId(patientId);
        }

        public List<Entities.DrugDispenseDrugReturn> GetDrugDispenseDetailsByPatientIdAndDrugId(Int32 patientId, Int32 drugId)
        {
            var drugDetails = new DrugDispenseDrugReturn();

            return drugDetails.GetDrugDispenseDetailsByPatientIdAndDrugId(patientId, drugId);
        }

        public List<Entities.DrugDispenseDrugReturn> GetDrugDispenseDetailsByPatientId(Int32 patientId)
        {
            var drugDetails = new DrugDispenseDrugReturn();

            return drugDetails.GetDrugDispenseDetailsByPatientId(patientId);
        }

        public List<Entities.DrugDispenseReturn> GetPastDrugReturnDatesByPatientId(Int32 patientId)
        {
            var drugDispenseDates = new List<Entities.DrugDispenseReturn>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetPastDrugDispenseDatesByPatientId))
                {
                    database.AddInParameter(dbCommand, "@patient_id", DbType.Int32, patientId);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var drugDispenseDate = new Entities.DrugDispenseReturn()
                            {
                                DrugDispenseReturnId = DRE.GetNullableInt32(reader, "drug_dispense_return_id", null),
                                DrugReturnDate = DRE.GetNullableString(reader, "drug_return_date", null)
                            };

                            drugDispenseDates.Add(drugDispenseDate);
                        }
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return drugDispenseDates;
        }

        public Int32 SaveDrugDispenseReturnDetails(Entities.DrugDispenseReturn drugDispenseReturn)
        {
            var drugDispenseReturnId = 0;

            var db = DBConnect.getDBConnection();

            using (DbConnection conn = db.CreateConnection())
            {
                conn.Open();

                using (DbTransaction dbTransaction = conn.BeginTransaction())
                {
                    try
                    {
                        var drugDispenseDrugReturnId = 0;

                        if (drugDispenseReturn != null)
                        {
                            if (drugDispenseReturn.DrugDispenseReturnId == null || drugDispenseReturn.DrugDispenseReturnId == 0)
                            {
                                drugDispenseReturnId = AddDrugDispenseReturnDetails(drugDispenseReturn, dbTransaction);
                            }
                            else if (drugDispenseReturn.ModifiedBy != null || drugDispenseReturn.ModifiedBy > 0)
                            {
                                drugDispenseReturnId = UpdateDrugDispenseReturnDetails(drugDispenseReturn, dbTransaction);
                            }
                            else if (drugDispenseReturn.IsDeleted == true)
                            {
                                var result = DeleteDrugDispenseReturnDetails(drugDispenseReturn, dbTransaction);

                                if (result)
                                {
                                    drugDispenseReturnId = (int)drugDispenseReturn.DrugDispenseReturnId;
                                }
                                else
                                {
                                    drugDispenseReturnId = -1;
                                }
                            }

                            if (drugDispenseReturnId > 0)
                            {
                                if (drugDispenseReturn.IsDeleted == true)
                                {
                                    DrugDispenseDrugReturn drugReturnDB = new DrugDispenseDrugReturn();

                                    var result = drugReturnDB.DeleteDrugDispenseDrugReturnDetailsByDrugDispenseReturnId((int)drugDispenseReturn.DrugDispenseReturnId, (int)drugDispenseReturn.DeletedBy, drugDispenseReturn.DeletedByIP, dbTransaction);

                                    if (result)
                                    {
                                        drugDispenseDrugReturnId = (int)drugDispenseReturn.DrugDispenseReturnId;
                                    }
                                }

                                if (drugDispenseReturn.DrugDispenseDrugReturns != null)
                                {
                                    if (drugDispenseReturn.DrugDispenseDrugReturns.Count > 0)
                                    {
                                        foreach (Entities.DrugDispenseDrugReturn drugReturn in drugDispenseReturn.DrugDispenseDrugReturns)
                                        {
                                            DrugDispenseDrugReturn drugReturnDB = new DrugDispenseDrugReturn();

                                            drugReturn.DrugDispenseReturnId = drugDispenseReturnId;

                                            drugDispenseDrugReturnId = drugReturnDB.SaveDrugDispenseDrugReturn(drugReturn, dbTransaction);

                                            if (drugDispenseDrugReturnId < 0)
                                            {
                                                drugDispenseReturnId = -1;
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (drugDispenseReturnId > 0)
                        {
                            dbTransaction.Commit();
                        }
                        else
                        {
                            dbTransaction.Rollback();
                        }
                    }
                    catch (Exception ex)
                    {
                        drugDispenseReturnId = -1;
                        dbTransaction.Rollback();
                        throw ex;
                    }
                }

                return drugDispenseReturnId;
            }
        }


    }
}
