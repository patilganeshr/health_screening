using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.Api.Controllers
{
    public class DrugFormulationController : ApiController
    {
        private readonly Business.DrugFormulation _drugFormulation;

        public DrugFormulationController()
        {
            _drugFormulation = new Business.DrugFormulation();
        }

        [Route("GetDrugFormulationIdAndCode")]
        public List<Entities.DrugFormulation> GetDrugFormulationIdAndCode()
        {
            return _drugFormulation.GetDrugFormulationIdAndCode();
        }

    }
}
