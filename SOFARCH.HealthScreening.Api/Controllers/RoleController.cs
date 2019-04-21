using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.API.Controllers
{
    public class RoleController : ApiController
    {
        private readonly Business.Role _role;

        public RoleController()
        {
            _role = new Business.Role();
        }

        [Route("GetAllRoles")]
        public List<Entities.Role> GetAllRoles()
        {
            return _role.GetAllRoles();
        }
    }
}
