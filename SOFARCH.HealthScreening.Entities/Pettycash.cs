using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class Pettycash : BaseEntity
    {
        public Int32? PettycaseId { get; set; }

        public string DocNo { get; set; }

        public string EntryDate { get; set; }

        public string DateRange { get; set; }

        public Int32? AccountHeadId { get; set; }

        public string AccountHead { get; set; }

        public string Supplier { get; set; }

        public string VoucherNo { get; set; }

        public decimal? Amount { get; set; }
    
    
    }
}
