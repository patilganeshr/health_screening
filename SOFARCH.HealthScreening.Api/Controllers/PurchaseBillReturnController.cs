using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.Api.Controllers
{
    public class PurchaseBillReturnController : ApiController
    {
        private readonly Business.PurchaseBillReturn _purchaseBillReturn;

        public PurchaseBillReturnController()
        {
            _purchaseBillReturn = new Business.PurchaseBillReturn();

        }

        [Route("GetPurchaseBillNos")]
        public List<Entities.PurchaseBillReturn> GetPurchaseBillNos()
        {
            return _purchaseBillReturn.GetPurchaseBillNos();
        }

        [Route("GetPurchaseBillInfoByPurchaseBillId/{purchaseBillId}")]
        public Entities.PurchaseBillReturn GetPurchaseBillInfoByPurchaseBillId(Int32 purchaseBillId)
        {
            return _purchaseBillReturn.GetPurchaseBillInfoByPurchaseBillId(purchaseBillId);
        }

        [Route("GetPurchaseBillReturnItemDetailsByPurchaseBillId/{purchaseBillId}")]
        public List<Entities.PurchaseBillReturnItem> GetPurchaseBillReturnItemDetailsByPurchaseBillId(Int32 purchaseBillId)
        {
            return _purchaseBillReturn.GetPurchaseBillItemDetailsByPurchaseBillId(purchaseBillId);
        }

        [Route("GetPurchaseBillReturnDetailsByReturnId/{purchaseBillReturnId}")]
        public Entities.PurchaseBillReturn GetPurchaseBillReturnDetailsByReturnId(Int32 purchaseBillReturnId)
        {
            return _purchaseBillReturn.GetPurchaseBillReturnDetailsByReturnId(purchaseBillReturnId);
        }

        [HttpPost]
        [Route("SearchPurchaseBillsReturnAll")]
        public List<Entities.PurchaseBillReturn> SearchPurchaseBillsReturnAll(Entities.PurchaseBillReturn purchaseBillReturn)
        {
            return _purchaseBillReturn.SearchPurchaseBillsReturnAll(purchaseBillReturn);
        }

        [HttpPost]
        [Route("SavePurchaseBillReturn")]
        public Int32 SavePurchaseBillReturn(Entities.PurchaseBillReturn purchaseBillReturn)
        {
            return _purchaseBillReturn.SavePurchaseBillReturn(purchaseBillReturn);
        }

    }
}
