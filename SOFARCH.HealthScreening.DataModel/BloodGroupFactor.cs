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
    public class BloodGroupFactor
    {
        private readonly Database database;

        public BloodGroupFactor()
        {
            database = DBConnect.getDBConnection();
        }

        public List<Entities.BloodGroupFactor> GetBloodGroupFactors()
        {
            return null;
        }

    }
}
