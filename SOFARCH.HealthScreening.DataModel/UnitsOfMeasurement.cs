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
    public class UnitsOfMeasurement
    {
        private readonly Database database;

        public UnitsOfMeasurement()
        {
            database = DBConnect.getDBConnection();
        }

        
        /// <summary>
        /// Get all style sizes
        /// </summary>
        /// <returns>Return as list of style sizes</returns>
        public List<Entities.UnitsOfMeasurement> GetAllUnitsOfMeasurement()
        {
            List<Entities.UnitsOfMeasurement> units = new List<Entities.UnitsOfMeasurement>();

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetListOfAllUnitsOfMeasurements))
                {
                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var uom = new Entities.UnitsOfMeasurement
                            {
                                UnitOfMeasurementId = DRE.GetNullableInt32(reader, "unit_of_measurement_id", 0),
                                UnitCode = DRE.GetNullableString(reader, "unit_code", null),
                                UnitCodeDesc = DRE.GetNullableString(reader, "unit_code_desc", null),
                                UnitType = DRE.GetNullableString(reader, "unit_type", null),
                                SrNo = DRE.GetNullableInt64(reader, "sr_no", null)
                            };

                            units.Add(uom);
                        }
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

            return units;
        }

    }
}
