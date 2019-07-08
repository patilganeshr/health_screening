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

        public List<Entities.Precautions > GetAll()
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
                                PrecautionsId  = DRE.GetNullableInt32(reader, "prescription_id", 0),
                                DocName = DRE.GetNullableString(reader, "doctor_name", null),
                                PatientName = DRE.GetNullableString(reader, "full_name", null),
                                Age   = DRE.GetNullableInt32(reader, "age", 0),
                                MedicinesPre  = DRE.GetNullableString(reader, "medicines_pre", null), 
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

       



       private Int32 AddPrecautions(Entities.Precautions pre, DbTransaction dbTransaction)
        {
            var PrecautionsId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.Insertprescription))
                {

                    database.AddInParameter(dbCommand, "@doctor_name", DbType.String, pre.DocName);
                    database.AddInParameter(dbCommand, "@patient_name", DbType.String, pre.PatientName);
                    database.AddInParameter(dbCommand, "@age", DbType.Int32,pre.Age);
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





       public Int32 SavePrecaution(Entities.Precautions  pre)
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
                            
                                preId  = AddPrecautions(pre, transaction);
                           
                            
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
                        preId  = -1;
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
