using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class PurchaseBillCharge : BaseEntity
    {
        public Int32? PurchaseBillChargeId { get; set; }

        public Int32? PurchaseBillId { get; set; }

        public Int32? ChargeId { get; set; }

        public decimal? ChargeAmount { get; set; }

        public decimal? TaxPercent { get; set; }

        public string ChargeName { get; set; }
        
    }
}
