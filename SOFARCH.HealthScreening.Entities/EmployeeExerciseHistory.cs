using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class EmployeeExerciseHistory : BaseEntity
    {
        public Int32? EmployeeExerciseHistoryId { get; set; }

        public Int32? EmployeeId { get; set; }

        public string ExerciseName { get; set; }

        public string Frequency { get; set; }

    }
}
