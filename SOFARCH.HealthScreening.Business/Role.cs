using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace SOFARCH.HealthScreening.Business
{
    public class Role
    {
        private readonly DataModel.Role _role;

        public Role()
        {
            _role = new DataModel.Role();
        }

        /// <summary>
        /// Add role.
        /// </summary>
        /// <param name="role">Specifies an object of an entity class Role.</param>
        /// <returns>An integer value as RoleId of a inserted record.</returns>
        public Int32 SaveRole(Entities.Role role)
        {
            return _role.SaveRole(role);
        }

        /// <summary>
        /// Delete the role by specified role id.
        /// </summary>
        /// <param name="role">Specifies an object of an entity class Role.</param>
        /// <returns>A boolean value of True if records get deleted successfully else False if failed.</returns>
        public bool DeleteRoleById(Entities.Role role)
        {
            return _role.DeleteRoleById(role);
        }

        /// <summary>
        /// Gets a role details by name of a role.
        /// </summary>
        /// <param name="roleName">Specifies the name of a role.</param>
        /// <returns>An object of an entity class Role.</returns>
        public Entities.Role GetRoleDetailsByName(string roleName)
        {
            return _role.GetRoleDetailsByName(roleName);
        }

        /// <summary>
        /// Gets a role by id
        /// </summary>
        /// <param name="roleId">Specifies the id of a role.</param>
        /// <returns>An object of an entity class Role.</returns>
        public Entities.Role GetRoleDetailsById(Int32 roleId)
        {
            return _role.GetRoleDetailsById(roleId);
        }

        /// <summary>
        /// Gets a list of all roles
        /// </summary>
        /// <returns>A collection of an entity class Roles.</returns>
        public List<Entities.Role> GetAllRoles()
        {   
            return _role.GetAllRoles();
        }


    }
}
