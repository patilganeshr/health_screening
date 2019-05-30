using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class PreEmploymentTestDetails : BaseEntity
    {
        public Int32? PreEmploymentTestId { get;set; }

        public Int32? PreEmploymentId { get; set; }

        public Int32? MedicalTestId { get; set; }

        public Int32? MedicalTestParameterId { get; set; }

        public string TestValue { get; set; }

        public string TestName { get; set; }

        public bool? IsParameters { get; set; }

        public bool? IsTestGeneral { get; set; }

    }
}
