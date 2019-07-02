using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class PurchaseBillReturn : BaseEntity
    {
        public Int32? PurchaseBillReturnId { get; set; }

        public Int32? PurchaseBillId { get; set; }

        public string PurchaseBillReturnDate { get; set; }

        public List<PurchaseBillReturnItem> PurchaseBillReturnItems { get; set; }

        public string PurchaseBillNo { get; set; }

        public string PurchaseBillDate { get; set; }
        public string VendorName { get; set; }


    }
}
