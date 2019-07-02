using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class PurchaseBillReturnItem : BaseEntity
    {

        public Int32? PurchaseBillItemReturnId { get; set; }

        public Int32? PurchaseBillReturnId { get; set; }

        public Int32? PurchaseBillId { get; set; }

        public Int32? PurchaseBillItemId { get; set; }

        public Int32? DrugId { get; set; }

        public decimal? ReturnQty { get; set; }

        public decimal? PurchaseQty { get; set; }


        public string DrugName { get; set; }

        public Int32? DrugCode { get; set; }
    }
}
