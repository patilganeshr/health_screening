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

        public List<Entities.Company> SearchCompanyByNameOrCodeOrShortNameOrGSTINNo(Entities.Company company)
        {
            return _company.SearchCompanyByNameOrCodeOrShortNameOrGSTINNo(company);
        }

            /// <summary>
            /// 
            /// </summary>
            /// <returns></returns>
            public List<Entities.Company> GetAllCompanies()
        {
            return _company.GetAllCompanies();
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
