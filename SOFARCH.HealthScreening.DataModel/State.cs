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
    public class State
    {
        private readonly Database database;

        public State()
        {
            database = DBConnect.getDBConnection();
        }

        public List<Entities.State> GetStatesByCountry(Int32 countryId)
        {
            var states = new List<Entities.State>();

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetListOfStatesByCountryId))
                {
                    database.AddInParameter(dbCommand, "@country_id", DbType.Int32, countryId);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var state = new Entities.State
                            {
                                StateId = DRE.GetNullableInt32(reader, "state_id", 0),
                                StateName = DRE.GetNullableString(reader, "state_name", null),
                                StateCode = DRE.GetNullableString(reader, "state_code", null),
                                TINNo = DRE.GetNullableString(reader, "tin_no", null)
                            };

                            states.Add(state);
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

            return states;
        }

    }
}
