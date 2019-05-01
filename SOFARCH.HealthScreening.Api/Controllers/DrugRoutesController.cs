using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.Api.Controllers
{
    public class DrugRoutesController : ApiController
    {
        private readonly Business.DrugRoutes _drugRoutes;

        public DrugRoutesController ()
        {
            _drugRoutes = new Business.DrugRoutes();
        }

        [Route("GetAllDrugRouteIdAndRouteName")]
        public List<Entities.DrugRoutes> GetAllDrugRouteIdAndRouteName()
        {
            return _drugRoutes.GetAllDrugRouteIdAndRouteName();
        }

        [Route("GetDrugRouteDetailsById/{drugRouteId}")]
        public Entities.DrugRoutes GetDrugRouteDetailsById(Int32 drugRouteId)
        {
            return _drugRoutes.GetDrugRouteDetailsById(drugRouteId);
        }

        [Route("GetDrugRouteDetailsByName/{drugRouteName}")]
        public Entities.DrugRoutes GetDrugRouteDetailsByName(string drugRouteName)
        {
            return _drugRoutes.GetDrugRouteDetailsByName(drugRouteName);
        }

        [HttpGet]
        [Route("SearchAllDrugRoutes")]
        public List<Entities.DrugRoutes> SearchAllDrugRoutes()
        {
            return _drugRoutes.SearchAllDrugRoutes();
        }

        [HttpGet]
        [Route("SearchDrugRoutesByRouteName/{routeName}")]
        public List<Entities.DrugRoutes> SearchDrugRoutesByRouteName(string routeName)
        {
            return _drugRoutes.SearchDrugRoutesByRouteName(routeName);
        }


        [HttpPost]
        [Route("SaveDrugRoute")]
        public Int32 SaveDrugRoute(Entities.DrugRoutes drugRoute)
        {
            return _drugRoutes.SaveDrugRoute(drugRoute);
        }

    }
}
