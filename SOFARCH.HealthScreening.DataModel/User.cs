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
using System.Reflection;

namespace SOFARCH.HealthScreening.DataModel
{
    public class User
    {
        private readonly Database database;

        public User()
        {
            database = DBConnect.getDBConnection();
        }

        private Int32 VerifyUser(string username, string password)
        {
            var userId = 0;

            DbCommand dbCommand = null;

            Entities.User user = new Entities.User();

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.VerifyUser))
                {
                    database.AddInParameter(dbCommand, "@user_name", DbType.String, username);
                    database.AddInParameter(dbCommand, "@password", DbType.String, password);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            userId = reader.GetInt32(reader.GetOrdinal("UserId"));
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
                user = null;
            }

            return userId;
        }

        public Entities.User GetUserDetails(string username, string password)
        {
            var userId = 0;

            var  user = new Entities.User();

            DbCommand dbCommand = null;

            try
            {
                userId = VerifyUser(username, password);

                if (userId > 0)
                {
                    using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetUserDetailsById))
                    {
                        database.AddInParameter(dbCommand, "@user_id", DbType.Int32, userId);

                        using (IDataReader reader = database.ExecuteReader(dbCommand))
                        {
                            while (reader.Read())
                            {
                                var _user = new Entities.User
                                {
                                    UserId = userId,
                                    FullName = DRE.GetNullableString(reader, "full_name", null),
                                    RoleId = DRE.GetNullableInt32(reader, "role_id", 0),
                                    RoleName = DRE.GetNullableString(reader, "role_name", null),
                                    guid = DRE.GetNullableGuid(reader, "row_guid", null)
                                };

                                user = _user;
                            }
                        }
                    }
                }
                else
                {
                    var _user = new Entities.User
                    {
                        UserId = 0
                    };

                    user = _user;
                }
            }
            catch(Exception e)
            {
                throw e;
            }
            finally
            {
                dbCommand = null;
            }

            return user;
        }
    }
}
