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
    public class Patient
    {
        private readonly Database database;

        public Patient()
        {
            database = DBConnect.getDBConnection();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="patient"></param>
        /// <returns></returns>
        private Int32 AddPatient(Entities.Patient patient, DbTransaction dbTransaction)
        {
            var patientId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertPatient))
                {
                    database.AddInParameter(dbCommand, "@patient_id", DbType.Int32, patient.PatientId);
                    database.AddInParameter(dbCommand, "@title", DbType.String, patient.Title);
                    database.AddInParameter(dbCommand, "@first_name", DbType.String, patient.FirstName);
                    database.AddInParameter(dbCommand, "@middle_name", DbType.String, patient.MiddleName);
                    database.AddInParameter(dbCommand, "@last_name", DbType.String, patient.LastName);
                    database.AddInParameter(dbCommand, "@address", DbType.String, patient.Address);
                    database.AddInParameter(dbCommand, "@date_of_birth", DbType.String, patient.DateOfBirth);
                    database.AddInParameter(dbCommand, "@contact_no_1", DbType.String, patient.ContactNo1);
                    database.AddInParameter(dbCommand, "@contact_no_2", DbType.String, patient.ContactNo2);
                    database.AddInParameter(dbCommand, "@mobile_no_1", DbType.String, patient.MobileNo1);
                    database.AddInParameter(dbCommand, "@mobile_no_2", DbType.String, patient.MobileNo2);
                    database.AddInParameter(dbCommand, "@email_id", DbType.String, patient.EmailId);
                    database.AddInParameter(dbCommand, "@pan_no ", DbType.String, patient.PANNo);
                    database.AddInParameter(dbCommand, "@department", DbType.String, patient.Department);
                    database.AddInParameter(dbCommand, "@designation", DbType.String, patient.Designation);
                    database.AddInParameter(dbCommand, "@gender", DbType.String, patient.Gender);
                    database.AddInParameter(dbCommand, "@employer_id", DbType.Int32, patient.EmployerId);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, patient.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, patient.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    patientId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        patientId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
          
            return patientId;
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="patient"></param>
        /// <returns></returns>
        private bool DeletePatient(Entities.Patient patient, DbTransaction dbTransaction)
        {
            bool isDeleted = false;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeletePatient))
                {
                    database.AddInParameter(dbCommand, "@patient_id", DbType.Int32, patient.PatientId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, patient.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, patient.DeletedByIP);

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

        public bool IsPatientNameExists(Int32 employerId, string patientName)
        {
            bool isPatientNameExists = false;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.CheckPatientNameIsExists   ))
                {
                    database.AddInParameter(dbCommand, "@employer_id", DbType.Int32, employerId);
                    database.AddInParameter(dbCommand, "@patient_name", DbType.String, patientName);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while(reader.Read())
                        {
                            isPatientNameExists = reader.GetBoolean(reader.GetOrdinal("is_patient_name_exists"));
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return isPatientNameExists;
        }

        private List<Entities.Patient> GetPatients(IDataReader reader)
        {
            var patients = new List<Entities.Patient>();

            while (reader.Read())
            {
                PatientPersonalHistory patientPersonalHistory = new PatientPersonalHistory();
                PatientExerciseHistory patientExerciseHistory = new PatientExerciseHistory();

                var patient = new Entities.Patient
                {
                    PatientId = DRE.GetNullableInt32(reader, "patient_id", 0),
                    PatientCode = DRE.GetNullableInt32(reader, "patient_code", null),
                    Title = DRE.GetNullableString(reader, "title", null),
                    FirstName = DRE.GetNullableString(reader, "first_name", null),
                    MiddleName = DRE.GetNullableString(reader, "middle_name", null),
                    LastName = DRE.GetNullableString(reader, "last_name", null),
                    FullName = DRE.GetNullableString(reader, "full_name", null),
                    Address = DRE.GetNullableString(reader, "address", null),
                    Gender = DRE.GetNullableString(reader, "gender", null),
                    DateOfBirth = DRE.GetNullableString(reader, "date_of_birth", null),
                    ContactNos = DRE.GetNullableString(reader, "contact_nos", null),
                    ContactNo1 = DRE.GetNullableString(reader, "contact_no_1", null),
                    ContactNo2 = DRE.GetNullableString(reader, "contact_no_2", null),
                    MobileNo1 = DRE.GetNullableString(reader, "mobile_no_1", null),
                    MobileNo2 = DRE.GetNullableString(reader, "mobile_no_2", null),
                    EmailId = DRE.GetNullableString(reader, "email_id", null),
                    PANNo = DRE.GetNullableString(reader, "pan_no", null),
                    Department = DRE.GetNullableString(reader, "department", null),
                    Designation = DRE.GetNullableString(reader, "designation", null),
                    EmployerId = DRE.GetNullableInt32(reader, "employer_id", null),
                    EmployerName = DRE.GetNullableString(reader, "employer_name", null),
                    PatientPersonalHistory = patientPersonalHistory.GetPatientPersonalHistoriesByPatientId(DRE.GetInt32(reader, "patient_id")),
                    PatientExerciseHistories = patientExerciseHistory.GetPatientExerciseHistoriesByPatientId(DRE.GetInt32(reader, "patient_id"))
                };

                patients.Add(patient);
            }

            return patients;
        }


        public List<Entities.Patient> SearchAllPatients()
        {
            List<Entities.Patient> patients = new List<Entities.Patient>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.SearchAllPatients))
                {   
                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        patients = GetPatients(reader);
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return patients;
        }


        public List<Entities.Patient> GetPatientIdAndNameByPatientName(string patientName)
        {
            List<Entities.Patient> patients = new List<Entities.Patient>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetPatientIdAndNameByPatientName))
                {
                    database.AddInParameter(dbCommand, "@patient_name", DbType.String, patientName);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        var patient = new Entities.Patient()
                        {
                            PatientId = DRE.GetNullableInt32(reader, "patient_id", null),
                            PatientCode = DRE.GetNullableInt32(reader, "patient_code", null),
                            EmployerName = DRE.GetNullableString(reader, "employer_name", null),
                            FullName = DRE.GetNullableString(reader, "full_name", null)
                        };

                        patients.Add(patient);
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return patients;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="patientId"></param>
        /// <returns></returns>
        public Entities.Patient GetPatientDetailsById(Int32 patientId)
        {
            var patientInfo = new Entities.Patient();

            using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetPatientDetailsById)) {

                database.AddInParameter(dbCommand, "@patient_id", DbType.Int32, patientId);

                using (IDataReader reader = database.ExecuteReader(dbCommand))
                {
                    while (reader.Read())
                    {
                        var patient = new Entities.Patient()
                        {
                            PatientId = DRE.GetNullableInt32(reader, "patient_id", 0),
                            PatientCode = DRE.GetNullableInt32(reader, "patient_code", null),
                            Title = DRE.GetNullableString(reader, "title", null),
                            FirstName = DRE.GetNullableString(reader, "first_name", null),
                            MiddleName = DRE.GetNullableString(reader, "middle_name", null),
                            LastName = DRE.GetNullableString(reader, "last_name", null),
                            FullName = DRE.GetNullableString(reader, "full_name", null),
                            Gender = DRE.GetNullableString(reader, "gender", null),
                            Address = DRE.GetNullableString(reader, "address", null),
                            DateOfBirth = DRE.GetNullableString(reader, "date_of_birth", null),
                            ContactNo1 = DRE.GetNullableString(reader, "contact_no_1", null),
                            ContactNo2 = DRE.GetNullableString(reader, "contact_no_2", null),
                            MobileNo1 = DRE.GetNullableString(reader, "mobile_no_1", null),
                            MobileNo2 = DRE.GetNullableString(reader, "mobile_no_2", null),
                            EmailId = DRE.GetNullableString(reader, "email_id", null),
                            PANNo = DRE.GetNullableString(reader, "pan_no", null),
                            Department = DRE.GetNullableString(reader, "department", null),
                            Designation = DRE.GetNullableString(reader, "designation", null),
                            EmployerId = DRE.GetNullableInt32(reader, "employer_id", null),
                            EmployerName = DRE.GetNullableString(reader, "employer_name", null)
                        };

                        patientInfo = patient;
                    }
                }
            }

            return patientInfo;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="patient"></param>
        /// <returns></returns>
        private Int32 UpdatePatient(Entities.Patient patient, DbTransaction dbTransaction)
        {
            var patientId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdatePatient))
                {
                    database.AddInParameter(dbCommand, "@patient_id", DbType.Int32, patient.PatientId);
                    database.AddInParameter(dbCommand, "@title", DbType.String, patient.Title);
                    database.AddInParameter(dbCommand, "@first_name", DbType.String, patient.FirstName);
                    database.AddInParameter(dbCommand, "@middle_name", DbType.String, patient.MiddleName);
                    database.AddInParameter(dbCommand, "@last_name", DbType.String, patient.LastName);
                    database.AddInParameter(dbCommand, "@address", DbType.String, patient.Address);
                    database.AddInParameter(dbCommand, "@date_of_birth", DbType.String, patient.DateOfBirth);
                    database.AddInParameter(dbCommand, "@contact_no_1", DbType.String, patient.ContactNo1);
                    database.AddInParameter(dbCommand, "@contact_no_2", DbType.String, patient.ContactNo2);
                    database.AddInParameter(dbCommand, "@mobile_no_1", DbType.String, patient.MobileNo1);
                    database.AddInParameter(dbCommand, "@mobile_no_2", DbType.String, patient.MobileNo2);
                    database.AddInParameter(dbCommand, "@email_id", DbType.String, patient.EmailId);
                    database.AddInParameter(dbCommand, "@pan_no ", DbType.String, patient.PANNo);
                    database.AddInParameter(dbCommand, "@department", DbType.String, patient.Department);
                    database.AddInParameter(dbCommand, "@designation", DbType.String, patient.Designation);
                    database.AddInParameter(dbCommand, "@gender", DbType.String, patient.Gender);
                    database.AddInParameter(dbCommand, "@employer_id", DbType.Int32, patient.EmployerId);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, patient.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, patient.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    patientId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        patientId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            
            return patientId;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="patient"></param>
        /// <returns></returns>
        public Int32 SavePatient(Entities.Patient patient)
        {
            var patientId = 0;

            var db = DBConnect.getDBConnection();

            using(DbConnection conn = db.CreateConnection())
            {
                conn.Open();

                using(DbTransaction transaction = conn.BeginTransaction())
                {
                    try
                    {
                        var patientPersonalHistoryId = 0;
                        var patientExerciseHistoryId = 0;

                        if (patient != null)
                        {
                            if (patient.PatientId == null || patient.PatientId == 0)
                            {
                                patientId = AddPatient(patient, transaction);
                            }
                            else if (patient.ModifiedBy != null || patient.ModifiedBy > 0)
                            {
                                patientId = UpdatePatient(patient, transaction);
                            }
                            else if (patient.IsDeleted == true)
                            {
                                var result = DeletePatient(patient, transaction);

                                
                                if (result)
                                {
                                    patientId = (int)patient.PatientId;
                                }
                                else
                                {
                                    patientId = 1;
                                }
                            }

                            if (patientId > 0)
                            {
                                if (patient.PatientPersonalHistory != null)
                                {
                                    PatientPersonalHistory personalHistory = new PatientPersonalHistory();

                                    patient.PatientPersonalHistory.PatientId = patientId;

                                    patientPersonalHistoryId = personalHistory.SavePatientPersonalHistory(patient.PatientPersonalHistory, transaction);

                                    if (patientPersonalHistoryId < 0)
                                    {
                                        patientId = -1;
                                    }

                                }

                                if (patient.PatientExerciseHistories != null)
                                {
                                    if (patient.PatientExerciseHistories.Count > 0)
                                    {
                                        foreach (Entities.PatientExerciseHistory patientExerciseHistory in patient.PatientExerciseHistories)
                                        {
                                            PatientExerciseHistory exerciseHistory = new PatientExerciseHistory();

                                            patientExerciseHistory.PatientId = patientId;

                                            patientExerciseHistoryId =  exerciseHistory.SavePatientExerciseHistory(patientExerciseHistory, transaction);

                                            if (patientExerciseHistoryId < 0)
                                            {
                                                patientId = -1;
                                            }
                                        }
                                    }

                                }

                            }
                        }

                        if (patientId > 0)
                        {
                            transaction.Commit();
                        }
                        else
                        {
                            transaction.Rollback();
                        }
                    }
                    catch(Exception ex)
                    {
                        patientId = -1;
                        transaction.Rollback();
                        throw ex;
                    }
                }
            }
            

            return patientId;
        }

    }
}
