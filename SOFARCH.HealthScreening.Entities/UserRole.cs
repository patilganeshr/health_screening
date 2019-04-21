using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class UserRole : BaseEntity
    {
        public Int32 UserRoleId { get; set; }

        public Int32 RoleId { get; set; }
    }
}
