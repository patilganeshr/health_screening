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
    public class Menu
    {
        private readonly Database database;

        public Menu()
        {
            database = DBConnect.getDBConnection();
        }

        /// <summary>
        /// Gets list of menus by role id.
        /// </summary>
        /// <param name="roleId">Specifies the role id.</param>
        /// <returns>A collection of menus.</returns>
        public List<Entities.Menu> GetMenusByRoleId(Int32 roleId)
        {
            var menus = new List<Entities.Menu>();

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetListOfMenusByRole))
                {
                    database.AddInParameter(dbCommand, "@role_id", DbType.Int32, roleId);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var menu = new Entities.Menu
                            {
                                MenuId = DRE.GetNullableInt32(reader, "menu_id", 0),
                                MenuGroupId = DRE.GetNullableInt32(reader, "menu_group_id", 0),
                                MenuGroupName = DRE.GetNullableString(reader, "menu_group", null),
                                MenuName = DRE.GetNullableString(reader, "menu_name", null),
                                PageLink = DRE.GetNullableString(reader, "page_link", null),
                                MenuSequence = DRE.GetNullableDecimal(reader, "menu_sequence", 0),
                                MenuIcon = DRE.GetNullableString(reader, "menu_icon", null)
                            };

                            menus.Add(menu);
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

            return menus;
        }
    }
}
