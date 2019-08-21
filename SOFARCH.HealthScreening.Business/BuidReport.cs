using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Configuration;
using System.Collections;
using System.IO;

using CrystalDecisions.CrystalReports;
using CrystalDecisions.Shared;
using CrystalDecisions.CrystalReports.Engine;
using System.Web;

namespace SOFARCH.HealthScreening.Business

{
    public class BuidReport
    {
        private TableLogOnInfo _tableLogOnInfo = null;
        private ReportDocument _reportDocument = null;
        private ConnectionInfo _dbConnectionInfo = null;

        private ExportOptions _exportOptions = null;
        private DiskFileDestinationOptions _diskFileDestinationOptions = null;
        private PdfRtfWordFormatOptions _reportFormatOptions = null;

        SqlConnectionStringBuilder connectionStringBuilder = null;

        public BuidReport()
        {

        }

        public string GenerateReport(Entities.Report report, ExportFormatType exportFormat)
        {
            string filePath = null;
            try
            {



            _tableLogOnInfo = new TableLogOnInfo();
            _reportDocument = new ReportDocument();

            connectionStringBuilder = new SqlConnectionStringBuilder(ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString);

            _dbConnectionInfo = new ConnectionInfo();
            _tableLogOnInfo = new TableLogOnInfo();


                //Create a folder if not exists
                if (Directory.Exists(report.DirectoryPath) == false)
                {
                    Directory.CreateDirectory(report.DirectoryPath);
                }

                var serverPath = HttpContext.Current.Server.MapPath("/HealthScreeningApp/");

                //File.AppendAllText(serverPath + "/log.txt", report.ReportPath);

                _reportDocument.Load(report.ReportPath);

                //Reading the db connection file
                string serverName = connectionStringBuilder.DataSource;
                string databaseName = connectionStringBuilder.InitialCatalog;
                string userId = connectionStringBuilder.UserID;
                string password = connectionStringBuilder.Password;

                _dbConnectionInfo.ServerName = serverName;
                _dbConnectionInfo.DatabaseName = databaseName;
                _dbConnectionInfo.UserID = userId;
                _dbConnectionInfo.Password = password;

                foreach (CrystalDecisions.CrystalReports.Engine.Table table in _reportDocument.Database.Tables)
                {
                    _tableLogOnInfo = table.LogOnInfo;
                    _tableLogOnInfo.ConnectionInfo = _dbConnectionInfo;
                    table.ApplyLogOnInfo(_tableLogOnInfo);
                }

                if (report.Parameters != null)
                {
                    if (report.Parameters.Count > 0)
                    {
                        for (int items = 0; items < report.Parameters.Count; items++)
                        {
                            _reportDocument.SetParameterValue(items, report.Parameters[items].ToString());
                        }
                    }
                    else if (report.Parameters.Count == 0)
                    {
                        _reportDocument.RecordSelectionFormula = report.RecordSelectionFormula;
                    }
                }
                else
                {
                    _reportDocument.RecordSelectionFormula = report.RecordSelectionFormula;
                }

                //serverPath = HttpContext.Current.Server.MapPath("/HealthScreeningApp/");

                //File.AppendAllText(serverPath + "/log.txt", "Report Parameters");

                _diskFileDestinationOptions = new DiskFileDestinationOptions();
                //_exportOptions = new ExportOptions();
                _reportFormatOptions = new PdfRtfWordFormatOptions();

                _exportOptions = _reportDocument.ExportOptions;

                _diskFileDestinationOptions.DiskFileName = report.FileStoragePath;
                _exportOptions.ExportDestinationType = ExportDestinationType.DiskFile;
                _exportOptions.ExportFormatType = exportFormat;
                _exportOptions.ExportDestinationOptions = _diskFileDestinationOptions;
                _exportOptions.ExportFormatOptions = _reportFormatOptions;

                _reportDocument.Export();

                //var serverPath = HttpContext.Current.Server.MapPath("/HealthScreeningApp/");

                //File.AppendAllText(serverPath + "/log.txt", "File Storeage path " + report.FileStoragePath);

                filePath = report.FileStoragePath;
            }
            catch (Exception ex)
            {
                //var serverPath = HttpContext.Current.Server.MapPath("/HealthScreeningApp/");

                //File.AppendAllText(serverPath + "/log.txt", ex.Message);

                throw new Exception("Error as " + ex.Message);
                //LogEntry.LogExceptions.WriteLog("ExportCrystalReportClassLibrary", ex.GetType().ToString(), ex.Message.ToString(), ex.Source.ToString(), "WEB");
            }
            finally
            {
                _reportDocument.Close();
            }

            return filePath;
        }
    }
}

