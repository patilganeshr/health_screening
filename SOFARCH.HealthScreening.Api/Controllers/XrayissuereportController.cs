using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.Api.Controllers
{
    public class XrayissuereportController : ApiController
    {
          private readonly Business.Xrayissuereport _Stock;


          public XrayissuereportController()
        {
           _Stock = new Business.Xrayissuereport();
        }



         [HttpPost]
         [Route("XrayIssueReportPrint")]
          public String XrayIssueReportPrint(Entities.StockReport stock)
         {
             return _Stock.XrayIssueReportPrint(stock);
         }
    }
}