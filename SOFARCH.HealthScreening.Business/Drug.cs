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

        public List<Entities.Drug> GetListOfAllDrugs()
        {
            return _drug.GetListOfAllDrugs();
        }

        public List<Entities.Drug> SearchDrugsAll()
        {
            return _drug.SearchDrugsAll();
        }

        public Int32 SaveDrug(Entities.Drug drug)
        {
            return _drug.SaveDrug(drug);
        }

    }
}

