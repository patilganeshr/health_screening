using SOFARCH.HealthScreening.Business;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.Api.Controllers
{
    public class PurchaseBillController : ApiController
    {
        private readonly Business.PurchaseBill _purchaseBill;

        public PurchaseBillController()
        {
            _purchaseBill = new Business.PurchaseBill();
        }
        [Route("GetPurchaseBillIdAndPurcharseBillNo")]
        public List<Entities.PurchaseBill> GetPurchaseBillIdAndPurcharseBillNo()
        {
            return _purchaseBill.GetPurchaseBillIdAndPurcharseBillNo();
        }

        [HttpGet]
        [Route("SearchPurchaseBillsAll")]
        public List<Entities.PurchaseBill> SearchPurchaseBillsAll()
        {
            return _purchaseBill.SearchPurchaseBillsAll();
        }

        [HttpPost]
        [Route("SavePurchaseBill")]
        public Int32 SavePurchaseBill(Entities.PurchaseBill purchaseBill)
        {
            return _purchaseBill.SavePurchaseBill(purchaseBill);
        }
    }
}
