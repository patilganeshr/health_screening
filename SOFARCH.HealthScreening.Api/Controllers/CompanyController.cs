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

        [Route("GetAllCompanies")]
        public List<Entities.Company> GetAllCompanies()
        {
            return _company.GetAllCompanies();
        }

        [HttpGet]
        [Route("SearchCompanyByCode/{companyCode}")]
        public List<Entities.Company> SearchCompanyByCode(string companyCode)
        {
            return _company.SearchCompanyByCode(companyCode);
        }

        [HttpGet]
        [Route("SearchCompanyByName/{companyName}")]
        public List<Entities.Company> SearchCompanyByName(string companyName)
        {
            return _company.SearchCompanyByName(companyName);
        }

        [HttpGet]
        [Route("SearchCompanyByShortName/{shortName}")]
        public List<Entities.Company> SearchCompanyByShortName(string shortName)
        {
            return _company.SearchCompanyByShortName(shortName);
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Route("GetCompanyIdAndCompanyName")]
        public List<Entities.Company> GetCompanyIdAndCompanyName()
        {
            return _company.GetCompanyIdAndCompanyName();
        }

        [Route("GetCompanyDetailsById/{companyId}")]
        public Entities.Company GetCompanyDetailsId(Int32 companyId)
        {
            return _company.GetCompanyDetailsById(companyId);
        }

        [HttpPost]
        [Route("SaveCompany")]
        public Int32 SaveCompany(Entities.Company company)
        {
            return _company.SaveCompany(company);
        }


    }
}