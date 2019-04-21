using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class Country : BaseEntity
    {
        public Int32? CountryId { get; set; }

        public string CountryName { get; set; }

        public string CountryCode { get; set; }
    }
}
