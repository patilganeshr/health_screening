using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Business
{
    public class PurchaseBillCharge
    {
        private readonly DataModel.PurchaseBillCharges _purchaseBillCharges;

        public PurchaseBillCharge()
        {
            _purchaseBillCharges = new DataModel.PurchaseBillCharges();
        }

        public List<Entities.PurchaseBillCharge> GetPurchaseBillChargesDetailsByPurchaseBillId(Int32 purchaseBillId)
        {
            return _purchaseBillCharges.GetPurchaseBillChargesDetailsByPurchaseBillId(purchaseBillId);
        }
    }
}
