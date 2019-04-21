using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.Practices.EnterpriseLibrary.Common;
using Microsoft.Practices.EnterpriseLibrary.Data;

namespace SOFARCH.HealthScreening.DataModel
{
    public static class DBConnect
    {
        static DatabaseProviderFactory factory = null;
        static Database db = null;
        
        /// <summary>
        /// Get the database connection
        /// </summary>
        /// <returns>return a enterprise library database object</returns>
        internal static Database getDBConnection()
        {
            factory = new DatabaseProviderFactory();
            db = factory.Create("DBConnectionString");
            return db;
        }

    }
}
