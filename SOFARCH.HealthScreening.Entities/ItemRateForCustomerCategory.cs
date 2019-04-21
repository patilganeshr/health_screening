using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class ItemRateForCustomerCategory :BaseEntity
    {
        public Int32? CustomerCategoryItemRateId{ get; set; }

        public Int32? CustomerCategoryId { get; set; }

        public Int32? ItemRateId { get; set; }

        public Int32? ItemId { get; set; }

        public decimal? RateInPercent { get; set; }

        public decimal? FlatRate { get; set; }

        public string CustomerCategoryName { get; set; }

        public string CustomerCategoryDesc { get; set; }

    }
}
