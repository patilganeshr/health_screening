﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class Employer : BaseEntity
    {
        public Int32? EmployerId { get; set; }

        public string EmployerName { get; set; }

        public string EmployerAddress { get; set; }

        public Int32? CountryId { get; set; }

        public Int32? StateId { get; set; }

        public Int32? CityId { get; set; }

        public string PinCode { get; set; }

        public string Website { get; set; }

        public string GSTINNo { get; set; }

    }
}
