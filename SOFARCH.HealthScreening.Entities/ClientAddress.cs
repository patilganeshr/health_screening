using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class ClientAddress : BaseEntity
    {
        public Int32? AddressTypeId { get; set; }

        public string AddressType { get; set; }

        public string ClientAddressCode { get; set; }

        public Int32? ClientAddressId { get; set; }

        public Int32? ClientId { get; set; }
        public Int32? ClientTypeId { get; set; }
        public string ClientType { get; set; }
        public string ClientAddressName { get; set; }

        public string Address { get; set; }

        public string ClientName { get; set; }

        public Int32? CountryId { get; set; }

        public Int32? StateId { get; set; }

        public Int32? CityId { get; set; }

        public string Area { get; set; }

        public string PinCode { get; set; }

        public string TelNo { get; set; }

        public string FaxNo { get; set; }
        public string EmailId { get; set; }

        public string ContactNos { get; set; }

        public string ServiceTaxNo { get; set; }

        public string VATNo { get; set; }

        public string TINNo { get; set; }

        public string PANNo { get; set; }

        public string GSTNo { get; set; }

        public string CountryName { get; set; }

        public string CountryCode { get; set; }

        public string StateName { get; set; }
        
        public string StateCode { get; set; }

        public string CityName { get; set; }
        
        //public List<CustomerAndTransporterMapping> CustomerAndTransporterMapping { get; set; }
    }
}
