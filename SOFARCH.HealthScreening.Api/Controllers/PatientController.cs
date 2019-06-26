using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.API.Controllers
{
    public class PatientController : ApiController
    {
        private readonly Business.Patient _patient;

        public PatientController()
        {
            _patient = new Business.Patient();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("SavePatient")]
        public Int32 SavePatient(Entities.Patient patient)
        {
            return _patient.SavePatient(patient);
        }

        [HttpGet]
        [Route("IsPatientNameExists/{employerId}/{patientName}")]
        public bool IsPatientNameExists(Int32 employerId, string patientName)
        {
            return _patient.IsPatientNameExists(employerId, patientName);
        }

        [HttpGet]
        [Route("SearchAllPatients")]
        public List<Entities.Patient> SearchAllPatients()
        {
            return _patient.SearchAllPatients();
        }

        [Route("GetPatientIdAndNameByPatientName/{patientName}")]
        public List<Entities.Patient> GetPatientIdAndNameByPatientName(string patientName)
        {
            return _patient.GetPatientIdAndNameByPatientName(patientName);
        }
                
        /// <summary>
        /// 
        /// </summary>
        /// <param name="patientId"></param>
        /// <returns></returns>
        [Route("GetPatientDetailsById/{patientId}")]
        public Entities.Patient GetPatientDetailsById(Int32 patientId)
        {
            return _patient.GetPatientDetailsById(patientId);
        }

    }
}
