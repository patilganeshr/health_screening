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

        [Route("GetDrugIdAndGenericName")]
        public List<Entities.Drug> GetDrugIdAndGenericName()
        {
            return _drug.GetDrugIdAndGenericName();
        }

        [Route("GetDrugIdAndGenericNameByName/{genericName}")]
        public List<Entities.Drug> GetDrugIdAndGenericNameByName(string genericName)
        {
            return _drug.GetDrugIdAndGenericNameByName(genericName);
        }

        [HttpGet]
        [Route("SearchDrugsAll")]
        public List<Entities.Drug> SearchDrugsAll()
        {
            return _drug.SearchDrugsAll();
        }

        [Route("SearchDrugsByGenericName/{genericName}")]
        public List<Entities.Drug> SearchDrugsByGenericName(string genericName)
        {
            return _drug.SearchDrugsByGenericName(genericName);
        }

        [Route("SaveDrug")]
        public Int32 SaveDrug(Entities.Drug drug)
        {
            return _drug.SaveDrug(drug);
        }

    }
}
