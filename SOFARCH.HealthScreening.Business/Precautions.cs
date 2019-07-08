using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Collections;

using System.IO;
using System.Configuration;
using System.Web;
using System.Web.Configuration;

using System.Data.SqlClient;
using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;

namespace SOFARCH.HealthScreening.Business
{
   public class Precautions
    {

        private readonly DataModel.Precautions _Pre;
        public Precautions()
        {
            _Pre = new DataModel.Precautions();
        }

        public Int32 SavePrecaution(Entities.Precautions pre)
        {
            return _Pre.SavePrecaution(pre);
        }

        public List<Entities.Precautions> GetAll()
        {
            return _Pre.GetAll();
        }


        public string generateReport(Entities.Precautions  pre)
        {
            var report = new BuidReport();
            var reportEntity = new Entities.Report();
            var reportName = string.Empty;
            var folderName = string.Empty;
            //var serverPath = HttpContext.Current.Server.MapPath("../POS/");

            var parameters = new ArrayList();

            parameters.Add(pre.PrecautionsId);

           
            reportName = "Reports2.rpt";

            var serverPath = HttpContext.Current.Server.MapPath("/HealthScreeningApp/");
            reportEntity.DirectoryPath = serverPath + "ApplicationFiles/Sales/" + Convert.ToString(pre.PrecautionsId) + "/";

            reportEntity.ReportPath = serverPath + "Reports/" + reportName;
            reportEntity.Parameters = parameters;
            reportEntity.FileStoragePath = reportEntity.DirectoryPath + "BillNo_" + Convert.ToString(pre.PrecautionsId) + ".pdf";

            return report.GenerateReport(reportEntity, CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
        }



    }
}
