using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class BloodGroupFactor : BaseEntity
    {
        public Int32? BloodGroupFactorId { get; set; }

        public string BloodGroupFactorName { get; set; }
    }
}
