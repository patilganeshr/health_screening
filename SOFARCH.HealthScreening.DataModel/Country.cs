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
    public class Country
    {
        private readonly Database database;
        
        public Country()
        {
            database = DBConnect.getDBConnection();
        }

        public List<Entities.Country> GetAllCountries()
        {
            var countries = new List<Entities.Country>();

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetListOfAllCountries))
                {
                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var country = new Entities.Country
                            {
                                CountryId = DRE.GetNullableInt32(reader, "country_id", 0),
                                CountryName = DRE.GetNullableString(reader, "country_name", null),
                                CountryCode = DRE.GetNullableString(reader, "country_code", null)
                            };

                            countries.Add(country);
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

            return countries;
        }
    }
}
