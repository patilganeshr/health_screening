using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class Employee : BaseEntity
    {
        public Int32? EmployeeId { get; set; }

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

        public string EmployeeCode { get; set; }

        public Int32? CompanyId { get; set; }

        public string Title { get; set; }

        public string FullName { get; set; }

        public string BranchName { get; set; }

        public string ContactNos { get; set; }

        public EmployeePersonalHistory EmployeePersonalHistory { get; set; }

        public List<EmployeeExerciseHistory> EmployeeExerciseHistories { get; set; }

        public string CompanyName { get; set; }

    }
}
