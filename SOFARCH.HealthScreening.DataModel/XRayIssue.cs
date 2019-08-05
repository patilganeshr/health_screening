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
    public class XRayIssue
    {
        private readonly Database database;

        public XRayIssue()
        {
            database = DBConnect.getDBConnection();
        }

        private Int32 AddXRayIssueDetails(Entities.XRayIssue xrayIssue, DbTransaction dbTransaction)
        {
            var XRayIssueId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertXRayIssue))
                {
                    database.AddInParameter(dbCommand, "@xray_issue_id", DbType.Int32, xrayIssue.XRayIssueId);
                    database.AddInParameter(dbCommand, "@patient_id", DbType.Int32, xrayIssue.PatientId);
                    database.AddInParameter(dbCommand, "@xray_issue_date", DbType.String, xrayIssue.XRayIssueDate);
                    database.AddInParameter(dbCommand, "@part_of_body_to_xray", DbType.String, xrayIssue.PartOfBodyToXRay);
                    database.AddInParameter(dbCommand, "@is_ecg_done", DbType.Boolean, xrayIssue.IsECGDone);
                    database.AddInParameter(dbCommand, "@purpose", DbType.String, xrayIssue.Purpose);
                    database.AddInParameter(dbCommand, "@impression", DbType.String, xrayIssue.Impression);
                    database.AddInParameter(dbCommand, "@working_period_id", DbType.Int32, xrayIssue.WorkingPeriodId);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, xrayIssue.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, xrayIssue.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    XRayIssueId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        XRayIssueId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return XRayIssueId;
        }

        private bool DeleteXRayIssueDetails(Entities.XRayIssue xrayIssue, DbTransaction dbTransaction)
        {
            var IsXRayIssueDeleted = false;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeleteXRayIssue))
                {
                    database.AddInParameter(dbCommand, "@xray_issue_id", DbType.Int32, xrayIssue.XRayIssueId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, xrayIssue.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, xrayIssue.DeletedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    var result = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        IsXRayIssueDeleted = Convert.ToBoolean(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return IsXRayIssueDeleted;
        }

        private Int32 UpdateXRayIssueDetails(Entities.XRayIssue xrayIssue, DbTransaction dbTransaction)
        {
            var XRayIssueId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdateXRayIssue))
                {
                    database.AddInParameter(dbCommand, "@xray_issue_id", DbType.Int32, xrayIssue.XRayIssueId);
                    database.AddInParameter(dbCommand, "@patient_id", DbType.Int32, xrayIssue.PatientId);
                    database.AddInParameter(dbCommand, "@xray_issue_date", DbType.String, xrayIssue.XRayIssueDate);
                    database.AddInParameter(dbCommand, "@part_of_body_to_xray", DbType.String, xrayIssue.PartOfBodyToXRay);
                    database.AddInParameter(dbCommand, "@is_ecg_done", DbType.Boolean, xrayIssue.IsECGDone);
                    database.AddInParameter(dbCommand, "@purpose", DbType.String, xrayIssue.Purpose);
                    database.AddInParameter(dbCommand, "@impression", DbType.String, xrayIssue.Impression);
                    database.AddInParameter(dbCommand, "@working_period_id", DbType.Int32, xrayIssue.WorkingPeriodId);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, xrayIssue.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, xrayIssue.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    XRayIssueId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        XRayIssueId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return XRayIssueId;
        }

        public Entities.XRayFilmUsed GetFilmDetailsByDrugId(Int32 drugId)
        {
            var filmDetails = new XRayFilmUsed();

            return filmDetails.GetFilmDetailsByDrugId(drugId);
        }

        public List<Entities.XRayIssue> SearchXRayIssue(Entities.XRayIssue xrayIssue)
        {
            var xRayIssues = new List<Entities.XRayIssue>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.SearchXRayIssue))
                {
                    database.AddInParameter(dbCommand, "@financial_year", DbType.String, xrayIssue.FinancialYear);
                    database.AddInParameter(dbCommand, "@first_name", DbType.String, xrayIssue.FirstName);
                    database.AddInParameter(dbCommand, "@last_name", DbType.String, xrayIssue.LastName);
                    database.AddInParameter(dbCommand, "@xray_issue_from_date", DbType.String, xrayIssue.XRayIssueFromDate);
                    database.AddInParameter(dbCommand, "@xray_issue_to_date", DbType.String, xrayIssue.XRayIssueToDate);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var xrayFilmUsed = new DataModel.XRayFilmUsed();

                            var xRayIssue = new Entities.XRayIssue()
                            {
                                XRayIssueId = DRE.GetNullableInt32(reader, "xray_issue_id", 0),
                                XRayIssueNo = DRE.GetNullableInt32(reader, "xray_issue_no", null),
                                XRayIssueDate = DRE.GetNullableString(reader, "xray_issue_date", null),
                                PartOfBodyToXRay = DRE.GetNullableString(reader, "part_of_body_to_xray", null),
                                IsECGDone = DRE.GetNullableBoolean(reader, "is_ecg_done", null),
                                Purpose = DRE.GetNullableString(reader, "purpose", null),
                                Impression = DRE.GetNullableString(reader, "impression", null),
                                PatientId = DRE.GetNullableInt32(reader, "patient_id", null),
                                PatientCode = DRE.GetNullableInt32(reader, "patient_code", null),
                                PatientName = DRE.GetNullableString(reader, "full_name", null),
                                EmployerId = DRE.GetNullableInt32(reader, "employer_id", null),
                                EmployerCode = DRE.GetNullableInt32(reader, "employer_code", null),
                                EmployerName = DRE.GetNullableString(reader, "employer_name", null),
                                WorkingPeriodId = DRE.GetNullableInt32(reader, "working_period_id", null),
                                FinancialYear = DRE.GetNullableString(reader, "financial_year", null),
                                XRayFilmsUsed = xrayFilmUsed.GetFilmUsedDetailsByXRayIssueId(DRE.GetInt32(reader, "xray_issue_id"))
                            };

                            xRayIssues.Add(xRayIssue);
                        }
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return xRayIssues;
        }

        public List<Entities.XRayFilmUsed> GetFilmUsedDetailsByXRayIssueId(Int32 xrayIssueId)
        {
            var xrayfilmDetails = new XRayFilmUsed();

            return xrayfilmDetails.GetFilmUsedDetailsByXRayIssueId(xrayIssueId);
        }

        public List<Entities.XRayIssue> GetPastXRayIssueDatesByPatientId(Int32 patientId)
        {
            var xrayIssueDates = new List<Entities.XRayIssue>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetPastXRayIssuedDatesByPatientId))
                {
                    database.AddInParameter(dbCommand, "@patient_id", DbType.Int32, patientId);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var xRayIssue = new Entities.XRayIssue()
                            {
                                XRayIssueId = DRE.GetNullableInt32(reader, "xray_issue_id", null),
                                XRayIssueDate = DRE.GetNullableString(reader, "xray_issue_date", null)
                            };

                            xrayIssueDates.Add(xRayIssue);
                        }
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return xrayIssueDates;
        }

        public Int32 SaveXRayIssueDetails(Entities.XRayIssue xrayIssue)
        {
            var XRayIssueId = 0;

            var db = DBConnect.getDBConnection();

            using (DbConnection conn = db.CreateConnection())
            {
                conn.Open();

                using (DbTransaction dbTransaction = conn.BeginTransaction())
                {
                    try
                    {
                        var xrayFilmUsedId = 0;

                        if (xrayIssue != null)
                        {
                            if (xrayIssue.XRayIssueId == null || xrayIssue.XRayIssueId == 0)
                            {
                                XRayIssueId = AddXRayIssueDetails(xrayIssue, dbTransaction);
                            }
                            else if (xrayIssue.ModifiedBy != null || xrayIssue.ModifiedBy > 0)
                            {
                                XRayIssueId = UpdateXRayIssueDetails(xrayIssue, dbTransaction);
                            }
                            else if (xrayIssue.IsDeleted == true)
                            {
                                var result = DeleteXRayIssueDetails(xrayIssue, dbTransaction);

                                if (result)
                                {
                                    XRayIssueId = (int)xrayIssue.XRayIssueId;
                                }
                                else
                                {
                                    XRayIssueId = -1;
                                }
                            }

                            if (XRayIssueId > 0)
                            {
                                if (xrayIssue.IsDeleted == true)
                                {
                                    XRayFilmUsed xRayFilmUsed = new XRayFilmUsed();

                                    var result = xRayFilmUsed.DeleteXRayFilmUsedDetailsByXRayIssueId((int)xrayIssue.XRayIssueId, (int)xrayIssue.DeletedBy, xrayIssue.DeletedByIP, dbTransaction);

                                    if (result)
                                    {
                                        XRayIssueId = (int)xrayIssue.XRayIssueId;
                                    }
                                }

                                if (xrayIssue.XRayFilmsUsed != null)
                                {
                                    if (xrayIssue.XRayFilmsUsed.Count > 0)
                                    {
                                        foreach (Entities.XRayFilmUsed xrayFilmUsed in xrayIssue.XRayFilmsUsed)
                                        {
                                            XRayFilmUsed xRayFilmUsedDB = new XRayFilmUsed();

                                            xrayFilmUsed.XRayIssueId = XRayIssueId;

                                            xrayFilmUsedId = xRayFilmUsedDB.SaveXRayFilmUsed(xrayFilmUsed, dbTransaction);

                                            if (xrayFilmUsedId < 0)
                                            {
                                                XRayIssueId = -1;
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (XRayIssueId > 0)
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
                        XRayIssueId = -1;
                        dbTransaction.Rollback();
                        throw ex;
                    }
                }

                return XRayIssueId;
            }
        }

    }
}
