using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.API.Controllers
{
    public class CompanyController : ApiController
    {
        private readonly Business.Company _company;

        public CompanyController()
        {
            _company = new Business.Company();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Route("GetAllCompanies")]
        public List<Entities.Company> GetAllCompanies()
        {
            return _company.GetAllCompanies();
        }


        [Route("GetCompanyDetailsById/{companyId}")]
        public Entities.Company GetCompanyDetailsId(Int32 companyId)
        {
            return _company.GetCompanyDetailsById(companyId);
        }

    }
}