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
    public class Role
    {
        private readonly Database database;

        public Role()
        {
            database = DBConnect.getDBConnection();
        }

        /// <summary>
        /// Add role
        /// </summary>
        /// <param name="role">Specifies an object of Role entity class.</param>
        /// <returns>An integer value of last inserted record.</returns>
        private Int32 AddRole(Entities.Role role)
        {
            var roleId = 0;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertRole))
                {
                    database.AddInParameter(dbCommand, "@role_id", DbType.Int32, role.RoleId);
                    database.AddInParameter(dbCommand, "@role_name", DbType.String, role.RoleName);
                    database.AddInParameter(dbCommand, "@role_desc", DbType.String, role.RoleDesc);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, role.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, role.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    roleId = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        roleId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
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

            return roleId;
        }

        /// <summary>
        /// Delete the role by specified role id.
        /// </summary>
        /// <param name="role">Specifies an object of an Role entity class.</param>
        /// <returns>A boolean value True if records deleted else False.</returns>
        public bool DeleteRoleById(Entities.Role role)
        {
            bool isDeleted = false;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeleteRole))
                {
                    database.AddInParameter(dbCommand, "@role_id", DbType.Int32, role.RoleId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, role.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, role.DeletedByIP);

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
        /// Gets a role by name of a role.
        /// </summary>
        /// <param name="roleName">Specifies the name of a role.</param>
        /// <returns>An object representing the role.</returns>
        public Entities.Role GetRoleDetailsByName(string roleName)
        {
            var role = new Entities.Role();

            DbCommand dbCommand = null;

            using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetRoleDetailsByName))
            {
                database.AddInParameter(dbCommand, "@role_name", DbType.String, roleName);

                using (IDataReader reader = database.ExecuteReader(dbCommand))
                {
                    while (reader.Read())
                    {
                        var _role = new Entities.Role
                        {
                            RoleId = DRE.GetNullableInt32(reader, "role_id", 0),
                            RoleName = DRE.GetNullableString(reader, "role_name", null),
                            RoleDesc = DRE.GetNullableString(reader, "role_desc", null)
                        };

                        role = _role;
                    }
                }
            }

            return role;
        }

        /// <summary>
        /// Gets a role by id
        /// </summary>
        /// <param name="roleId">Specifies the id of a role.</param>
        /// <returns>An object representing the role</returns>
        public Entities.Role GetRoleDetailsById(Int32 roleId)
        {
            var role = new Entities.Role();

            DbCommand dbCommand = null;

            using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetRoleDetailsById))
            {
                database.AddInParameter(dbCommand, "@role_id", DbType.Int32, roleId);

                using (IDataReader reader = database.ExecuteReader(dbCommand))
                {
                    while (reader.Read())
                    {
                        var _role = new Entities.Role
                        {
                            RoleId = DRE.GetNullableInt32(reader, "role_id", 0),
                            RoleName = DRE.GetNullableString(reader, "role_name", null),
                            RoleDesc = DRE.GetNullableString(reader, "role_desc", null)
                        };

                        role = _role;
                    }
                }
            }

            return role;
        }

        /// <summary>
        /// Gets a list of all roles
        /// </summary>
        /// <returns>A collection of all roles.</returns>
        public List<Entities.Role> GetAllRoles()
        {
            var roles = new List<Entities.Role>();

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetListOfAllRoles))
                {
                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var role = new Entities.Role
                            {
                                RoleId = DRE.GetNullableInt32(reader, "role_id", 0),
                                RoleName = DRE.GetNullableString(reader, "role_name", null),
                                RoleDesc = DRE.GetNullableString(reader, "role_desc", null),
                                SrNo = DRE.GetNullableInt64(reader, "sr_no", null)
                            };

                            roles.Add(role);
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

            return roles;
        }

        /// <summary>
        /// Update the role
        /// </summary>
        /// <param name="role">Specifies an object of Role entitty class.</param>
        /// <returns>An interger value of updated role id.</returns>
        private Int32 UpdateRole(Entities.Role role)
        {
            var roleId = 0;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdateRole))
                {
                    database.AddInParameter(dbCommand, "@role_id", DbType.Int32, role.RoleId);
                    database.AddInParameter(dbCommand, "@role_name", DbType.String, role.RoleName);
                    database.AddInParameter(dbCommand, "@role_desc", DbType.String, role.RoleDesc);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, role.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, role.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    roleId = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        roleId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
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

            return roleId;
        }

        public Int32 SaveRole(Entities.Role role)
        {
            var roleId = 0;

            if (role.RoleId == null || role.RoleId == 0)
            {
                roleId = AddRole(role);
            }
            else if (role.ModifiedBy != null || role.ModifiedBy > 0)
            {
                roleId =  UpdateRole(role);
            }
            else if (role.IsDeleted== true)
            {
                var result = DeleteRoleById(role);
            }

            return roleId;
        }
    }
}
