using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Business
{
    public class EmployeeExerciseHistory
    {
        private readonly DataModel.EmployeeExerciseHistory _employeeExerciseHistory;

        public EmployeeExerciseHistory()
        {
            _employeeExerciseHistory = new DataModel.EmployeeExerciseHistory();
        }

        public List<Entities.EmployeeExerciseHistory> GetEmployeeExerciseHistoriesByEmployeeId(Int32 employeeId)
        {
            return _employeeExerciseHistory.GetEmployeeExerciseHistoriesByEmployeeId(employeeId);
        }

    }
}
