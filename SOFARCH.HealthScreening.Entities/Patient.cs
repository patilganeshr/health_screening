using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class Patient : BaseEntity
    {
        public Int32? PatientId { get; set; }

        public string FirstName { get; set; }

        public string MiddleName { get; set; }

        public string LastName { get; set; }

        public string Address { get; set; }

        public string DateOfBirth { get; set; }

        public string ContactNo1{ get; set; }

        public string ContactNo2 { get; set; }

        public string MobileNo1 { get; set; }

        public string MobileNo2 { get; set; }

        public string EmailId { get; set; }

        public string PANNo { get; set; }

        public string Department { get; set; }

        public string Designation { get; set; }

        public string Gender { get; set; }

        public Int32? PatientCode { get; set; }

        public Int32? EmployerId { get; set; }

        public string Title { get; set; }

        public string FullName { get; set; }

        public string BranchName { get; set; }

        public string ContactNos { get; set; }

        public PatientPersonalHistory PatientPersonalHistory { get; set; }

        public List<PatientExerciseHistory> PatientExerciseHistories { get; set; }

        public string EmployerName { get; set; }

    }
}
