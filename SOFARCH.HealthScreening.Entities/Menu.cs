using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class Menu : BaseEntity
    {
        public Int32? MenuId { get; set; }

        public Int32? MenuGroupId { get; set; }

        public string MenuName { get; set; }

        public string PageLink { get; set; }

        public decimal? MenuSequence { get; set; }

        public string MenuGroupName { get; set; }
        public string MenuIcon { get; set; }
    }
}
