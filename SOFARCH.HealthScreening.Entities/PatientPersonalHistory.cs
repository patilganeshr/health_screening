using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class PatientPersonalHistory : BaseEntity
    {
        public Int32? PatientPersonalHistoryId { get; set; }

        public Int32? PatientId { get; set; }

        public string MaritalStatus { get; set; }

        public Int32? NoOfSons { get; set; }

        public Int32? NoOfDaughters { get; set; }

        public decimal? PatientHeight { get; set; }

        public string HeightUnit { get; set; }

        public decimal? PatientWeight { get; set; }

        public string WeightUnit { get; set; }

        public string Smoking { get; set; }

        public string Alcohol { get; set; }

        public string Tobacco { get; set; }

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

    }
}
