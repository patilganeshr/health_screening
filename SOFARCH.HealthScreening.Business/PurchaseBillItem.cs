using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Business
{
    public class PurchaseBillItem
    {
        private readonly DataModel.PurchaseBillItem _purchaseBillItem;

        public PurchaseBillItem()
        {
            _purchaseBillItem = new DataModel.PurchaseBillItem();
        }

        public List<Entities.PurchaseBillItem> GetPurchaseBillItemDetailsByPurchaseBillId(Int32 purchaseBillId)
        {
            return _purchaseBillItem.GetPurchaseBillItemDetailsByPurchaseBillId(purchaseBillId);
        }
    }
}
