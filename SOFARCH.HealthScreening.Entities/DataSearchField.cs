using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class DataSearchField
    {
        public Int32? SearchFieldId { get; set; }

        public string FieldName { get; set; }

        public string FieldValue { get; set; }

        public string ControlName { get; set; }

    }
}
