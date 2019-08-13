using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace SOFARCH.HealthScreening.Api.Controllers
{
    public class PreEmploymentDetailsController : ApiController
    {
        private readonly Business.PreEmploymentDetails _preEmploymentDetails;

        public PreEmploymentDetailsController()
        {
            _preEmploymentDetails = new Business.PreEmploymentDetails();
        }

        [Route("GetPatientAndTestDetails/{patientId}")]
        public Entities.PreEmploymentDetails GetPatientAndTestDetails(Int32 patientId)
        {
            return _preEmploymentDetails.GetPatientAndTestDetails(patientId);
        }

        [Route("GetAllPreEmploymentDetails/{preEmploymentOrHealthCheckup}")]
        public List<Entities.PreEmploymentDetails> GetAllPreEmploymentDetails(string preEmploymentOrHealthCheckup)
        {
            return _preEmploymentDetails.GetAllPreEmploymentDetails(preEmploymentOrHealthCheckup);
        }

        [HttpPost]
        [Route("SearchPreEmploymentDetails")]
        public List<Entities.PreEmploymentDetails> SearchPreEmploymentDetails(Entities.PreEmploymentDetails preEmploymentDetails)
        {
            return _preEmploymentDetails.SearchPreEmploymentDetails(preEmploymentDetails);
        }

        [HttpPost]
        [Route("SavePreEmploymentDetails")]
        public Int32 SavePreEmploymentDetails(Entities.PreEmploymentDetails preEmploymentDetails)
        {
            return _preEmploymentDetails.SavePreEmploymentDetails(preEmploymentDetails);
        }

        [HttpPost]
        [Route("PrintPreEmploymentReport")]
        public string PrintPreEmploymentReport(Entities.PreEmploymentDetails preEmploymentDetails)
        {
            return _preEmploymentDetails.generateReport(preEmploymentDetails);

        }

    }
}
