using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class MedicalTestParameters : BaseEntity
    {
        public Int32? MedicalTestParameterId { get; set; }
        
        public Int32? MedicalTestId { get; set; }
        
        public string TestParameterName { get; set; }

        public string TestParameterDesc { get; set; }

        public decimal? TestParameterSequence { get; set; }

        public decimal? MinimumValue { get; set; }

        public decimal? MaximumValue { get; set; }

        public decimal? NormalValue { get; set; }

        public Int32? UnitOfMeasurementId { get; set; }
        
        public string UnitCode { get; set; }

    }
}
