using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Business
{
    public class DrugDispenseReturn
    {
        private readonly DataModel.DrugDispenseReturn _drugDispenseReturn;

        public DrugDispenseReturn()
        {
            _drugDispenseReturn = new DataModel.DrugDispenseReturn();
        }

        public List<Entities.DrugDispenseReturn> SearchDrguDispenseReturn(Entities.DrugDispenseReturn drugDispenseReturn)
        {
            return _drugDispenseReturn.SearchDrguDispenseReturn(drugDispenseReturn);
        }

        public List<Entities.DrugDispenseDrugReturn> GetDrugDetailsByPatientId(Int32 patientId)
        {
            return _drugDispenseReturn.GetDrugDetailsByPatientId(patientId);
        }

        public List<Entities.DrugDispenseDrugReturn> GetDrugDispenseDetailsByPatientIdAndDrugId(Int32 patientId, Int32 drugId)
        {
            return _drugDispenseReturn.GetDrugDispenseDetailsByPatientIdAndDrugId(patientId, drugId);
        }

        public List<Entities.DrugDispenseDrugReturn> GetDrugDispenseDetailsByPatientId(Int32 patientId)
        {
            return _drugDispenseReturn.GetDrugDispenseDetailsByPatientId(patientId);
        }

        public List<Entities.DrugDispenseReturn> GetPastDrugReturnDatesByPatientId(Int32 patientId)
        {
            return _drugDispenseReturn.GetPastDrugReturnDatesByPatientId(patientId);
        }

        public Int32 SaveDrugDispenseReturnDetails(Entities.DrugDispenseReturn drugDispenseReturn)
        {
            return _drugDispenseReturn.SaveDrugDispenseReturnDetails(drugDispenseReturn);
        }

    }

}
