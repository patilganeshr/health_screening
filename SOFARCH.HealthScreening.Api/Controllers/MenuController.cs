using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.API.Controllers
{
    public class MenuController : ApiController
    {
        private readonly Business.Menu _menu;

        public MenuController()
        {
            _menu = new Business.Menu();
        }

        /// <summary>
        /// Gets list of menus by role id.
        /// </summary>
        /// <param name="roleId">Specifies the role id.</param>
        /// <returns>A collection of menus.</returns>
        [Route("GetMenusByRole/{roleId}")]
        public List<Entities.Menu> GetMenusByRole(Int32 roleId)
        {
            return _menu.GetMenusByRoleId(roleId);
        }
    }
}
