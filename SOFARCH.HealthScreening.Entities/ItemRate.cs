using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class ItemRate : BaseEntity
    {
        public Int32? ItemRateId { get; set; }

        public Int32? ItemId { get; set; }

        public Decimal? PurchaseRate { get; set; }

        public decimal? DiscountPercent { get; set; }

        public decimal? DiscountAmount { get; set; }
        
        public Decimal? TransportCost { get; set; }

        public Decimal? LabourCost { get; set; }

        public decimal? GSTRate { get; set; }

        public Int32? GSTRateId { get; set; }

        public string RateEffectiveFromDate { get; set; }

        public string RateEffectiveToDate { get; set; }

        public bool? IsSellAtNetRate { get; set; }

        public Int32? working_period_id { get; set; }

        public decimal? RateAfterDiscount { get; set; }

        public decimal? CostOfGoods { get; set; }

        public decimal? GSTAmount { get; set; }

        public decimal? TotalCost { get; set; }

        public string ItemName { get; set; }

        public string ItemQuality { get; set; }

        public List<ItemRateForCustomerCategory> CustomerCategoryRates { get; set; }
    }
}
