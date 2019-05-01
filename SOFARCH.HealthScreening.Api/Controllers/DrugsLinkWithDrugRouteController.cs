using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.Api.Controllers
{
    public class DrugsLinkWithDrugRouteController : ApiController
    {
        private readonly Business.DrugsLinkWithDrugRoute _drugsLinkWithDrugRoute;

        public DrugsLinkWithDrugRouteController()
        {
            _drugsLinkWithDrugRoute = new Business.DrugsLinkWithDrugRoute();
        }

        [Route("GetDrugLinkByDrugId/{drugId = null}")]
        public List<Entities.DrugLinkWithDrugRoutes> GetDrugLinkByDrugId(Int32? drugId = null)
        {
            return _drugsLinkWithDrugRoute.GetDrugLinkByDrugId(drugId);
        }

    }
}
