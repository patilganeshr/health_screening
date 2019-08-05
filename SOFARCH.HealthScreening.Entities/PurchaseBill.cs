using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class PurchaseBill : BaseEntity
    {
        public Int32? PurchaseBillId { get; set; }

        public string PurchaseBillNo { get; set; }

        public string PurchaseBillDate { get; set; }

        public Int32? VendorId { get; set; }

        public string VendorName { get; set; }

        public decimal? PurchaseBillAmount { get; set; }

        public decimal? AdjustedAmount { get; set; }
        public List<PurchaseBillItem> PurchaseBillItems { get; set; }

        public List<PurchaseBillCharge> PurchaseBillCharges { get; set; }

        public decimal? TotalBillQty { get; set; }

        public decimal? TotalBillAmount { get; set; }

        public string PurchaseBillFromDate { get; set; }

        public string PurchaseBillToDate { get; set; }

    }
}


