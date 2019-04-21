using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Web;


namespace SOFARCH.HealthScreening.Business
{
    public class User
    {
        private readonly DataModel.User _user;

        public User()
        {
            _user = new DataModel.User();
        }

        /// <summary>
        /// Gets the user details.
        /// </summary>
        /// <param name="username">A string value of username.</param>
        /// <param name="password">A string value of password.</param>
        /// <returns>An object of an entity class User.</returns>
        public Entities.User GetUserDetails(string username, string password)
        {
            var user = new Entities.User();

            user = _user.GetUserDetails(username, password);

            if (user != null)
            {
                if (user.UserId > 0)
                {
                    HttpContext.Current.Session.Add("USER_ID", user.UserId);
                    HttpContext.Current.Session.Add("ROLE_ID", user.RoleId);
                    HttpContext.Current.Session.Add("USER_FULL_NAME", user.FullName);
                }
            }

            return user;
        }

        public bool IsLogOut()
        {
            var isLogOut = false;

            if (HttpContext.Current.Session != null)
            {
                isLogOut = true;
                HttpContext.Current.Session.Clear();
            }

            return isLogOut;
        }
    }
}
