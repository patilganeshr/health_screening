using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class State : BaseEntity
    {
        public Int32? StateId { get; set; }

        public string StateName { get; set; }

        public string StateCode { get; set; }

        public Int32? CountryId { get; set; }

        public string TINNo { get; set; }
    }
}
