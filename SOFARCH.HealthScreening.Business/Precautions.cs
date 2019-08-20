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

       
        private readonly DataModel.Precautions _drugDispense;

        public Precautions()
        {
            _drugDispense = new DataModel.Precautions();
        }

        public Entities.PrecautionsList GetDrugDetailsByDrugId(Int32 drugId)
        {
            return _drugDispense.GetDrugDetailsByDrugId(drugId);
        }

        public List<Entities.Precautions> SearchDrguDispense(Entities.Precautions drugDispense)
        {
            return _drugDispense.SearchDrguDispense(drugDispense);
        }

        public List<Entities.Precautions> GetPastDrugDispenseDatesByPatientId(Int32 patientId)
        {
            return _drugDispense.GetPastDrugDispenseDatesByPatientId(patientId);
        }

        public List<Entities.PrecautionsList> GetDrugUtilisationByDrugDispenseId(Int32 drugDispenseId)
        {
            return _drugDispense.GetDrugUtilisationByDrugDispenseId(drugDispenseId);
        }

        public Int32 SaveDrugDispenseDetails(Entities.Precautions drugDispense)
        {
            return _drugDispense.SaveDrugDispenseDetails(drugDispense);
        }





        public string generateReport(Entities.Precautions pre)
        {
            var report = new BuidReport();
            var reportEntity = new Entities.Report();
            var reportName = string.Empty;
            var folderName = string.Empty;
            //var serverPath = HttpContext.Current.Server.MapPath("../POS/");

            var parameters = new ArrayList();

            parameters.Add(pre.DrugDispenseId);

            reportName = "Precaution_Reports.rpt";

            var serverPath = HttpContext.Current.Server.MapPath("/HealthScreeningApp/");
            reportEntity.DirectoryPath = serverPath + "ApplicationFiles/PatientNo/";

            reportEntity.ReportPath = serverPath + "Reports/" + reportName;
            reportEntity.Parameters = parameters;
            reportEntity.FileStoragePath = reportEntity.DirectoryPath + "PatientNo_" + Convert.ToString(pre.DrugDispenseId) + ".pdf";

            return report.GenerateReport(reportEntity, CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
        }



    }
}
