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
    public class Precautions
    {
        private readonly Database database;

        public Precautions()
        {
            database = DBConnect.getDBConnection();
        }

        private Int32 AddDrugDispenseDetails(Entities.Precautions prescription, DbTransaction dbTransaction)
        {
            var drugDispenseId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertPrescription))
                {
                    database.AddInParameter(dbCommand, "@Precautions_id", DbType.Int32, prescription.DrugDispenseId);
                    database.AddInParameter(dbCommand, "@patient_id", DbType.Int32, prescription.PatientId);
                    database.AddInParameter(dbCommand, "@prescription_date", DbType.String, prescription.DrugDispenseDate);
                    database.AddInParameter(dbCommand, "@DocName", DbType.String, prescription.DoctName);
                    database.AddInParameter(dbCommand, "@working_period_id", DbType.Int32, prescription.WorkingPeriodId);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, prescription.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, prescription.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    drugDispenseId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        drugDispenseId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return drugDispenseId;
        }

        private bool DeleteDrugDispenseDetails(Entities.Precautions prescription, DbTransaction dbTransaction)
        {
            var IsDrugDispenseDeleted = false;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeletePrescription))
                {
                    database.AddInParameter(dbCommand, "@drug_dispense_id", DbType.Int32, prescription.DrugDispenseId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, prescription.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, prescription.DeletedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    var result = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        IsDrugDispenseDeleted = Convert.ToBoolean(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return IsDrugDispenseDeleted;
        }

        private Int32 UpdateDrugDispenseDetails(Entities.Precautions prescription, DbTransaction dbTransaction)
        {
            var drugDispenseId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdatePrescription))
                {
                    database.AddInParameter(dbCommand, "@drug_dispense_id", DbType.Int32, prescription.DrugDispenseId);
                    database.AddInParameter(dbCommand, "@drug_dispense_date", DbType.String, prescription.DrugDispenseDate);
                    database.AddInParameter(dbCommand, "@DocName", DbType.String, prescription.DoctName);
                    database.AddInParameter(dbCommand, "@working_period_id", DbType.Int32, prescription.WorkingPeriodId);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, prescription.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, prescription.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    drugDispenseId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        drugDispenseId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return drugDispenseId;
        }

        //public Entities.PrecautionsList GetDrugDetailsByDrugId(Int32 drugId)
        //{
        //    //var drugDetails = new DrugDispenseDrugUtilisation();

        //    return GetDrugDetailsByDrugId(drugId);
        //}


        public Entities.PrecautionsList GetDrugDetailsByDrugId(Int32 drugId)
        {
            var drugDetails = new Entities.PrecautionsList();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetDrugDetailsByDrugId))
                {
                    database.AddInParameter(dbCommand, "@drug_id", DbType.Int32, drugId);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var drugUtilisation = new Entities.PrecautionsList()
                            {
                                DrugUtilisationId = DRE.GetNullableInt32(reader, "drug_utilisation_id", null),
                                DrugDispenseId = DRE.GetNullableInt32(reader, "drug_dispense_id", null),
                                DrugId = DRE.GetNullableInt32(reader, "drug_id", null),
                                DrugCode = DRE.GetNullableInt32(reader, "drug_code", null),
                                DrugName = DRE.GetNullableString(reader, "drug_name", null),
                                DispenseQty = Convert.ToString(DRE.GetNullableDecimal(reader, "dispense_qty", null)),
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


        public List<Entities.Precautions> SearchDrguDispense(Entities.Precautions prescription)
        {
            var drugDispenses = new List<Entities.Precautions>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.SearchPrescription))
                {
                    database.AddInParameter(dbCommand, "@patient_name", DbType.String, prescription.PatientName);
                    database.AddInParameter(dbCommand, "@employer_name", DbType.String, prescription.EmployerName);
                    database.AddInParameter(dbCommand, "@patient_code", DbType.Int32, prescription.PatientCode);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var drugUtlisation = new DataModel.DrugDispenseDrugUtilisation();

                            var drugDispenseDetails = new Entities.Precautions()
                            {
                                DrugDispenseId = DRE.GetNullableInt32(reader,"Precautions_id", 0),
                                DrugDispenseNo = DRE.GetNullableInt32(reader, "prescription_no", null),
                                DrugDispenseDate = DRE.GetNullableString(reader, "prescription_date", null),
                                PatientId = DRE.GetNullableInt32(reader, "patient_id", null),
                                PatientCode = DRE.GetNullableInt32(reader, "patient_code", null),
                                PatientName = DRE.GetNullableString(reader, "full_name", null),
                                EmployerId = DRE.GetNullableInt32(reader, "employer_id", null),
                                EmployerCode = DRE.GetNullableInt32(reader, "employer_code", null),
                                EmployerName = DRE.GetNullableString(reader, "employer_name", null),
                                DoctName = DRE.GetNullableString(reader, "DocName", null),
                                WorkingPeriodId = DRE.GetNullableInt32(reader, "working_period_id", null),
                                DrugDispenseDrugUtilisations = GetUtilisationByDrugDispenseId(DRE.GetInt32(reader, "Precautions_id"))
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

        //public List<Entities.PrecautionsList> GetDrugUtilisationByDrugDispenseId(Int32 drugDispenseId)
        //{
        //    ///var drugDetails = new PrecautionsList();

        //    return GetDrugUtilisationByDrugDispenseId(drugDispenseId);
        //}


        public List<Entities.PrecautionsList> GetDrugUtilisationByDrugDispenseId(Int32 drugDispenseId)
        {
            var drugDispenseDrugUtilisations = new List<Entities.PrecautionsList>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetDrugDispenseDrugUtilisationDetailsByDrugDispenseId))
                {
                    database.AddInParameter(dbCommand, "@drug_dispense_id", DbType.Int32, drugDispenseId);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var drugUtilisation = new Entities.PrecautionsList()
                            {
                                DrugUtilisationId = DRE.GetNullableInt32(reader, "drug_utilisation_id", null),
                                DrugDispenseId = DRE.GetNullableInt32(reader, "drug_dispense_id", null),
                                DrugId = DRE.GetNullableInt32(reader, "drug_id", null),
                                DrugCode = DRE.GetNullableInt32(reader, "drug_code", null),
                                DrugName = DRE.GetNullableString(reader, "drug_name", null),
                                DispenseQty = Convert.ToString(DRE.GetNullableDecimal(reader, "dispense_qty", null)),
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



        public List<Entities.Precautions> GetPastDrugDispenseDatesByPatientId(Int32 patientId)
        {
            var drugDispenseDates = new List<Entities.Precautions>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetPastDrugDispenseDatesByPatientId))
                {
                    database.AddInParameter(dbCommand, "@patient_id", DbType.Int32, patientId);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var drugDispenseDate = new Entities.Precautions()
                            {
                                DrugDispenseId = DRE.GetNullableInt32(reader, "drug_dispense_id", null),
                                DrugDispenseDate = DRE.GetNullableString(reader, "drug_dispense_date", null)
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

        public Int32 SaveDrugDispenseDetails(Entities.Precautions prescription)
        {
            var drugDispenseId = 0;

            var db = DBConnect.getDBConnection();

            using (DbConnection conn = db.CreateConnection())
            {
                conn.Open();

                using (DbTransaction dbTransaction = conn.BeginTransaction())
                {
                    try
                    {
                        var drugDispenseDrugUtilisationId = 0;

                        if (prescription != null)
                        {
                            if (prescription.DrugDispenseId == null || prescription.DrugDispenseId == 0)
                            {
                                drugDispenseId = AddDrugDispenseDetails(prescription, dbTransaction);
                            }
                            else if (prescription.ModifiedBy != null || prescription.ModifiedBy > 0)
                            {
                                drugDispenseId = UpdateDrugDispenseDetails(prescription, dbTransaction);
                            }
                            else if (prescription.IsDeleted == true)
                            {
                                var result = DeleteDrugDispenseDetails(prescription, dbTransaction);

                                if (result)
                                {
                                    drugDispenseId = (int)prescription.DrugDispenseId;
                                }
                                else
                                {
                                    drugDispenseId = -1;
                                }
                            }

                            if (drugDispenseId > 0)
                            {
                                if (prescription.IsDeleted == true)
                                {
                                    
                                    var result = DeleteDrugDispenseDrugUtilisationDetailsByDrugDispenseId((int)prescription.DrugDispenseId, (int)prescription.DeletedBy, prescription.DeletedByIP, dbTransaction);

                                    if (result)
                                    {
                                        drugDispenseDrugUtilisationId = (int)prescription.DrugDispenseId;
                                    }
                                }

                                if (prescription.DrugDispenseDrugUtilisations != null)
                                {
                                    if (prescription.DrugDispenseDrugUtilisations.Count > 0)
                                    {
                                        foreach (Entities.PrecautionsList drugUtilisation in prescription.DrugDispenseDrugUtilisations)
                                        {
                                           

                                            drugUtilisation.DrugDispenseId = drugDispenseId;

                                            drugDispenseDrugUtilisationId = SaveDrugDispenseDrugUtilisation(drugUtilisation, dbTransaction);

                                            if (drugDispenseDrugUtilisationId < 0)
                                            {
                                                drugDispenseId = -1;
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (drugDispenseId > 0)
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
                        drugDispenseId = -1;
                        dbTransaction.Rollback();
                        throw ex;
                    }
                }

                return drugDispenseId;
            }
        }



        public Int32 SaveDrugDispenseDrugUtilisation(Entities.PrecautionsList drugDispenseDrugUtilisation, DbTransaction dbTransaction)
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



        private bool DeleteDrugDispenseDrugUtilisationDetails(Entities.PrecautionsList drugDispenseDrugUtilisation, DbTransaction dbTransaction)
        {
            bool IsDrugUtilisationDeleted = false;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeletePrescriptionsDrugUtilisation))
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



        private Int32 UpdateDrugDispenseDrugUtilisationDetails(Entities.PrecautionsList drugDispenseDrugUtilisation, DbTransaction dbTransaction)
        {
            var drugDispenseDrugUtilisationId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdatePrescriptionsDrugUtilisation))
                {
                    database.AddInParameter(dbCommand, "@drug_utilisation_id", DbType.Int32, drugDispenseDrugUtilisation.DrugUtilisationId);
                    database.AddInParameter(dbCommand, "@drug_dispense_id", DbType.Int32, drugDispenseDrugUtilisation.DrugDispenseId);
                    database.AddInParameter(dbCommand, "@drug_id", DbType.Int32, drugDispenseDrugUtilisation.DrugId);
                    database.AddInParameter(dbCommand, "@Dosage", DbType.String, drugDispenseDrugUtilisation.Dosage);
                    database.AddInParameter(dbCommand, "@dispense_qty", DbType.String, drugDispenseDrugUtilisation.DispenseQty);
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



        private Int32 AddDrugDispenseDrugUtilisationDetails(Entities.PrecautionsList drugDispenseDrugUtilisation, DbTransaction dbTransaction)
        {
            var drugDispenseDrugUtilisationId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertPrescriptionsDrugUtilisation))
                {
                    database.AddInParameter(dbCommand, "@prescription_utilisation_id", DbType.Int32, drugDispenseDrugUtilisation.DrugUtilisationId);
                    database.AddInParameter(dbCommand, "@Precautions_id", DbType.Int32, drugDispenseDrugUtilisation.DrugDispenseId);
                    database.AddInParameter(dbCommand, "@drug_id", DbType.Int32, drugDispenseDrugUtilisation.DrugId);
                    database.AddInParameter(dbCommand, "@dispense_qty", DbType.String, drugDispenseDrugUtilisation.DispenseQty);
                    database.AddInParameter(dbCommand, "@Dosage", DbType.String, drugDispenseDrugUtilisation.Dosage);
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


        public List<Entities.PrecautionsList> GetUtilisationByDrugDispenseId(Int32 drugDispenseId)
        {
            var drugDispenseDrugUtilisations = new List<Entities.PrecautionsList>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetPrescriptionsDrugUtilisationDetailsByDrugDispenseId))
                {
                    database.AddInParameter(dbCommand, "@drug_dispense_id", DbType.Int32, drugDispenseId);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var drugUtilisation = new Entities.PrecautionsList()
                            {
                                DrugUtilisationId = DRE.GetNullableInt32(reader, "prescription_utilisation_id", null),
                                DrugDispenseId = DRE.GetNullableInt32(reader, "Precautions_id", null),
                                DrugId = DRE.GetNullableInt32(reader, "drug_id", null),
                                DrugCode = DRE.GetNullableInt32(reader, "drug_code", null),
                                DrugName = DRE.GetNullableString(reader, "drug_name", null),
                                DispenseQty = DRE.GetNullableString(reader, "dispense_qty", null),
                                Dosage = DRE.GetNullableString(reader, "Dosage", null),
                               
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


    }
}
