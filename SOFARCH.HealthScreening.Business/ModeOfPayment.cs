using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Business
{
    public class ModeOfPayment
    {
        private readonly DataModel.ModeOfPayment _modeOfPayment;

        public ModeOfPayment()
        {
            _modeOfPayment = new DataModel.ModeOfPayment();
        }

        public List<Entities.ModeOfPayment> GetModeOfPayments()
        {
            return _modeOfPayment.GetAllModeOfPayments();
        }

    }
}
