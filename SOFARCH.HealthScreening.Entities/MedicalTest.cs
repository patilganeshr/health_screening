using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class MedicalTest : BaseEntity
    {
        public Int32? MedicalTestId { get; set; }

        public string TestName { get; set; }

        public bool? IsParameters { get; set; }

        public bool? IsGeneralTest { get; set; }

        public List<MedicalTestParameters> MedicalTestParameters { get; set; }

    }
}
