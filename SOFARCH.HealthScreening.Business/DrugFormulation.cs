using SOFARCH.HealthScreening.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Business
{
    public class DrugFormulation
    {
        private readonly DataModel.DrugFormulation _drugFormulation;

        public DrugFormulation()
        {
            _drugFormulation = new DataModel.DrugFormulation();
        }

        public List<Entities.DrugFormulation> GetDrugFormulationIdAndCode()
        {
            return _drugFormulation.GetDrugFormulationIdAndCode();
        }

    }
}
