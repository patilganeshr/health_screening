using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public abstract class BaseEntity
    {
        public Int64? SrNo { get; set; }

        public string Remarks { get; set; }

        public Guid? guid { get; set; }

        public bool? IsDeleted { get; set; }

        public Int32? CreatedBy { get; set; }

        public string CreatedByIP { get; set; }

        public DateTime? CreatedDateTime { get; set; }

        public Int32? ModifiedBy { get; set; }

        public string ModifiedByIP { get; set; }

        public DateTime? ModifiedDateTime { get; set; }

        public Int32? CancelledBy { get; set; }

        public Int32? DeletedBy { get; set; }

        public string DeletedByIP { get; set; }

        public DateTime? DeletedDatetime { get; set; }

        public Int32? WorkingPeriodId { get; set; }

        public string FinancialYear { get; set; }

    }
}
