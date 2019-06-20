using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.API.Controllers
{
    public class EmployerController : ApiController
    {
        private readonly Business.Employer _employer;

        public EmployerController()
        {
            _employer = new Business.Employer();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="employer"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("SaveEmployer")]
        public Int32 SaveEmployer(Entities.Employer employer)
        {
            return _employer.SaveEmployer(employer);
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Route("GetAllEmployerIdAndName")]
        public List<Entities.Employer> GetAllEmployerIdAndName()
        {
            return _employer.GetAllEmployerIdAndName();
        }

        [Route("GetEmployerIdAndNameByName/{employerName}")]
        public List<Entities.Employer> GetEmployerIdAndNameByName(string employerName)
        {
            return _employer.GetEmployerIdAndNameByName(employerName);
        }


        [HttpGet]
        [Route("SearchEmployerByName/{employerName = null}")]
        public List<Entities.Employer> SearchEmployerByName(string employerName = null)
        {
            return _employer.SearchEmployerByName(employerName);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="employerId"></param>
        /// <returns></returns>
        [Route("GetEmployerDetailsById/{employerId}")]
        public Entities.Employer GetEmployerDetailsById(Int32 employerId)
        {
            return _employer.GetEmployerDetailsById(employerId);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="employerName"></param>
        /// <returns></returns>
        [Route("GetEmployerDetailsByName/{employerName}")]
        public Entities.Employer GetEmployerDetailsByName(string employerName)
        {
            return _employer.GetEmployerDetailsByName(employerName);
        }

    }
}
