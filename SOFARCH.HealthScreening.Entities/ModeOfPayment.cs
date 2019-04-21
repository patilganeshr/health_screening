using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class ModeOfPayment : BaseEntity
    {
        public Int32? ModeOfPaymentId { get; set; }

        public string PaymentMode { get; set; }
    }
}
