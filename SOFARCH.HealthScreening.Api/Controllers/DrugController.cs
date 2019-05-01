using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Hosting;
using System.Web.Http;

namespace SOFARCH.HealthScreening.Api.Controllers
{
    public class DrugController : ApiController
    {
        private readonly Business.Drug _drug;

        public DrugController()
        {
            _drug = new Business.Drug();
        }

        [Route("GetListOfAllDrugs")]
        public List<Entities.Drug> GetListOfAllDrugs()
        {
            return _drug.GetListOfAllDrugs();
        }

        [HttpGet]
        [Route("SearchDrugsAll")]
        public List<Entities.Drug> SearchDrugsAll()
        {
            return _drug.SearchDrugsAll();
        }

        [Route("SaveDrug")]
        public Int32 SaveDrug(Entities.Drug drug)
        {
            return _drug.SaveDrug(drug);
        }

    }
}
