using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Business
{
    public class Company
    {
        private readonly DataModel.Company _company;

        public Company()
        {
            _company = new DataModel.Company();
        }

        public List<Entities.Company> GetAllCompanies()
        {
            return _company.GetAllCompanies();
        }

        public List<Entities.Company> SearchCompanyByCode(string companyCode)
        {
            return _company.SearchCompanyByCode(companyCode);
        }

        public List<Entities.Company> SearchCompanyByName(string companyName)
        {
            return _company.SearchCompanyByName(companyName);
        }

        public List<Entities.Company> SearchCompanyByShortName(string shortName)
        {
            return _company.SearchCompanyByShortName(shortName);
        }
            /// <summary>
            /// 
            /// </summary>
            /// <returns></returns>
        public List<Entities.Company> GetCompanyIdAndCompanyName()
        {
            return _company.GetCompanyIdAndCompanyName();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="companyId"></param>
        /// <returns></returns>
        public Entities.Company GetCompanyDetailsById(Int32 companyId)
        {
            return _company.GetCompanyDetailsById(companyId);
        }

        public Int32 SaveCompany(Entities.Company company)
        {
            return _company.SaveCompany(company);
        }

    }
}
