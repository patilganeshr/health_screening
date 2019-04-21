using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class User : BaseEntity
    {
        public Int32? UserId { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public Int32? EmployeeId { get; set; }

        public Int32? RoleId { get; set; }
        
        public string RoleName { get; set; }

        public string FullName { get; set; }

    }
}
