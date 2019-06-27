using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class DrugDispenseDrugUtilisation : BaseEntity
    {
        public Int32? DrugUtilisationId { get; set; }

        public Int32? DrugDispenseId { get; set; }

        public Int32? DrugId { get; set; }

        public decimal? DispenseQty { get; set; }

    }
}
