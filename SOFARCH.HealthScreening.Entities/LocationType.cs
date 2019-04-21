using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class LocationType : BaseEntity
    {
        public Int32? LoctionTypeId { get; set; }

        public string LocationTypeName { get; set; }

    }
}
