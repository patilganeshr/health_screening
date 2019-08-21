using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace SOFARCH.HealthScreening.Business
{
    public class PreEmploymentDetails
    {
        private readonly DataModel.PreEmploymentDetails _preEmploymentDetails;

        public PreEmploymentDetails()
        {
            _preEmploymentDetails = new DataModel.PreEmploymentDetails();
        }

        public Entities.PreEmploymentDetails GetPatientAndTestDetails(Int32 patientId)
        {
            return _preEmploymentDetails.GetPatientAndTestDetails(patientId);
        }

        public List<Entities.PreEmploymentDetails> GetAllPreEmploymentDetails(string preEmploymentOrHealthCheckup)
        {
            return _preEmploymentDetails.GetAllPreEmploymentDetails(preEmploymentOrHealthCheckup);
        }
        public List<Entities.PreEmploymentDetails> SearchPreEmploymentDetails(Entities.PreEmploymentDetails preEmploymentDetails)
        {
            return _preEmploymentDetails.SearchPreEmploymentDetails(preEmploymentDetails);
        }

        public Int32 SavePreEmploymentDetails(Entities.PreEmploymentDetails preEmploymentDetails)
        {
            return _preEmploymentDetails.SavePreEmploymentDetails(preEmploymentDetails);
        }

        public string generateReport(Entities.PreEmploymentDetails preEmploymentDetails)
        {
            var report = new BuidReport();
            var reportEntity = new Entities.Report();
            var reportName = string.Empty;
            var folderName = string.Empty;
            //var serverPath = HttpContext.Current.Server.MapPath("../POS/");
            var fileName = "No Records";

            try
            {
                var parameters = new ArrayList();

                parameters.Add(preEmploymentDetails.PreEmploymentId);

                folderName = "PreEmploymentDetails";
                reportName = "PreEmploymentDetails.rpt";

                if (preEmploymentDetails.PreEmploymentOrHealthCheckup.ToLower() == "h")
                {

                    folderName = "HealthCheckupDetails";
                    reportName = "HealthCheckupDetails.rpt";

                }

                ////LogWriter logWriter = new LogWriter(fileName);

                ////LogWriter //logWriter = new LogWriter("Inside Generate REport Method");

                //LogWriter logWriter = new LogWriter(folderName + ", " + reportName + ", " + preEmploymentDetails.PreEmploymentId.ToString() + ", " + "," + preEmploymentDetails.PreEmploymentOrHealthCheckup);

                var serverPath = HttpContext.Current.Server.MapPath("/HealthScreeningApp/");
                reportEntity.DirectoryPath = serverPath + "ApplicationFiles/" + folderName + "/";

                reportEntity.ReportPath = serverPath + "Reports/" + reportName;
                reportEntity.Parameters = parameters;
                reportEntity.FileStoragePath = reportEntity.DirectoryPath + Convert.ToString(preEmploymentDetails.PreEmploymentCodeNo) + ".pdf";

                //logWriter = new LogWriter(folderName + ", " + reportName + ", " + reportEntity.DirectoryPath + ", " + "," + reportEntity.FileStoragePath);

                fileName = report.GenerateReport(reportEntity, CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
            }
            catch (Exception ex)
            {
                LogWriter logWriter = new LogWriter("Inside Generate REport Method");

                logWriter = new LogWriter(ex.Message);

            }

            return fileName;
        }

        public class LogWriter
        {
            private string m_exePath = string.Empty;
            public LogWriter(string logMessage)
            {
                LogWrite(logMessage);
            }
            public void LogWrite(string logMessage)
            {
                var serverPath = HttpContext.Current.Server.MapPath("/HealthScreeningApp/");

                m_exePath = Path.GetDirectoryName(serverPath);
                try
                {
                    using (StreamWriter w = File.AppendText(serverPath + "/" + "log.txt"))
                    {
                        Log(logMessage, w);
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

            public void Log(string logMessage, TextWriter txtWriter)
            {
                try
                {
                    txtWriter.Write("\r\nLog Entry : ");
                    txtWriter.WriteLine("{0} {1}", DateTime.Now.ToLongTimeString(),
                        DateTime.Now.ToLongDateString());
                    txtWriter.WriteLine("  :");
                    txtWriter.WriteLine("  :{0}", logMessage);
                    txtWriter.WriteLine("-------------------------------");
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

    }
}
