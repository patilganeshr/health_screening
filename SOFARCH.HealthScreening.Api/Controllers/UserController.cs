using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.API.Controllers
{
    public class UserController : ApiController
    {
        private readonly Business.User _user;

        public UserController()
        {
            _user = new Business.User();
        }

        /// <summary>
        /// Gets the user details.
        /// </summary>
        /// <param name="username">A string value of username.</param>
        /// <param name="password">A string value of password.</param>
        /// <returns>An object of an entity class User.</returns>
        [Route("GetUserDetails/{username}/{password}")]
        public Entities.User GetUserDetails(string username, string password)
        {
            return _user.GetUserDetails(username, password);
        }

        [HttpGet]
        [Route("IsLogOut")]
        public bool IsLogOut()
        {
            return _user.IsLogOut();
        }
    }
}
