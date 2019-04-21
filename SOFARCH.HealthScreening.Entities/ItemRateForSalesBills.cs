using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class ItemRateForSalesBills
    {
        public Int32? ItemId { get; set; }

        public string ItemName { get; set; }

        public decimal? WholesaleRate { get; set; }

        public decimal? RetailRate { get; set; }

        public string RateEffectiveFromDate { get; set; }

    }
}
