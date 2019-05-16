using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class BloodGroup : BaseEntity
    {
        public Int32? BloodGroupId { get; set; }

        public string BloodGroupName { get; set; }

        public Int32? BloodGroupFactorId { get; set; }

    }
}
