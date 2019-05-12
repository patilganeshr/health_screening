using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class Client : BaseEntity
    {
        public Int32? ClientTypeId { get; set; }

        public string ClientTypeName { get; set; }

        public Int32? ClientId { get; set; }

        public string ClientCode { get; set; }

        public string ClientName { get; set; }
        public string PANNo { get; set; }
        public List<ClientAddress> ClientAddressess { get; set; }

    }
}
