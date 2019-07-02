using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Business
{
    public class PurchaseBillReturn
    {
        private readonly DataModel.PurchaseBillReturn _purchaseBillReturn;

        public PurchaseBillReturn()
        {
            _purchaseBillReturn = new DataModel.PurchaseBillReturn();
        }

        public List<Entities.PurchaseBillReturn> GetPurchaseBillNos()
        {
            return _purchaseBillReturn.GetPurchaseBillNos();
        }

        public Entities.PurchaseBillReturn GetPurchaseBillInfoByPurchaseBillId(Int32 purchaseBillId)
        {
            return _purchaseBillReturn.GetPurchaseBillInfoByPurchaseBillId(purchaseBillId);
        }

        public List<Entities.PurchaseBillReturnItem> GetPurchaseBillItemDetailsByPurchaseBillId(Int32 purchaseBillId)
        {
            return _purchaseBillReturn.GetPurchaseBillReturnItemDetailsByPurchaseBillId(purchaseBillId);
        }

        public Entities.PurchaseBillReturn GetPurchaseBillReturnDetailsByReturnId(Int32 purchaseBillReturnId)
        {
            return _purchaseBillReturn.GetPurchaseBillReturnDetailsByReturnId(purchaseBillReturnId);
        }

        public List<Entities.PurchaseBillReturn> SearchPurchaseBillsReturnAll(Entities.PurchaseBillReturn purchaseBillReturn)
        {
            return _purchaseBillReturn.SearchPurchaseBillsReturnAll(purchaseBillReturn);
        }

        public Int32 SavePurchaseBillReturn(Entities.PurchaseBillReturn purchaseBillReturn)
        {
            return _purchaseBillReturn.SavePurchaseBillReturn(purchaseBillReturn);
        }

    }
}
