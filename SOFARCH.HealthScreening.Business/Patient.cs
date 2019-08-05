using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace SOFARCH.HealthScreening.Business
{
    public class Patient
    {
        private readonly DataModel.Patient _patient;

        public Patient()
        {
            _patient = new DataModel.Patient();
        }

        public Int32 SavePatient(Entities.Patient patient)
        {
            return _patient.SavePatient(patient);
        }

        public bool IsPatientNameExists(Int32 employerId, string patientName)
        {
            return _patient.IsPatientNameExists(employerId, patientName);
        }

        public List<Entities.Patient> SearchPatients(Entities.Patient patient)
        {
            return _patient.SearchPatients(patient);
        }

        public List<Entities.Patient> GetPatientIdAndNameByPatientName(string patientName)
        {
            var index = patientName.LastIndexOf(' ');

            string firstName = null;

            string lastName = null;

            if (index == -1)
            {
                firstName = patientName;
            }
            else if (index > 0)
            {
                firstName = patientName.Substring(0, index);

                if (patientName.Substring(index + 1) != "")
                {
                    lastName = patientName.Substring(index + 1);
                }
            }

            return _patient.GetPatientIdAndNameByPatientName(firstName, lastName);
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="patientId"></param>
        /// <returns></returns>
        public Entities.Patient GetPatientDetailsById(Int32 patientId)
        {
            return _patient.GetPatientDetailsById(patientId);
        }

    }
}
