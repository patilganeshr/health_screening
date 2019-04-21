using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class Role : BaseEntity
    {
        public Int32? RoleId { get; set; }

        public string RoleName { get; set; }

        public string RoleDesc { get; set; }
        
    }
}
