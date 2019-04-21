using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class RolePermission : BaseEntity
    {
        public Int32? RolePermissionId { get; set; }

        public Int32? RoleId { get; set; }

        public Int32? MenuGroupId { get; set; }

        public Int32? MenuId { get; set; }

        public bool? AddPermission { get; set; }

        public bool? ViewPermission { get; set; }
        public bool? EditPermission { get; set; }

        public bool? DeletePermission { get; set; }

    }
}
