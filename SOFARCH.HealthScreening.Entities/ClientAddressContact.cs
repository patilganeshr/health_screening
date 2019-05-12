using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class ClientAddressContact : BaseEntity
    {
        public Int32? ContactId { get; set; }

        public Int32? ClientAddressId { get; set; }

        public string ClientAddressName { get; set; }

        public string ContactName { get; set; }

        public string Department { get; set; }

        public string Designation { get; set; }

        public string ContactNo { get; set; }

        public string EmailId { get; set; }

    }
}
