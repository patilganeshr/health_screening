using SOFARCH.HealthScreening.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Business
{
    public class DrugsLinkWithDrugRoute
    {
        private readonly DataModel.DrugsLinkWithDrugRoute _drugsLinkWithDrugRoute;

        public DrugsLinkWithDrugRoute()
        {
            _drugsLinkWithDrugRoute = new DataModel.DrugsLinkWithDrugRoute();
        }

        public List<Entities.DrugLinkWithDrugRoutes> GetDrugLinkByDrugId(Int32? drugId = null)
        {
            return _drugsLinkWithDrugRoute.GetDrugLinkByDrugId(drugId);
        }
    }
}
