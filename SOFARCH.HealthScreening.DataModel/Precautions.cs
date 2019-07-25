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

        public List<Entities.Precautions> GetAll()
        {
            var Precas = new List<Entities.Precautions>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetListOfAll))
                {
                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var Preca = new Entities.Precautions
                            {
                                PrecautionsId = DRE.GetNullableInt32(reader, "Precautions_id", 0),
                                DocName = DRE.GetNullableString(reader, "doctor_name", null),
                                PatientName = DRE.GetNullableString(reader, "full_name", null),
                                Age = DRE.GetNullableInt32(reader, "age", 0),
                                Date = DRE.GetNullableString(reader, "Date", null),
                                guid = DRE.GetNullableGuid(reader, "row_guid", null),
                                SrNo = DRE.GetNullableInt64(reader, "sr_no", null)

                            };


                            Precas.Add(Preca);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Precas;
        }




        public List<Entities.Precautions> GetAllPreDetail(Int32 PrecautionsId)

        {
            var Precas = new List<Entities.Precautions>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetListOfAllDetails))
                {
                    database.AddInParameter(dbCommand, "@PrecautionsId", DbType.Int32, PrecautionsId);
                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var Preca = new Entities.Precautions
                            {
                                DrugId = DRE.GetNullableInt32(reader, "drug_code", 0),
                                DrugCode = DRE.GetNullableInt32(reader, "drug_code", 0),
                               DrugName  = DRE.GetNullableString(reader, "drug_name", null),
                               DispenseQty = DRE.GetNullableInt32(reader, "qty", 0),
                                Dosage = DRE.GetNullableInt32(reader, "Dosage", 0),    
                                guid = DRE.GetNullableGuid(reader, "row_guid", null),
                               
                            };


                            Precas.Add(Preca);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Precas;
        }





        private Int32 AddPrecautions(Entities.Precautions pre, DbTransaction dbTransaction)
        {
            var PrecautionsId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.Insertprescription))
                {

                    database.AddInParameter(dbCommand, "@doctor_name", DbType.String, pre.DocName);
                    database.AddInParameter(dbCommand, "@patient_name", DbType.String, pre.PatientName);
                    database.AddInParameter(dbCommand, "@age", DbType.Int32, pre.Age);
                    database.AddInParameter(dbCommand, "@medicines_pre", DbType.String, pre.MedicinesPre);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, pre.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, pre.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    PrecautionsId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        PrecautionsId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return PrecautionsId;
        }




        private Int32 UpdatePrecautions(Entities.Precautions pre, DbTransaction dbTransaction)
        {
            var PrecautionsId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.Updateprescription))
                {

                    database.AddInParameter(dbCommand, "@PrecautionsId", DbType.Int32, pre.PrecautionsId);
                    database.AddInParameter(dbCommand, "@doctor_name", DbType.String, pre.DocName);
                    database.AddInParameter(dbCommand, "@patient_name", DbType.String, pre.PatientName);
                    database.AddInParameter(dbCommand, "@age", DbType.Int32, pre.Age);
                    database.AddInParameter(dbCommand, "@medicines_pre", DbType.String, pre.MedicinesPre);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, pre.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, pre.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    PrecautionsId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        PrecautionsId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return PrecautionsId;
        }




        public bool DeletePrecautions(Entities.Precautions Per)
        {
            bool isDeleted = false;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.Deleteprescription))
                {
                    database.AddInParameter(dbCommand, "@PrecautionsId", DbType.Int32, Per.PrecautionsId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, Per.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, Per.DeletedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    var result = database.ExecuteNonQuery(dbCommand);

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



        private Int32 AddPrecautionsDrug(Entities.Precautions pre, DbTransaction dbTransaction)
        {
            var PrecautionsId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertprescriptionDrug))
                {

                    database.AddInParameter(dbCommand, "@Precautions_id", DbType.Int32, pre.PrecautionsId);
                    database.AddInParameter(dbCommand, "@drug_Code", DbType.Int32, pre.DrugId);
                    database.AddInParameter(dbCommand, "@drug_name", DbType.String , pre.DrugName);
                    database.AddInParameter(dbCommand, "@qty", DbType.Int32, pre.DispenseQty);
                    database.AddInParameter(dbCommand, "@dosage", DbType.String, pre.Dosage);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, pre.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, pre.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    PrecautionsId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        PrecautionsId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return PrecautionsId;
        }




        public Int32 SavePrecautionDrug(Entities.Precautions pre)
        {
            var preId = 0;

            var db = DBConnect.getDBConnection();

            using (DbConnection conn = db.CreateConnection())
            {
                conn.Open();

                using (DbTransaction transaction = conn.BeginTransaction())
                {
                    try
                    {


                        if (pre != null)
                        {
                            if (pre == null || pre.PrecautionsId >= 0)
                            {
                                preId = AddPrecautionsDrug(pre, transaction);
                            }
                            else if (pre.ModifiedBy != null || pre.ModifiedBy > 0)
                            {
                                preId = UpdatePrecautions(pre, transaction);
                            }
                            else if (pre.DeletedBy != null || pre.DeletedBy > 0)
                            {
                                var result = DeletePrecautions(pre);
                                if (result == true)
                                {
                                    preId = 1;
                                }
                            }
                        }
                        if (preId > 0)
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
                        preId = -1;
                        transaction.Rollback();
                        throw ex;
                    }
                    finally
                    {
                        db = null;
                    }
                }
            }

            return preId;
        }



        public Int32 SavePrecaution(Entities.Precautions pre)
        {
            var preId = 0;

            var db = DBConnect.getDBConnection();

            using (DbConnection conn = db.CreateConnection())
            {
                conn.Open();

                using (DbTransaction transaction = conn.BeginTransaction())
                {
                    try
                    {


                        if (pre != null)
                        {
                            if (pre == null || pre.PrecautionsId == 0)
                            {
                                preId = AddPrecautions(pre, transaction);
                            }
                            else if (pre.ModifiedBy != null || pre.ModifiedBy > 0)
                            {
                                preId = UpdatePrecautions(pre, transaction);
                            }
                            else if (pre.DeletedBy != null || pre.DeletedBy > 0)
                            {
                                var result = DeletePrecautions(pre);
                                if (result == true)
                                {
                                    preId = 1;
                                }
                            }
                        }
                        if (preId > 0)
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
                        preId = -1;
                        transaction.Rollback();
                        throw ex;
                    }
                    finally
                    {
                        db = null;
                    }
                }
            }

            return preId;
        }


    }
}
