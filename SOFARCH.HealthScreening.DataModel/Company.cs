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

        private Int32 AddCompany(Entities.Company company)
        {
            var companyId = 0;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertCompany))
                {
                    database.AddInParameter(dbCommand, "@company_id", DbType.Int32, company.CompanyId);
                    database.AddInParameter(dbCommand, "@company_code", DbType.String, company.CompanyCode);
                    database.AddInParameter(dbCommand, "@company_name", DbType.String, company.CompanyName);
                    database.AddInParameter(dbCommand, "@short_name", DbType.String, company.ShortName);
                    database.AddInParameter(dbCommand, "@company_address", DbType.String, company.CompanyAddress);
                    database.AddInParameter(dbCommand, "@country_id", DbType.Int32, company.CountryId);
                    database.AddInParameter(dbCommand, "@state_id", DbType.Int32, company.StateId);
                    database.AddInParameter(dbCommand, "@city_id", DbType.Int32, company.CityId);
                    database.AddInParameter(dbCommand, "@locality", DbType.String, company.Locality);
                    database.AddInParameter(dbCommand, "@pin_code", DbType.String, company.PinCode);
                    database.AddInParameter(dbCommand, "@website", DbType.String, company.Website);
                    database.AddInParameter(dbCommand, "@gstin_no", DbType.String, company.GSTINNo);
                    database.AddInParameter(dbCommand, "@contact_person", DbType.String, company.ContactPerson);
                    database.AddInParameter(dbCommand, "@contact_no", DbType.String, company.ContactNo);
                    database.AddInParameter(dbCommand, "@email_id", DbType.String, company.EmailId);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, company.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, company.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    companyId = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        companyId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                dbCommand = null;
            }

            return companyId;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="company"></param>
        /// <returns></returns>
        public bool DeleteCompany(Entities.Company company)
        {
            var isDeleted = false;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeleteCompany))
                {
                    database.AddInParameter(dbCommand, "@company_id", DbType.Int32, company.CompanyId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, company.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, company.DeletedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    var result = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        isDeleted = Convert.ToBoolean(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                dbCommand = null;
            }

            return isDeleted;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="company"></param>
        /// <returns></returns>
        public Int32 UpdateCompany(Entities.Company company)
        {
            var companyId = 0;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdateCompany))
                {
                    database.AddInParameter(dbCommand, "@company_id", DbType.Int32, company.CompanyId);
                    database.AddInParameter(dbCommand, "@company_code", DbType.String, company.CompanyCode);
                    database.AddInParameter(dbCommand, "@company_name", DbType.String, company.CompanyName);
                    database.AddInParameter(dbCommand, "@short_name", DbType.String, company.ShortName);
                    database.AddInParameter(dbCommand, "@company_address", DbType.String, company.CompanyAddress);
                    database.AddInParameter(dbCommand, "@country_id", DbType.Int32, company.CountryId);
                    database.AddInParameter(dbCommand, "@state_id", DbType.Int32, company.StateId);
                    database.AddInParameter(dbCommand, "@city_id", DbType.Int32, company.CityId);
                    database.AddInParameter(dbCommand, "@locality", DbType.String, company.Locality);
                    database.AddInParameter(dbCommand, "@pin_code", DbType.String, company.PinCode);
                    database.AddInParameter(dbCommand, "@website", DbType.String, company.Website);
                    database.AddInParameter(dbCommand, "@gstin_no", DbType.String, company.GSTINNo);
                    database.AddInParameter(dbCommand, "@contact_person", DbType.String, company.ContactPerson);
                    database.AddInParameter(dbCommand, "@contact_no", DbType.String, company.ContactNo);
                    database.AddInParameter(dbCommand, "@email_id", DbType.String, company.EmailId);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, company.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, company.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    companyId = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        companyId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                dbCommand = null;
            }

            return companyId;
        }

        // <returns></returns>
        public Int32 SaveCompany(Entities.Company company)
        {
            if (company.CompanyId == null || company.CompanyId == 0)
            {
                return AddCompany(company);
            }
            else
            {
                if (company.IsDeleted == true)
                {
                    var isDeleted = DeleteCompany(company);

                    return 1;
                }
                else
                {
                    return UpdateCompany(company);
                }
            }
        }

        public List<Entities.Company> SearchCompanyByNameOrCodeOrShortNameOrGSTINNo(Entities.Company company)
        {
            var companies = new List<Entities.Company>();

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.SearchCompany))
                {
                    database.AddInParameter(dbCommand, "@company_code", DbType.String, company.CompanyCode);
                    database.AddInParameter(dbCommand, "@company_name", DbType.String, company.CompanyName);
                    database.AddInParameter(dbCommand, "@short_name", DbType.String, company.ShortName);
                    database.AddInParameter(dbCommand, "@gstin_no", DbType.String, company.GSTINNo);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var companyDetails = new Entities.Company
                            {
                                CompanyId = DRE.GetNullableInt32(reader, "company_id", 0),
                                CompanyCode = DRE.GetNullableString(reader, "company_code", null),
                                CompanyName = DRE.GetNullableString(reader, "company_name", null),
                                ShortName = DRE.GetNullableString(reader, "short_name", null),
                                CompanyAddress = DRE.GetNullableString(reader, "company_address", null),
                                CountryId = DRE.GetNullableInt32(reader, "country_id", null),
                                CountryName = DRE.GetNullableString(reader, "country_name", null),
                                StateId = DRE.GetNullableInt32(reader, "state_id", null),
                                StateName = DRE.GetNullableString(reader, "state_name", null),
                                CityId = DRE.GetNullableInt32(reader, "city_id", null),
                                CityName = DRE.GetNullableString(reader, "city_name", null),
                                PinCode  =DRE.GetNullableString(reader, "pin_code", null),
                                Locality = DRE.GetNullableString(reader, "locality", null),
                                Website = DRE.GetNullableString(reader, "website", null),
                                GSTINNo = DRE.GetNullableString(reader, "gstin_no", null),
                                ContactPerson = DRE.GetNullableString(reader, "contact_person", null),
                                ContactNo = DRE.GetNullableString(reader, "contact_no", null),
                                EmailId = DRE.GetNullableString(reader, "email_id", null)
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
                                CompanyCode = DRE.GetNullableString(reader, "company_code", null),
                                CompanyName = DRE.GetNullableString(reader, "company_name", null),
                                ShortName = DRE.GetNullableString(reader, "short_name", null),
                                CompanyAddress = DRE.GetNullableString(reader, "company_address", null),
                                CountryId = DRE.GetNullableInt32(reader, "country_id", null),
                                CountryName = DRE.GetNullableString(reader, "country_name", null),
                                StateId = DRE.GetNullableInt32(reader, "state_id", null),
                                StateName = DRE.GetNullableString(reader, "state_name", null),
                                CityId = DRE.GetNullableInt32(reader, "city_id", null),
                                CityName = DRE.GetNullableString(reader, "city_name", null),
                                Locality = DRE.GetNullableString(reader, "locality", null),
                                Website = DRE.GetNullableString(reader, "website", null),
                                GSTINNo = DRE.GetNullableString(reader, "gstin_no", null),
                                ContactPerson = DRE.GetNullableString(reader, "contact_person", null),
                                ContactNo = DRE.GetNullableString(reader, "contact_no", null),
                                EmailId = DRE.GetNullableString(reader, "email_id", null),
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
