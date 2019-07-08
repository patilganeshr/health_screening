using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
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

            var parameters = new ArrayList();

            parameters.Add(preEmploymentDetails.PreEmploymentId);

            folderName = "PreEmploymentDetails";
            reportName = "PreEmploymentDetails.rpt";


            var serverPath = HttpContext.Current.Server.MapPath("/HealthScreeningApp/");
            reportEntity.DirectoryPath = serverPath + "ApplicationFiles/" + folderName + "/";

            reportEntity.ReportPath = serverPath + "Reports/" + reportName;
            reportEntity.Parameters = parameters;
            reportEntity.FileStoragePath = reportEntity.DirectoryPath + Convert.ToString(preEmploymentDetails.PreEmploymentCodeNo) + ".pdf";

            return report.GenerateReport(reportEntity, CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
        }
    }
}
