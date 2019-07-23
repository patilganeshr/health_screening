using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Collections;
using System.Web;

namespace SOFARCH.HealthScreening.Business
{
    public class MedicineDispenseRegister
    {
        public MedicineDispenseRegister()
        {

        }

        //public string generateReport(Entities.Medi preEmploymentDetails)
        //{
        //    var report = new BuidReport();
        //    var reportEntity = new Entities.Report();
        //    var reportName = string.Empty;
        //    var folderName = string.Empty;
        //    //var serverPath = HttpContext.Current.Server.MapPath("../POS/");

        //    var parameters = new ArrayList();

        //    parameters.Add(preEmploymentDetails.PreEmploymentId);

        //    folderName = "PreEmploymentDetails";
        //    reportName = "PreEmploymentDetails.rpt";


        //    var serverPath = HttpContext.Current.Server.MapPath("/HealthScreeningApp/");
        //    reportEntity.DirectoryPath = serverPath + "ApplicationFiles/" + folderName + "/";

        //    reportEntity.ReportPath = serverPath + "Reports/" + reportName;
        //    reportEntity.Parameters = parameters;
        //    reportEntity.FileStoragePath = reportEntity.DirectoryPath + Convert.ToString(preEmploymentDetails.PreEmploymentCodeNo) + ".pdf";

        //    return report.GenerateReport(reportEntity, CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
        //}
    }
}
