using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class DrugRoutes : BaseEntity
    {
        public Int32? DrugRouteId{ get; set; }

        public string RouteName { get; set; }

    }
}
