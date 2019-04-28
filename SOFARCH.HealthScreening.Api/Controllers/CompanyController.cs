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

        [HttpPost]
        [Route("SearchCompany")]
        public List<Entities.Company> SearchCompanyByNameOrCodeOrShortNameOrGSTINNo(Entities.Company company)
        {
            return _company.SearchCompanyByNameOrCodeOrShortNameOrGSTINNo(company);
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

        [HttpPost]
        [Route("SaveCommpany")]
        public Int32 SaveCompany(Entities.Company company)
        {
            return _company.SaveCompany(company);
        }


    }
}