using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class PurchaseReport : BaseEntity
    {
        public string FromDate { get; set; }

        public string ToDate { get; set; }
    }
}
