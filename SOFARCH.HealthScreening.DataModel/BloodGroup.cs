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
    public class BloodGroup
    {
        private readonly Database database;

        public BloodGroup()
        {
            database = DBConnect.getDBConnection();
        }

        public List<Entities.BloodGroup> GetAllBloodGroups()
        {
            var bloodGroups = new List<Entities.BloodGroup>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetAllBloodGroups))
                {
                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var bloodGroup = new Entities.BloodGroup
                            {
                                BloodGroupId = DRE.GetNullableInt32(reader, "blood_group_id", 0),
                                BloodGroupName = DRE.GetNullableString(reader, "blood_group", null),
                                BloodGroupFactorId = DRE.GetNullableInt32(reader, "blood_group_factor_id", null)
                            };

                            bloodGroups.Add(bloodGroup);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return bloodGroups;

        }

    }
}
