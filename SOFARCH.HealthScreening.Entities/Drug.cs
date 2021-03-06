﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class Drug : BaseEntity
    {
        public Int32? DrugId { get; set; }

        public Int32? DrugCode { get; set; }

        public string GenericName{ get; set; }

        public string DrugName { get; set; }

        public Int32? DrugGroupId{ get; set; }

        public Int32? BrandId{ get; set; }

        public Int32? DrugFormulationId{ get; set; }

        public string DrugFormulationCode { get; set; }

        public string Strength{ get; set; }

        public string Unit { get; set; }

        public string AdverseEffects { get; set; }

        public string Precautions{ get; set; }

        public List<DrugLinkWithDrugRoutes> DrugLinkWithDrugRoutes { get; set; }

        public string DrugOrXRay { get; set; }

        public string DrugGroupName { get; set; }

        public string BrandName { get; set; }

    }
}
