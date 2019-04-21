using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class ItemCategory : BaseEntity
    {
        public Int32? ItemCategoryId { get; set; }

        public string ItemCategoryName { get; set; }

        public string ItemCategoryDesc { get; set; }

        public Int32? GSTCategoryId { get; set; }
        
        public string GSTCategoryName { get; set; }
    }
}
