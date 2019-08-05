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

        public bool CheckPurchaseBillNoIsExists(Int32 vendorId, string purchaseBillNo) {
            return _purchaseBill.CheckPurchaseBillNoIsExists(vendorId, purchaseBillNo);
        }

        public List<Entities.PurchaseBill> GetPurchaseBillIdAndPurcharseBillNo()
        {
            return _purchaseBill.GetPurchaseBillIdAndPurcharseBillNo();
        }

        public List<Entities.PurchaseBill> SearchPurchaseBillsAll(Entities.PurchaseBill purchaseBill)
        {
            return _purchaseBill.SearchPurchaseBillsAll(purchaseBill);
        }

        public List<Entities.PurchaseBill> SearchPurchaseBillsByPurchaseBillNo(string purchaseBillNo)
        {
            return _purchaseBill.SearchPurchaseBillsByPurchaseBillNo(purchaseBillNo);
        }

        public Int32 SavePurchaseBill(Entities.PurchaseBill purchaseBill)
        {
            return _purchaseBill.SavePurchaseBill(purchaseBill);
        }


    }
}
