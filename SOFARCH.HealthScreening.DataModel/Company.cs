using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.Common;

using Microsoft.Practices.EnterpriseLibrary.Common;
using Microsoft.Practices.EnterpriseLibrary.Data;
using DRE = DataRecordExtensions.DataRecordExtensions;

namespace SOFARCH.HealthScreening.DataModel
{
    public class Company
    {
        private readonly Database database;

        public Company()
        {
            database = DBConnect.getDBConnection();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<Entities.Company> GetAllCompanies()
        {
            var companies = new List<Entities.Company>();

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetListOfAllCompanies))
                {
                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var company = new Entities.Company
                            {
                                CompanyId = DRE.GetNullableInt32(reader, "company_id", 0),
                                CompanyName = DRE.GetNullableString(reader, "company_name", null)                                
                            };

                            companies.Add(company);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                dbCommand = null;
            }

            return companies;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="companyId"></param>
        /// <returns></returns>
        public Entities.Company GetCompanyDetailsById(Int32 companyId)
        {
            var companyDetails = new Entities.Company();

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetCompanyDetailsById))
                {
                    database.AddInParameter(dbCommand, "@company_id", DbType.Int32, companyId);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var company = new Entities.Company
                            {
                                CompanyId = DRE.GetNullableInt32(reader, "company_id", 0),
                                CompanyName = DRE.GetNullableString(reader, "company_name", null),
                                CompanyAddress = DRE.GetNullableString(reader, "company_address", null),
                                CountryId = DRE.GetNullableInt32(reader, "country_id", null),
                                CountryName = DRE.GetNullableString(reader, "country_name", null),
                                StateId = DRE.GetNullableInt32(reader, "state_id", null),
                                StateName = DRE.GetNullableString(reader, "state_name", null),
                                CityId = DRE.GetNullableInt32(reader, "city_id", null),
                                CityName = DRE.GetNullableString(reader, "city_name", null),
                                Website = DRE.GetNullableString(reader, "website", null),
                                GSTINNo = DRE.GetNullableString(reader, "gstin_no", null),
                                guid= DRE.GetNullableGuid(reader, "row_guid", null)

                            };

                            companyDetails = company;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                dbCommand = null;
            }

            return companyDetails;
        }
    }
}
