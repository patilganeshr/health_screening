using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class DrugLinkWithDrugRoutes : BaseEntity
    {
        public Int32? DrugRouteLinkId { get; set; }

        public Int32? DrugId { get; set; }

        public Int32? DrugRouteId { get; set; }

        public string RouteName { get; set; }
    }
}
