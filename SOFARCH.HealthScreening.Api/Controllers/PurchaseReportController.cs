using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.Api.Controllers
{
    public class PurchaseReportController : ApiController
    {
         private readonly Business.PurchaseReport _Purchase;


         public PurchaseReportController()
        {
            _Purchase = new Business.PurchaseReport();
        }



        [HttpPost]
        [Route("PurchaseReportPrint")]
         public String PuchaseReport(Entities.PurchaseReport purchase)
        {
            return _Purchase.generatePuchaseReport(purchase);
        }
    }
}