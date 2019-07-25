using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.Api.Controllers
{
    public class DrugDispenseReturnController : ApiController
    {
        private readonly Business.DrugDispenseReturn _drugDispenseReturn;

        public DrugDispenseReturnController()
        {
            _drugDispenseReturn = new Business.DrugDispenseReturn();
        }

        [HttpPost]
        [Route("SearchDrugDispenseReturn")]
        public List<Entities.DrugDispenseReturn> SearchDrguDispenseReturn(Entities.DrugDispenseReturn drugDispenseReturn)
        {
            return _drugDispenseReturn.SearchDrguDispenseReturn(drugDispenseReturn);
        }

        [Route("GetDrugDetailsByPatientId/{patientId}")]
        public List<Entities.DrugDispenseDrugReturn> GetDrugDetailsByPatientId(Int32 patientId)
        {
            return _drugDispenseReturn.GetDrugDetailsByPatientId(patientId);
        }

        [Route("GetDrugDispenseDetailsByPatientIdAndDrugId/{patientId}/{drugId}")]
        public List<Entities.DrugDispenseDrugReturn> GetDrugDispenseDetailsByPatientIdAndDrugId(Int32 patientId, Int32 drugId)
        {
            return _drugDispenseReturn.GetDrugDispenseDetailsByPatientIdAndDrugId(patientId, drugId);
        }

        [Route("GetDrugDispenseDetailsByPatientId/{patientId}")]
        public List<Entities.DrugDispenseDrugReturn> GetDrugDispenseDetailsByPatientId(Int32 patientId)
        {
            return _drugDispenseReturn.GetDrugDispenseDetailsByPatientId(patientId);
        }

        [Route("GetPastDrugReturnDatesByPatientId/{patientId}")]
        public List<Entities.DrugDispenseReturn> GetPastDrugReturnDatesByPatientId(Int32 patientId)
        {
            return _drugDispenseReturn.GetPastDrugReturnDatesByPatientId(patientId);
        }

        [HttpPost]
        [Route("SaveDrugDispenseReturnDetails")]
        public Int32 SaveDrugDispenseReturnDetails(Entities.DrugDispenseReturn drugDispenseReturn)
        {
            return _drugDispenseReturn.SaveDrugDispenseReturnDetails(drugDispenseReturn);
        }

    }
}
