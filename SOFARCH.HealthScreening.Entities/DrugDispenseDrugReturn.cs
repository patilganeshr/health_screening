using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class DrugDispenseDrugReturn : BaseEntity
    {
        public Int32? DrugDispenseDrugReturnId { get; set; }

        public Int32? DrugDispenseReturnId { get; set; }

        public Int32? DrugUtilisationId { get; set; }

        public Int32? DrugId { get; set; }

        public decimal? ReturnQty { get; set; }

        public decimal? Rate { get; set; }

        public Int32? DrugDispenseId { get; set; }

        public Int32? DrugDispenseNo { get; set; }

        public string DrugDispenseDate { get; set; }

        public Int32? DrugCode { get; set; }

        public string DrugName { get; set; }

        public decimal? DispenseQty { get; set; }

        public decimal? BalanceQty { get; set; }

        public decimal? Amount { get; set; }

    }
}
