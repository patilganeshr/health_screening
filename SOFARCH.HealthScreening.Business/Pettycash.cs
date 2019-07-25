using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System;
using System.Collections;
using System.Web;




namespace SOFARCH.HealthScreening.Business
{
    public  class Pettycash
    {
         private readonly DataModel.Pettycash  _Petty;

         public Pettycash()
        {
            _Petty = new DataModel.Pettycash();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="employer"></param>
        /// <returns></returns>
         public Int32 SavePettycash(Entities.Pettycash Petty)
        {
            return _Petty.SavePettycash(Petty);
        }

         public List<Entities.Pettycash> GetAllPettyCashDocno()
        {
            return _Petty.GetAllPettyCashDocno();
        }


        public Entities.Pettycash  GetPettycashDetailsById(Int32 employerId)
        {
            return _Petty.GetPettycashDetailsById(employerId);
        }


        public List<Entities.AccountHead> GetAllAccountHeads()
        {
            return _Petty.GetAllAccountHeads();
        }

        public string generateReportsss(Entities.Pettycash Petty)
        {
           

                var report = new BuidReport();
                var reportEntity = new Entities.Report();
                var reportName = string.Empty;
                var folderName = string.Empty;
                //var serverPath = HttpContext.Current.Server.MapPath("../POS/");

                var parameters = new ArrayList();

                parameters.Add(Petty.FromDate);
                parameters.Add(Petty.ToDate);

                folderName = "PettyCashReport";
                reportName = "PettyCashReport.rpt";


                var serverPath = HttpContext.Current.Server.MapPath("/HealthScreeningApp/");
                reportEntity.DirectoryPath = serverPath + "ApplicationFiles/" + folderName + "/";

                reportEntity.ReportPath = serverPath + "Reports/" + reportName;
                reportEntity.Parameters = parameters;
                reportEntity.FileStoragePath = reportEntity.DirectoryPath + Convert.ToString("PettyCashReport") + ".pdf";

                return report.GenerateReport(reportEntity, CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
            
           
        }


    }
}
