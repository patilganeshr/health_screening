using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class DrugDispenseReturn : BaseEntity
    {
        public Int32? DrugDispenseReturnId { get; set; }

        public Int32? DrugDispenseId { get; set; }

        public string DrugReturnDate { get; set; }

        public Int32? DrugReturnNo { get; set; }

        public Int32? PatientId { get; set; }

        public List<Entities.DrugDispenseDrugReturn> DrugDispenseDrugReturns { get; set; }

        public string PatientName { get; set; }

    }
}
