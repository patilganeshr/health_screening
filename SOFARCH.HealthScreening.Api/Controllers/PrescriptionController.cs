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

        public PrescriptionController()
        {
            _pre = new Business.Precautions();
        }

       
        [Route("GetAllPre")]
        public List<Entities.Precautions> GetAll()
        {
            return _pre.GetAll();
        }


        [HttpPost]
        [Route("SavePrescription")]
        public Int32 SavePrescription(Entities.Precautions pre)
        {
            return _pre.SavePrecaution(pre);
        }


        [HttpPost]
        [Route("PrintInvoice")]
        public string PrintCashSaleInvoice(Entities.Precautions  pre)
        {
            return _pre.generateReport(pre);
        }
    }
}