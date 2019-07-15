﻿using System;
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

        private Int32 UpdateDrugDispenseReturnDetails(Entities.DrugDispenseReturn drugDispenseReturn, DbTransaction dbTransaction)
        {
            var drugDispenseReturnId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdateDrugDispenseReturn))
                {
                    database.AddInParameter(dbCommand, "@drug_dispense_return_id", DbType.Int32, drugDispenseReturn.DrugDispenseReturnId);
                    database.AddInParameter(dbCommand, "@drug_dispense_id", DbType.Int32, drugDispenseReturn.DrugDispenseId);
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

        public Entities.DrugDispenseDrugReturn GetDrugDispenseDetailsByDrugId(Int32 drugId)
        {
            var drugDetails = new DrugDispenseDrugUtilisation();

            return drugDetails.GetDrugDetailsByDrugId(drugId);
        }

        public List<Entities.DrugDispenseReturn> SearchDrguDispenseReturn(Entities.DrugDispenseReturn drugDispenseReturn)
        {
            var drugDispenseReturns = new List<Entities.DrugDispenseReturn>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.SearchDrugDispense))
                {
                    database.AddInParameter(dbCommand, "@patient_name", DbType.String, drugDispenseReturn.PatientName);
                    database.AddInParameter(dbCommand, "@employer_name", DbType.String, drugDispenseReturn.EmployerName);
                    database.AddInParameter(dbCommand, "@patient_code", DbType.Int32, drugDispenseReturn.PatientCode);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var drugUtlisation = new DataModel.DrugDispenseDrugUtilisation();

                            var drugDispenseDetails = new Entities.DrugDispenseReturn()
                            {
                                DrugDispenseId = DRE.GetNullableInt32(reader, "drug_dispense_id", 0),
                                DrugDispenseNo = DRE.GetNullableInt32(reader, "drug_dispense_no", null),
                                DrugDispenseDate = DRE.GetNullableString(reader, "drug_dispense_date", null),
                                PatientId = DRE.GetNullableInt32(reader, "patient_id", null),
                                PatientCode = DRE.GetNullableInt32(reader, "patient_code", null),
                                PatientName = DRE.GetNullableString(reader, "full_name", null),
                                EmployerId = DRE.GetNullableInt32(reader, "employer_id", null),
                                EmployerCode = DRE.GetNullableInt32(reader, "employer_code", null),
                                EmployerName = DRE.GetNullableString(reader, "employer_name", null),
                                WorkingPeriodId = DRE.GetNullableInt32(reader, "working_period_id", null),
                                DrugDispenseDrugUtilisations = drugUtlisation.GetDrugUtilisationByDrugDispenseId(DRE.GetInt32(reader, "drug_dispense_id"))
                            };

                            drugDispenses.Add(drugDispenseDetails);
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

        public List<Entities.DrugDispenseDrugReturn> GetDrugUtilisationByPatientId(Int32 patientId)
        {
            var drugDetails = new DrugDispenseDrugReturn();

            return drugDetails.GetDrugUtilisationByDrugDispenseId(drugDispenseId);
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

                                    var result = drugReturnDB.DeleteDrugDispenseDrugUtilisationDetailsByDrugDispenseId((int)drugDispenseReturn.DrugDispenseId, (int)drugDispenseReturn.DeletedBy, drugDispenseReturn.DeletedByIP, dbTransaction);

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
                                            DrugDispenseReturn drugReturnDB = new DrugDispenseDrugReturn();

                                            drugReturn.DrugDispenseReturnId = drugDispenseReturnId;

                                            drugDispenseDrugReturnId = drugReturnDB.SaveDrugDispenseDrugUtilisation(drugReturn, dbTransaction);

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
