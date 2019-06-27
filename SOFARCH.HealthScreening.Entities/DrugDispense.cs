﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class DrugDispense : BaseEntity
    {
        public Int32? DrugDispenseId { get; set; }

        public Int32? DrugDispenseNo { get; set; }

        public string DrugDispenseDate { get; set; }

        public Int32? PatientId { get; set; }

        public List<DrugDispenseDrugUtilisation> DrugDispenseDrugUtilisations { get; set; }
        
    }
}
