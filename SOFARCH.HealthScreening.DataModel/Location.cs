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
    public class Location
    {
        private readonly Database database;

        public Location()
        {
            database = DBConnect.getDBConnection();
        }

        /// <summary>
        /// Get All Locations with Location Type
        /// </summary>
        /// <returns>Will return a list of Location.</returns>
        public List<Entities.Location> GetAllLocationsWithLocationTypes()
        {
            var locations = new List<Entities.Location>();

            DbCommand dbCommand = null;

            try
            {
                using(dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetListOfAllLocationsWithLocationType))
                {
                    using(IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var location = new Entities.Location()
                            {
                                LocationId = DRE.GetNullableInt32(reader, "location_id", null),
                                LocationName = DRE.GetNullableString(reader, "location_name", null),
                                LocationTypeId = DRE.GetNullableInt32(reader, "location_type_id", null)
                            };

                            locations.Add(location);
                        }
                    }
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
            finally
            {
                dbCommand = null;
            }

            return locations;
        }

    }
}
