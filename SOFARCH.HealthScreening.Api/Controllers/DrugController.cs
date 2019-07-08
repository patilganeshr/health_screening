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

        [Route("GetDrugIdAndDrugName/{drugOrXRay}")]
        public List<Entities.Drug> GetDrugIdAndDrugName(string drugOrXRay)
        {
            return _drug.GetDrugIdAndDrugName(drugOrXRay);
        }

        [Route("GetDrugIdAndDrugNameByDrugName/{drugOrXRay}/{drugName}")]
        public List<Entities.Drug> GetDrugIdAndDrugNameByDrugName(string drugOrXRay, string drugName)
        {
            return _drug.GetDrugIdAndDrugNameByDrugName(drugOrXRay, drugName);
        }

        [HttpGet]
        [Route("SearchDrugsAll")]
        public List<Entities.Drug> SearchDrugsAll()
        {
            return _drug.SearchDrugsAll();
        }

        [HttpGet]
        [Route("SearchDrugsByGenericName/{genericName}")]
        public List<Entities.Drug> SearchDrugsByGenericName(string genericName)
        {
            return _drug.SearchDrugsByGenericName(genericName);
        }

        [HttpGet]
        [Route("SearchDrugsByDrugName/{drugName}")]
        public List<Entities.Drug> SearchDrugsByDrugName(string drugName)
        {
            return _drug.SearchDrugsByDrugName(drugName);
        }

        [HttpGet]
        [Route("SearchDrugsByDrugGroupName/{drugGroupName}")]
        public List<Entities.Drug> SearchDrugsByDrugGroupName(string drugGroupName)
        {
            return _drug.SearchDrugsByDrugGroupName(drugGroupName);
        }

        [HttpGet]
        [Route("SearchDrugsByDrugCode/{drugCode}")]
        public List<Entities.Drug> SearchDrugsByDrugCode(string drugCode)
        {
            return _drug.SearchDrugsByDrugCode(drugCode);
        }

        [HttpPost]
        [Route("SaveDrug")]
        public Int32 SaveDrug(Entities.Drug drug)
        {
            return _drug.SaveDrug(drug);
        }

    }
}
