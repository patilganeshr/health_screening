using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class PreEmploymentDetails : BaseEntity
    {

        public Int32? PreEmploymentId { get; set; }

        public Int32? PatientId { get; set; }

        public string PreEmploymentOrHealthCheckup { get; set; }

        public Int32? PreEmploymentCodeNo { get; set; }

        public string ConsultDate { get; set; }

        public string PatientFullName { get; set; }

        public Int32? PatientCode { get; set; }

        public string Gender { get; set; }

        public Int32? Age { get; set; }

        public string MaritalStatus { get; set; }

        public Int32? NoOfSons { get; set; }

        public Int32? NoOfDaughters { get; set; }

        public Int32? EmployerId { get; set; }

        public Int32? EmployerCode { get; set; }

        public string EmployerName { get; set; }

        public string Designation { get; set; }

        public string IdentificationMark { get; set; }

        public string AllergicTo { get; set; }

        public string Micturation { get; set; }

        public string Bowels { get; set; }

        public string Sleep { get; set; }

        public string Alcohol { get; set; }

        public string Smoking { get; set; }

        public string MC { get; set; }

        public string PastHistory { get; set; }

        public string FamilyHistory { get; set; }

        public List<Entities.PreEmploymentTestDetails> PreEmploymentTestDetails { get; set; }

    }
}
