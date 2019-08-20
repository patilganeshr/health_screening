using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
   public class Precautions : BaseEntity
    {

        public Int32? DrugDispenseId { get; set; }

        public Int32? DrugDispenseNo { get; set; }

        public string DrugDispenseDate { get; set; }

        public Int32? PatientId { get; set; }

        public List<PrecautionsList> DrugDispenseDrugUtilisations { get; set; }

        public string PatientName { get; set; }

        public string DoctName { get; set; }

        public Int32? EmployerId { get; set; }

        public Int32? EmployerCode { get; set; }

        public string EmployerName { get; set; }

        public Int32? PatientCode { get; set; }
        

    }
}
