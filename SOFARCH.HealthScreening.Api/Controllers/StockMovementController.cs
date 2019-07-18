using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.Api.Controllers
{
    public class StockMovementController : ApiController
    {

          private readonly Business.DrugDispense _drugDispense;

          public StockMovementController()
        {
            _drugDispense = new Business.DrugDispense();
        }


    }
}