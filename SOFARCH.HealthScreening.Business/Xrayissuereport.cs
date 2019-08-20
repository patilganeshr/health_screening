using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace SOFARCH.HealthScreening.Business
{
    public class Xrayissuereport
    {
        public string XrayIssueReportPrint(Entities.StockReport stock)
        {


            var report = new BuidReport();
            var reportEntity = new Entities.Report();
            var reportName = string.Empty;
            var folderName = string.Empty;
            //var serverPath = HttpContext.Current.Server.MapPath("../POS/");

            var parameters = new ArrayList();

            parameters.Add(stock.FromDate);
            parameters.Add(stock.ToDate);


            folderName = "StockReport";
            reportName = "X-RayIssueReport.rpt";


            var serverPath = HttpContext.Current.Server.MapPath("/HealthScreeningApp/");
            reportEntity.DirectoryPath = serverPath + "ApplicationFiles/" + folderName + "/";

            reportEntity.ReportPath = serverPath + "Reports/" + reportName;
            reportEntity.Parameters = parameters;
            reportEntity.FileStoragePath = reportEntity.DirectoryPath + Convert.ToString("XrayIssueReport") + ".pdf";

            return report.GenerateReport(reportEntity, CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);


        }
    }
}
