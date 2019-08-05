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

        [HttpGet]
        [Route("CheckPurchasebillNoIsExists/{vendorId}/{purchaseBillNo}")]
        public bool CheckPurchaseBillNoIsExists(Int32 vendorId, string purchaseBillNo)
        {
            return _purchaseBill.CheckPurchaseBillNoIsExists(vendorId, purchaseBillNo);
        }

        [Route("GetPurchaseBillIdAndPurcharseBillNo")]
        public List<Entities.PurchaseBill> GetPurchaseBillIdAndPurcharseBillNo()
        {
            return _purchaseBill.GetPurchaseBillIdAndPurcharseBillNo();
        }

        [HttpPost]
        [Route("SearchPurchaseBillsAll")]
        public List<Entities.PurchaseBill> SearchPurchaseBillsAll(Entities.PurchaseBill purchaseBill)
        {
            return _purchaseBill.SearchPurchaseBillsAll(purchaseBill);
        }

        [HttpGet]
        [Route("SearchPurchaseBillsByPurchaseBillNo/{purchaseBillNo}")]
        public List<Entities.PurchaseBill> SearchPurchaseBillsByPurchaseBillNo(string purchaseBillNo)
        {
            return _purchaseBill.SearchPurchaseBillsByPurchaseBillNo(purchaseBillNo);
        }

        [HttpPost]
        [Route("SavePurchaseBill")]
        public Int32 SavePurchaseBill(Entities.PurchaseBill purchaseBill)
        {
            return _purchaseBill.SavePurchaseBill(purchaseBill);
        }
    }
}
