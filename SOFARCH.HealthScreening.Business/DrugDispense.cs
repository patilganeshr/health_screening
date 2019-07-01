using SOFARCH.HealthScreening.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Business
{
    public class DrugDispense
    {
        private readonly DataModel.DrugDispense _drugDispense;

        public DrugDispense()
        {
            _drugDispense = new DataModel.DrugDispense();
        }

        public Entities.DrugDispenseDrugUtilisation GetDrugDetailsByDrugId(Int32 drugId)
        {
            return _drugDispense.GetDrugDetailsByDrugId(drugId);
        }

        public List<Entities.DrugDispense> SearchDrguDispense(Entities.DrugDispense drugDispense)
        {
            return _drugDispense.SearchDrguDispense(drugDispense);
        }

        public List<Entities.DrugDispense> GetPastDrugDispenseDatesByPatientId(Int32 patientId)
        {
            return _drugDispense.GetPastDrugDispenseDatesByPatientId(patientId);
        }

        public List<Entities.DrugDispenseDrugUtilisation> GetDrugUtilisationByDrugDispenseId(Int32 drugDispenseId)
        {
            return _drugDispense.GetDrugUtilisationByDrugDispenseId(drugDispenseId);
        }

        public Int32 SaveDrugDispenseDetails(Entities.DrugDispense drugDispense)
        {
            return _drugDispense.SaveDrugDispenseDetails(drugDispense);
        }

    }
}
