using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class Brand : BaseEntity
    {
        public Int32? BrandId { get; set; }

        public string BrandName { get; set; }
                
    }
}
