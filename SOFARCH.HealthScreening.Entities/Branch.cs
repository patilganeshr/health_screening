using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class Branch : BaseEntity
    {
        public Int32? BranchId { get; set; }

        public Int32? CompanyId { get; set; }

        public string BranchName { get; set; }

        public string BranchAddress { get; set; }

        public Int32? CountryId { get; set; }

        public Int32? StateId { get; set; }

        public Int32? CityId { get; set; }

        public string ContactPerson { get; set; }

        public string ContactNo { get; set; }

        public string EmailId { get; set; }

        public string GSTINNo { get; set; }

        public string CountryName { get; set; }

        public string StateName { get; set; }

        public string CityName { get; set; }

    }
}
