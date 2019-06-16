using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class PurchaseBillItem : BaseEntity
    {
        public Int32? PurchaseBillItemId { get; set; }

        public Int32? PurchaseBillId { get; set; }

        public Int32? DrugId { get; set; }

        public string BatchNo { get; set; }

        public decimal? Pack1 { get; set; }

        public decimal? Pack2 { get; set; }

        public decimal? FreeQty { get; set; }

        public decimal? RatePerPack1 { get; set; }

        public string ExpiryDate { get; set; }

        public decimal? TaxPercent { get; set; }

        public Int32? DrugCode { get; set; }

        public string DrugName { get; set; }

        public string GenericName { get; set; }

        public decimal? TaxAmount { get; set; }

        public decimal? ItemAmount { get; set; }

    }
}
