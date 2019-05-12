using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class AddressType : BaseEntity
    {
        public Int32? AddressTypeId { get; set; }

        public string AddressTypeName { get; set; }
        
    }
}
