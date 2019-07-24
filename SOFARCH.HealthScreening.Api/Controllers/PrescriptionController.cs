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
        private readonly Business.Precautions  _pre;
        private readonly Business.Patient  _patient;


        public PrescriptionController()
        {
            _pre = new Business.Precautions();
            _patient = new Business.Patient();
        }

       
        [Route("GetAllPre")]
        public List<Entities.Precautions> GetAll()
        {
            return _pre.GetAll();
        }


        [Route("GetAllPreDetails/{PrecautionsId}")]
        public List<Entities.Precautions> GetAllPreDetails(Int32 PrecautionsId)
        {
            return _pre.GetAllPreDetails(PrecautionsId);
        }


        [HttpPost]
        [Route("SavePrescription")]
        public Int32 SavePrescription(Entities.Precautions pre)
        {
            return _pre.SavePrecaution(pre);
        }

        [HttpPost]
        [Route("SavePrescriptionDrug")]
        public Int32 SavePrescriptionDrug(Entities.Precautions pre)
        {
            return _pre.SavePrecautionDrug(pre);
        }


        [HttpPost]
        [Route("PrintInvoice")]
        public string PrintCashSaleInvoice(Entities.Precautions  pre)
        {
            return _pre.generateReport(pre);
        }



    }
}