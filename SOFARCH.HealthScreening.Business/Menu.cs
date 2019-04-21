using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Business
{
    public class Menu
    {
        private readonly DataModel.Menu _menu;

        public Menu()
        {
            _menu = new DataModel.Menu();
        }

        /// <summary>ssss
        /// Gets list of menus by role id.
        /// </summary>
        /// <param name="roleId">Specifies the role id.</param>
        /// <returns>A collection of menus.</returns>
        public List<Entities.Menu> GetMenusByRoleId(Int32 roleId)
        {
            return _menu.GetMenusByRoleId(roleId);
        }
    }
}
