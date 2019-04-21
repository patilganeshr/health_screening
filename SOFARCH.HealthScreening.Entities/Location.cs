using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class Location : BaseEntity
    {
        public Int32? LocationId { get; set; }

        public Int32? LocationTypeId { get; set; }

        public string LocationName { get; set; }

        public string LocationAddress { get; set; }

        public Int32? CityId { get; set; }

        public string LocationArea { get; set; }

        public string ContactPerson { get; set; }

        public string ContactNos { get; set; }

    }
}
