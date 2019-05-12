using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class ClientType : BaseEntity
    {
        public Int32? ClientTypeId { get; set; }

        public string ClientTypeName { get; set; }
        
    }
}
