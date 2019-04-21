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
    public class RolePermission
    {
        private readonly Database database;

        public RolePermission()
        {
            database = DBConnect.getDBConnection();
        }

        /// <summary>
        /// Add role permission
        /// </summary>
        /// <param name="rolePermission">Specifies an object of RolePermission entity class.</param>
        /// <returns>An integer value of last inserted record.</returns>
        private Int32 AddRolePermission(Entities.RolePermission rolePermission)
        {
            var rolePermissionId = 0;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertRolePermission))
                {
                    database.AddInParameter(dbCommand, "@role_permission_id", DbType.Int32, rolePermission.RolePermissionId);
                    database.AddInParameter(dbCommand, "@role_id", DbType.Int32, rolePermission.RoleId);
                    database.AddInParameter(dbCommand, "@menu_group_id", DbType.Int32, rolePermission.MenuGroupId);
                    database.AddInParameter(dbCommand, "@menu_id", DbType.String, rolePermission.MenuId);
                    database.AddInParameter(dbCommand, "@add_permission", DbType.String, rolePermission.AddPermission);
                    database.AddInParameter(dbCommand, "@view_permission", DbType.String, rolePermission.ViewPermission);
                    database.AddInParameter(dbCommand, "@edit_permission", DbType.String, rolePermission.EditPermission);
                    database.AddInParameter(dbCommand, "@delete_permission", DbType.String, rolePermission.DeletePermission);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, rolePermission.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, rolePermission.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    rolePermissionId = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        rolePermissionId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
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

            return rolePermissionId;
        }

        /// <summary>
        /// Delete the role permissions by specified role id.
        /// </summary>
        /// <param name="rolePermission">Specifies an object of an Role entity class.</param>
        /// <returns>A boolean value True if records deleted else False.</returns>
        public bool DeleteRolePermissionByRoleId(Entities.RolePermission rolePermission)
        {
            bool isDeleted = false;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeleteRolePermission))
                {
                    database.AddInParameter(dbCommand, "@role_id", DbType.Int32, rolePermission.RoleId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, rolePermission.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, rolePermission.DeletedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    var result = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        isDeleted = Convert.ToBoolean(database.GetParameterValue(dbCommand, "@return_value"));
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

            return isDeleted;
        }

        /// <summary>
        /// Gets the collection of all permissions
        /// </summary>
        /// <param name="roleId">Specifies the role id.</param>
        /// <returns>A collection of role permissions.</returns>
        public List<Entities.RolePermission> GetRolePermissionByRoleId(Int32 roleId)
        {
            var rolePermissions = new List<Entities.RolePermission>();

            DbCommand dbCommand = null;

            using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetListOfPermissionsByRoleId))
            {
                database.AddInParameter(dbCommand, "@role_id", DbType.Int32, roleId);

                using (IDataReader reader = database.ExecuteReader(dbCommand))
                {
                    while (reader.Read())
                    {
                        var rolePermission = new Entities.RolePermission
                        {
                            RolePermissionId = DRE.GetNullableInt32(reader, "role_permission_id", 0),
                            RoleId = DRE.GetNullableInt32(reader, "role_id", null),
                            MenuGroupId = DRE.GetNullableInt32(reader, "menu_group_id", null),
                            MenuId = DRE.GetNullableInt32(reader, "menu_id", null),
                            AddPermission = DRE.GetNullableBoolean(reader, "add_permission", null),
                            ViewPermission = DRE.GetNullableBoolean(reader, "view_permission", null),
                            EditPermission = DRE.GetNullableBoolean(reader, "edit_permission", null),
                            DeletePermission = DRE.GetNullableBoolean(reader, "delete_permission", null)
                        };

                        rolePermissions.Add(rolePermission);
                    }
                }
            }

            return rolePermissions;
        }

        /// <summary>
        /// Gets the collection of permission by role and menu group.
        /// </summary>
        /// <param name="roleId">Specifies the role id.</param>
        /// <param name="menuGroupId">Specifies the menu group id.</param>
        /// <returns>A collection of role permissions.</returns>
        public List<Entities.RolePermission> GetRolePermissionByRoleAndMenuGroupId(Int32 roleId, Int32 menuGroupId)
        {
            var rolePermissions = new List<Entities.RolePermission>();

            DbCommand dbCommand = null;

            using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetListOfPermissionsByRoleIdAndMenuGroupId))
            {
                database.AddInParameter(dbCommand, "@role_id", DbType.Int32, roleId);
                database.AddInParameter(dbCommand, "@menu_group_id", DbType.Int32, menuGroupId);

                using (IDataReader reader = database.ExecuteReader(dbCommand))
                {
                    while (reader.Read())
                    {
                        var rolePermission = new Entities.RolePermission
                        {
                            RolePermissionId = DRE.GetNullableInt32(reader, "role_permission_id", 0),
                            RoleId = DRE.GetNullableInt32(reader, "role_id", null),
                            MenuGroupId = DRE.GetNullableInt32(reader, "menu_group_id", null),
                            MenuId = DRE.GetNullableInt32(reader, "menu_id", null),
                            AddPermission = DRE.GetNullableBoolean(reader, "add_permission", null),
                            ViewPermission = DRE.GetNullableBoolean(reader, "view_permission", null),
                            EditPermission = DRE.GetNullableBoolean(reader, "edit_permission", null),
                            DeletePermission = DRE.GetNullableBoolean(reader, "delete_permission", null)
                        };

                        rolePermissions.Add(rolePermission);
                    }
                }
            }

            return rolePermissions;
        }

        /// <summary>
        /// Gets the permission by role and menu id.
        /// </summary>
        /// <param name="roleId">Specifies the role id.</param>
        /// <param name="menuId">Specifies the menu id.</param>
        /// <returns>An object of role permission.</returns>
        public Entities.RolePermission GetRolePermissionByRoleAndMenuId(Int32 roleId, Int32 menuId)
        {
            var rolePermission = new Entities.RolePermission();

            DbCommand dbCommand = null;

            using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetPermissionDetailsByRoleAndMenuId))
            {
                database.AddInParameter(dbCommand, "@role_id", DbType.Int32, roleId);
                database.AddInParameter(dbCommand, "@menu_id", DbType.Int32, menuId);

                using (IDataReader reader = database.ExecuteReader(dbCommand))
                {
                    while (reader.Read())
                    {
                        var _rolePermission = new Entities.RolePermission
                        {
                            RolePermissionId = DRE.GetNullableInt32(reader, "role_permission_id", 0),
                            AddPermission = DRE.GetNullableBoolean(reader, "add_permission", null),
                            ViewPermission = DRE.GetNullableBoolean(reader, "view_permission", null),
                            EditPermission = DRE.GetNullableBoolean(reader, "edit_permission", null),
                            DeletePermission = DRE.GetNullableBoolean(reader, "delete_permission", null)
                        };

                        rolePermission = _rolePermission;
                    }
                }
            }

            return rolePermission;
        }

        /// <summary>
        /// Update the role permission
        /// </summary>
        /// <param name="rolePermission">Specifies an object of Role Permission entitty class.</param>
        /// <returns>An interger value of updated role id.</returns>
        private Int32 UpdateRolePermission(Entities.RolePermission rolePermission)
        {
            var rolePermissionId = 0;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdateRolePermission))
                {
                    database.AddInParameter(dbCommand, "@role_permission_id", DbType.Int32, rolePermission.RolePermissionId);
                    database.AddInParameter(dbCommand, "@role_id", DbType.Int32, rolePermission.RoleId);
                    database.AddInParameter(dbCommand, "@menu_group_id", DbType.Int32, rolePermission.MenuGroupId);
                    database.AddInParameter(dbCommand, "@menu_id", DbType.String, rolePermission.MenuId);
                    database.AddInParameter(dbCommand, "@add_permission", DbType.String, rolePermission.AddPermission);
                    database.AddInParameter(dbCommand, "@view_permission", DbType.String, rolePermission.ViewPermission);
                    database.AddInParameter(dbCommand, "@edit_permission", DbType.String, rolePermission.EditPermission);
                    database.AddInParameter(dbCommand, "@delete_permission", DbType.String, rolePermission.DeletePermission);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, rolePermission.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, rolePermission.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    rolePermissionId = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        rolePermissionId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
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

            return rolePermissionId;
        }

        public Int32 SaveRolePermission(Entities.RolePermission rolePermission)
        {
            var rolePermissionId = 0;

            if (rolePermission.RolePermissionId == null || rolePermission.RolePermissionId == 0)
            {
                rolePermissionId = AddRolePermission(rolePermission);
            }
            else if (rolePermission.ModifiedBy != null || rolePermission.ModifiedBy > 0)
            {
                rolePermissionId = UpdateRolePermission(rolePermission);
            }
            else if(rolePermission.IsDeleted ==true)
            {
                var result = DeleteRolePermissionByRoleId(rolePermission);
            }

            return rolePermissionId;
        }

    }
}
