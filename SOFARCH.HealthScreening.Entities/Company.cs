using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class Company : BaseEntity
    {
        public Int32? CompanyId { get; set; }

        public string CompanyName { get; set; }

        public string CompanyAddress { get; set; }

        public Int32? CountryId { get; set; }

        public Int32? StateId { get; set; }

        public Int32? CityId { get; set; }

        public string PinCode { get; set; }

        public string Website { get; set; }

        public string GSTINNo { get; set; }


        public string CountryName { get; set; }

        public string StateName { get; set; }

        public string CityName { get; set; }
    }
}
