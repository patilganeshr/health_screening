using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.API.Controllers
{
    public class RolePermissionController : ApiController
    {
        public readonly Business.RolePermission _rolePermission;

        public RolePermissionController()
        {
            _rolePermission = new Business.RolePermission();
        }

        /// <summary>
        /// Add role permission
        /// </summary>
        /// <param name="rolePermission">Specifies an object of an entity class RolePermission.</param>
        /// <returns>An integer value of RoleId of inserted record.</returns>
        [HttpPost]
        [Route("SaveRolePermission")]
        public Int32 SaveRolePermission(Entities.RolePermission rolePermission)
        {
            return _rolePermission.SaveRolePermission(rolePermission);
        }

        /// <summary>
        /// Delete the role permissions by specified role id.
        /// </summary>
        /// <param name="rolePermission">Specifies an object of an entity class RolePermission.</param>
        /// <returns>A boolean value True if records deleted else False.</returns>
        [HttpPost]
        [Route("DeleteRolePermissionByRoleId")]
        public bool DeleteRolePermissionByRoleId(Entities.RolePermission rolePermission)
        {
            return _rolePermission.DeleteRolePermissionByRoleId(rolePermission);
        }

        /// <summary>
        /// Gets the collection of all permissions
        /// </summary>
        /// <param name="roleId">Specifies the role id.</param>
        /// <returns>A collection of role permissions.</returns>
        [Route("GetRolePermissionByRoleId")]
        public List<Entities.RolePermission> GetRolePermissionByRoleId(Int32 roleId)
        {
            return _rolePermission.GetRolePermissionByRoleId(roleId);
        }

        /// <summary>
        /// Gets the collection of permission by role and menu group.
        /// </summary>
        /// <param name="roleId">Specifies the role id.</param>
        /// <param name="menuGroupId">Specifies the menu group id.</param>
        /// <returns>A collection of role permissions.</returns>
        [Route("GetRolePermissionByRoleAndMenuGroupId/{roleId}/{menuGroupId}")]
        public List<Entities.RolePermission> GetRolePermissionByRoleAndMenuGroupId(Int32 roleId, Int32 menuGroupId)
        {
            return _rolePermission.GetRolePermissionByRoleAndMenuGroupId(roleId, menuGroupId);
        }

        /// <summary>
        /// Gets the permission by role and menu id.
        /// </summary>
        /// <param name="roleId">Specifies the role id.</param>
        /// <param name="menuId">Specifies the menu id.</param>
        /// <returns>An object of role permission.</returns>
        [Route("GetRolePermissionByRoleAndMenuId/{roleId}/{menuId}")]
        public Entities.RolePermission GetRolePermissionByRoleAndMenuId(Int32 roleId, Int32 menuId)
        {
            return _rolePermission.GetRolePermissionByRoleAndMenuId(roleId, menuId);
        }


    }
}
