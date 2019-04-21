using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class ItemQuality : BaseEntity
    {
        public Int32? ItemQualityId { get; set; }

        public string QualityName { get; set; }
        
    }
}
