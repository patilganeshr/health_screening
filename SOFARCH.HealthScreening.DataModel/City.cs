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
    public class City
    {
        private readonly Database database;

        public City()
        {
            database = DBConnect.getDBConnection();
        }

        public Int32 AddCity(Entities.City city)
        {
            var cityId = 0;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertCity))
                {
                    database.AddInParameter(dbCommand, "@city_id", DbType.Int32, city.CityId);
                    database.AddInParameter(dbCommand, "@state_id", DbType.Int32, city.StateId);
                    database.AddInParameter(dbCommand, "@city_name", DbType.String, city.CityName);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, city.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, city.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    cityId = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        cityId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
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

            return cityId;
        }

        public bool DeleteCity(Entities.City city)
        {
            bool isCityDeleted = false;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeleteCity))
                {
                    database.AddInParameter(dbCommand, "@city_id", DbType.Int32, city.CityId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, city.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, city.DeletedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    var result = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        isCityDeleted = Convert.ToBoolean(database.GetParameterValue(dbCommand, "@return_value"));
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

            return isCityDeleted;
        }
        
        public bool IsCityNameExists(Int32 stateId, string cityName)
        {
            var isCityNameExists = false;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.CheckCityNameIsExists))
                {
                    database.AddInParameter(dbCommand, "@state_id", DbType.Int32, stateId);
                    database.AddInParameter(dbCommand, "@city_name", DbType.String, cityName);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            isCityNameExists = Convert.ToBoolean(DRE.GetInt32(reader, "is_city_name_exists"));
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

            return isCityNameExists;
        }

        public List<Entities.City> GetCitiesByState(Int32 stateId)
        {
            var cities = new List<Entities.City>();

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetListofCitiesByState))
                {
                    database.AddInParameter(dbCommand, "@state_id", DbType.Int32, stateId);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var city = new Entities.City
                            {
                                CityId = DRE.GetNullableInt32(reader, "city_id", 0),
                                CityName = DRE.GetNullableString(reader, "city_name", null),
                                SrNo = DRE.GetNullableInt64(reader,"sr_no", null)
                            };

                            cities.Add(city);
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

            return cities;
        }

        public Int32 UpdateCity(Entities.City city)
        {
            var cityId = 0;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdateCity))
                {
                    database.AddInParameter(dbCommand, "@city_id", DbType.Int32, city.CityId);
                    database.AddInParameter(dbCommand, "@state_id", DbType.Int32, city.StateId);
                    database.AddInParameter(dbCommand, "@city_name", DbType.String, city.CityName);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, city.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, city.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    cityId = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        cityId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
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

            return cityId;
        }

        public Int32 SaveCity(Entities.City city)
        {
            var cityId = 0;

            if (city.CityId == null || city.CityId == 0)
            {
                var result = IsCityNameExists((int)city.StateId, city.CityName);

                if (result == false)
                {
                    cityId = AddCity(city);
                }
                else
                {
                    cityId  = -1;
                }
            }
            else if (city.IsDeleted == true)
            {
                var result = DeleteCity(city);

                if (result == true)
                {
                    cityId = 1;
                }
                else
                {
                    cityId = 0;
                }
            }
            else if (city.ModifiedBy > 0 || city.ModifiedBy != null)
            {
                cityId = UpdateCity(city);
            }

            return cityId;
        }
    }
}
