using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class PatientExerciseHistory : BaseEntity
    {
        public Int32? PatientExerciseHistoryId { get; set; }

        public Int32? PatientId { get; set; }

        public string ExerciseName { get; set; }

        public string Frequency { get; set; }

    }
}
