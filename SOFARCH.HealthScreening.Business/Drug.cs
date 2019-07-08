using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Business
{
    public class Drug
    {
        private readonly DataModel.Drug _drug;

        public Drug()
        {
            _drug = new DataModel.Drug();
        }

        public List<Entities.Drug> GetDrugIdAndDrugName(string drugOrXRay)
        {
            return _drug.GetDrugIdAndDrugName(drugOrXRay);
        }

        public List<Entities.Drug> GetDrugIdAndDrugNameByDrugName(string drugOrXRay, string drugName)
        {
            return _drug.GetDrugIdAndDrugNameByDrugName(drugOrXRay, drugName);
        }

        public List<Entities.Drug> SearchDrugsAll()
        {
            return _drug.SearchDrugsAll();
        }

        public List<Entities.Drug> SearchDrugsByGenericName(string genericName)
        {
            return _drug.SearchDrugsByGenericName(genericName);
        }

        public List<Entities.Drug> SearchDrugsByDrugName(string drugName)
        {
            return _drug.SearchDrugsByDrugName(drugName);
        }

        public List<Entities.Drug> SearchDrugsByDrugGroupName(string drugGroupName)
        {
            return _drug.SearchDrugsByDrugGroupName(drugGroupName);
        }

        public List<Entities.Drug> SearchDrugsByDrugCode(string drugCode)
        {
            return _drug.SearchDrugsByDrugCode(drugCode);
        }

        public Int32 SaveDrug(Entities.Drug drug)
        {
            return _drug.SaveDrug(drug);
        }

    }
}

