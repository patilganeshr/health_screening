using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class City : BaseEntity
    {
        public Int32? CityId { get; set; }

        public string CityName { get; set; }

        public Int32? StateId { get; set; }

        public bool? IsCityNameExists { get; set; }
    }
}
