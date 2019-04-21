using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class UnitsOfMeasurement : BaseEntity
    {
        public Int32? UnitOfMeasurementId { get; set; }

        public string UnitCode { get; set; }

        public string UnitCodeDesc { get; set; }

        public string UnitType { get; set; }
        
    }
}
