using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class DrugFormulation : BaseEntity
    {
        public Int32? DrugFormulationId { get; set; }

        public string DrugFormulationCode { get; set; }

    }
}
