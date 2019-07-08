using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class XRayFilmUsed : BaseEntity
    {
        public Int32? XRayFilmUsedId { get; set; }

        public Int32? XRayIssueId { get; set; }

        public Int32? DrugId { get; set; }

        public string DrugName { get; set; }

        public decimal? DispenseQty { get; set; }

        public Int32? DrugCode { get; set; }

        public decimal? PurchaseRate { get; set; }

        public decimal? BalanceQty { get; set; }

        public decimal? Amount { get; set; }
    }
}
