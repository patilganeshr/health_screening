using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class MenusGroup : BaseEntity
    {
        public Int32 MenuGroupId { get; set; }

        public string GroupName { get; set; }
    }
}
