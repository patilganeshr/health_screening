using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace SOFARCH.HealthScreening.Business
{
    public class XrayReports
    {
        public string XrayStockReportPrint(Entities.StockReport stock)
        {


            var report = new BuidReport();
            var reportEntity = new Entities.Report();
            var reportName = string.Empty;
            var folderName = string.Empty;
            //var serverPath = HttpContext.Current.Server.MapPath("../POS/");

            var parameters = new ArrayList();

            parameters.Add(stock.Date);


            folderName = "StockReport";
            reportName = "X-rayStockDetailsReport.rpt";


            var serverPath = HttpContext.Current.Server.MapPath("/HealthScreeningApp/");
            reportEntity.DirectoryPath = serverPath + "ApplicationFiles/" + folderName + "/";

            reportEntity.ReportPath = serverPath + "Reports/" + reportName;
            reportEntity.Parameters = parameters;
            reportEntity.FileStoragePath = reportEntity.DirectoryPath + Convert.ToString("X-RayStockDetailsReport") + ".pdf";

            return report.GenerateReport(reportEntity, CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);


        }
    }
}
