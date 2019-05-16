using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class EmployeePersonalHistory : BaseEntity
    {
        public Int32? EmployeePersonalHistoryId { get; set; }

        public Int32? EmployeeId { get; set; }

        public string MaritalStatus { get; set; }

        public Int32? NoOfSons { get; set; }

        public Int32? NoOfDaughters { get; set; }

        public decimal? EmployeeHeight { get; set; }

        public string HeightUnit { get; set; }

        public decimal? EmployeeWeight { get; set; }

        public string WeightUnit { get; set; }

        public bool? IsSmoking { get; set; }

        public bool? IsAlcohol { get; set; }

        public bool? IsTobacco { get; set; }

        public Int32? BloodGroupId { get; set; }

        public Int32? BloodGroupFactorId { get; set; }

        public string Diet { get; set; }

        public string AllergicTo { get; set; }

        public string OtherAddictions { get; set; }

        public string PresentIllness { get; set; }

        public string Treatment { get; set; }

        public string Micturation { get; set; }

        public string Bowels { get; set; }

        public string Sleep { get; set; }

        public string MC { get; set; }

        public string PastHistory { get; set; }

        public string FamilyHistory { get; set; }

        public string Smoking { get; set; }

        public string Alcohol { get; set; }

        public string Tobacco { get; set; }

    }
}
