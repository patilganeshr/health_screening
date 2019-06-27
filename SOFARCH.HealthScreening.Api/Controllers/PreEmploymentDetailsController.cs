using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
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

        [Route("GetAllPreEmploymentDetails")]
        public List<Entities.PreEmploymentDetails> GetAllPreEmploymentDetails()
        {
            return _preEmploymentDetails.GetAllPreEmploymentDetails();
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
    }
}
