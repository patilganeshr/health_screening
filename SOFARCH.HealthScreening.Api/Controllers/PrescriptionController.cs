using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Hosting;
using System.Web.Http;

namespace SOFARCH.HealthScreening.Api.Controllers
{
    public class PrescriptionController : ApiController
    {
       
        
        private readonly Business.Precautions _drugDispense;

        public PrescriptionController()
        {
            _drugDispense = new Business.Precautions();
        }

        [Route("GetDrugDetailsByDrugIds/{drugId}")]
        public Entities.PrecautionsList GetDrugDetailsByDrugIds(Int32 drugId)
        {
            return _drugDispense.GetDrugDetailsByDrugId(drugId);
        }

        [HttpPost]
        [Route("SearchDrugDispenses")]
        public List<Entities.Precautions> SearchDrguDispense(Entities.Precautions drugDispense)
        {
            return _drugDispense.SearchDrguDispense(drugDispense);
        }



        //[Route("GetPastDrugDispenseDatesByPatientIds/patientId}")]
        //public List<Entities.Precautions> GetPastDrugDispenseDatesByPatientIds(Int32 patientId)
        //{
        //    return _drugDispense.GetPastDrugDispenseDatesByPatientId(patientId);
        //}

        [Route("GetDrugUtilisationByDrugDispenseIds/{drugDispenseId}")]
        public List<Entities.PrecautionsList> GetDrugUtilisationByDrugDispenseId(Int32 drugDispenseId)
        {
            return _drugDispense.GetDrugUtilisationByDrugDispenseId(drugDispenseId);
        }

        [HttpPost]
        [Route("SaveDrugDispenseDetail")]
        public Int32 SaveDrugDispenseDetails(Entities.Precautions drugDispense)
        {
            return _drugDispense.SaveDrugDispenseDetails(drugDispense);
        }



        [HttpPost]
        [Route("PrintInvoice")]
        public string PrintCashSaleInvoice(Entities.Precautions drugDispense)
        {
            return _drugDispense.generateReport(drugDispense);
        }




    }
}