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
    public class DrugDispense
    {
        private readonly Database database;

        public DrugDispense()
        {
            database = DBConnect.getDBConnection();
        }

        private Int32 AddDrugDispenseDetails(Entities.DrugDispense drugDispense, DbTransaction dbTransaction)
        {
            var drugDispenseId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertDrugDispense))
                {
                    database.AddInParameter(dbCommand, "@drug_dispense_id", DbType.Int32, drugDispense.DrugDispenseId);
                    database.AddInParameter(dbCommand, "@patient_id", DbType.Int32, drugDispense.PatientId);
                    database.AddInParameter(dbCommand, "@drug_dispense_date", DbType.String, drugDispense.DrugDispenseDate);
                    database.AddInParameter(dbCommand, "@working_period_id", DbType.Int32, drugDispense.WorkingPeriodId);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, drugDispense.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, drugDispense.CreatedByIP);

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

        private bool DeleteDrugDispenseDetails(Entities.DrugDispense drugDispense, DbTransaction dbTransaction)
        {
            var IsDrugDispenseDeleted = false;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeleteDrugDispense))
                {
                    database.AddInParameter(dbCommand, "@drug_dispense_id", DbType.Int32, drugDispense.DrugDispenseId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, drugDispense.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, drugDispense.DeletedByIP);

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

        private Int32 UpdateDrugDispenseDetails(Entities.DrugDispense drugDispense, DbTransaction dbTransaction)
        {
            var drugDispenseId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdateDrugDispense))
                {
                    database.AddInParameter(dbCommand, "@drug_dispense_id", DbType.Int32, drugDispense.DrugDispenseId);
                    database.AddInParameter(dbCommand, "@drug_dispense_date", DbType.String, drugDispense.DrugDispenseDate);
                    database.AddInParameter(dbCommand, "@working_period_id", DbType.Int32, drugDispense.WorkingPeriodId);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, drugDispense.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, drugDispense.ModifiedByIP);

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

        public Entities.DrugDispenseDrugUtilisation GetDrugDetailsByDrugId(Int32 drugId)
        {
            var drugDetails = new DrugDispenseDrugUtilisation();

            return drugDetails.GetDrugDetailsByDrugId(drugId);
        }

        public List<Entities.DrugDispense> SearchDrguDispense(Entities.DrugDispense drugDispense)
        {
            var drugDispenses = new List<Entities.DrugDispense>();

            using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetDrugDetailsByDrugId))
            {
                database.AddInParameter(dbCommand, "@full_name", DbType.String, drugDispense.PatientName);
                database.AddInParameter(dbCommand, "@employer_name", DbType.String, drugDispense.EmployerName);
                database.AddInParameter(dbCommand, "@patient_code", DbType.Int32, drugDispense.PatientCode);

                using (IDataReader reader = database.ExecuteReader(dbCommand))
                {
                    while (reader.Read())
                    {
                        var drugUtlisation = new DataModel.DrugDispenseDrugUtilisation();

                        var drugDispenseDetails = new Entities.DrugDispense()
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

            return drugDispenses;

        }

        public Int32 SaveDrugDispenseDetails(Entities.DrugDispense drugDispense)
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

                        if (drugDispense!= null)
                        {
                            if (drugDispense.DrugDispenseId == null || drugDispense.DrugDispenseId == 0)
                            {
                                drugDispenseId = AddDrugDispenseDetails(drugDispense, dbTransaction);
                            }
                            else if (drugDispense.ModifiedBy != null || drugDispense.ModifiedBy > 0)
                            {
                                drugDispenseId = UpdateDrugDispenseDetails(drugDispense, dbTransaction);
                            }
                            else if (drugDispense.IsDeleted == true)
                            {
                                var result = DeleteDrugDispenseDetails(drugDispense, dbTransaction);

                                if (result)
                                {
                                    drugDispenseId = (int)drugDispense.DrugDispenseId;
                                }
                                else
                                {
                                    drugDispenseId = -1;
                                }
                            }

                            if (drugDispenseId > 0)
                            {
                                if (drugDispense.IsDeleted == true)
                                {
                                    DrugDispenseDrugUtilisation drugUtilisationDB = new DrugDispenseDrugUtilisation();

                                    var result = drugUtilisationDB.DeleteDrugDispenseDrugUtilisationDetailsByDrugDispenseId((int)drugDispense.DrugDispenseId, (int)drugDispense.DeletedBy, drugDispense.DeletedByIP, dbTransaction);

                                    if (result)
                                    {
                                        drugDispenseDrugUtilisationId = (int)drugDispense.DrugDispenseId;
                                    }
                                }

                                if (drugDispense.DrugDispenseDrugUtilisations != null)
                                {
                                    if (drugDispense.DrugDispenseDrugUtilisations.Count > 0)
                                    {
                                        foreach (Entities.DrugDispenseDrugUtilisation drugUtilisation in drugDispense.DrugDispenseDrugUtilisations)
                                        {
                                            DrugDispenseDrugUtilisation drugUtilisationDB = new DrugDispenseDrugUtilisation();

                                            drugUtilisation.DrugDispenseId = drugDispenseId;

                                            drugDispenseDrugUtilisationId = drugUtilisationDB.SaveDrugDispenseDrugUtilisation(drugUtilisation, dbTransaction);

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

    }
}
