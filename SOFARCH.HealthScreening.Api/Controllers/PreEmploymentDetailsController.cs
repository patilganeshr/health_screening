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

        [Route("GetEmployeeDetails/{employeeId}")]
        public Entities.PreEmploymentDetails GetEmployeeDetails(Int32 employeeId)
        {
            return _preEmploymentDetails.GetEmployeeDetails(employeeId);
        }

        [Route("GetAllPreEmploymentDetails")]
        public List<Entities.PreEmploymentDetails> GetAllPreEmploymentDetails()
        {
            return _preEmploymentDetails.GetAllPreEmploymentDetails();
        }

        [HttpPost]
        [Route("SavePreEmploymentDetails")]
        public Int32 SavePreEmploymentDetails(Entities.PreEmploymentDetails preEmploymentDetails)
        {
            return _preEmploymentDetails.SavePreEmploymentDetails(preEmploymentDetails);
        }
    }
}
