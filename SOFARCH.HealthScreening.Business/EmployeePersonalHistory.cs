using SOFARCH.HealthScreening.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Business
{
    public class EmployeePersonalHistory
    {
        private readonly DataModel.EmployeePersonalHistory _employeePersonalHistory;

        public EmployeePersonalHistory()
        {
            _employeePersonalHistory = new DataModel.EmployeePersonalHistory();
        }

        public Entities.EmployeePersonalHistory GetEmployeePersonalHistoriesByEmployeeId(Int32 employeeId)
        {
            return _employeePersonalHistory.GetEmployeePersonalHistoriesByEmployeeId(employeeId);
        }


    }
}
