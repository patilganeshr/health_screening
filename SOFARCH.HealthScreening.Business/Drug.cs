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

        public List<Entities.Drug> GetDrugIdAndGenericName()
        {
            return _drug.GetDrugIdAndGenericName();
        }

        public List<Entities.Drug> GetDrugIdAndGenericNameByName(string genericName)
        {
            return _drug.GetDrugIdAndGenericNameByName(genericName);
        }

        public List<Entities.Drug> SearchDrugsAll()
        {
            return _drug.SearchDrugsAll();
        }

        public List<Entities.Drug> SearchDrugsByGenericName(string genericName)
        {
            return _drug.SearchDrugsByGenericName(genericName);
        }

        public Int32 SaveDrug(Entities.Drug drug)
        {
            return _drug.SaveDrug(drug);
        }

    }
}

