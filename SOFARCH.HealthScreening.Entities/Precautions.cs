using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
   public class Precautions : BaseEntity
    {

        public Int32? PrecautionsId { get; set; }

        public string DocName { get; set; }

        public string PatientName { get; set; }

        public Int32? Patientid { get; set; }


        public Int32? Age{ get; set; }

        public string MedicinesPre { get; set; }

        public string Date { get; set; }


        public Int32? DrugUtilisationId { get; set; }

        public Int32? DrugDispenseId { get; set; }

        public Int32? DrugId { get; set; }

        public string DrugName { get; set; }

        public decimal? DispenseQty { get; set; }

        public Int32? DrugCode { get; set; }

        public Int32? Dosage { get; set; }

        public Int32? PD_id { get; set; }

       

    }
}
