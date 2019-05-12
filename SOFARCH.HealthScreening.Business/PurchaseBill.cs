using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace SOFARCH.HealthScreening.Business
{
    public class PurchaseBill
    {
        private readonly DataModel.PurchaseBill _purchaseBill;

        public PurchaseBill()
        {
            _purchaseBill = new DataModel.PurchaseBill();
        }

        public List<Entities.PurchaseBill> GetPurchaseBillIdAndPurcharseBillNo()
        {
            return _purchaseBill.GetPurchaseBillIdAndPurcharseBillNo();
        }

        public List<Entities.PurchaseBill> SearchPurchaseBillsAll()
        {
            return _purchaseBill.SearchPurchaseBillsAll();
        }

        public Int32 SavePurchaseBill(Entities.PurchaseBill purchaseBill)
        {
            return _purchaseBill.SavePurchaseBill(purchaseBill);
        }


    }
}
