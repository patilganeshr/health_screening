using SOFARCH.HealthScreening.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Business
{
    public class PatientPersonalHistory
    {
        private readonly DataModel.PatientPersonalHistory _patientPersonalHistory;

        public PatientPersonalHistory()
        {
            _patientPersonalHistory = new DataModel.PatientPersonalHistory();
        }

        public Entities.PatientPersonalHistory GetPatientPersonalHistoriesByPatientId(Int32 patientId)
        {
            return _patientPersonalHistory.GetPatientPersonalHistoriesByPatientId(patientId);
        }


    }
}
