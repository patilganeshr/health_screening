using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
   public class Precautions : BaseEntity
    {

        public Int32? PrecautionsId { get; set; }

        public string DocName { get; set; }

        public string PatientName { get; set; }

        public Int32? Age{ get; set; }

        public string MedicinesPre { get; set; }
    }
}
