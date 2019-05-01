using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Routing;

namespace SOFARCH.HealthScreening.Business
{
    public class DrugRoutes
    {
        private readonly DataModel.DrugRoutes _drugRoutes;

        public DrugRoutes()
        {
            _drugRoutes = new DataModel.DrugRoutes();
        }
    
        public List<Entities.DrugRoutes> GetAllDrugRouteIdAndRouteName()
        {
            return _drugRoutes.GetAllDrugRouteIdAndRouteName();
        }

        public Entities.DrugRoutes GetDrugRouteDetailsById(Int32 drugRouteId)
        {
            return _drugRoutes.GetDrugRouteDetailsById(drugRouteId);
        }

        public Entities.DrugRoutes GetDrugRouteDetailsByName(string drugRouteName)
        {
            return _drugRoutes.GetDrugRouteDetailsByName(drugRouteName);
        }

        public List<Entities.DrugRoutes> SearchAllDrugRoutes()
        {
            return _drugRoutes.SearchAllDrugRoutes();
        }

        public List<Entities.DrugRoutes> SearchDrugRoutesByRouteName(string routeName)
        {
            return _drugRoutes.SearchDrugRoutesByRouteName(routeName);
        }

        public Int32 SaveDrugRoute(Entities.DrugRoutes drugRoute)
        {
            return _drugRoutes.SaveDrugRoute(drugRoute);
        }

    }
}
