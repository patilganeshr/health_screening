using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.Api.Controllers
{
    public class XrayReportsController : ApiController
    {
       
         private readonly Business.XrayReports _Stock;


         public XrayReportsController()
        {
           _Stock = new Business.XrayReports();
        }



         [HttpPost]
         [Route("XrayStockReportPrint")]
         public String XrayStockReportPrint(Entities.StockReport stock)
         {
             return _Stock.XrayStockReportPrint(stock);
         }
    }
}