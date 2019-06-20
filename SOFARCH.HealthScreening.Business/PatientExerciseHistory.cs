using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Business
{
    public class PatientExerciseHistory
    {
        private readonly DataModel.PatientExerciseHistory _patientExerciseHistory;

        public PatientExerciseHistory()
        {
            _patientExerciseHistory = new DataModel.PatientExerciseHistory();
        }

        public List<Entities.PatientExerciseHistory> GetPatientExerciseHistoriesByPatientId(Int32 patientId)
        {
            return _patientExerciseHistory.GetPatientExerciseHistoriesByPatientId(patientId);
        }

    }
}
