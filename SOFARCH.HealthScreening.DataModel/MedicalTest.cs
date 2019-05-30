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
    public class MedicalTest
    {
        private readonly Database database;

        public MedicalTest()
        {
            database = DBConnect.getDBConnection();
        }

        private Int32 AddMedicalTest(Entities.MedicalTest medicalTest, DbTransaction dbTransaction)
        {
            var medicalTestId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertMedicalTest))
                {
                    database.AddInParameter(dbCommand, "@medical_test_id", DbType.Int32, medicalTest.MedicalTestId);
                    database.AddInParameter(dbCommand, "@medical_test_name", DbType.String, medicalTest.TestName);
                    database.AddInParameter(dbCommand, "@is_parameters", DbType.Boolean, medicalTest.IsParameters);
                    database.AddInParameter(dbCommand, "@is_test_general", DbType.Boolean, medicalTest.IsGeneralTest);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, medicalTest.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, medicalTest.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    medicalTestId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        medicalTestId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return medicalTestId;
        }

        private bool DeleteMedicalTest(Entities.MedicalTest medicalTest, DbTransaction dbTransaction)
        {
            var isDeleted = false;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeleteMedicalTest))
                {
                    database.AddInParameter(dbCommand, "@medical_test_id", DbType.Int32, medicalTest.MedicalTestId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, medicalTest.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, medicalTest.DeletedByIP);

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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="medicalTest"></param>
        /// <returns></returns>
        private Int32 UpdateMedicalTest(Entities.MedicalTest medicalTest, DbTransaction dbTransaction)
        {
            var medicalTestId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdateMedicalTest))
                {
                    database.AddInParameter(dbCommand, "@medical_test_id", DbType.Int32, medicalTest.MedicalTestId);
                    database.AddInParameter(dbCommand, "@medical_test_name", DbType.String, medicalTest.TestName);
                    database.AddInParameter(dbCommand, "@is_parameters", DbType.Boolean, medicalTest.IsParameters);
                    database.AddInParameter(dbCommand, "@is_test_general", DbType.Boolean, medicalTest.IsGeneralTest);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, medicalTest.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, medicalTest.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    medicalTestId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        medicalTestId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return medicalTestId;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<Entities.MedicalTest> GetMedicalTestIdAndName()
        {
            var medicalTests = new List<Entities.MedicalTest>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetMedicalTestIdAndName))
                {
                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var medicalTest = new Entities.MedicalTest
                            {
                                MedicalTestId = DRE.GetNullableInt32(reader, "medical_test_id", 0),
                                TestName = DRE.GetNullableString(reader, "medical_test_name", null)
                            };

                            medicalTests.Add(medicalTest);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return medicalTests;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<Entities.MedicalTest> SearchAllMedicalTests()
        {
            var medicalTests = new List<Entities.MedicalTest>();

            using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.SearchMedicalTestAll))
            {
                using (IDataReader reader = database.ExecuteReader(dbCommand))
                {
                    while (reader.Read())
                    {
                        MedicalTestParameters medicalTestParameters = new MedicalTestParameters();

                        var medicalTest = new Entities.MedicalTest
                        {
                            MedicalTestId = DRE.GetNullableInt32(reader, "medical_test_id", 0),
                            TestName = DRE.GetNullableString(reader, "medical_test_name", null), 
                            IsParameters = DRE.GetNullableBoolean(reader, "is_parameters", null),
                            IsGeneralTest = DRE.GetNullableBoolean(reader, "is_test_general", null),
                            MedicalTestParameters = medicalTestParameters.GetMedicalTestParameterDetailsByTestId(DRE.GetInt32(reader, "medical_test_id"))
                        };

                        medicalTests.Add(medicalTest);
                    }
                }
            }

            return medicalTests;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="brandName"></param>
        /// <returns></returns>
        public Entities.MedicalTest SearchMedicalTestByName(string testName)
        {
            var medicalTestInfo = new Entities.MedicalTest();

            using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.SearchMedicalTestByName))
            {
                database.AddInParameter(dbCommand, "@test_name", DbType.String, testName);

                using (IDataReader reader = database.ExecuteReader(dbCommand))
                {
                    while (reader.Read())
                    {
                        var medicalTest = new Entities.MedicalTest
                        {
                            MedicalTestId = DRE.GetNullableInt32(reader, "medical_test_id", 0),
                            TestName = DRE.GetNullableString(reader, "medical_test_name", null),
                            IsParameters = DRE.GetNullableBoolean(reader, "is_parameters", null), 
                            IsGeneralTest = DRE.GetNullableBoolean(reader, "is_test_general", null)
                        };

                        medicalTestInfo = medicalTest;
                    }
                }
            }

            return medicalTestInfo;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="medicalTest"></param>
        /// <returns></returns>
        public Int32 SaveMedicalTest(Entities.MedicalTest medicalTest)
        {

            var medicalTestId = 0;

            var db = DBConnect.getDBConnection();

            using (DbConnection conn = db.CreateConnection())
            {
                conn.Open();

                using (DbTransaction dbTransaction = conn.BeginTransaction())
                {
                    try
                    {
                        var medicalTestParameterId = 0;

                        if (medicalTest != null)
                        {
                            if (medicalTest.MedicalTestId == null || medicalTest.MedicalTestId == 0)
                            {
                                medicalTestId = AddMedicalTest(medicalTest, dbTransaction);
                            }
                            else if (medicalTest.ModifiedBy != null || medicalTest.ModifiedBy > 0)
                            {
                                medicalTestId = UpdateMedicalTest(medicalTest, dbTransaction);
                            }
                            else if (medicalTest.IsDeleted == true)
                            {
                                var result = DeleteMedicalTest(medicalTest, dbTransaction);

                                if (result)
                                {
                                    medicalTestId = (int)medicalTest.MedicalTestId;
                                }
                                else
                                {
                                    medicalTestId = -1;
                                }
                            }

                            if (medicalTestId > 0)
                            {
                                if (medicalTest.IsDeleted == true)
                                {
                                    MedicalTestParameters medicalTestParametersDB = new MedicalTestParameters();

                                    var result = medicalTestParametersDB.DeleteMedicalTestParametersByMedicalTestId((int)medicalTest.MedicalTestId, (int)medicalTest.DeletedBy, medicalTest.DeletedByIP, dbTransaction);

                                    if (result)
                                    {
                                        medicalTestId = (int)medicalTest.MedicalTestId;
                                    }
                                }

                                if (medicalTest.MedicalTestParameters != null)
                                {
                                    if (medicalTest.MedicalTestParameters.Count > 0)
                                    {
                                        foreach (Entities.MedicalTestParameters medicalTestParameters in medicalTest.MedicalTestParameters)
                                        {
                                            MedicalTestParameters medicalTestParametersDB = new MedicalTestParameters();

                                            medicalTestParameters.MedicalTestId = medicalTestId;

                                            medicalTestParameterId = medicalTestParametersDB.SaveMedicalTestParameters(medicalTestParameters, dbTransaction);

                                            if (medicalTestParameterId < 0)
                                            {
                                                medicalTestId = -1;
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (medicalTestId > 0)
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
                        medicalTestId = -1;
                        dbTransaction.Rollback();
                        throw ex;
                    }
                }

                return medicalTestId;
            }
        }

    }
}
